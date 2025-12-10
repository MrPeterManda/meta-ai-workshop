# Meta AI Workshop: Build Production-Ready AI Applications

**Welcome, Builder!** You're about to transform a simple web app into a powerful AI-integrated platform using Meta's Llama models. By the end of this workshop, you'll have deployed real AI features that companies pay thousands for—all using free, open-source tools.

---

## What You'll Build

Transform a basic chat interface into a multi-functional AI platform featuring:
- Real-time conversational AI with context memory
- Multimodal document processing (text + images)
- Production-ready deployment

**The best part?** Every feature you build here is production-ready and deployment-ready.

---

## Understanding Your Codebase

Before we start building, let's map out what you already have. This foundation will power all your AI features.

### Project Structure

```
workshop-app/
├── server.js              # Backend API server (your AI brain)
├── public/
│   └── index.html         # Frontend interface (user-facing UI)
├── cookbook-example.js    # Meta's text summarisation recipe
├── markdownRenderer.js    # Formats AI responses beautifully
├── package.json           # Project dependencies
├── .env                   # Your secret API keys (never commit this!)
└── README.md              # You are here!
```

### How Data Flows

```
User types message in index.html
        ↓
Express server (server.js) receives request
        ↓
Server calls OpenRouter API with your key
        ↓
Meta Llama processes the request
        ↓
Response streams back to browser
        ↓
Markdown renderer makes it beautiful
```

**Why this matters:** Understanding this flow helps you add new AI features without breaking existing ones.

---

## Setup: Get Your Environment Ready

### Step 1: Install Prerequisites

**Check if you have Node.js installed:**
```bash
node -v
```
**You need v18 or higher**

**If Node.js is not installed (Linux/Pop!_OS/WSL):**

```bash
# Update package lists
sudo apt update

# Install Node.js v18 and npm
sudo apt install -y nodejs npm

# Verify installation
node -v
npm -v
```

**Tip:** If your distro's package manager installs an older version, use NodeSource for the latest v18:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

### Step 2: Clone and Install Dependencies

**Fork the repository** to your own GitHub/GitLab account, then:

```bash
git clone <your-forked-repo-url>
cd workshop-app
npm install
```

**What just happened?** `npm install` downloaded all the libraries your app needs (Express, Axios, CORS, etc.).

### Step 3: Get Your Free API Key

1. Visit https://openrouter.ai/keys
2. Sign up with your email (free tier included)
3. Create a new API key
4. Copy the full key (starts with `sk-`)

**Why OpenRouter?** It gives you free access to Meta's Llama models without setting up your own infrastructure.

### Step 4: Configure Your Environment

**Create a `.env` file** in the `workshop-app` directory:

```env
OPENROUTER_API_KEY=sk-your-actual-key-here
PORT=3001
```

**Security check:** Make sure `.env` is in your `.gitignore`. Never commit API keys to GitHub/GitLab.

### Step 5: Launch Your Application

**Run the server:**
```bash
npm start
```

**Visit:** Open `http://localhost:3001` in your browser. You should see a clean, modern chat interface with two tabs: **Chat** and **Summarise**.

---
## Deploy to Production

- **To complete the Google Form and Meta AI Workshop Registration Form please first deploy your web app to render.com to get your web app URL.**
- **For detailed deployment instructions, see: [STUDENT-DEPLOYMENT-GUIDE.md](STUDENT-DEPLOYMENT-GUIDE.md):**

- [**Meta AI Workshop Registration Form:**](https://meta-workshop-analytics.onrender.com)

- Fill in the **[workshop feedback form](https://docs.google.com/forms/d/e/1FAIpQLSewy25dhnbzeYtmrQrUMJETa5jAdyR-51b2tIubT5CLEKz33A/viewform?usp=publish-editor)**
---

## Core Workshop: Build Multimodal AI

**What you're building:** Enable your app to process both text and images, unlocking document analysis and visual question answering.

### Why Multimodal Matters

Traditional AI only processes text. Multimodal AI understands images, charts, and diagrams—making it perfect for analysing invoices, extracting data from screenshots, or interpreting graphs.

### Step 1: Add Multimodal Input to the Frontend

**Open `index.html`** and add a new tab after the Summarise tab:

```html
<li class="mr-2" role="presentation">
    <button class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300" 
            id="multimodal-tab" 
            data-tabs-target="#multimodal-content" 
            type="button" 
            role="tab">Document Analyser</button>
</li>
```

### Step 2: Create the Multimodal Interface

**Add this content section below the existing tabs:**

```html
<div class="hidden p-4 rounded-lg bg-white" id="multimodal-content" role="tabpanel">
    <h3 class="text-lg font-semibold mb-3">Upload Document + Ask Questions</h3>
    <input type="file" id="imageUpload" accept="image/*" class="mb-3 p-2 border rounded-lg w-full">
    <img id="preview" class="max-w-md mb-3 hidden rounded-lg shadow-md" />
    <textarea id="imageQuestion" rows="3" 
              class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" 
              placeholder="Ask about this document..."></textarea>
    <button onclick="analyseDocument()" 
            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mt-3">
        Analyse Document
    </button>
    <div id="analysisResult" class="mt-4 p-4 border rounded-lg bg-gray-50"></div>
</div>
```

### Step 3: Add JavaScript Handler for Image Upload

**In the `<script>` section of `index.html`, add:**

```javascript
let uploadedImage = null;

document.getElementById('imageUpload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            uploadedImage = event.target.result;
            document.getElementById('preview').src = uploadedImage;
            document.getElementById('preview').classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }
});

async function analyseDocument() {
    const question = document.getElementById('imageQuestion').value.trim();
    const result = document.getElementById('analysisResult');

    if (!uploadedImage || !question) {
        result.innerHTML = '<p class="text-red-500">Please upload an image and ask a question.</p>';
        return;
    }

    result.innerHTML = '<p>Analysing document...</p>';

    try {
        const response = await fetch('/api/multimodal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                image: uploadedImage, 
                question: question 
            })
        });

        const data = await response.json();
        result.innerHTML = `<div class="message-content">${marked.parse(data.answer)}</div>`;
    } catch (error) {
        result.innerHTML = '<p class="text-red-500">Analysis failed. Try again.</p>';
    }
}
```

### Step 4: Build the Multimodal Endpoint

**In `server.js`, add this endpoint before `app.listen`:**

```javascript
app.post('/api/multimodal', async (req, res) => {
  try {
    const { image, question } = req.body;

    if (!image || !question) {
      return res.status(400).json({ error: 'Image and question required' });
    }

    // Use Llama 3.2 Vision model for multimodal processing
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: "meta-llama/llama-3.2-90b-vision-instruct",
      messages: [{
        role: "user",
        content: [
          {
            type: "text",
            text: question
          },
          {
            type: "image_url",
            image_url: {
              url: image
            }
          }
        ]
      }]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.json({ answer: response.data.choices[0].message.content });
  } catch (error) {
    console.error('Multimodal error:', error);
    res.status(500).json({ error: 'Analysis failed' });
  }
});
```

### Test Your Multimodal Feature

**Restart your server** (`Ctrl+C`, then `npm start`) and refresh your browser.

**Try this:**
1. Click the **Document Analyser** tab
2. Upload a screenshot of a chart or invoice
3. Ask "What are the key insights from this image?"
4. Watch as Llama analyses both visual and textual elements

**Outcome:** Your app now processes images and text together—unlocking use cases like receipt scanning, chart interpretation, and document digitisation.

---
---

## What You've Achieved

**Congratulations!** You've transformed a simple chat app into a production-grade AI platform featuring:

- ✅ **Real-time conversational AI** - Chat with Meta's Llama models
- ✅ **Multimodal processing** - Analyse images + text together
- ✅ **Production deployment** - Live on the internet

**The Impact:** You've built features that companies pay thousands for—using free, open-source tools. This skillset makes you immediately valuable to startups and enterprises.

---

## Advanced Features (Optional)

Want to explore more? Check out these optional guides:

### 🔬 Advanced AI Features
- **[RAG Implementation](ADVANCED-RAG-GUIDE.md)** - Build document-grounded AI that retrieves real information before answering
- **[DocumentLens Tool](DOCUMENTLENS-GUIDE.md)** - Extract structured data (tables, charts) from documents automatically
- **[Prompt Ops CLI](PROMPT-OPS-GUIDE.md)** - Automate prompt migration from GPT-4 to Llama
- **[Synthetic Data Generation](SYNTHETIC-DATA-GUIDE.md)** - Create training datasets for fine-tuning models

### 🚀 DevOps & Deployment
- **[CI/CD Deployment](CICD-DEPLOYMENT.md)** - Set up automated pipelines with GitLab/GitHub Actions

---

## Quick Reference

Need commands fast? See [QUICK-REFERENCE.md](QUICK-REFERENCE.md) for:
- One-page cheat sheet
- Common commands
- Troubleshooting quick fixes

---

## Next Steps

**Share Your Work:**
1. Deploy your enhanced app to Render
2. Share your deployment URL
3. Post on LinkedIn or Twitter with #MetaAI

**Keep Building:**
1. Add one custom feature (sentiment analysis, code generation, etc.)
2. Explore advanced guides for RAG, DocumentLens, etc.
3. Build a complete project (customer support bot, research assistant)
4. Contribute to open-source AI projects

---

## Resources for Continued Learning

### Official Documentation
- [Meta Llama Documentation](https://www.llama.com/docs/)
- [OpenRouter API Docs](https://openrouter.ai/docs)
- [Meta AI Cookbook](https://github.com/meta-llama/llama-cookbook)

### Workshop Support
- **Facilitators:** performance@wethinkcode.co.za; lawrence@wethinkcode.co.za
- **Analytics Portal:** https://meta-workshop-analytics.onrender.com

---

**Remember:** You're not just learning AI—you're building the future. Every feature you create here solves real-world problems. Keep building, keep shipping, keep learning. 🚀
