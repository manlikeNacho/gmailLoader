const { OpenAI } = require('openai');


async function classifyEmails(emailTexts, openAiKey) {
    
  const openai = new OpenAI({
      apiKey:openAiKey
  })


try {
  const results = await Promise.all(emailTexts.map(async (emailText) => {
      const response = await openai.completions.create({
          model: 'gpt-3.5-turbo',
          prompt: `Classify the following email into "important, social, or spam": \n${emailText}\nClassification: `,
          max_tokens: 10,
      });

      const classification = response.data.choices[0].text.trim();
      return classification;
  }));

  return results;
} catch (error) {
  throw new Error(`Error classifying emails ${error.response ? error.response.data : error.message}`);
}
}

module.exports={classifyEmails}