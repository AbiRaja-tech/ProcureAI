/**
 * Google Apps Script for handling ProcureAI form submissions
 * Enhanced version with better CORS handling and error management
 */

// Configuration - Replace with your actual Google Sheet ID
const SHEET_ID = '1q8jkr1peyHVnc5zqhfUgff_yr1WmJ0ZRwKKoGTTHCoE'; // Get this from your Google Sheet URL
const SHEET_NAME = 'ProcureAI Form Submission'; // Name of the sheet tab

/**
 * Handle OPTIONS requests for CORS preflight
 */
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    });
}

/**
 * Main function to handle web app POST requests
 */
function doPost(e) {
  try {
    console.log('Received POST request');
    console.log('Request data:', e);

    // Parse the incoming data
    let data;
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
        console.log('Parsed data:', data);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        return createErrorResponse('Invalid JSON data');
      }
    } else {
      console.error('No post data received');
      return createErrorResponse('No data received');
    }

    // Validate required fields
    if (!data.name || !data.email || !data.company) {
      console.error('Missing required fields:', data);
      return createErrorResponse('Name, email, and company are required');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      console.error('Invalid email format:', data.email);
      return createErrorResponse('Please enter a valid email address');
    }

    // Store data in Google Sheet
    const result = storeFormSubmission(data);
    
    if (result.success) {
      console.log('Form submission successful:', result);
      
      // Optional: Send notification email
      try {
        sendNotificationEmail(data, result.rowNumber);
      } catch (emailError) {
        console.warn('Email notification failed:', emailError);
        // Don't fail the whole request if email fails
      }
      
      return createSuccessResponse({
        message: 'Thanks! Our team will contact you soon.',
        rowNumber: result.rowNumber
      });
    } else {
      console.error('Storage failed:', result);
      return createErrorResponse(result.message);
    }

  } catch (error) {
    console.error('Error in doPost:', error);
    return createErrorResponse('An error occurred while processing your request. Please try again.');
  }
}

/**
 * Handle GET requests
 */
function doGet(e) {
  console.log('Received GET request');
  return createSuccessResponse({
    message: 'ProcureAI Form Handler is running',
    timestamp: new Date().toISOString(),
    version: '2.1'
  });
}

/**
 * Create standardized success response with CORS headers
 */
function createSuccessResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      ...data
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
}

/**
 * Create standardized error response with CORS headers
 */
function createErrorResponse(message) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: false,
      message: message
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
}

/**
 * Store form submission data in Google Sheet
 */
function storeFormSubmission(data) {
  try {
    console.log('Storing form submission:', data);
    
    // Open the Google Sheet
    const sheet = getOrCreateSheet();
    
    // Prepare the row data
    const timestamp = new Date();
    const rowData = [
      timestamp.toISOString(), // ISO timestamp
      timestamp.toLocaleString('en-US', { 
        timeZone: 'America/New_York',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }), // Formatted timestamp
      data.name || '',
      data.email || '',
      data.company || '',
      data.source || 'Landing Page CTA',
      'New', // Status
      '', // Notes
      data.timestamp || timestamp.toISOString() // Client timestamp
    ];

    // Add the row to the sheet
    const lastRow = sheet.getLastRow();
    const newRowNumber = lastRow + 1;
    
    console.log('Adding row:', newRowNumber, rowData);
    
    // Insert the data
    sheet.getRange(newRowNumber, 1, 1, rowData.length).setValues([rowData]);
    
    // Auto-resize columns for better readability
    sheet.autoResizeColumns(1, rowData.length);
    
    console.log(`Lead stored successfully in row ${newRowNumber}`);
    
    return {
      success: true,
      rowNumber: newRowNumber,
      message: 'Data stored successfully'
    };

  } catch (error) {
    console.error('Error storing form submission:', error);
    return {
      success: false,
      message: `Storage error: ${error.toString()}`
    };
  }
}

/**
 * Get or create the Google Sheet with proper headers
 */
function getOrCreateSheet() {
  try {
    console.log('Getting/creating sheet with ID:', SHEET_ID);
    
    // Try to open existing spreadsheet
    let spreadsheet;
    try {
      if (SHEET_ID === 'YOUR_GOOGLE_SHEET_ID_HERE') {
        throw new Error('Please update SHEET_ID with your actual Google Sheet ID');
      }
      spreadsheet = SpreadsheetApp.openById(SHEET_ID);
      console.log('Opened existing spreadsheet');
    } catch (e) {
      console.log('Creating new spreadsheet');
      // If sheet doesn't exist, create a new one
      spreadsheet = SpreadsheetApp.create('ProcureAI Leads Database');
      console.log('Created new spreadsheet with ID:', spreadsheet.getId());
      console.log('⚠️ IMPORTANT: Update SHEET_ID in the script with this ID:', spreadsheet.getId());
    }

    // Get or create the specific sheet
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) {
      console.log('Creating new sheet:', SHEET_NAME);
      sheet = spreadsheet.insertSheet(SHEET_NAME);
    }

    // Set up headers if this is a new sheet
    if (sheet.getLastRow() === 0) {
      console.log('Setting up headers');
      const headers = [
        'Timestamp (ISO)',
        'Timestamp (Formatted)',
        'Full Name',
        'Email',
        'Company',
        'Source',
        'Status',
        'Notes',
        'Client Timestamp'
      ];
      
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format the header row
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#1e40af'); // Blue-700
      headerRange.setFontColor('white');
      
      // Set column widths
      sheet.setColumnWidth(1, 180); // Timestamp ISO
      sheet.setColumnWidth(2, 150); // Timestamp Formatted
      sheet.setColumnWidth(3, 150); // Full Name
      sheet.setColumnWidth(4, 200); // Email
      sheet.setColumnWidth(5, 200); // Company
      sheet.setColumnWidth(6, 120); // Source
      sheet.setColumnWidth(7, 100); // Status
      sheet.setColumnWidth(8, 200); // Notes
      sheet.setColumnWidth(9, 180); // Client Timestamp
      
      console.log('Headers created successfully');
    }

    return sheet;

  } catch (error) {
    console.error('Error getting/creating sheet:', error);
    throw new Error(`Failed to access Google Sheet: ${error.toString()}`);
  }
}

/**
 * Send notification email to your team (optional)
 */
function sendNotificationEmail(data, rowNumber) {
  try {
    // Replace with your notification email - OPTIONAL
    const NOTIFICATION_EMAIL = ''; // Leave empty to disable notifications
    
    if (!NOTIFICATION_EMAIL) {
      console.log('No notification email configured, skipping');
      return;
    }
    
    const subject = `New ProcureAI Lead: ${data.company}`;
    const body = `
New lead submission received:

Name: ${data.name}
Email: ${data.email}
Company: ${data.company}
Source: ${data.source}
Timestamp: ${new Date().toLocaleString()}

Row Number: ${rowNumber}

View in Google Sheets: https://docs.google.com/spreadsheets/d/${SHEET_ID}
    `;
    
    MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);
    console.log('Notification email sent to:', NOTIFICATION_EMAIL);
    
  } catch (error) {
    console.error('Error sending notification email:', error);
    // Don't throw - notification failure shouldn't break form submission
  }
}

/**
 * Test function to verify the setup
 */
function testFormSubmission() {
  console.log('Running test submission...');
  
  const testData = {
    name: 'John Doe',
    email: 'john.doe@testcompany.com',
    company: 'Test Company Inc',
    source: 'Test Run',
    timestamp: new Date().toISOString()
  };
  
  const result = storeFormSubmission(testData);
  console.log('Test result:', result);
  
  if (result.success) {
    console.log('✅ Test successful! Form handler is working correctly.');
    console.log('Check your Google Sheet to see the test data.');
  } else {
    console.log('❌ Test failed:', result.message);
  }
  
  return result;
}

/**
 * Setup function to initialize everything
 */
function setup() {
  console.log('🚀 Setting up ProcureAI Form Handler...');
  
  try {
    // Check configuration
    if (SHEET_ID === 'YOUR_GOOGLE_SHEET_ID_HERE') {
      console.log('⚠️ WARNING: Please update SHEET_ID with your actual Google Sheet ID');
    }
    
    // Create/verify the sheet
    const sheet = getOrCreateSheet();
    console.log('✅ Sheet setup complete');
    
    // Run a test
    const testResult = testFormSubmission();
    
    if (testResult.success) {
      console.log('🎉 Setup completed successfully!');
      console.log('');
      console.log('📋 Next steps:');
      console.log('1. Deploy this script as a web app');
      console.log('2. Set execution as "Me" and access to "Anyone"');
      console.log('3. Copy the web app URL');
      console.log('4. Update GOOGLE_SCRIPT_URL in your React component');
      console.log('5. Test the form on your website');
    } else {
      console.log('❌ Setup completed with errors. Check the logs above.');
    }
    
  } catch (error) {
    console.error('❌ Setup failed:', error);
  }
}

/**
 * Debug function to check current configuration
 */
function debugConfiguration() {
  console.log('🔍 Debug Configuration:');
  console.log('SHEET_ID:', SHEET_ID);
  console.log('SHEET_NAME:', SHEET_NAME);
  
  try {
    const sheet = getOrCreateSheet();
    console.log('✅ Sheet accessible');
    console.log('Last row:', sheet.getLastRow());
    
    if (sheet.getLastRow() > 0) {
      const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      console.log('Headers:', headers);
    }
    
  } catch (error) {
    console.error('❌ Sheet access failed:', error);
  }
}
