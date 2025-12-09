# OpenRouter & Meta AI Quick Reference
## Print This & Keep It Handy

---

## Your OpenRouter API Key

**Write it here** (safe place):

```
_____________________________________________

_____________________________________________
```

**IMPORTANT**: Never share. Never commit to Git. Never post online.

---

## File Structure You Need

```
my-ai-project/
├── index.html
├── styles.css
├── script.js
├── script-template.js    (for GitHub - no API key)
├── .gitignore           (contains: script.js)
└── README.md            (describe your project)
```

---

## Essential Code Snippets

### API Call Pattern (Copy & Use)

```javascript
const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'HTTP-Referer': window.location.href
    },
    body: JSON.stringify({
        model: 'meta-llama/llama-3.1-8b-instruct',
        messages: [{role: 'user', content: userMessage}],
        temperature: 0.7,
        max_tokens: 1000
    })
});
```

### Get Response (Copy & Use)

```javascript
if (!response.ok) throw new Error('API Error');
const data = await response.json();
const aiResponse = data.choices[0].message.content;
console.log(aiResponse);  // Your AI response
```

### System Prompt (Customize)

```javascript
const SYSTEM_PROMPT = `You are a helpful assistant.
Your job is to:
- Do thing 1
- Do thing 2
- Be friendly

Keep responses short and clear.`;

// Use in messages array:
messages: [
    {role: 'system', content: SYSTEM_PROMPT},
    {role: 'user', content: userMessage}
]
```

---

## Models Available

| Model | Speed | Best For | Use When |
|-------|-------|----------|----------|
| `meta-llama/llama-3.1-8b-instruct` | ⚡⚡⚡ Fast | General use | Quick responses needed |
| `meta-llama/llama-3.1-70b-instruct` | ⚡ Slow | Complex tasks | Accuracy more important |

---

## Common Errors & Quick Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `401 Unauthorized` | Wrong API key | Get new key from OpenRouter, verify exact copy |
| `SyntaxError` | Typo in JavaScript | Check: missing }, comma, quote |
| `Cannot read property` | Wrong element ID | Check HTML ids match JavaScript selectors |
| Nothing displays | JavaScript doesn't run | Open F12 console, see error message |
| API slow | Model overloaded | Use 8B model instead of 70B |

---

## JavaScript Essentials

### Get HTML Elements

```javascript
const element = document.getElementById('id-name');
const input = document.getElementById('userInput').value;
```

### Listen for Button Click

```javascript
document.getElementById('submitBtn').addEventListener('click', () => {
    // Your code here
});
```

### Update HTML Content

```javascript
document.getElementById('output').textContent = 'Your response here';
document.getElementById('output').innerHTML = '<p>HTML content</p>';
```

### Disable/Enable Button

```javascript
btn.disabled = true;   // Disable
btn.disabled = false;  // Enable
btn.textContent = 'Loading...';  // Change text
```

---

## HTML Basics Reminder

```html
<!-- Input fields -->
<input type="text" id="myInput" placeholder="Type here...">
<textarea id="myText" placeholder="Large text..."></textarea>
<select id="mySelect">
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
</select>

<!-- Buttons -->
<button id="myBtn">Click Me</button>

<!-- Output -->
<div id="output"></div>
```

---

## CSS Quick Fixes

```css
/* Make container responsive */
max-width: 800px;
margin: 0 auto;
padding: 20px;

/* Center content */
display: flex;
justify-content: center;
align-items: center;

/* Make input full width */
input {
    width: 100%;
    padding: 12px;
    margin-bottom: 10px;
}

/* Style buttons */
button {
    padding: 10px 20px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

button:hover {
    background: #5568d3;
}
```

---

## GitHub Commands (Copy & Paste)

```bash
# Initial setup
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/REPONAME.git
git push -u origin main

# After making changes
git add .
git commit -m "Your message"
git push
```

---

## Deployment Steps (Netlify)

1. Push to GitHub (see GitHub commands above)
2. Go to netlify.com
3. Click "New site from Git"
4. Authorize GitHub
5. Select your repository
6. Click Deploy
7. Wait 1-2 minutes
8. Get your live URL
9. Share it! 🎉

---

## Temperature & Max Tokens Explained

**Temperature** (0.0 - 1.0):
- `0.0` = Deterministic (same answer every time)
- `0.5` = Balanced
- `0.7` = Good default (creative but coherent)
- `1.0` = Wild and random

**Max Tokens** (response length):
- `200` = Short (few words)
- `1000` = Medium (paragraph)
- `2000` = Long (multiple paragraphs)

Set based on your needs.

---

## Debug Checklist (When Stuck)

- [ ] Check HTML element IDs match JavaScript selectors
- [ ] Check API key is correct (copy fresh from OpenRouter)
- [ ] Check JavaScript has no syntax errors (F12 console)
- [ ] Check API response with console.log()
- [ ] Check network tab shows successful request (F12)
- [ ] Check .gitignore has script.js
- [ ] Check README.md is complete
- [ ] Test live app before submitting

---

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Open Developer Tools | F12 |
| Reload Page | Ctrl+R (Cmd+R on Mac) |
| Hard Refresh | Ctrl+Shift+R (Cmd+Shift+R on Mac) |
| Save File | Ctrl+S |
| Comment Code | Ctrl+/ |
| Format Code | Shift+Alt+F |

---

## File Path Reminders

**When linking in HTML**:

```html
<!-- Same folder -->
<link rel="stylesheet" href="styles.css">
<script src="script.js"></script>

<!-- Subfolder -->
<script src="js/script.js"></script>

<!-- URL (absolute) -->
<script src="https://example.com/script.js"></script>
```

---

## Submit Checklist

Before you submit, verify:

- [ ] App works locally
- [ ] App works on Netlify live URL
- [ ] GitHub repo is public
- [ ] script.js NOT in GitHub (in .gitignore)
- [ ] script-template.js IS in GitHub (without API key)
- [ ] README.md exists and is filled out
- [ ] No API key visible in any code online
- [ ] Both URLs (GitHub + Netlify) ready to submit

---

## Helpful Commands

```bash
# Check git status
git status

# See what files changed
git diff

# Undo last commit (careful!)
git reset --soft HEAD~1

# See commit history
git log

# Delete a file in git
git rm filename.js
git commit -m "Remove file"

# Rename file
git mv oldname.js newname.js
git commit -m "Rename file"
```

---

## OpenRouter Documentation

**Official Docs**: https://openrouter.ai/docs

**Key Pages**:
- Models List: https://openrouter.ai/models
- Pricing: https://openrouter.ai/pricing
- API Status: https://openrouter.ai/status

---

## Common Questions

**Q: How many API calls do I get?**
A: ~100 requests/day on free tier (depends on model)

**Q: What if I run out?**
A: Wait 24 hours for reset, or upgrade account

**Q: Can I hide my API key?**
A: Use environment variables (advanced), or server-side proxy

**Q: What if OpenRouter is down?**
A: Check status page, try again later, or use alternative

**Q: Can I use my own computer's API?**
A: Yes, use Ollama locally (advanced)

---

## Your Project Timeline

```
Day 1 (Workshop):    9am-1pm   Build together
Day 2 (Your time):  All day    Build independently
                               PHASE 1: Choose (30 min)
                               PHASE 2: Plan (30 min)
                               PHASE 3: Build (2-3 hrs)
                               PHASE 4: Deploy (30 min)
                               PHASE 5: Submit (15 min)
```

---

## Example Project Ideas (Pick One)

✅ **Easy**: Joke generator, Quote bot, Simple Q&A
✅ **Medium**: Code explainer, Text summariser, Email writer
✅ **Hard**: Language translator, Interview coach, Learning bot

---

## Remember

> "The code you write doesn't have to be perfect.
> It just has to work.
> And if it doesn't work, that's called debugging.
> And debugging is where you learn the most."

You've got this! 🚀

---

**Print this page. Keep it nearby. Refer to it often.**

**Version 1.0** | **December 2024** | **OpenRouter Edition**