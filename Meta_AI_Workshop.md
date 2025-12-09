# Meta AI Cookbook Workshop Guide
## Building Web Applications with Meta AI and Free API Platforms

**Version 1.0** | Created for Software Engineering Students  
**Facilitator Notes & Step-by-Step Instructions**

---

## Table of Contents

1. [Workshop Overview](#workshop-overview)
2. [Learning Objectives](#learning-objectives)
3. [Prerequisites](#prerequisites)
4. [Part 1: Understanding Meta AI Cookbook](#part-1-understanding-meta-ai-cookbook)
5. [Part 2: Setting Up Free API Access](#part-2-setting-up-free-api-access)
6. [Part 3: Building Your First Web App](#part-3-building-your-first-web-app)
7. [Part 4: Advanced Features & Deployment](#part-4-advanced-features--deployment)
8. [Sample Project: Multilingual Code Explanation App](#sample-project-multilingual-code-explanation-app)
9. [Troubleshooting & FAQ](#troubleshooting--faq)
10. [Resources & Further Learning](#resources--further-learning)

---

## Workshop Overview

This workshop equips students with practical skills to build AI-powered web applications using Meta's Llama models through free platforms. Rather than managing complex API keys and billing systems, students will learn to leverage accessible platforms like OpenRouter, Puter.js, and local deployment options.

### What Students Will Build

- A functional web application that integrates Meta AI (Llama models)
- Interactive UI with real-time AI responses
- Integration with free API platforms
- Deployment-ready code

### Duration

- **Full Workshop**: 6-8 hours (can be split across 2-3 sessions)
- **Flexible Modules**: Each section can be delivered independently

### Target Audience

- Second-year+ Software Engineering students
- Students familiar with HTML, CSS, JavaScript
- Prior API knowledge helpful but not essential

---

## Learning Objectives

By the end of this workshop, students should be able to:

1. **Understand** Meta AI Cookbook resources and available Llama models
2. **Configure** free API access through OpenRouter and Puter.js
3. **Build** full-stack web applications integrating Meta AI
4. **Implement** error handling, input validation, and user feedback
5. **Deploy** applications to free hosting platforms
6. **Troubleshoot** common integration issues
7. **Extend** basic applications with advanced features

---

## Prerequisites

### Technical Knowledge

- Basic HTML, CSS, JavaScript proficiency
- Understanding of HTTP requests and APIs
- Familiarity with terminal/command line
- Node.js basics (optional but helpful)

### Required Software

- Modern web browser (Chrome, Firefox, Edge, Safari)
- Code editor (VS Code recommended)
- Terminal/Command Prompt
- Git (for version control)

### Accounts to Create (Free)

- GitHub account
- OpenRouter account (optional but recommended)
- Hugging Face account (for model access)

---

## Part 1: Understanding Meta AI Cookbook

### What is Meta AI Cookbook?

The Meta AI Cookbook is a collection of recipes, tutorials, and code examples demonstrating how to integrate Meta's open-source language models (primarily Llama) into applications. It provides:

- Step-by-step guides for different use cases
- Code examples in multiple languages (Python, JavaScript, etc.)
- Best practices for model integration
- Performance optimisation tips
- Integration patterns with popular frameworks

### Key Resources

**Official Meta AI Cookbook GitHub**
```
https://github.com/meta-llama/llama-recipes
```

**Llama Models Available**

| Model | Parameters | Best For | Performance |
|-------|-----------|----------|-------------|
| **Llama 3.1 8B** | 8 Billion | Quick responses, low latency | Fast, lightweight |
| **Llama 3.1 70B** | 70 Billion | Complex reasoning, detailed responses | More accurate, slower |
| **Llama 2 7B** | 7 Billion | General purpose, cost-effective | Fastest, good quality |
| **Code Llama** | Various | Code generation & explanation | Specialised for coding |

### Why Free Platforms?

For educational purposes and small-scale projects, free platforms offer:

- **No credit card required** for basic usage
- **Daily free tier allocations** (100+ requests)
- **Multiple model access** through single interface
- **Learning-friendly** with generous limits
- **Production-viable** for small deployments

---

## Part 2: Setting Up Free API Access

### Option 1: Using OpenRouter (Recommended for Beginners)

OpenRouter provides unified access to 350+ AI models including Meta's Llama series, requiring only a single API key.

#### Step-by-Step Setup

**1. Create OpenRouter Account**

- Navigate to https://openrouter.ai
- Click **"Sign Up"** or **"Sign In with Google/GitHub"**
- Complete email verification if required
- Accept terms of service

**2. Generate API Key**

```
Dashboard → API Keys → Create New Key
```

Name it something descriptive: `workshop-llama-dev`

**Keep this key secure—treat it like a password**

**3. Test Your Key**

Use the interactive playground at: `https://openrouter.ai/playground`

Select **Meta Llama 3.1 8B Instruct** from model dropdown and test with a prompt:

```
"Explain what an API is in simple terms"
```

If successful, you're ready to integrate.

#### Free Tier Details

- **Daily limit**: 100-500 requests (varies by model)
- **Models available**: 350+ including all Llama versions
- **No credit card**: Truly free tier exists
- **Fair usage**: Reasonable limits for learning

---

### Option 2: Using Puter.js (No Setup Required)

Puter.js is the simplest option—requires NO API key and works entirely in-browser.

#### How It Works

Puter.js implements a **user-pays model** where clients pay for their own usage through OpenRouter. No server setup needed.

#### Integration in 3 Lines

```html
<script src="https://js.puter.com/v2/"></script>
<script>
  puter.ai.chat("Your prompt here", 
    {model: 'openrouter:meta-llama/llama-3.1-8b-instruct'})
    .then(response => console.log(response));
</script>
```

#### Advantages

- ✅ Works in any HTML file
- ✅ No backend required
- ✅ No API key management
- ✅ Perfect for prototyping
- ✅ User covers their own costs (transparent pricing)

#### Disadvantages

- ❌ Limited control over requests
- ❌ No usage analytics
- ❌ Best for simple integrations only

---

### Option 3: Using Grok API (Alternative)

For students wanting to explore alternative models:

```
1. Create account at x.com/grok
2. Request API access
3. Use endpoint: https://api.x.ai/openrouter
4. Model ID: x-ai/grok-4
```

**Note**: Grok is new and may have different rate limits.

---

### Option 4: Local Development (Ollama)

For offline development without any API calls:

#### Installation

**macOS/Linux:**
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

**Windows:**
Download installer from https://ollama.ai

#### Running Llama Locally

```bash
# Download and run Llama 2
ollama run llama2

# Or Llama 3.1
ollama run llama3.1

# Access at http://localhost:11434
```

**Advantages**: No API limits, runs offline, good for testing

**Disadvantages**: Requires significant CPU/GPU, slower for large models

---

## Part 3: Building Your First Web App

### Project 1: Simple AI Chatbot

#### Project Structure

```
ai-chatbot/
├── index.html
├── styles.css
├── script.js
└── .env (local only, never commit)
```

#### Step 1: Create HTML Structure

**File: `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meta AI Chatbot</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>🤖 Meta AI Chatbot</h1>
            <p>Powered by Llama 3.1</p>
        </header>

        <main class="chat-container">
            <div id="messages" class="messages"></div>
        </main>

        <footer class="input-section">
            <form id="chatForm">
                <input 
                    type="text" 
                    id="userInput" 
                    placeholder="Ask me anything..."
                    autocomplete="off"
                    required
                >
                <button type="submit" id="sendBtn">Send</button>
            </form>
            <p class="disclaimer">Powered by OpenRouter & Meta Llama</p>
        </footer>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

#### Step 2: Style with CSS

**File: `styles.css`**

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 10px;
}

.container {
    width: 100%;
    max-width: 800px;
    height: 90vh;
    background: white;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    overflow: hidden;
}

header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 20px;
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

header h1 {
    font-size: 24px;
    margin-bottom: 5px;
}

header p {
    font-size: 14px;
    opacity: 0.9;
}

.chat-container {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.message {
    display: flex;
    margin-bottom: 10px;
    animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.message.user {
    justify-content: flex-end;
}

.message.ai {
    justify-content: flex-start;
}

.message-content {
    max-width: 70%;
    padding: 12px 15px;
    border-radius: 8px;
    word-wrap: break-word;
    line-height: 1.4;
}

.user .message-content {
    background: #667eea;
    color: white;
    border-bottom-right-radius: 2px;
}

.ai .message-content {
    background: #f0f0f0;
    color: #333;
    border-bottom-left-radius: 2px;
}

.ai .message-content a {
    color: #667eea;
    text-decoration: none;
}

.ai .message-content a:hover {
    text-decoration: underline;
}

.loading {
    display: flex;
    gap: 5px;
    padding: 12px 15px;
    background: #f0f0f0;
    border-radius: 8px;
    width: fit-content;
}

.loading span {
    width: 8px;
    height: 8px;
    background: #667eea;
    border-radius: 50%;
    animation: bounce 1.4s infinite;
}

.loading span:nth-child(2) {
    animation-delay: 0.2s;
}

.loading span:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes bounce {
    0%, 80%, 100% {
        opacity: 0.5;
        transform: translateY(0);
    }
    40% {
        opacity: 1;
        transform: translateY(-10px);
    }
}

.input-section {
    border-top: 1px solid #e0e0e0;
    padding: 15px;
    background: #fafafa;
}

#chatForm {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
}

#userInput {
    flex: 1;
    padding: 12px;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    font-size: 14px;
    font-family: inherit;
    transition: border-color 0.2s;
}

#userInput:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

#sendBtn {
    padding: 12px 25px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.2s;
}

#sendBtn:hover {
    background: #5568d3;
}

#sendBtn:active {
    transform: scale(0.98);
}

#sendBtn:disabled {
    background: #ccc;
    cursor: not-allowed;
}

.disclaimer {
    font-size: 12px;
    color: #999;
    text-align: center;
}

/* Responsive */
@media (max-width: 640px) {
    .message-content {
        max-width: 85%;
    }
    
    header h1 {
        font-size: 20px;
    }
}
```

#### Step 3: Add Interactivity with JavaScript

**File: `script.js`**

```javascript
// Configuration
const API_KEY = 'your-openrouter-api-key-here'; // Replace with your key
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'meta-llama/llama-3.1-8b-instruct';

// DOM Elements
const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const messagesContainer = document.getElementById('messages');

// State
let isLoading = false;

// Event Listeners
chatForm.addEventListener('submit', handleSendMessage);

async function handleSendMessage(e) {
    e.preventDefault();

    const message = userInput.value.trim();
    if (!message) return;

    // Disable input while loading
    isLoading = true;
    sendBtn.disabled = true;
    userInput.disabled = true;

    // Display user message
    addMessage(message, 'user');
    userInput.value = '';

    // Show loading indicator
    showLoadingIndicator();

    try {
        // Call OpenRouter API
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
                'HTTP-Referer': window.location.href,
                'X-Title': 'Meta AI Workshop'
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [
                    {
                        role: 'user',
                        content: message
                    }
                ],
                temperature: 0.7,
                max_tokens: 1000
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || `HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        const aiResponse = data.choices[0].message.content;

        // Remove loading indicator and show AI response
        removeLoadingIndicator();
        addMessage(aiResponse, 'ai');

    } catch (error) {
        console.error('Error:', error);
        removeLoadingIndicator();
        addMessage(`Error: ${error.message}. Please check your API key and try again.`, 'error');
    } finally {
        // Re-enable input
        isLoading = false;
        sendBtn.disabled = false;
        userInput.disabled = false;
        userInput.focus();
    }
}

function addMessage(content, role) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = content;

    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);

    // Auto-scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showLoadingIndicator() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ai';
    messageDiv.id = 'loading-indicator';

    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<span></span><span></span><span></span>';

    messageDiv.appendChild(loading);
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function removeLoadingIndicator() {
    const indicator = document.getElementById('loading-indicator');
    if (indicator) {
        indicator.remove();
    }
}

// Initial message
window.addEventListener('load', () => {
    addMessage('Hello! I\'m powered by Meta\'s Llama 3.1. Ask me anything!', 'ai');
});
```

#### Step 4: Get Your API Key and Configure

1. Go to OpenRouter: https://openrouter.ai
2. Sign up and get your API key
3. Replace `your-openrouter-api-key-here` in `script.js`
4. Open `index.html` in your browser

**Security Note**: Never commit your API key to Git. For production, use environment variables.

---

## Part 4: Advanced Features & Deployment

### Feature 1: Conversation History

Extend your chatbot to maintain context across messages:

```javascript
let conversationHistory = [];

async function handleSendMessage(e) {
    // ... existing code ...

    // Add message to history
    conversationHistory.push({
        role: 'user',
        content: message
    });

    try {
        const response = await fetch(API_URL, {
            // ... existing config ...
            body: JSON.stringify({
                model: MODEL,
                messages: conversationHistory, // Use history instead of single message
                temperature: 0.7,
                max_tokens: 1000
            })
        });

        // ... existing code ...

        const aiResponse = data.choices[0].message.content;
        conversationHistory.push({
            role: 'assistant',
            content: aiResponse
        });

        // ... rest of code ...
    }
}

// Function to clear history
function clearHistory() {
    conversationHistory = [];
    messagesContainer.innerHTML = '';
    addMessage('Conversation cleared. Start fresh!', 'ai');
}
```

### Feature 2: System Prompts & Role Definition

Give your AI a personality:

```javascript
const SYSTEM_PROMPT = `You are a helpful coding tutor. Your role is to:
1. Explain programming concepts clearly
2. Provide code examples
3. Answer debugging questions
4. Suggest best practices

Keep responses concise and beginner-friendly.`;

async function handleSendMessage(e) {
    // ... existing code ...

    try {
        const response = await fetch(API_URL, {
            // ... existing config ...
            body: JSON.stringify({
                model: MODEL,
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    ...conversationHistory
                ],
                temperature: 0.7,
                max_tokens: 1000
            })
        });
        // ... rest of code ...
    }
}
```

### Feature 3: Multiple Models

Allow users to switch between Llama versions:

```javascript
const MODELS = {
    'Fast (8B)': 'meta-llama/llama-3.1-8b-instruct',
    'Detailed (70B)': 'meta-llama/llama-3.1-70b-instruct',
    'Coding': 'meta-llama/codellama-34b-instruct'
};

// Add model selector to HTML
let selectedModel = MODELS['Fast (8B)'];

// When user changes model:
function setModel(modelKey) {
    selectedModel = MODELS[modelKey];
    addMessage(`Switched to ${modelKey} model.`, 'ai');
}
```

### Deployment Options

#### Option 1: Netlify (Recommended for Beginners)

**Steps:**

1. Create a GitHub repository
2. Push your project files
3. Connect to Netlify: https://netlify.com
4. Set environment variable for API key in Netlify dashboard
5. Deploy with one click

**Advantages**: Free, automatic HTTPS, easy deployments

#### Option 2: GitHub Pages

Works for static sites (HTML/CSS/JS only):

```bash
# In your repository settings:
# 1. Enable GitHub Pages
# 2. Select 'main' branch as source
# 3. Your site will be live at: username.github.io/repo-name
```

#### Option 3: Vercel

Similar to Netlify, optimised for full-stack apps:

```bash
npm install -g vercel
vercel login
vercel
```

---

## Sample Project: Multilingual Code Explanation App

### Complete Implementation

#### Project Goals

- Input: Code snippet + language preference
- Output: Explanation in chosen language
- Features: Multiple models, syntax highlighting, export results

#### File Structure

```
code-explainer/
├── index.html
├── styles.css
├── script.js
├── .env
└── README.md
```

#### HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Explanation Assistant</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
</head>
<body>
    <div class="container">
        <header>
            <h1>📝 Code Explanation Assistant</h1>
            <p>Powered by Meta Llama 3.1 via OpenRouter</p>
        </header>

        <main>
            <div class="controls">
                <div class="control-group">
                    <label for="language">Language:</label>
                    <select id="language">
                        <option value="English">English</option>
                        <option value="Spanish">Spanish (Español)</option>
                        <option value="French">French (Français)</option>
                        <option value="German">German (Deutsch)</option>
                        <option value="Chinese">Chinese (中文)</option>
                    </select>
                </div>

                <div class="control-group">
                    <label for="model">Model:</label>
                    <select id="model">
                        <option value="llama-3.1-8b">Fast (8B)</option>
                        <option value="llama-3.1-70b">Detailed (70B)</option>
                    </select>
                </div>

                <button id="explainBtn" class="btn-primary">Explain Code</button>
            </div>

            <div class="content-area">
                <div class="input-section">
                    <h3>Input Code</h3>
                    <textarea 
                        id="codeInput" 
                        placeholder="Paste your code here..."
                        spellcheck="false"
                    ></textarea>
                </div>

                <div class="output-section">
                    <h3>Explanation</h3>
                    <div id="explanation" class="explanation-content">
                        <p class="placeholder">Your explanation will appear here...</p>
                    </div>
                    <button id="copyBtn" class="btn-secondary" style="display:none;">Copy Explanation</button>
                </div>
            </div>
        </main>

        <footer>
            <p>Educational Tool | Free to Use | No Credit Card Required</p>
        </footer>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

#### JavaScript Implementation

```javascript
const API_KEY = 'your-openrouter-key';
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

const codeInput = document.getElementById('codeInput');
const languageSelect = document.getElementById('language');
const modelSelect = document.getElementById('model');
const explainBtn = document.getElementById('explainBtn');
const explanationDiv = document.getElementById('explanation');
const copyBtn = document.getElementById('copyBtn');

const modelMap = {
    'llama-3.1-8b': 'meta-llama/llama-3.1-8b-instruct',
    'llama-3.1-70b': 'meta-llama/llama-3.1-70b-instruct'
};

explainBtn.addEventListener('click', explainCode);
copyBtn.addEventListener('click', copyExplanation);

async function explainCode() {
    const code = codeInput.value.trim();
    const language = languageSelect.value;
    const model = modelSelect.value;

    if (!code) {
        alert('Please paste some code to explain.');
        return;
    }

    explainBtn.disabled = true;
    copyBtn.style.display = 'none';
    explanationDiv.innerHTML = '<div class="loading"><span></span><span></span><span></span></div>';

    const prompt = `Explain the following code in ${language}. Be clear and beginner-friendly:\n\n\`\`\`\n${code}\n\`\`\``;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
                'HTTP-Referer': window.location.href
            },
            body: JSON.stringify({
                model: modelMap[model],
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.7,
                max_tokens: 1500
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        const explanation = data.choices[0].message.content;

        explanationDiv.innerHTML = `<div class="explanation-text">${markdownToHtml(explanation)}</div>`;
        copyBtn.style.display = 'inline-block';

    } catch (error) {
        explanationDiv.innerHTML = `<div class="error">Error: ${error.message}</div>`;
    } finally {
        explainBtn.disabled = false;
    }
}

function markdownToHtml(text) {
    return text
        .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
        .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code>$1</code>')
        .replace(/\n/g, '<br>');
}

function copyExplanation() {
    const text = explanationDiv.innerText;
    navigator.clipboard.writeText(text).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    });
}
```

---

## Part 5: Troubleshooting & FAQ

### Common Issues

**Q: "Invalid API Key" Error**
- A: Check your key is correctly copied from OpenRouter
- Ensure no extra spaces
- Verify key hasn't expired
- Create a new key if uncertain

**Q: Requests Too Slow**
- A: Use the 8B model for faster responses
- Check your internet connection
- OpenRouter may be throttling; try again in minutes

**Q: CORS Error When Calling API**
- A: Don't call the API directly from client-side code with your key exposed
- Solution: Use a backend (Node.js/Python) to proxy API calls, or use Puter.js
- Never expose API keys in client-side JavaScript

**Q: Model Returns Repetitive Text**
- A: Lower the temperature (0.5 instead of 0.7)
- Reduce max_tokens
- Rephrase your prompt more specifically

**Q: 429 Rate Limit Error**
- A: You've exceeded free tier daily limit
- Wait 24 hours or upgrade account
- Optimise requests to stay within quota

### Best Practices for Students

1. **Never commit API keys** to Git—use environment variables
2. **Test with 8B model first** to save quota
3. **Add error handling** in all API calls
4. **Use try-catch blocks** for robustness
5. **Log requests** during development for debugging
6. **Request user feedback** before calling API
7. **Cache responses** to avoid duplicate calls

---

## Resources & Further Learning

### Official Documentation

| Resource | Link | Purpose |
|----------|------|---------|
| Llama Docs | https://www.llama.com | Official model documentation |
| Meta AI Cookbook | https://github.com/meta-llama/llama-recipes | Code examples & recipes |
| OpenRouter Docs | https://openrouter.ai/docs | API reference & guides |
| Puter.js Docs | https://docs.puter.com | Frontend AI integration |

### Recommended Tutorials

- **Llama 3.3 Step-by-Step Tutorial**: https://www.datacamp.com/tutorial/llama-3-3-tutorial
- **OpenRouter Complete Guide**: https://www.datacamp.com/tutorial/openrouter
- **AI SDK Llama Guide**: https://ai-sdk.dev/cookbook/guides/llama-3_1

### Community & Support

- **GitHub Issues**: Report bugs on official repositories
- **Discord Communities**: Join Meta AI and OpenRouter communities
- **Stack Overflow**: Tag questions with `llama`, `openrouter`, `meta-ai`

### Advanced Topics to Explore

1. **Retrieval-Augmented Generation (RAG)**: Make AI reference external documents
2. **Fine-tuning**: Customise models for specific domains
3. **Multi-turn Conversations**: Maintain context across messages
4. **Streaming Responses**: Real-time text generation
5. **Voice Input/Output**: Add speech to your applications
6. **Mobile Deployment**: Build iOS/Android apps

---

## Assessment & Deliverables

### Workshop Completion Checklist

Students should demonstrate:

- [ ] Account created on OpenRouter (or alternative platform)
- [ ] API key successfully generated
- [ ] First chatbot working locally
- [ ] Able to explain at least 3 API response fields
- [ ] Added at least one custom feature (system prompt, model switching, etc.)
- [ ] Deployed application to live URL
- [ ] Written brief documentation (README.md)
- [ ] Code commented and explained

### Evaluation Criteria

| Criterion | Points | Evidence |
|-----------|--------|----------|
| API Integration | 25% | Working API calls, error handling |
| User Interface | 20% | Responsive design, intuitive layout |
| Functionality | 25% | Features work as intended |
| Code Quality | 15% | Clean code, comments, no hardcoded keys |
| Deployment | 15% | Live application accessible online |

---

## Conclusion

This workshop has equipped students with:

✅ Understanding of Meta AI Cookbook and available resources  
✅ Practical experience with free API platforms  
✅ Full-stack web development with AI integration  
✅ Deployment and best practices knowledge  
✅ Problem-solving and debugging skills  

### Next Steps for Students

1. **Build independently**: Create your own AI-powered project
2. **Explore advanced features**: RAG, fine-tuning, voice integration
3. **Contribute to community**: Share your projects on GitHub
4. **Join communities**: Engage with other developers
5. **Follow industry trends**: Stay updated on new Llama releases

---

## Appendix: Quick Command Reference

### Project Setup

```bash
# Create project folder
mkdir my-ai-app
cd my-ai-app

# Initialise Git (optional but recommended)
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git remote add origin https://github.com/your-username/my-ai-app.git
git push -u origin main
```

### Environment Variables (Production)

**Create `.env.local` file (never commit this)**

```
VITE_OPENROUTER_API_KEY=sk-or-your-key-here
VITE_API_URL=https://openrouter.ai/api/v1/chat/completions
```

**Load in JavaScript (using vite)**

```javascript
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
```

### Testing API Connection

```bash
# Using cURL (replace YOUR_KEY)
curl -X POST https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "meta-llama/llama-3.1-8b-instruct",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

---

**Document Version**: 1.0  
**Last Updated**: December 2024  
**Suitable for**: Software Engineering Students (Year 2+)  
**Facilitator**: [Your Name]  

For updates and additional resources, visit the workshop repository or contact your facilitator.

---

*This workshop guide is designed to be flexible. Mix and match sections based on your student cohort's experience level and available time.*