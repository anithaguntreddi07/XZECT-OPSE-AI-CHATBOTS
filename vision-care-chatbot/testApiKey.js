const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.CHATGPT_API_KEY,
});

async function testApiKey() {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Use gpt-3.5-turbo for testing
      messages: [
        { role: 'user', content: 'Hello!' },
      ],
    });
    console.log('API Key is working. Response:', response.choices[0].message.content);
  } catch (error) {
    console.error('Error:', error);
  }
}

testApiKey();
