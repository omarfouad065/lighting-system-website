# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets integration for your contact form so that all submissions are saved to a Google Sheet that you can access from anywhere.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Contact Form Submissions" or similar
4. Copy the Sheet ID from the URL (the long string between `/d/` and `/edit`)
   - Example: `https://docs.google.com/spreadsheets/d/1ABC123DEF456/edit`
   - Sheet ID: `1ABC123DEF456`

## Step 2: Create Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Delete the default code and paste the contents of `google-apps-script.js`
4. Replace `YOUR_SHEET_ID` with your actual Sheet ID from Step 1
5. Save the project (Ctrl+S) and give it a name like "Contact Form Handler"

## Step 3: Deploy as Web App

1. In your Apps Script project, click "Deploy" → "New deployment"
2. Choose "Web app" as the type
3. Set "Execute as" to "Me"
4. Set "Who has access" to "Anyone"
5. Click "Deploy"
6. Copy the Web App URL (it will look like `https://script.google.com/macros/s/SCRIPT_ID/exec`)

## Step 4: Update Your Website

1. Open `js/sheets-integration.js`
2. Replace `YOUR_SCRIPT_ID` with your actual Script ID from the Web App URL
3. Save the file

## Step 5: Test the Integration

1. Upload your website to GitHub Pages
2. Fill out the contact form
3. Check your Google Sheet - you should see the submission appear
4. Visit `submissions.html` to see all submissions

## Troubleshooting

- **No data appears**: Check that the Sheet ID is correct in the Apps Script
- **Permission errors**: Make sure the Web App is deployed with "Anyone" access
- **CORS errors**: The script uses `mode: 'no-cors'` to handle this automatically

## Security Note

The Web App URL will be visible in your website's code. This is normal for this type of integration, but the script only allows writing to your specific Google Sheet.

## Alternative: Manual Setup

If you prefer not to use Google Sheets, the form will fall back to localStorage (browser-only storage) and you can view submissions on `submissions.html` from the same browser.
