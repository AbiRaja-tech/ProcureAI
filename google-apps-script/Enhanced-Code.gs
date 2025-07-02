/**
 * Enhanced Google Apps Script for ProcureAI form submissions
 * Handles multiple submission methods and provides better debugging
 */

// Configuration - Replace with your actual Google Sheet ID
const SHEET_ID = '1q8jkr1peyHVnc5zqhfUgff_yr1WmJ0ZRwKKoGTTHCoE';
const SHEET_NAME = 'ProcureAI Leads';

/**
 * Handle all HTTP methods with comprehensive CORS support
 */
function doGet(e) {
  console.log('GET request received:', e);
  return createResponse({
    success: true,
    message: 'ProcureAI Form Handler is active',
    timestamp: new Date().toISOString(),
    version: '3.0',
    methods: ['GET', 'POST', 'OPTIONS'],
    testUrl: ScriptApp.getService().getUrl()
  });
}

function doPost(e) {
  console.log('POST request received');
  console.log('Request parameters:', e.parameter);
  console.log('Post data:', e.postData);
  
  try {
    let data = {};
    
    // Method 1: Try to parse JSON from postData
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
        console.log('Parsed JSON data:', data);
      } catch (jsonError) {
        console.log('JSON parse failed, trying form data');
        // Method 2: Fall back to form parameters
        data = e.parameter || {};
      }
    } else {
      // Method 3: Use parameters directly
      data = e.parameter || {};
    }
    
    console.log('Final data object:', data);
    
    // Validate required fields
    if (!data.name || !data.email || !data.company) {
      console.error('Missing required fields:', data);
      return createResponse({
        success: false,
        message: 'Name, email, and company are required',
        received: data
      });
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return createResponse({
        success: false,
        message: 'Invalid email format'
      });
    }
    
    // Store the data
    const result = storeFormSubmission(data);
    
    if (result.success) {
      // Send notification email (optional)
      try {
        sendNotificationEmail(data, result.rowNumber);
      } catch (emailError) {
        console.warn('Email notification failed:', emailError);
      }
      
      return createResponse({
        success: true,
        message: 'Thank you! Your information has been received.',
        rowNumber: result.rowNumber
      });
    } else {
      return createResponse({
        success: false,
        message: result.message
      });
    }
    
  } catch (error) {
    console.error('Error in doPost:', error);
    return createResponse({
      success: false,
      message: 'Server error occurred',
      error: error.toString()
    });
  }
}

function doOptions(e) {
  console.log('OPTIONS request received');
  return createResponse({
    success: true,
    message: 'CORS preflight successful'
  });
}

/**
 * Create standardized response with CORS headers
 */
function createResponse(data) {
  const response = ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
    
  // Set comprehensive CORS headers
  response.setHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Max-Age': '86400',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  });
  
  return response;
}

/**
 * Store form submission in Google Sheet
 */
function storeFormSubmission(data) {
  try {
    console.log('Storing submission:', data);
    
    const sheet = getOrCreateSheet();
    const timestamp = new Date();
    
    const rowData = [
      timestamp.toISOString(),
      timestamp.toLocaleString('en-US', { timeZone: 'America/New_York' }),
      data.name || '',
      data.email || '',
      data.company || '',
      data.source || 'Landing Page',
      'New',
      '',
      data.timestamp || timestamp.toISOString()
    ];
    
    const lastRow = sheet.getLastRow();
    const newRow = lastRow + 1;
    
    sheet.getRange(newRow, 1, 1, rowData.length).setValues([rowData]);
    sheet.autoResizeColumns(1, rowData.length);
    
    console.log(`Data stored in row ${newRow}`);
    
    return {
      success: true,
      rowNumber: newRow,
      message: 'Data stored successfully'
    };
    
  } catch (error) {
    console.error('Storage error:', error);
    return {
      success: false,
      message: `Storage failed: ${error.toString()}`
    };
  }
}

/**
 * Get or create sheet with headers
 */
function getOrCreateSheet() {
  try {
    let spreadsheet;
    
    if (SHEET_ID === 'YOUR_GOOGLE_SHEET_ID_HERE') {
      throw new Error('Please update SHEET_ID with your actual Google Sheet ID');
    }
    
    try {
      spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    } catch (e) {
      spreadsheet = SpreadsheetApp.create('ProcureAI Leads Database');
      console.log('Created new spreadsheet:', spreadsheet.getId());
    }
    
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
    }
    
    // Setup headers if needed
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp (ISO)',
        'Timestamp (Formatted)', 
        'Name',
        'Email',
        'Company',
        'Source',
        'Status',
        'Notes',
        'Client Timestamp'
      ];
      
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format headers
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#1e40af');
      headerRange.setFontColor('white');
      
      // Set column widths
      [180, 150, 150, 200, 200, 120, 100, 200, 180].forEach((width, index) => {
        sheet.setColumnWidth(index + 1, width);
      });
    }
    
    return sheet;
    
  } catch (error) {
    console.error('Sheet access error:', error);
    throw new Error(`Sheet access failed: ${error.toString()}`);
  }
}

/**
 * Send notification email (optional)
 */
function sendNotificationEmail(data, rowNumber) {
  try {
    const NOTIFICATION_EMAIL = ''; // Add your email here if you want notifications
    
    if (!NOTIFICATION_EMAIL) {
      return;
    }
    
    const subject = `New ProcureAI Lead: ${data.company}`;
    const body = `
New lead received:

Name: ${data.name}
Email: ${data.email}  
Company: ${data.company}
Source: ${data.source}
Time: ${new Date().toLocaleString()}
Row: ${rowNumber}

View sheet: https://docs.google.com/spreadsheets/d/${SHEET_ID}
    `;
    
    MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);
    console.log('Notification sent');
    
  } catch (error) {
    console.error('Email error:', error);
  }
}

/**
 * Test the complete setup
 */
function runCompleteTest() {
  console.log('🧪 Running complete test...');
  
  try {
    // Test 1: Sheet access
    console.log('Test 1: Sheet access');
    const sheet = getOrCreateSheet();
    console.log('✅ Sheet accessible');
    
    // Test 2: Data storage
    console.log('Test 2: Data storage');
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      company: 'Test Company',
      source: 'Test Run'
    };
    
    const result = storeFormSubmission(testData);
    if (result.success) {
      console.log('✅ Data storage working');
    } else {
      console.log('❌ Data storage failed:', result.message);
    }
    
    // Test 3: Web app URL
    console.log('Test 3: Web app info');
    const webAppUrl = ScriptApp.getService().getUrl();
    console.log('Web App URL:', webAppUrl);
    
    console.log('🎉 Complete test finished!');
    console.log('');
    console.log('📋 Deployment checklist:');
    console.log('1. ✅ Script is working');
    console.log('2. 🔄 Deploy as web app with "Anyone" access');
    console.log('3. 📝 Copy web app URL to React component');
    console.log('4. 🧪 Test form submission');
    
    return {
      success: true,
      webAppUrl: webAppUrl,
      testRowNumber: result.rowNumber
    };
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * Quick deployment check
 */
function checkDeployment() {
  const url = ScriptApp.getService().getUrl();
  console.log('Current Web App URL:', url);
  console.log('Status: ' + (url ? '✅ Deployed' : '❌ Not deployed'));
  
  if (url) {
    console.log('Copy this URL to your React component:');
    console.log(url);
  } else {
    console.log('Please deploy this script as a web app first.');
  }
  
  return url;
}
