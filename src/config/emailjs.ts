// SMTP.js Configuration
// To set up SMTP.js:
// 1. Replace the placeholder values below with your actual SMTP settings
// 2. You can use services like ElasticEmail, SendGrid, or your own SMTP server

export const SMTP_CONFIG = {
  Host: "smtp.elasticemail.com", // Replace with your SMTP host
  Username: "your-email@domain.com", // Replace with your SMTP username
  Password: "your-smtp-password", // Replace with your SMTP password
  Port: 587, // Common SMTP port
  To: "Haadheesheeraz2004@gmail.com", // Your email to receive messages
  From: "your-email@domain.com" // From email address
};

// Note: For security, consider using environment variables or a secure backend
// instead of storing credentials in the frontend code.
