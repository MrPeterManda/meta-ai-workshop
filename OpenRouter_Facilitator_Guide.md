# Meta AI OpenRouter Workshop
## Facilitator's Step-by-Step Delivery Guide

**Duration**: 4-6 hours (single day) | **Setup**: 30 minutes before workshop  
**Platform**: OpenRouter only | **Target**: Software Engineering students (Year 2+)

---

## Quick Start Checklist (Before Workshop)

**1 Week Before**:
- [ ] Read this guide completely
- [ ] Build the sample chatbot yourself (hit real errors)
- [ ] Create test OpenRouter account
- [ ] Prepare 3 backup API keys for students to use
- [ ] Test live deployment on Netlify
- [ ] Download Student Workbook and print copies

**Day Before**:
- [ ] Test all code examples one final time
- [ ] Prepare demo environment ready to show
- [ ] Create GitHub demo repo
- [ ] Have internet backup plan ready
- [ ] Prepare slides (optional—guide below)

**Day Of** (30 mins before):
- [ ] Test projector/screen sharing setup
- [ ] Have API keys written on board or printed
- [ ] Students laptops all have: VS Code, browser, Git
- [ ] Test OpenRouter works in your demo
- [ ] Have Student Workbook ready to distribute

---

## Workshop Timeline (4-Hour Single Day)

```
09:00-09:15  Welcome & Overview (15 min)
             Explain what they'll build
             
09:15-09:45  OpenRouter Setup (30 min)
             Students create accounts & API keys
             ACTIVITY: Everyone gets working key
             
09:45-10:30  First Chatbot Build (45 min)
             Code along together
             Students follow step-by-step
             ACTIVITY: First working app
             
10:30-10:45  BREAK
             
10:45-11:45  Features & Enhancement (60 min)
             Add conversation history
             System prompts
             Model selection
             
11:45-12:00  Deployment Demo (15 min)
             Show live deployment to Netlify
             
12:00-12:15  Project Brief & Wrap-Up (15 min)
             Explain tomorrow's independent projects
             Q&A
             
TOTAL: 4 hours in-person
```

---

## Section 1: Welcome & Overview (15 minutes)

### What You're Doing

**Objective**: Build excitement and set clear expectations

### Talking Points (Say These)

> "Today, you're learning to build AI-powered web applications. Not just using ChatGPT—actually building applications that **you control**, using **free tools**, that you can **deploy and share**."

> "In just 4 hours, you'll have a working app. Tomorrow, you'll build your own project using exactly these same techniques."

> "There will be errors. That's not a failure—that's debugging, and that's 80% of real development."

### Show Them What They'll Build

**Have these open in browser tabs**:

1. **Working Chatbot Example**
   - Show screenshot or live demo
   - "By 11:00, yours will look like this"

2. **Deployed App URL**
   - "This is hosted online. You'll deploy yours to Netlify today."

### Three Key Points

Write these on board or in shared doc:

```
1. OpenRouter = Single API for Llama models
2. Free Tier = 100+ requests daily
3. Same API pattern = Use everywhere
```

### Interactive: Gauge Experience

Ask these questions (no wrong answers):
- "Who's built a web app before?" (see hands)
- "Who's used an API before?" (see hands)
- "Who's used ChatGPT?" (see hands)
- "Anyone nervous?" (normalize it)

**Response**: "Everyone here can do this. Let's go."

---

## Section 2: OpenRouter Setup (30 minutes)

### Your Role

**You demonstrate each step. Students follow on their laptops simultaneously.**

### Step-by-Step Script

#### Step 1: Navigate to OpenRouter

**Say**: "Everyone open a new browser tab and go to: openrouter.ai"

**Wait** for everyone (count to 20 slowly in your head)

**Check**: "Does everyone see the OpenRouter homepage?"

**Show on projector**: Home page with "Sign Up" button visible

#### Step 2: Create Account

**Say**: "Click the Sign Up button"

**Explain**: "You can use Google, GitHub, or email. Use whichever is fastest for you."

**Wait** for everyone to start signing up

**Say**: "If you get stuck on verification, keep going—we'll help you after"

**Monitor**: Circulate and help anyone with email verification issues

**Check**: "Everyone created an account?"

#### Step 3: Find API Keys

**Say**: "Once logged in, look at the top-right. You'll see your profile."

**Show on projector**: Navigate to settings

**Say**: "Click Settings → API Keys"

**Wait** for everyone to reach this screen

**Show on projector**: The API Keys page with the "Create New Key" button

#### Step 4: Create API Key

**Say**: "Click 'Create New Key' button"

**Explain**: "Name it something like 'workshop-demo'"

**Say**: "The key will appear—**do NOT share this**. Treat it like a password."

**Show on projector**: Copy the full key (blur or hide the actual key)

**Say**: "Copy your key and paste it somewhere safe—a text file for now"

**Wait** for everyone

**Check**: "Everyone has their API key copied?"

#### Step 5: Test the Key

**Say**: "Let's test that your key works. Go to the Playground: openrouter.ai/playground"

**Wait** for everyone

**Show on projector**: The playground interface

**Say**: "You'll see a model dropdown on the left. Select 'Meta Llama 3.1 8B Instruct'"

**Wait**

**Say**: "Now in the chat box, type: 'Hello, say hi back'"

**Say**: "Click Send"

**Wait** for responses to appear

**Celebration**: "If you see a response, your key works! 🎉"

**Troubleshooting**:
- "401 error?" → Key not copied correctly
- "No response?" → Try again or we'll help individually

**Check**: "Everyone has at least one response working?"

---

## Section 3: Build First Chatbot (45 minutes)

### Your Setup Before This Section

Have ready on your laptop:
- Empty HTML file open in VS Code
- Browser tab open to your working chatbot
- GitHub repo ready to share

### Teaching Approach

**Code-along style**:
1. You type on projector (slowly and clearly)
2. Students type at same time on their laptops
3. Pause after each section
4. Get confirmation everyone's caught up

### Step 1: Create Project Folder

**Say**: "Create a new folder on your desktop called 'ai-chatbot'"

**Wait**

**Say**: "Inside, create three files: index.html, styles.css, script.js"

**Show on projector**: Folder structure

**Check**: "Everyone has three empty files?"

### Step 2: Build HTML (8 minutes)

**Say**: "Open index.html in VS Code"

**Say**: "I'm going to type this. Copy exactly as I do."

**Type slowly** and narrate each section:

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
            <h1>🤖 AI Chatbot</h1>
            <p>Powered by Llama 3.1</p>
        </header>

        <main class="chat-area">
            <div id="messages" class="messages"></div>
        </main>

        <footer class="input-area">
            <form id="chatForm">
                <input 
                    type="text" 
                    id="userInput" 
                    placeholder="Ask me anything..."
                    required
                >
                <button type="submit" id="sendBtn">Send</button>
            </form>
        </footer>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

**Pause** after each section (head, body, form, etc.)

**Say**: "Save this file"

**Check**: "Everyone has HTML saved?"

### Step 3: Add Styling (10 minutes)

**Say**: "Open styles.css"

**Type slowly** and narrate:

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
    max-width: 700px;
    height: 85vh;
    background: white;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 20px;
    text-align: center;
}

header h1 {
    font-size: 24px;
    margin-bottom: 5px;
}

header p {
    font-size: 14px;
    opacity: 0.9;
}

.chat-area {
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
    animation: slideIn 0.3s ease;
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
    line-height: 1.5;
}

.user .message-content {
    background: #667eea;
    color: white;
}

.ai .message-content {
    background: #f0f0f0;
    color: #333;
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

.input-area {
    border-top: 1px solid #e0e0e0;
    padding: 15px;
    background: #fafafa;
}

#chatForm {
    display: flex;
    gap: 10px;
}

#userInput {
    flex: 1;
    padding: 12px;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    font-size: 14px;
    font-family: inherit;
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

#sendBtn:disabled {
    background: #ccc;
    cursor: not-allowed;
}
```

**Pause** after each major section

**Say**: "Save this file"

**Check**: "Everyone has CSS saved?"

### Step 4: Add JavaScript Logic (20 minutes)

**Say**: "This is the important part. This makes it actually work."

**Say**: "Open script.js"

**IMPORTANT**: "Replace YOUR_API_KEY_HERE with your actual OpenRouter API key"

**Type slowly**:

```javascript
// ============================================
// CONFIGURATION - CHANGE THIS!
// ============================================
const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your OpenRouter key
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'meta-llama/llama-3.1-8b-instruct';

// ============================================
// GET DOM ELEMENTS
// ============================================
const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const messagesContainer = document.getElementById('messages');

// ============================================
// EVENT LISTENER
// ============================================
chatForm.addEventListener('submit', handleSendMessage);

// ============================================
// MAIN FUNCTION
// ============================================
async function handleSendMessage(e) {
    e.preventDefault();

    const message = userInput.value.trim();
    if (!message) return;

    // Disable input while loading
    sendBtn.disabled = true;
    userInput.disabled = true;

    // Show user message
    addMessage(message, 'user');
    userInput.value = '';

    // Show loading dots
    showLoading();

    try {
        // Call OpenRouter API
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
                'HTTP-Referer': window.location.href
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

        // Handle errors
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || `Error: ${response.status}`);
        }

        // Get response
        const data = await response.json();
        const aiResponse = data.choices[0].message.content;

        // Remove loading, show response
        removeLoading();
        addMessage(aiResponse, 'ai');

    } catch (error) {
        console.error('Error:', error);
        removeLoading();
        addMessage(`Error: ${error.message}. Check your API key!`, 'error');
    } finally {
        // Re-enable input
        sendBtn.disabled = false;
        userInput.disabled = false;
        userInput.focus();
    }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

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

function showLoading() {
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

function removeLoading() {
    const indicator = document.getElementById('loading-indicator');
    if (indicator) {
        indicator.remove();
    }
}

// Welcome message
window.addEventListener('load', () => {
    addMessage('Hi! I\'m an AI powered by Meta Llama 3.1. Ask me anything!', 'ai');
});
```

**Critical Moment**: When they get to `const API_KEY = 'YOUR_API_KEY_HERE'`

**Say loudly**: "STOP. Replace YOUR_API_KEY_HERE with your actual API key from OpenRouter."

**Wait** for everyone to do this

**Check**: "Everyone has their API key in the code?"

**Say**: "Save the file"

### Step 5: Test It!

**Say**: "Open index.html in your browser"

**Wait**

**Say**: "You should see a chatbot interface"

**Check**: "Does everyone see the chatbot?"

**Say**: "Type a message in the input box and click Send"

**Wait** for first responses

**CELEBRATION MOMENT**: 

When first student gets a response:
- "It works! Who got a response?"
- Have them share what they asked
- Celebrate publicly
- "Everyone will get there—help each other"

**Troubleshooting** (Live on projector):

**"I'm getting an error"**:
```
→ Check your API key is correct (copy it again)
→ Check there are no extra spaces
→ Try in the OpenRouter playground first
```

**"Nothing happens when I send"**:
```
→ Open Developer Tools (F12)
→ Look at Console tab
→ What error message do you see?
→ Let's read it together
```

**"401 Unauthorized"**:
```
→ Your API key is wrong
→ Go back to OpenRouter
→ Create a new key
→ Paste it into script.js
```

**Check**: "Does everyone have a working chatbot?"

---

## Section 4: Add Features (60 minutes)

### Structure: Do This Together, Then They Modify

**Approach**: You add ONE feature on projector, students follow and add it. Repeat 2-3 times.

### Feature 1: Conversation History (20 minutes)

**Why**: "Right now, each message is independent. The AI forgets what you said before."

**Problem Demo**: 
- Ask: "My name is Sarah"
- Then ask: "What's my name?"
- AI doesn't know because it forgot

**Solution**: Keep a history array

**Say**: "We're adding one thing: a history array. This keeps every message we send and receive."

**Show code change** on projector:

In `script.js`, find this section:

```javascript
// ============================================
// GET DOM ELEMENTS
// ============================================
const chatForm = document.getElementById('chatForm');
```

**Add this BEFORE it**:

```javascript
// ============================================
// CONVERSATION HISTORY
// ============================================
let conversationHistory = [];
```

**Then** find this line:

```javascript
body: JSON.stringify({
    model: MODEL,
    messages: [
        {
            role: 'user',
            content: message
        }
    ],
```

**Change it to**:

```javascript
body: JSON.stringify({
    model: MODEL,
    messages: [
        ...conversationHistory,
        {
            role: 'user',
            content: message
        }
    ],
```

**Then** at the end of `handleSendMessage` function, add this before `} catch`:

```javascript
        // Save to history
        conversationHistory.push({
            role: 'user',
            content: message
        });
        conversationHistory.push({
            role: 'assistant',
            content: aiResponse
        });
```

**Say**: "Save and reload your chatbot"

**Test**: "Tell it your name, then ask it to remember your name"

**Check**: "Is the AI remembering context now?"

### Feature 2: System Prompt (20 minutes)

**Explain**: "A system prompt tells the AI how to behave. It's like instructions."

**Say**: "We're going to make your chatbot a helpful programming tutor."

**Show** this code addition:

After the `const MODEL = ...` line, add:

```javascript
const SYSTEM_PROMPT = `You are a helpful programming tutor. 
Your job is to:
1. Explain programming concepts clearly
2. Provide code examples
3. Answer debugging questions
4. Be encouraging

Keep answers concise and beginner-friendly.`;
```

**Then** find the line with:

```javascript
messages: [
    ...conversationHistory,
```

**Change it to**:

```javascript
messages: [
    {
        role: 'system',
        content: SYSTEM_PROMPT
    },
    ...conversationHistory,
```

**Say**: "Save and reload"

**Test**: "Ask a programming question and watch how it responds differently"

**Check**: "Is the AI now acting like a tutor?"

### Feature 3: Model Selection (20 minutes)

**Explain**: "We have two models: 8B (fast) and 70B (more detailed). Let students choose."

**In HTML**, find `</header>` and add before it:

```html
        <div class="model-selector" style="padding: 10px; text-align: center;">
            <label for="modelSelect">Model: </label>
            <select id="modelSelect" style="padding: 8px; margin-left: 10px;">
                <option value="llama-3.1-8b">Fast (8B)</option>
                <option value="llama-3.1-70b">Detailed (70B)</option>
            </select>
        </div>
```

**In JavaScript**, after `const MODEL = ...`, replace it with:

```javascript
const MODELS = {
    'llama-3.1-8b': 'meta-llama/llama-3.1-8b-instruct',
    'llama-3.1-70b': 'meta-llama/llama-3.1-70b-instruct'
};

function getSelectedModel() {
    const selected = document.getElementById('modelSelect').value;
    return MODELS[selected];
}
```

**Then** in the API call, change:

```javascript
model: MODEL,
```

to:

```javascript
model: getSelectedModel(),
```

**Say**: "Save and reload"

**Test**: "Ask the same question to both models. Compare the responses."

**Check**: "Can everyone switch between models?"

---

## Section 5: Deployment Demo (15 minutes)

### Your Role: Show, Don't Do

**Say**: "Now we're going to show how to put this online so anyone can use it."

### Show These Steps (on projector)

**Step 1: Push to GitHub**

```bash
cd ai-chatbot
git init
git add .
git commit -m "First chatbot"
git remote add origin [your-repo-url]
git push -u origin main
```

**Explain**: "We're saving our code to GitHub—like a backup and version control"

**Step 2: Connect to Netlify**

1. Go to netlify.com
2. Sign in with GitHub
3. Click "New site from Git"
4. Select your repository
5. Click Deploy

**Say**: "Netlify automatically deploys when you push. Now your app is live!"

**Show**: Your live app URL

**Say**: "Tomorrow, you'll deploy your own projects like this."

---

## Section 6: Project Brief & Wrap-Up (15 minutes)

### Explain Tomorrow's Work

**Say**: "Today we learned together. Tomorrow, you build independently."

### Project Requirements

**Each student will build ONE of these**:

**Tier 1 (Easiest)**:
- Joke generator
- Motivational quote bot
- Simple Q&A chatbot

**Tier 2 (Intermediate)**:
- Code explanation tool
- Content summariser
- Email writer

**Tier 3 (Advanced)**:
- Multi-language translator
- Interview prep coach
- Learning assistant with custom prompts

### What They Need To Do Tomorrow

1. **Choose a project type** (from above)
2. **Design the interface** (what inputs/outputs)
3. **Write the code** (using today's patterns)
4. **Deploy to Netlify** (make it live)
5. **Submit GitHub URL + live URL** (by deadline)

### Success Criteria

- [ ] Working web application
- [ ] Uses OpenRouter API
- [ ] Has custom system prompt
- [ ] Deployed and live
- [ ] Code has no API key exposed
- [ ] GitHub repo with README

### Q&A

"Any questions before we finish?"

**Address any blockers**

---

## Wrap-Up Talk (2 minutes)

> "You did something today most people never do. You built an AI application from scratch. You deployed it. 
>
> Tomorrow, you'll do it independently. You have everything you need.
>
> If you get stuck:
> - Use your Student Workbook
> - Help each other
> - Ask me questions
>
> But mostly, **trust that you can do this.**
>
> You already did it today. Tomorrow is just doing it again, your way.
>
> Well done. See you tomorrow."

---

## Troubleshooting During Workshop

### Scenario 1: API Key Issues

**Signs**: "401 error" or "403 error"

**Quick Fix**:
1. Have them go back to OpenRouter
2. Create a FRESH key
3. Copy carefully (click copy button, don't select)
4. Replace in script.js
5. Refresh browser

### Scenario 2: Code Won't Run

**Quick Debug Process**:
1. Open Developer Tools (F12)
2. Click Console tab
3. What's the error message?
4. Read it together
5. Usually: syntax error (missing bracket) or API issue

**Common typos**:
- Missing comma in JSON
- Misspelled `getElementById`
- Missing `const` or `let`
- Forgot closing bracket

### Scenario 3: Students Finishing Early

**Give them**:
- "Add a copy button for responses"
- "Make the chat history persistent (localStorage)"
- "Add more model options"
- "Change the styling/theme"

**Or**: Have them help struggling students

### Scenario 4: Students Behind

**Don't wait for everyone to catch up perfectly.**

**Timing strategy**:
- Give 10 minutes for a section
- After 10 minutes, move on
- Slower students can catch up in break or after
- You or TA help individuals

---

## After Workshop: Hand Off

**End of day**, give each student:

1. **Printed Student Workbook** (tomorrow's guide)
2. **GitHub repo link** (starter template)
3. **Your contact** (for questions)
4. **Project requirements** (checklist)

**Say**: "Everything you need is in this workbook. Follow it exactly. You've got this."

---

## Day 2: Your Role (Minimal)

**Students work independently** on their projects using the Student Workbook.

**You are available for**:
- Unblocking specific errors
- Answering "how do I..." questions
- Reviewing code direction
- Celebrating wins

**You are NOT doing**:
- Writing code for them
- Fixing their code
- Spoon-feeding steps

**Circulate** and ask: "What are you building? Where are you stuck?"

---

## Celebration & Showcase

**When students finish**:

1. **Check their work** (works + deployed)
2. **Ask them to demo** (2 minutes)
3. **Ask: "What was hardest?"**
4. **Ask: "What would you add next?"**
5. **Celebrate publicly** (announce to others)

---

## Key Principles for Success

✅ **Go slowly during coding** (students type slower than you think)
✅ **Pause frequently** (every 5-10 lines)
✅ **Check everyone caught up** before moving on
✅ **Celebrate the first win** (when someone's chatbot works)
✅ **Normalize errors** (show your own debugging)
✅ **Don't fix their code** (guide them to fix it)
✅ **Keep energy high** (smile, move around, show enthusiasm)
✅ **Be present tomorrow** (circulate, help, celebrate)

---

**Version 1.0** | **December 2024** | **OpenRouter Only**

*"You're not just teaching code. You're showing students they can build things."*

