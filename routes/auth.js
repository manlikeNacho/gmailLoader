const express = require('express')
const { google } = require('googleapis');
const base64url = require('base64url');
const {isLoggedIn} = require('../middlewares/auth.js')
const {classifyEmails} = require('../utils/classifyMails.js');
const { logger } = require('../utils/logger.js');

const router = express.Router()

router.get('home', (req, res)=> {

    res.send('welcome')
})

const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_CLIENT_CALLBACK_URI
);

// Protected route to get emails
router.get('/mail', isLoggedIn, async (req, res) => {
  try {
      const accessToken = req.token;
      oAuth2Client.setCredentials({ access_token: accessToken });

      const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

      const response = await gmail.users.messages.list({
          userId: 'me',
          maxResults: 5,
      });

      const messages = response.data.messages;

      if (!messages || messages.length === 0) {
          return res.send([]);
      }

      const emailPromises = messages.map(async (message) => {
          const msg = await gmail.users.messages.get({
              userId: 'me',
              id: message.id,
          });

          const headers = msg.data.payload.headers;
          const subjectHeader = headers.find(header => header.name === 'Subject');
          const subject = subjectHeader ? subjectHeader.value : 'No Subject';

          const parts = msg.data.payload.parts;
          const bodyPart = parts ? parts.find(part => part.mimeType === 'text/plain') : null;
          const bodyData = bodyPart ? base64url.decode(bodyPart.body.data) : 'No Body';

          return {
              id: msg.data.id,
              threadId: msg.data.threadId,
              snippet: msg.data.snippet,
              subject: subject,
              body: bodyData,
          };
      });

      const emails = await Promise.all(emailPromises);

      res.send(emails);
  } catch (error) {
      logger.error(error)
      res.status(500).send(`Error fetching mails: ${error}`);
  }
});

// Protected route to classify emails
router.post('/mail', isLoggedIn, async (req, res) => {
  const emails = req.body;
  const openAiKey = req.headers['openai-api-key'];
  
  if (!emails || emails.length < 1 || !openAiKey) {
      return res.status(400).send('Invalid request: missing emails or OpenAI API key');
  }

  try {
      const emailTexts = emails.map(email => {
          const snippet = email.snippet;
          const subject = email.subject || 'No subject';
          return `Subject: ${subject}\nSnippet: ${snippet}`;
      });

      const classificationResults = await classifyEmails(emailTexts, openAiKey);
  

      const classifiedEmails = emails.map((email, index) => ({
          ...email,
          class: classificationResults[index],
      }));

      res.json(classifiedEmails);
  } catch (error) {
      console.log(error)
      logger.error(error)
      res.status(400).send(`${error}`);
  }
});



module.exports = router