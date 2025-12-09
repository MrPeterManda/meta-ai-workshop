# Meta AI Workshop: Building AI-Integrated Web Applications

## Workshop Philosophy

**Why This Matters:** In 2025, AI integration is no longer optional—it's a competitive necessity. Companies are rapidly shifting from proprietary, expensive AI solutions to free-tier open-source models like Meta's Llama. This workshop equips you with skills that make you immediately valuable to startups and enterprises.

**The Reality:** Without AI integration capabilities, you're competing at a disadvantage. After this two-day workshop, you won't be.

---

## Learning Outcomes

By the end of two days, you will be able to:

### Understand
- **How to integrate AI services into web applications** – From API calls to production deployment
- **Why companies are shifting to free-tier open-source AI (Llama)** – Cost efficiency, customisation, and control
- **Trade-offs between proprietary vs. open-source AI approaches** – When to use each and why

### Build
- **Real applications using free Llama APIs** – Not just toy examples
- **Deployed live projects** – Beyond localhost; ready for the real world
- **Professional code with proper security practices** – Environment variables, error handling, rate limiting

### Recognise
- **Why AI integration is now a core skill** – Industry demand is skyrocketing
- **How free-tier APIs make you relevant for startups and enterprises** – Sustainable development without enterprise budgets
- **Current industry approaches to sustainable AI development** – Cost-effective, scalable solutions

---

## Workshop Structure

### Day 1: Foundations & Core Implementation

#### Introduction to Meta AI and OpenRouter
- Overview of Meta's Llama models and their capabilities
- Understanding why open-source AI is transforming the industry
- Getting OpenRouter API keys and exploring documentation
- Cost comparison: Proprietary vs. open-source AI

#### Hands-on Setup & Testing
- Setting up the project (`npm install`)
- Configuring environment variables securely
- Testing the basic chat endpoint with Llama
- Exploring the Meta AI Cookbook examples
- Understanding streaming responses vs. standard responses

#### Building Your First AI Interface
- Understanding the frontend code and architecture
- How the chat interface communicates with the Llama API
- Customising the chat UI for different use cases
- Markdown rendering and response formatting
- Deploying locally and testing in the browser

---

### Day 2: Advanced Features & Real-World Projects

#### Extending Your Application with Meta Cookbook Recipes

This is where you build production-ready features. The Meta Cookbook provides battle-tested patterns for common AI use cases.

**Available Recipes to Implement:**

1. **Text Summarisation** (Already included)
   - Learn pattern: Information extraction
   - Use case: Document processing, content curation
   - Extension: Add batch processing, multi-document summaries

2. **Prompt Engineering & Structured Output** (Next Level)
   - Build JSON-formatted responses for structured data
   - Create classification pipelines
   - Implement fact-checking and verification

3. **Retrieval-Augmented Generation (RAG)** (Advanced)
   - Integrate local document processing
   - Build knowledge-base Q&A systems
   - Create domain-specific AI assistants

4. **Multi-turn Conversations with Memory** (Context Management)
   - Maintain conversation history effectively
   - Implement session management
   - Build conversational flows with state

5. **Content Generation Pipelines** (Production Pattern)
   - Generate blog posts, marketing copy, code
   - Implement quality checks and filtering
   - Build iterative refinement workflows

#### Real-World Implementation Patterns

**Project Ideas:**
- **Customer Support Bot** – Multi-turn conversations with knowledge base
- **Content Generator** – Blog posts, social media content, email campaigns
- **Code Assistant** – Debugging help, code review, refactoring suggestions
- **Research Assistant** – Paper summarisation, fact extraction, synthesis
- **Educational Tool** – Interactive tutoring, quiz generation, concept explanation

---

## Setup Instructions

### Prerequisites
- Node.js v18+ (`node -v` to check)
- npm (comes with Node.js)
- A text editor (VSCode recommended)
- An OpenRouter account

### Step 1: Get Your OpenRouter API Key

1. Visit https://openrouter.ai/keys
2. Sign up for a free account
3. Create a new API key
4. Copy the full key (starts with `sk-`)

### Step 2: Clone and Navigate

```bash
git clone <repo-url>
cd workshop-app
```

### Step 3: Install Dependencies

```bash
npm install
```

If you see errors:
- Ensure you're in the `workshop-app` directory
- Delete `node_modules` folder and retry: `rm -rf node_modules && npm install`
- Check Node.js version: `node -v` (should be v18+)

### Step 4: Configure Environment Variables

1. Create a `.env` file in the root directory
2. Add your credentials:

```env
OPENROUTER_API_KEY=sk-your-actual-key-here
PORT=3001
```

**Security Note:** Never commit `.env` to version control. Add it to `.gitignore`.

### Step 5: Start the Server

```bash
npm start
```

Visit `http://localhost:3001` in your browser. You should see:
- **Chat Tab** – Real-time conversation with Llama
- **Summarise Tab** – Text summarisation using Meta Cookbook recipes

---

## Current Implementation: What You Have

### Architecture Overview

```
frontend (index.html)
    ↓
express server (server.js)
    ↓
OpenRouter API
    ↓
Meta Llama-3-70b-instruct
```

### Key Features Implemented

| Feature | Purpose | File |
|---------|---------|------|
| **Chat Interface** | Real-time conversation with Llama | `index.html` |
| **Markdown Rendering** | Formatted responses (lists, code, bold) | `index.html` (Marked.js) |
| **API Integration** | Secure server-side API calls | `server.js` |
| **Text Summarisation** | Extract key information | `cookbook-example.js` |
| **Environment Config** | Secure credential management | `.env` |

---

## Extending the Project: Step-by-Step Walkthroughs

### Extension 1: Add a Code Explanation Feature

**Learning Goal:** Understand how to create specialised AI pipelines

**What You'll Build:** A tool that explains code snippets with detailed breakdowns

#### Step 1: Add a New Frontend Tab

In `index.html`, add after the Summarize tab:

```html
<li class="mr-2" role="presentation">
    <button class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300" 
            id="explain-tab" 
            data-tabs-target="#explain-content" 
            type="button" 
            role="tab" 
            aria-controls="explain-content" 
            aria-selected="false">Code Explainer</button>
</li>
```

#### Step 2: Add Tab Content

```html
<div class="hidden p-4 rounded-lg bg-white" id="explain-content" role="tabpanel" aria-labelledby="explain-tab">
    <textarea id="codeToExplain" rows="10" class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Paste your code here..."></textarea>
    <button onclick="explainCode()" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-4">Explain Code</button>
    <div id="explanationResult" class="mt-4 p-4 border border-gray-200 rounded-lg"></div>
</div>
```

#### Step 3: Create Backend Endpoint

Add to `server.js`:

```javascript
app.post('/api/explain-code', async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }

    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: "meta-llama/llama-3-70b-instruct",
      messages: [{
        role: "user",
        content: `Explain this code in detail, breaking down each section:\n\n\`\`\`\n${code}\n\`\`\`\n\nProvide:\n1. **Overview** - What does this code do?\n2. **Line-by-line breakdown** - Explain each significant part\n3. **Key concepts** - What programming patterns are used?\n4. **Potential improvements** - Any suggestions?`
      }]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.json({ explanation: response.data.choices[0].message.content });
  } catch (error) {
    console.error('Code explanation error:', error);
    res.status(500).json({ error: 'Failed to explain code' });
  }
});
```

#### Step 4: Add Frontend JavaScript Handler

In `index.html` script section:

```javascript
async function explainCode() {
    const code = document.getElementById('codeToExplain').value.trim();
    if (!code) return;

    const result = document.getElementById('explanationResult');
    result.innerHTML = '<p>Analysing code...</p>';

    try {
        const response = await fetch('/api/explain-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code })
        });

        const data = await response.json();
        result.innerHTML = `<div class="message-content">${marked.parse(data.explanation)}</div>`;
    } catch (error) {
        console.error('Error:', error);
        result.innerHTML = '<p class="text-red-500">Failed to explain code.</p>';
    }
}
```

---

### Extension 2: Build a Multi-turn Conversation with Context

**Learning Goal:** Implement stateful conversations like ChatGPT

**What You'll Build:** A conversation that remembers context across multiple turns

#### Key Changes to `server.js`:

The chat endpoint already supports this! The `messages` array maintains conversation history. The frontend sends all previous messages, and Llama responds with full context awareness.

**To enhance it, add conversation persistence:**

```javascript
const conversations = {}; // Store in-memory; use database for production

app.post('/api/chat-persistent', async (req, res) => {
  try {
    const { conversationId, userMessage } = req.body;
    
    // Initialise conversation if new
    if (!conversations[conversationId]) {
      conversations[conversationId] = [];
    }

    // Add user message
    conversations[conversationId].push({
      role: 'user',
      content: userMessage
    });

    // Keep only last 10 messages for context window
    const recentMessages = conversations[conversationId].slice(-10);

    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: "meta-llama/llama-3-70b-instruct",
      messages: recentMessages
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const assistantMessage = response.data.choices[0].message;
    conversations[conversationId].push(assistantMessage);

    res.json({
      conversationId,
      message: assistantMessage,
      history: conversations[conversationId]
    });
  } catch (error) {
    console.error('Conversation error:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
});
```

---

### Extension 3: Add Streaming Responses (Real-time Typing Effect)

**Learning Goal:** Implement streaming for better UX

**What You'll Build:** Live response streaming like ChatGPT

#### Key Concepts

Instead of waiting for the full response, stream tokens as they arrive:

```javascript
app.post('/api/chat-stream', async (req, res) => {
  try {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: "meta-llama/llama-3-70b-instruct",
      messages: req.body.messages,
      stream: true  // Enable streaming
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      responseType: 'stream'
    });

    response.data.on('data', (chunk) => {
      const lines = chunk.toString().split('\n');
      lines.forEach(line => {
        if (line.startsWith('data:')) {
          try {
            const data = JSON.parse(line.slice(5));
            if (data.choices[0].delta.content) {
              res.write(`data: ${data.choices[0].delta.content}\n\n`);
            }
          } catch (e) {}
        }
      });
    });

    response.data.on('end', () => res.end());
  } catch (error) {
    console.error('Stream error:', error);
    res.status(500).json({ error: 'Stream failed' });
  }
});
```

---

### Extension 4: Add Fact-Checking with Multiple AI Calls

**Learning Goal:** Combine multiple AI calls for validation

**What You'll Build:** A fact-checker that verifies claims using Llama

```javascript
app.post('/api/fact-check', async (req, res) => {
  try {
    const { claim } = req.body;

    // Step 1: Analyze the claim
    const analysisResponse = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: "meta-llama/llama-3-70b-instruct",
      messages: [{
        role: "user",
        content: `Analyse this claim for factual accuracy: "${claim}"\n\nProvide:\n1. Verification status (True/False/Unclear)\n2. Evidence or reasoning\n3. Confidence level (High/Medium/Low)`
      }]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    // Step 2: Generate counter-arguments
    const counterResponse = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: "meta-llama/llama-3-70b-instruct",
      messages: [{
        role: "user",
        content: `What are potential counter-arguments to: "${claim}"?`
      }]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.json({
      claim,
      analysis: analysisResponse.data.choices[0].message.content,
      counterarguments: counterResponse.data.choices[0].message.content
    });
  } catch (error) {
    console.error('Fact-check error:', error);
    res.status(500).json({ error: 'Fact-check failed' });
  }
});
```

---

### Extension 5: Build an AI-Powered Educational Assistant

**Learning Goal:** Create domain-specific AI tools

**What You'll Build:** An interactive tutor that generates exercises

```javascript
app.post('/api/tutor', async (req, res) => {
  try {
    const { topic, difficulty, studentLevel } = req.body;

    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: "meta-llama/llama-3-70b-instruct",
      messages: [{
        role: "user",
        content: `Create an interactive lesson on "${topic}" for a ${studentLevel} student.

Include:
1. **Key Concept** - Explain in simple terms
2. **Real-world Example** - Make it relatable
3. **Practice Question** - ${difficulty} difficulty
4. **Common Mistakes** - What should be avoided
5. **Next Steps** - What to learn next

Format with clear sections and bullet points.`
      }]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.json({
      lesson: response.data.choices[0].message.content
    });
  } catch (error) {
    console.error('Tutor error:', error);
    res.status(500).json({ error: 'Lesson generation failed' });
  }
});
```

---

## Deployment: From Localhost to Production

### Option 1: Deploy to Render (Recommended for Beginners)

1. Push your code to GitHub
2. Visit https://render.com
3. Connect your GitHub repository
4. Select "Node" environment
5. Set environment variables:
   - `OPENROUTER_API_KEY=sk-...`
   - `PORT=3001`
6. Deploy with one click

### Option 2: Deploy to Railway

1. Visit https://railway.app
2. Connect GitHub repository
3. Auto-detects Node.js project
4. Add environment variables
5. Your app is live immediately

### Important Security Considerations

- Never commit `.env` to GitHub
- Use `PORT` from environment: `process.env.PORT || 3001`
- Implement rate limiting in production
- Log API usage for cost tracking
- Rotate API keys regularly

---

## Troubleshooting Guide

### API Key Issues
- **401 Unauthorized:** Verify your key in `.env` starts with `sk-`
- **No response:** Check key isn't expired; test in OpenRouter dashboard
- **Rate limited:** You've exceeded your free tier; upgrade plan

### Dependency Problems
- **Module not found:** Run `npm install` again
- **Port already in use:** Change `PORT` in `.env` to 3002, 3003, etc.
- **Server won't start:** Check `.env` syntax and file location

### Response Formatting Issues
- **Plain text instead of markdown:** Verify Marked.js CDN is loaded (check browser console)
- **Code blocks not styled:** Clear browser cache (Ctrl+Shift+Delete)

---

## Industry Context: Why This Matters

### The Shift from Proprietary to Open-Source

| Aspect | Proprietary (ChatGPT) | Open-Source (Llama) |
|--------|----------------------|-------------------|
| **Cost** | $20/month or pay-per-use | Free via OpenRouter |
| **Control** | Limited customisation | Full model ownership |
| **Privacy** | Data goes to third party | Runs locally/on your server |
| **Speed** | Variable API latency | Direct integration |
| **Sustainability** | Vendor lock-in risk | Long-term independence |

### Real-World Use Cases

**Startups:**
- Customer support bots (60% cost reduction)
- Automated content generation
- Real-time code reviews

**Enterprises:**
- Internal knowledge assistants
- Document processing pipelines
- Compliance checking automation

**Education:**
- Personalised tutoring systems
- Automated grading
- Student engagement tools

---

## Resources

### Official Documentation
- [OpenRouter API Docs](https://openrouter.ai/docs)
- [Meta Llama Documentation](https://www.llama.com/docs/)
- [Meta AI Cookbook](https://www.llama.com/resources/cookbook/)

### Further Learning
- **Prompt Engineering:** https://www.prompt-engineering.info/
- **RAG Systems:** Search "Vector Databases for AI"
- **Deployment:** Render, Railway, Vercel documentation

### Community Support
- OpenRouter Discord: Join via their website
- Meta AI Community: Active on GitHub Discussions

---

## Next Steps After the Workshop

1. **Week 1:** Extend the basic chat with one custom feature (pick from Extension 1-5)
2. **Week 2:** Deploy your enhanced app to production
3. **Week 3:** Build a small but complete project (support bot, tutor, content generator)
4. **Week 4+:** Contribute to open-source AI projects; explore advanced topics

---

## Assessment Criteria

By the end of Day 2, you should be able to:

✅ **Understand:** Explain why companies adopt open-source AI and the trade-offs involved
✅ **Build:** Implement a working AI feature beyond the base project
✅ **Deploy:** Get your project live on the internet
✅ **Recognise:** Identify real-world applications in your own field

---

## Final Note

**You now have a rare skillset.** AI integration capabilities differentiate senior developers from the rest. Don't just complete this workshop—use it as your foundation. Build something. Share it. Iterate. The AI era has started, and you're equipped to lead.

**Questions?** Reach out to the facilitator or check troubleshooting. You've got this.

---

*Workshop Last Updated: December 2025*
*Built with Meta's Llama via OpenRouter*