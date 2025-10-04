// Google Apps Script Code for Contact Form Integration
// Deploy this as a Web App in Google Apps Script

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Open your Google Sheet (replace with your sheet ID)
    const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getActiveSheet();
    
    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 9).setValues([
        ['Timestamp', 'First Name', 'Last Name', 'Email', 'Phone', 'Event Type', 'Event Date', 'Budget', 'Message']
      ]);
    }
    
    // Add the new row
    const timestamp = new Date();
    const row = [
      timestamp,
      data.firstName || '',
      data.lastName || '',
      data.email || '',
      data.phone || '',
      data.eventType || '',
      data.eventDate || '',
      data.budget || '',
      data.message || ''
    ];
    
    sheet.appendRow(row);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getActiveSheet();
    const data = sheet.getDataRange().getValues();
    
    // Convert to array of objects
    const headers = data[0];
    const rows = data.slice(1);
    const result = rows.map(row => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header.toLowerCase().replace(/\s+/g, '')] = row[index];
      });
      return obj;
    });
    
    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
