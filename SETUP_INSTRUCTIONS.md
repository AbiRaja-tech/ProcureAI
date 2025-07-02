# ProcureAI Google Sheets Form Setup Instructions

## Step 1: Create Google Apps Script

1. Go to [script.google.com](https://script.google.com)
2. Click "New Project"
3. Replace the default code with the provided `Code.gs` content
4. Save the project (name it "ProcureAI Form Handler")

## Step 2: Create Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "ProcureAI Form Submissions"
4. Copy the Sheet ID from the URL (the long string between `/d/` and `/edit`)
   - Example: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
5. Replace `YOUR_GOOGLE_SHEET_ID_HERE` in the Apps Script code with your actual Sheet ID

## Step 3: Deploy the Web App

1. In Google Apps Script, click "Deploy" → "New Deployment"
2. Choose type: "Web app"
3. Set execute as: "Me"
4. Set access: "Anyone" (this allows external form submissions)
5. Click "Deploy"
6. Copy the Web App URL provided

## Step 4: Update HTML Form

1. Replace `YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` in the HTML file with your actual Web App URL
2. Host the HTML file on your website or test locally

## Step 5: Test the Setup

1. Run the `setup()` function in Google Apps Script to initialize everything
2. Submit a test form to verify data is being stored
3. Check your Google Sheet to see the submitted data

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure the web app is deployed with "Anyone" access
2. **Permission Denied**: Ensure the script has permission to access Google Sheets
3. **Data Not Appearing**: Check the Sheet ID and sheet name are correct
4. **Form Not Submitting**: Verify the Web App URL is correct in the HTML

### Testing:

- Use the `testFormSubmission()` function in Apps Script to test data storage
- Check the browser console for any JavaScript errors
- Verify the Google Sheet has the correct headers

## Security Notes

- The web app is set to "Anyone" access for form submissions
- Email validation is performed both client-side and server-side
- All submissions are logged with timestamps
- Consider adding rate limiting for production use

## Data Structure

The Google Sheet will contain these columns:
- Timestamp (ISO)
- Timestamp (Formatted)
- Email
- Company
- Name
- Phone
- Message
- Source
- Status

## Customization

You can easily modify:
- Add more form fields by updating both HTML and Apps Script
- Change validation rules in the Apps Script
- Modify the success/error messages
- Add email notifications when forms are submitted
- Integrate with other services (CRM, email marketing, etc.)
