# ProcureAI Form Setup - Updated Instructions

## 🚨 Important: Follow These Steps Exactly

### Step 1: Create Google Sheet
1. Go to [sheets.google.com](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it "ProcureAI Leads Database"
4. Copy the Sheet ID from the URL:
   - URL looks like: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
   - Copy the long string between `/d/` and `/edit`

### Step 2: Set Up Google Apps Script
1. Go to [script.google.com](https://script.google.com)
2. Click "New Project"
3. Replace all default code with the provided `Code.gs`
4. **CRITICAL**: Replace `YOUR_GOOGLE_SHEET_ID_HERE` with your actual Sheet ID
5. Save the project (Ctrl+S) and name it "ProcureAI Form Handler"

### Step 3: Test the Script
1. In the Apps Script editor, select the `setup` function from the dropdown
2. Click the "Run" button (▶️)
3. Grant permissions when prompted
4. Check the execution log - you should see "✅ Test successful!"
5. Check your Google Sheet - it should now have headers and one test row

### Step 4: Deploy as Web App
1. Click "Deploy" → "New Deployment"
2. Click the gear icon ⚙️ next to "Select type"
3. Choose "Web app"
4. Set these EXACT settings:
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
5. Click "Deploy"
6. **Copy the Web App URL** (it ends with `/exec`)

### Step 5: Update React Component
1. In your React component, find this line:
   \`\`\`typescript
   const GOOGLE_SCRIPT_URL = "REPLACE_WITH_YOUR_GOOGLE_APPS_SCRIPT_URL"
   \`\`\`
2. Replace the placeholder with your actual Web App URL

### Step 6: Test the Form
1. Submit a test form on your website
2. Check the browser console for any errors
3. Verify the data appears in your Google Sheet

## 🔧 Troubleshooting

### "Failed to fetch" Error
- ✅ Make sure Web App is deployed with "Anyone" access
- ✅ Verify the Web App URL ends with `/exec`
- ✅ Check that SHEET_ID is correctly set in the script

### "Permission denied" Error
- ✅ Run the `setup()` function first to grant permissions
- ✅ Make sure you're the owner of both the script and sheet

### Data not appearing in sheet
- ✅ Check the Apps Script execution log for errors
- ✅ Verify SHEET_ID matches your actual sheet
- ✅ Run `debugConfiguration()` function to check setup

### CORS Errors
- ✅ The updated script includes proper CORS headers
- ✅ Make sure Web App access is set to "Anyone"

## 🧪 Testing Functions

Run these in Apps Script to test:
- `setup()` - Initial setup and test
- `testFormSubmission()` - Test data storage
- `debugConfiguration()` - Check current config

## 📊 Monitoring

Your Google Sheet will contain:
- Timestamp (ISO & Formatted)
- Full Name
- Email
- Company
- Source
- Status
- Notes
- Client Timestamp

## 🔒 Security Notes

- Web app is public but only accepts POST requests with valid data
- Email validation on both client and server side
- No sensitive data is logged
- All submissions are timestamped and tracked
