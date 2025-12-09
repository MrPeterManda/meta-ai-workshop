# Meta AI OpenRouter Workshop
## Student Workbook - Day 2 Independent Project

**Your Task**: Build your own AI-powered web application using OpenRouter and Meta Llama.

**Duration**: 4-6 hours  
**Deliverable**: Working web app + GitHub repo + live Netlify link  
**Deadline**: [Insert your deadline]

---

## Start Here: Read This First

### What You're Building

You will create a web application that:
- Takes user input
- Sends it to Meta's Llama AI via OpenRouter API
- Gets an intelligent response back
- Displays it beautifully

### What You Learned Yesterday

You know how to:
- ✅ Create OpenRouter API key
- ✅ Build HTML structure
- ✅ Style with CSS
- ✅ Call APIs with JavaScript
- ✅ Handle responses
- ✅ Deploy to Netlify

**Today: You do it independently using these same skills.**

### Success Checklist

By end of today, you will have:
- [ ] Chosen a project idea
- [ ] Built working application
- [ ] Deployed to Netlify
- [ ] Submitted GitHub URL + live URL
- [ ] Code has no exposed API key
- [ ] Custom system prompt implemented

---

## PHASE 1: Choose Your Project (30 minutes)

### Pick ONE Project Type

**Tier 1 (Easiest - Recommended if first time)**:

**Joke Generator**
- Input: Click a button
- Output: Random funny joke
- API Prompt: "Tell me a funny joke. Make it short."

**Motivational Quote Bot**
- Input: Click a button
- Output: Motivational quote
- API Prompt: "Give me a short motivational quote."

**Simple Q&A Bot**
- Input: Type any question
- Output: AI answers
- No system prompt needed

---

**Tier 2 (Intermediate - Good middle ground)**:

**Code Explanation Tool**
- Input: Paste code + choose language
- Output: Explanation in chosen language
- System Prompt: "You're a code tutor. Explain code simply."

**Content Summariser**
- Input: Paste text/article
- Output: Short summary
- System Prompt: "Create concise summaries."

**Email Writer**
- Input: Describe what to write
- Output: Professional email
- System Prompt: "Write professional business emails."

---

**Tier 3 (Advanced - Challenge yourself)**:

**Language Translator**
- Input: Text + target language
- Output: Translation
- System Prompt: "You're a professional translator."

**Interview Coach**
- Input: Job description + your background
- Output: Interview tips
- System Prompt: "You're an expert interview coach."

**Learning Assistant**
- Input: Topic + difficulty level
- Output: Explanation + quiz questions
- System Prompt: "You're a patient tutor. Create explanations and quiz questions."

---

### Your Decision

**Which project are you building?**

```
Project Name: ________________________________

Project Type (Tier 1/2/3): ____________________

Your idea in one sentence:
_____________________________________________
_____________________________________________
```

**Why did you choose this?**
```
_____________________________________________
_____________________________________________
```

---

## PHASE 2: Plan Your Application (30 minutes)

### HTML Sketch

**What elements do you need?**

Tick the boxes that apply to you:

- [ ] Title/Header
- [ ] Text input field
- [ ] Button (Submit)
- [ ] Button (Clear)
- [ ] Dropdown/Select (for options)
- [ ] Text area (for longer input)
- [ ] Output display area
- [ ] Model selector
- [ ] Loading indicator

**Draw your layout** (rough sketch):

```
┌─────────────────────────────────┐
│                                 │
│  [Your rough layout here]        │
│                                 │
└─────────────────────────────────┘
```

---

### JavaScript Planning

**What happens when user submits?**

```
1. Get input from HTML
2. [Your custom step]
3. Call OpenRouter API
4. Get response
5. Display response
```

**What system prompt will you use?**

```
SYSTEM_PROMPT = `
Your prompt here - 2-4 sentences
_________________________________
_________________________________
```

**What model are you using?**

- [ ] 8B (fast) - Good for simple tasks
- [ ] 70B (detailed) - Good for complex analysis

---

## PHASE 3: Build Your Application (2-3 hours)

### Step 1: Create Project Folder

**In terminal or file explorer:**

```bash
mkdir my-ai-project
cd my-ai-project
```

**Create three files**:
- `index.html`
- `styles.css`
- `script.js`

**Status**: ☐ Files created

---

### Step 2: Write HTML (20 minutes)

**Open `index.html`**

**Copy this template and customise it for your project:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My AI App</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>🤖 [YOUR APP TITLE HERE]</h1>
            <p>Powered by Meta Llama 3.1</p>
        </header>

        <main class="app-area">
            <!-- YOUR INPUT ELEMENTS HERE -->
            <!-- Example: -->
            <!-- <input type="text" id="userInput" placeholder="Enter text..."> -->
            <!-- <button id="submitBtn">Get Response</button> -->

            <div id="output" class="output"></div>
        </main>

        <footer>
            <p>Built with OpenRouter & Meta AI</p>
        </footer>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

**Customise**:
1. Change the `<title>` to your project name
2. Change the `<h1>` to your app title
3. Add your input elements (input, button, select, etc.)
4. Give each element a unique `id`

**Status**: ☐ HTML created and customised

---

### Step 3: Write CSS (20 minutes)

**Open `styles.css`**

**Copy this base styling:**

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
    padding: 20px;
}

.container {
    width: 100%;
    max-width: 800px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    min-height: 400px;
}

header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 30px;
    text-align: center;
}

header h1 {
    font-size: 28px;
    margin-bottom: 10px;
}

header p {
    font-size: 14px;
    opacity: 0.9;
}

.app-area {
    flex: 1;
    padding: 30px;
    overflow-y: auto;
}

.output {
    margin-top: 20px;
    padding: 20px;
    background: #f5f5f5;
    border-radius: 8px;
    min-height: 100px;
    white-space: pre-wrap;
    word-wrap: break-word;
    line-height: 1.6;
}

input, textarea, select {
    width: 100%;
    padding: 12px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-family: inherit;
    font-size: 14px;
}

input:focus, textarea:focus, select:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

button {
    background: #667eea;
    color: white;
    padding: 12px 30px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    transition: background 0.2s;
    margin-right: 10px;
}

button:hover {
    background: #5568d3;
}

button:disabled {
    background: #ccc;
    cursor: not-allowed;
}

.loading {
    display: inline-block;
}

.loading::after {
    content: '.';
    animation: dots 1s steps(3, end) infinite;
}

@keyframes dots {
    0%, 20% {
        content: '.';
    }
    40% {
        content: '..';
    }
    60% {
        content: '...';
    }
}

footer {
    border-top: 1px solid #ddd;
    padding: 15px;
    text-align: center;
    color: #999;
    font-size: 12px;
}

@media (max-width: 600px) {
    header h1 {
        font-size: 20px;
    }
    
    .app-area {
        padding: 20px;
    }
}
```

**Customise** (optional):
- Change colors (replace `#667eea` with your color)
- Change spacing
- Add your own styling

**Status**: ☐ CSS styled

---

### Step 4: Write JavaScript (Most Important - 60+ minutes)

**Open `script.js`**

**STEP 4A: Configuration Section**

Copy this exactly and **replace YOUR_API_KEY_HERE** with your real OpenRouter API key:

```javascript
// ============================================
// CONFIGURATION
// ============================================
const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your actual key!
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'meta-llama/llama-3.1-8b-instruct'; // Or '70b' for more detailed

// Your custom system prompt
const SYSTEM_PROMPT = `[YOUR PROMPT HERE]`;
// Example: "You are a helpful coding tutor. Explain things clearly."

// ============================================
// HELPER FUNCTION TO CALL API
// ============================================
async function callAI(userMessage) {
    try {
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
                        role: 'system',
                        content: SYSTEM_PROMPT
                    },
                    {
                        role: 'user',
                        content: userMessage
                    }
                ],
                temperature: 0.7,
                max_tokens: 1000
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'API Error');
        }

        const data = await response.json();
        return data.choices[0].message.content;

    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}
```

**Status**: ☐ Configuration section added

---

**STEP 4B: Add Your Event Listener**

**What button/input triggers your app?**

If you have a button with id="submitBtn" and input with id="userInput":

```javascript
// ============================================
// EVENT LISTENER
// ============================================
document.getElementById('submitBtn').addEventListener('click', handleSubmit);

// If user presses Enter in text input
document.getElementById('userInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSubmit();
    }
});

// ============================================
// MAIN FUNCTION
// ============================================
async function handleSubmit() {
    // Get user input
    const userInput = document.getElementById('userInput').value.trim();
    
    if (!userInput) {
        alert('Please enter something');
        return;
    }

    // Disable button while loading
    const btn = document.getElementById('submitBtn');
    btn.disabled = true;
    btn.textContent = 'Loading...';

    // Show output area
    const output = document.getElementById('output');

    try {
        // Call AI
        const response = await callAI(userInput);
        
        // Display response
        output.textContent = response;
        output.style.display = 'block';

    } catch (error) {
        output.textContent = 'Error: ' + error.message;
        output.style.color = 'red';
    } finally {
        // Re-enable button
        btn.disabled = false;
        btn.textContent = 'Submit';
    }
}
```

**Status**: ☐ Event listener added

---

### Step 5: Test Your Application (15 minutes)

**In your browser, open `index.html`**

**What to check**:

- [ ] Layout displays correctly
- [ ] Input field works
- [ ] Button is clickable
- [ ] Clicking button produces output
- [ ] No JavaScript errors (check console with F12)

**If you get an error:**

Open Developer Tools (`F12`), click `Console`, read the error.

**Common errors**:

| Error | Cause | Fix |
|-------|-------|-----|
| `401 Unauthorized` | Wrong API key | Copy key again from OpenRouter |
| `Uncaught SyntaxError` | Typo in code | Look for missing brackets or commas |
| `Cannot read property...` | Wrong element ID | Check your HTML ids match JavaScript |
| `CORS error` | Check headers | Make sure `HTTP-Referer` is set |

**Status**: ☐ Application works locally

---

### Step 6: Improve Your App (Optional - 30 minutes)

**If your basic app works, try adding**:

**Feature A: Clear Button**

```javascript
document.getElementById('clearBtn').addEventListener('click', () => {
    document.getElementById('userInput').value = '';
    document.getElementById('output').textContent = '';
});
```

**Feature B: Multiple Models**

```javascript
// Add select in HTML
<select id="modelSelect">
    <option value="llama-3.1-8b">Fast (8B)</option>
    <option value="llama-3.1-70b">Detailed (70B)</option>
</select>

// In JavaScript, add to callAI function
model: document.getElementById('modelSelect').value === 'llama-3.1-8b' 
    ? 'meta-llama/llama-3.1-8b-instruct'
    : 'meta-llama/llama-3.1-70b-instruct',
```

**Feature C: Copy Output**

```javascript
document.getElementById('copyBtn').addEventListener('click', () => {
    const text = document.getElementById('output').textContent;
    navigator.clipboard.writeText(text);
    alert('Copied!');
});
```

**Status**: ☐ Enhancements added (optional)

---

## PHASE 4: Prepare for Deployment (30 minutes)

### Step 1: Create `.gitignore` File

**Create a new file** in your project folder called `.gitignore`

**Add this one line**:

```
script.js
```

**Why?** This prevents your API key from being uploaded to GitHub.

**Status**: ☐ `.gitignore` created

---

### Step 2: Create `script-template.js`

**Copy your `script.js` to a new file** called `script-template.js`

**In `script-template.js`, change your API key to**:

```javascript
const API_KEY = 'YOUR_API_KEY_HERE';
```

**Why?** So others can see your code structure without your API key.

**Status**: ☐ Template created

---

### Step 3: Create `README.md`

**Create a new file** called `README.md`

**Copy this template**:

```markdown
# [Your App Name]

## What This Does
[One sentence description]

## How to Use
1. Enter [your input description]
2. Click [your button]
3. Get response

## Built With
- HTML/CSS/JavaScript
- OpenRouter API
- Meta Llama 3.1 8B

## Setup
1. Get API key from openrouter.ai
2. Copy script-template.js to script.js
3. Add your API key to script.js
4. Open index.html in browser

## Live Demo
[Your Netlify URL will go here]
```

**Status**: ☐ README created

---

## PHASE 5: Deploy to Netlify (30 minutes)

### Step 1: Push to GitHub

**In terminal, from your project folder**:

```bash
git init
git add .
git commit -m "Initial AI app commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/my-ai-project.git
git push -u origin main
```

**Replace**:
- `YOUR_USERNAME` with your GitHub username
- `my-ai-project` with your repo name

**Status**: ☐ Code on GitHub

---

### Step 2: Deploy to Netlify

**Go to netlify.com**

1. Click "New site from Git"
2. Select GitHub
3. Authorize Netlify to access your repos
4. Select your repository
5. Click Deploy

**Wait** for deployment (usually 1-2 minutes)

**Copy your live URL** when ready

**Status**: ☐ App deployed and live

---

### Step 3: Test Live App

**Visit your Netlify URL**

**Check**:
- [ ] App loads
- [ ] Interface works
- [ ] Clicking submit works
- [ ] Response appears

**Status**: ☐ Live app verified working

---

## PHASE 6: Submit Your Work (15 minutes)

### What to Submit

**Three things**:

1. **GitHub Repository URL**
   ```
   https://github.com/your-username/your-repo-name
   ```

2. **Live Netlify URL**
   ```
   https://your-app-name.netlify.app
   ```

3. **Summary** (100-150 words)
   ```
   What did you build?
   ___________________
   
   What system prompt did you use?
   ___________________
   
   What was the hardest part?
   ___________________
   
   What would you add next?
   ___________________
   ```

---

## Troubleshooting Guide

### Problem: "401 Unauthorized"

**Checklist**:
- [ ] Is your API key in the code?
- [ ] Did you copy the full key (not partial)?
- [ ] Are there extra spaces?
- [ ] Is your key still valid (not deleted from OpenRouter)?

**Solution**:
1. Go to openrouter.ai
2. Settings → API Keys
3. Create a **NEW** key
4. Copy it carefully
5. Replace in script.js
6. Refresh page

---

### Problem: "API Error" but no details

**Debug**:
1. Open Developer Tools (F12)
2. Go to Network tab
3. Try your app again
4. Look at the API request
5. Click on the request, see the response
6. What error does it show?

---

### Problem: Nothing happens when I click button

**Debug**:
1. Open Developer Tools (F12)
2. Go to Console tab
3. Try your app
4. What error appears?
5. Common fixes:
   - Wrong element ID (check HTML)
   - Button not connected to function
   - Syntax error in JavaScript

---

### Problem: It works locally but not on Netlify

**Checklist**:
- [ ] Did you add script.js to .gitignore? (If yes, error!)
- [ ] Do you have API_KEY in your code on GitHub? (If yes, delete!)
- [ ] Is the API_KEY variable correct?

**Solution**: 
- Remove API key from GitHub immediately
- Create new API key in OpenRouter
- Never commit script.js with real key

---

## Success Checklist (Before Submitting)

- [ ] App built and works
- [ ] App has custom system prompt
- [ ] API key is NOT in GitHub code
- [ ] .gitignore has "script.js"
- [ ] README.md exists
- [ ] Deployed to Netlify
- [ ] Live app works
- [ ] GitHub URL ready
- [ ] Netlify URL ready
- [ ] Summary written

---

## If You Get Stuck

**Step 1**: Check the troubleshooting guide above

**Step 2**: Check your code carefully
- Spelling
- Brackets and commas
- Element IDs

**Step 3**: Ask for help
- Slack/Discord message
- Email
- Office hours

**Don't**: Skip to the next step without fixing the current one. Debugging is learning.

---

## Next Steps (After Submitting)

**If you're proud of your work, you could**:
- Add more features (model options, themes, etc.)
- Deploy to other platforms (Vercel, GitHub Pages)
- Make it prettier (better CSS, animations)
- Write a blog post about how you built it
- Share it with friends

**The pattern you learned**:
1. Get user input
2. Call AI API
3. Display response

**You can apply this to**: Any AI task, any industry, any platform.

---

## Reflection Questions

**Spend 10 minutes answering these** (for your own learning):

1. **What surprised you about building this?**
   ```
   _________________________________
   ```

2. **Where did you struggle most?**
   ```
   _________________________________
   ```

3. **What would you build next?**
   ```
   _________________________________
   ```

4. **How would you explain this to someone else?**
   ```
   _________________________________
   ```

---

## Helpful Resources

**If you want to learn more**:

- **OpenRouter Docs**: https://openrouter.ai/docs
- **Meta Llama Docs**: https://www.llama.com
- **MDN JavaScript**: https://developer.mozilla.org/en-US/docs/Web/JavaScript
- **Netlify Docs**: https://docs.netlify.com
- **GitHub Basics**: https://docs.github.com/en/get-started

---

## Good Luck!

**Remember**:
- You built a chatbot together yesterday
- Today you're doing it independently
- You have all the skills you need
- Mistakes are part of learning
- Ask for help when stuck
- Celebrate when it works

**You've got this.** 🚀

---

**Version 1.0** | **December 2024**

*Submit by: [DATE]*  
*Questions? Reach out to: [YOUR CONTACT]*

