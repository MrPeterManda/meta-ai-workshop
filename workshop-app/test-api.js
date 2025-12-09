const axios = require('axios');
require('dotenv').config();

async function testOpenRouterAPI() {
  try {
    console.log('Testing OpenRouter API...');
    
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: "meta-llama/llama-3-70b-instruct",
      messages: [
        { role: "user", content: "Hello! Who are you?" }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('API Response:', response.data.choices[0].message.content);
    console.log('OpenRouter API test successful!');
  } catch (error) {
    console.error('API Test Error:', error.response?.data || error.message);
    console.log('Make sure you have set your OPENROUTER_API_KEY in .env file');
  }
}

async function testSummarization() {
  try {
    console.log('Testing Meta AI Cookbook summarization...');
    
    const summarizeText = require('./cookbook-example');
    const text = """Meta AI is developing advanced artificial intelligence technologies. """ +
      """Our research spans multiple areas including natural language processing, """ +
      """computer vision, and reinforcement learning. We aim to build AI systems """ +
      """that can understand, learn, and interact with humans in natural ways.""";
    
    const summary = await summarizeText(text);
    console.log('Original Text:', text);
    console.log('Summary:', summary);
    console.log('Summarization test successful!');
  } catch (error) {
    console.error('Summarization Test Error:', error);
  }
}

// Run tests
(async () => {
  await testOpenRouterAPI();
  await testSummarization();
})();