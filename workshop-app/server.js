require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// OpenRouter API endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: "meta-llama/llama-3-70b-instruct",
      messages: req.body.messages
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('OpenRouter error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

const summarizeText = require('./cookbook-example');

// Meta AI Cookbook example endpoint
app.post('/api/cookbook-example', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
    
    const summary = await summarizeText(text);
    res.json({ 
      original_text: text,
      summary: summary
    });
  } catch (error) {
    console.error('Cookbook example error:', error);
    res.status(500).json({ error: 'Failed to process text' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});