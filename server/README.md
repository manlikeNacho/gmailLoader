# GmailLoader
## Overview
GmailLoader is a web application designed to fetch and classify emails from a user's Gmail account using Google's Gmail API and OpenAI's classification capabilities. This application aims to provide a seamless way to manage and categorize emails based on their content and importance.

## Features
- Google OAuth Integration: Securely authenticate users with their Google account to access their Gmail.
- Fetch Emails: Retrieve emails from the user's Gmail account using Gmail API.
- Email Classification: Classify emails using OpenAI's API into categories such as important, social, promotions, etc.
- Real-time Updates: Automatically fetch and classify new emails.
- User Dashboard: Provide users with a dashboard to view and manage their classified emails.
- Responsive Design: Optimized for both desktop and mobile devices.
## Use Cases
1. Email Organization: Automatically categorize and organize emails to reduce inbox clutter.
2. Priority Management: Identify and prioritize important emails, ensuring critical messages are not missed.
3. Spam Detection: Classify and separate spam or promotional emails from the main inbox.
4. Email Summarization: Provide quick snippets of emails for easy preview and decision-making.
5. User Engagement: Improve user engagement by providing a clean and organized email interface.
## Installation
### Prerequisites
- Node.js and npm installed.
- Google Cloud project with Gmail API enabled.
- OpenAI API key.
### Steps
1. Clone the repository:
` git clone https://github.com/manlikeNacho/gmailLoader.git `
` cd gmailLoader`

2. Install dependencies:

` npm install`
3. Environment Variables:
Create a .env file in the root directory and add the following:
```
 GOOGLE_CLIENT_ID=your-google-client-id
 GOOGLE_CLIENT_SECRET=your-google-client-secret
 NEXTAUTH_URL=http://localhost:3000
 NEXTAUTH_SECRET=your-nextauth-secret (openssl key)
 EXPRESS_SESSION_SECRET=secret
 GOOGLE_CLIENT_CALLBACK_URI=your-callbackUri-from-google-console
 JWT_PRIVATE_KEY=jwt-key
 WINSTON_LOG_LEVEL=info
 
```
4. Run the development server:
` npm run dev`


## Usage
1. Sign In:

Click on the sign-in button and authenticate using your Google account.
2. Fetch Emails:

Once authenticated, the application will automatically fetch and display emails from your Gmail account.
3. Classify Emails:

Click on the "Classify" button to categorize emails. The classification results will be displayed alongside each email.
4. View Classified Emails:

View and manage classified emails from the user dashboard.
## Contributing
We welcome contributions to enhance GmailLoader. Please fork the repository and submit pull requests for any features or bug fixes.

## NOTE
The fullstack app files(client&Server) can be found in the default branch.

