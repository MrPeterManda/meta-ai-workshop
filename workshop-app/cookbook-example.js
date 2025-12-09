// Meta AI Cookbook Example - Text Summarization using Llama
const axios = require('axios');

module.exports = async function summarizeText(text) {
  try {
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: "meta-llama/llama-3-70b-instruct",
      messages: [{
        role: "user",
        content: `Summarize the following text concisely:\n\n${text}`
      }]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Summarization error:', error);
    throw error;
  }
};
