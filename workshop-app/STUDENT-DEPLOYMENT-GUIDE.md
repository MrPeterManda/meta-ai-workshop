# Meta AI Workshop - Student Deployment Guide

Welcome to the Meta AI Workshop! This guide will help you fork, deploy, and customise your own Meta AI-powered application.

## Prerequisites

- GitHub account (free)
- Render account (free) - Sign up at https://render.com
- OpenRouter API key (free tier available) - Get from https://openrouter.ai/keys

---

## Step 1: Fork the Repository

### 1.1 Fork to Your GitHub
1. Go to the workshop repository: https://github.com/MrPeterManda/meta-ai-workshop
2. Click the **"Fork"** button (top right)
3. Select your GitHub account as the destination
4. Click **"Create fork"**

You now have your own copy at: `https://github.com/YOUR_USERNAME/meta-ai-workshop`

---

## Step 2: Get Your OpenRouter API Key

### 2.1 Sign Up for OpenRouter
1. Visit https://openrouter.ai
2. Click **"Sign In"** (you can use GitHub to sign in)
3. Once logged in, go to https://openrouter.ai/keys

### 2.2 Create API Key
1. Click **"Create Key"**
2. Give it a name: `Meta AI Workshop`
3. Click **"Create"**
4. **Copy the key** - it looks like: `sk-or-v1-xxxxxxxxxxxxx`
5. **Keep this safe!** You won't be able to see it again

### 2.3 Add Credits (Optional)
- OpenRouter offers free tier credits
- For production apps, you can add funds at https://openrouter.ai/credits

---

## Step 3: Deploy to Render

### 3.1 Sign Up for Render
1. Go to https://render.com
2. Click **"Get Started"**
3. Sign up with GitHub (recommended)
4. Authorise Render to access your GitHub

### 3.2 Create Web Service
1. Click **"New +"** (top right)
2. Select **"Web Service"**
3. Connect your GitHub account if not already connected
4. Find your forked repo: `YOUR_USERNAME/meta-ai-workshop`
5. Click **"Connect"**

### 3.3 Configure Service Settings

Fill in these details:

**Name:**
```
meta-ai-workshop-YOUR_NAME
```
(Example: `meta-ai-workshop-peter`)

**Region:**
```
Frankfurt (EU Central)
```
(Closest to South Africa)

**Branch:**
```
main
```

**Root Directory:**
```
workshop-app
```

**Environment:**
```
Node
```

**Build Command:**
```
npm install
```

**Start Command:**
```
npm start
```

**Instance Type:**
```
Free
```

### 3.4 Add Environment Variables ⚠️ IMPORTANT

Scroll down to **"Environment Variables"** section.

Click **"Add Environment Variable"** and add these two variables:

**Variable 1:**
- **Key**: `OPENROUTER_API_KEY`
- **Value**: `sk-or-v1-xxxxxxxxxxxxx` (paste your actual API key)

**Variable 2:**
- **Key**: `PORT`
- **Value**: `3001`

### 3.5 Deploy!
1. Click **"Create Web Service"**
2. Wait 2-3 minutes for deployment
3. Watch the logs - you'll see:
   - Installing dependencies
   - Building application
   - Starting server
   - ✅ "Live" status

---

## ✅ Step 4: Test Your Deployment

### 4.1 Get Your URL
Once deployed, Render gives you a URL like:
```
https://meta-ai-workshop-YOUR_NAME.onrender.com
```

### 4.2 Test the Application
1. Click the URL or copy and paste into your browser
2. You should see the Meta AI Workshop interface
3. Try the chat feature
4. Try the summarise feature
5. Check that API calls work

### 4.3 Troubleshooting

**If you see errors:**

**"API Key Invalid"**
- Check your `OPENROUTER_API_KEY` is correct in Render settings
- Make sure you copied the entire key including `sk-or-v1-`

**"Application Error"**
- Check the Render logs (click "Logs" tab)
- Ensure `server.js` exists in your repo
- Verify `npm install` completed successfully

**"Cannot GET /"**
- Check your `Start Command` is `node server.js`
- Verify the PORT is set to 3001

---

## Step 5: Customise Your App (Optional)

### 5.1 Clone Locally
```bash
git clone https://github.com/YOUR_USERNAME/meta-ai-workshop.git
cd meta-ai-workshop
```

### 5.2 Install Dependencies
```bash
npm install
```

### 5.3 Create Local .env File
Create a file called `.env` in the root folder:

```bash
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxx
PORT=3001
```

⚠️ **Never commit this file to Git!** It's already in `.gitignore`

### 5.4 Run Locally
```bash
npm start
```

Visit: http://localhost:3001

### 5.5 Make Changes
- Edit `index.html` to change the UI
- Edit `server.js` to add features
- Add new files and experiment!

### 5.6 Deploy Changes
```bash
git add .
git commit -m "Your change description"
git push origin main
```

Render will automatically redeploy your changes! 🎉

---

## Step 6: Register Your App (Analytics)

### 6.1 Register Your Deployment
Visit the workshop analytics portal:
```
https://meta-workshop-analytics.onrender.com/
```

Fill in:
- **Name**: Your full name
- **Email**: Your email address
- **GitHub Repo**: Your forked repo URL
- **Deployed App**: Your Render deployment URL

### 6.2 Add Analytics Tracking (Optional)

Open `index.html` and add this code before the closing `</script>` tag:

```javascript
// Analytics Configuration
const ANALYTICS_CONFIG = {
  enabled: true,
  serverUrl: 'https://meta-workshop-analytics.onrender.com/api/track',
  studentId: 'YOUR_EMAIL@example.com',  // Use your email
  studentName: 'Your Name',
  appUrl: window.location.origin
};

// Tracking function
async function trackEvent(eventType) {
  if (!ANALYTICS_CONFIG.enabled) return;

  try {
    await fetch(ANALYTICS_CONFIG.serverUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentId: ANALYTICS_CONFIG.studentId,
        studentName: ANALYTICS_CONFIG.studentName,
        appUrl: ANALYTICS_CONFIG.appUrl,
        eventType: eventType
      })
    });
  } catch (error) {
    console.log('Analytics tracking failed (non-critical)');
  }
}

// Add tracking to your sendMessage function
// Call: trackEvent('chat') when user sends a message
// Call: trackEvent('summarize') when user summarises text
```

Push the changes:
```bash
git add index.html
git commit -m "Add analytics tracking"
git push origin main
```

---

## Features to Build

Now that your app is deployed, try adding these features:

### Beginner Features
- [ ] Change the app title and colours
- [ ] Add a footer with your name
- [ ] Customise the welcome message

### Intermediate Features
- [ ] Add a "Clear Chat" button
- [ ] Show typing indicator while waiting for response
- [ ] Add error handling with user-friendly messages
- [ ] Style the chat bubbles differently for user vs AI

### Advanced Features
- [ ] Add image upload and analysis (multimodal)
- [ ] Implement RAG (Retrieval Augmented Generation)
- [ ] Add chat history persistence
- [ ] Create different AI personas/modes

---

## Getting Help

### Common Issues

**Deployment Failed:**
- Check Render logs for error messages
- Ensure all dependencies are in `package.json`
- Verify your repo has `server.js`

**API Not Working:**
- Verify your API key is valid
- Check OpenRouter has credits
- Look at browser console for errors (F12)

**Changes Not Showing:**
- Clear browser cache (Ctrl+Shift+R)
- Wait 2-3 minutes for Render to redeploy
- Check Render dashboard shows "Live" status

### Resources
- Workshop Documentation: [Link to your workshop docs]
- OpenRouter Docs: https://openrouter.ai/docs
- Meta AI Cookbook: https://github.com/meta-llama/llama-cookbook
- Render Docs: https://render.com/docs

### Support
- Email: [Your support email]
- Slack/Discord: [Your community link]
- Office Hours: [Your schedule]

---

## Submission Checklist

Before submitting your project:

- [ ] App is successfully deployed to Render
- [ ] All features work (chat, summarise, etc.)
- [ ] Registered on analytics portal
- [ ] GitHub repo is public
- [ ] README updated with your deployment URL
- [ ] Code is clean and commented
- [ ] No API keys committed to GitHub

---

## Congratulations!

You've successfully deployed your Meta AI-powered application!

**Share your deployment URL:**
```
https://meta-ai-workshop-YOUR_NAME.onrender.com
```

Keep building, experimenting, and learning!

---

## Next Steps

1. **Explore Meta AI Models**: Try different Llama models
2. **Add New Features**: Implement image analysis, RAG, etc.
3. **Optimise Performance**: Add caching, rate limiting
4. **Share Your Work**: Post on LinkedIn, Twitter
5. **Get Feedback**: Share with peers and iterate

**Happy coding!**
