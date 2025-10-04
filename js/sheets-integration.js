// Google Sheets Integration for Contact Form
// This script handles form submission to Google Sheets via Google Apps Script

class SheetsIntegration {
    constructor() {
        // Replace with your Google Apps Script Web App URL
        this.SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
        this.isConfigured = this.SCRIPT_URL.includes('YOUR_SCRIPT_ID') === false;
    }

    async submitToSheets(formData) {
        if (!this.isConfigured) {
            console.warn('Google Sheets integration not configured. Please set up the script URL.');
            return { success: false, error: 'Not configured' };
        }

        try {
            const response = await fetch(this.SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Required for Google Apps Script
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            return { success: true };
        } catch (error) {
            console.error('Error submitting to Google Sheets:', error);
            return { success: false, error: error.message };
        }
    }

    async loadFromSheets() {
        if (!this.isConfigured) {
            console.warn('Google Sheets integration not configured.');
            return [];
        }

        try {
            const response = await fetch(`${this.SCRIPT_URL}?action=getData`);
            const data = await response.json();
            return data || [];
        } catch (error) {
            console.error('Error loading from Google Sheets:', error);
            return [];
        }
    }
}

// Initialize the integration
window.sheetsIntegration = new SheetsIntegration();
