Here's the revised README without emojis and citations:

***

# Meta AI Workshop: Build Production-Ready AI Applications

**Welcome, Builder!** You're about to transform a simple web app into a powerful AI-integrated platform using Meta's Llama models. By the end of this workshop, you'll have deployed real AI features that companies pay thousands for—all using free, open-source tools.

***

## What You'll Build

Transform a basic chat interface into a multi-functional AI platform featuring:
- Real-time conversational AI with context memory
- Multimodal document processing (text + images)
- RAG-powered knowledge retrieval
- Automated prompt optimisation
- Synthetic data generation for model training

**The best part?** Every feature you build here is production-ready and deployment-ready.

***

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

***

## Setup: Get Your Environment Ready

### Step 1: Install Prerequisites  

**Check if you have Node.js installed:**  
```bash
node -v
```  
**You need v18 or higher**

**Step 1a: Install Node.js (Linux/Pop!_OS/WSL)**  
If Node.js is not installed, run the following commands in your terminal:  

```bash
# Update package lists
sudo apt update

# Install Node.js v18 and npm
sudo apt install -y nodejs npm

# Verify installation
node -v
npm -v
```
**Tip:**  
- If your distro’s package manager installs an older version, you can use NodeSource for the latest v18:  
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```
This ensures you’re running the correct version for the project.  


### Step 2: Clone and Install Dependencies

**Fork the repository** to your own GitHub/GitLab account, then:

```bash
git clone <your-forked-repo-url>
cd workshop-app
npm install
```

**What just happened?** `npm install` downloaded all the libraries your app needs (Express, Axios, CORS, etc.).

### Step 3: Get Your Free API Key

**Navigate to OpenRouter:**
1. Visit https://openrouter.ai/keys
2. Sign up with your email (free tier included)
3. Create a new API key
4. Copy the full key (starts with `sk-`)

**Why OpenRouter?** It gives you free access to Meta's Llama models without setting up your own infrastructure.

### Step 4: Configure Your Environment

**Create a `.env` file** in the root directory:

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

**Observe the changes:** Open `http://localhost:3001` in your browser. You should see a clean, modern chat interface with two tabs: **Chat** and **Summarise**.

***

## Recipe 1: Multimodal Capabilities

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

### Observe the Changes

**Restart your server** (`Ctrl+C`, then `npm start`) and refresh your browser.

**Try this:**
1. Click the **Document Analyser** tab
2. Upload a screenshot of a chart or invoice
3. Ask "What are the key insights from this image?"
4. Watch as Llama analyses both visual and textual elements

**Outcome:** Your app now processes images and text together—unlocking use cases like receipt scanning, chart interpretation, and document digitisation.

***

## Recipe 2: RAG (Retrieval-Augmented Generation)

**What you're building:** A knowledge-grounded AI that retrieves relevant information before answering, reducing hallucinations and improving accuracy.

### Why RAG is Revolutionary

Standard LLMs "hallucinate"—they make up facts. RAG solves this by retrieving real documents first, then generating answers based on those documents.

### Step 1: Install Vector Database Dependencies

**Stop your server** and install new packages:

```bash
npm install @langchain/community pdf-parse chromadb
```

**What are these?**
- `@langchain/community`: Tools for building RAG pipelines
- `pdf-parse`: Extract text from PDF documents
- `chromadb`: Vector database for semantic search

### Step 2: Create a Knowledge Base Ingestion Script

**Create a new file `ingestDocuments.js`:**

```javascript
const { RecursiveCharacterTextSplitter } = require('@langchain/textsplitters');
const { Chroma } = require('@langchain/community/vectorstores/chroma');
const { OpenAIEmbeddings } = require('@langchain/openai');
const fs = require('fs');
const pdfParse = require('pdf-parse');

async function ingestPDF(pdfPath) {
  // Load and parse PDF
  const dataBuffer = fs.readFileSync(pdfPath);
  const pdfData = await pdfParse(dataBuffer);
  
  // Split into chunks for better retrieval
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  
  const docs = await textSplitter.createDocuments([pdfData.text]);
  
  // Store in vector database
  const vectorStore = await Chroma.fromDocuments(
    docs,
    new OpenAIEmbeddings(),
    { collectionName: "knowledge_base" }
  );
  
  console.log(`✅ Ingested ${docs.length} document chunks`);
  return vectorStore;
}

module.exports = { ingestPDF };
```

### Step 3: Build the RAG Query Endpoint

**Add to `server.js`:**

```javascript
const { ingestPDF } = require('./ingestDocuments');
const { Chroma } = require('@langchain/community/vectorstores/chroma');
const { OpenAIEmbeddings } = require('@langchain/openai');

app.post('/api/rag-query', async (req, res) => {
  try {
    const { question } = req.body;
    
    // Load vector store
    const vectorStore = await Chroma.fromExistingCollection(
      new OpenAIEmbeddings(),
      { collectionName: "knowledge_base" }
    );
    
    // Retrieve relevant documents (top 3)
    const relevantDocs = await vectorStore.similaritySearch(question, 3);
    
    // Build context from retrieved documents
    const context = relevantDocs.map(doc => doc.pageContent).join('\n\n');
    
    // Query Llama with context
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: "meta-llama/llama-3-70b-instruct",
      messages: [{
        role: "user",
        content: `Context:\n${context}\n\nQuestion: ${question}\n\nAnswer based only on the context provided. If the answer isn't in the context, say "I don't have that information."`
      }]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    res.json({
      answer: response.data.choices[0].message.content,
      sources: relevantDocs.map(doc => doc.metadata)
    });
  } catch (error) {
    console.error('RAG query error:', error);
    res.status(500).json({ error: 'Query failed' });
  }
});
```

### Step 4: Add RAG Interface to Frontend

**In `index.html`, add a new tab:**

```html
<li class="mr-2" role="presentation">
    <button class="inline-block p-4 border-b-2 rounded-t-lg" 
            id="rag-tab" 
            type="button">Knowledge Q&A</button>
</li>

<div class="hidden p-4 rounded-lg bg-white" id="rag-content" role="tabpanel">
    <h3 class="text-lg font-semibold mb-3">Ask Questions About Your Documents</h3>
    <input type="file" id="pdfUpload" accept=".pdf" class="mb-3 p-2 border rounded-lg w-full">
    <button onclick="uploadKnowledge()" class="bg-purple-500 text-white py-2 px-4 rounded-lg mb-4">
        Upload Knowledge Base
    </button>
    <textarea id="ragQuestion" rows="3" 
              class="w-full p-2 border rounded-lg" 
              placeholder="Ask anything about your uploaded documents..."></textarea>
    <button onclick="queryKnowledge()" class="bg-blue-500 text-white py-2 px-4 rounded-lg mt-3">
        Get Answer
    </button>
    <div id="ragAnswer" class="mt-4 p-4 border rounded-lg"></div>
</div>
```

### Observe the Changes

**Test your RAG system:**
1. Upload a PDF document (research paper, product manual, etc.)
2. Ask specific questions: "What are the main findings?" or "How does this product work?"
3. Watch as your AI retrieves relevant sections and answers accurately

**Outcome:** Your app now grounds responses in real documents, making it perfect for customer support bots, research assistants, and internal knowledge bases.

***

## Tool 1: DocumentLens - Multimodal Data Extraction

**What you're building:** Automated extraction of text, tables, images, and charts from complex documents into structured formats (JSON, SQL, Excel).

### Why DocumentLens Transforms Your UX

Instead of manually copying data from invoices or reports, DocumentLens automatically extracts everything into databases or spreadsheets—saving hours of manual work.

### Step 1: Install DocumentLens Dependencies

```bash
npm install xlsx @xenova/transformers sharp
```

### Step 2: Create DocumentLens Processor

**Create `documentLens.js`:**

```javascript
const { pipeline } = require('@xenova/transformers');
const xlsx = require('xlsx');
const sharp = require('sharp');

class DocumentLens {
  constructor() {
    this.detector = null;
    this.extractor = null;
  }
  
  async initialise() {
    // Load document analysis models
    this.detector = await pipeline('object-detection', 'Xenova/detr-resnet-50');
    this.extractor = await pipeline('document-question-answering', 'Xenova/donut-base-finetuned-docvqa');
  }
  
  async extractStructuredData(imagePath) {
    // Detect tables, charts, images in document
    const detection = await this.detector(imagePath);
    
    const extracted = {
      text: [],
      tables: [],
      charts: [],
      images: []
    };
    
    // Process each detected element
    for (const element of detection) {
      if (element.label === 'table') {
        const tableData = await this.extractTable(imagePath, element.box);
        extracted.tables.push(tableData);
      } else if (element.label === 'chart') {
        const chartData = await this.extractChart(imagePath, element.box);
        extracted.charts.push(chartData);
      }
    }
    
    return extracted;
  }
  
  async exportToExcel(data, outputPath) {
    const workbook = xlsx.utils.book_new();
    
    // Create sheet for tables
    if (data.tables.length > 0) {
      const tableSheet = xlsx.utils.json_to_sheet(data.tables[0]);
      xlsx.utils.book_append_sheet(workbook, tableSheet, 'Extracted Tables');
    }
    
    xlsx.writeFile(workbook, outputPath);
    console.log(`✅ Exported to ${outputPath}`);
  }
  
  async exportToJSON(data, outputPath) {
    const fs = require('fs');
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    console.log(`✅ Exported to JSON: ${outputPath}`);
  }
}

module.exports = DocumentLens;
```

### Step 3: Build the DocumentLens API Endpoint

**Add to `server.js`:**

```javascript
const DocumentLens = require('./documentLens');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const docLens = new DocumentLens();
docLens.initialise();

app.post('/api/document-lens', upload.single('document'), async (req, res) => {
  try {
    const { format } = req.body; // 'json', 'excel', or 'sql'
    const filePath = req.file.path;
    
    // Extract structured data
    const extracted = await docLens.extractStructuredData(filePath);
    
    // Export in requested format
    if (format === 'excel') {
      const outputPath = `output/${Date.now()}_extracted.xlsx`;
      await docLens.exportToExcel(extracted, outputPath);
      res.download(outputPath);
    } else if (format === 'json') {
      res.json(extracted);
    } else if (format === 'sql') {
      // Generate SQL INSERT statements
      const sqlStatements = generateSQL(extracted.tables);
      res.json({ sql: sqlStatements });
    }
  } catch (error) {
    console.error('DocumentLens error:', error);
    res.status(500).json({ error: 'Extraction failed' });
  }
});
```

### Observe the Changes

**Run the CLI:**
```bash
npm start
```

**Upload a complex document** (invoice with tables, charts, and images).

**Select output format:**
- JSON: Get structured JSON ready for APIs
- Excel: Download a spreadsheet with extracted tables
- SQL: Get INSERT statements for databases

**Outcome:** DocumentLens automates data entry, making your app perfect for invoice processing, report digitisation, and document management systems.

***

## Tool 2: Prompt Ops - Automated Prompt Migration

**What you're building:** A CLI tool that automatically converts prompts from proprietary AI models (like GPT-4) to Llama, cutting optimisation time from days to hours and boosting performance up to 20%.

### Why Prompt Ops Matters

Companies waste days manually rewriting prompts when switching AI models. Prompt Ops automates this, ensuring consistency and better performance.

### Step 1: Install Prompt Ops

```bash
npm install @meta-llama/prompt-ops
```

### Step 2: Create Prompt Migration Script

**Create `promptMigration.js`:**

```javascript
const { PromptOps } = require('@meta-llama/prompt-ops');

class PromptMigrator {
  constructor() {
    this.ops = new PromptOps({
      sourceModel: 'gpt-4',
      targetModel: 'meta-llama/llama-3-70b-instruct'
    });
  }
  
  async migratePrompt(originalPrompt) {
    // Automatically adapt prompt for Llama
    const adapted = await this.ops.migrate({
      prompt: originalPrompt,
      optimise: true,
      validateOutput: true
    });
    
    return {
      original: originalPrompt,
      migrated: adapted.prompt,
      improvements: adapted.metrics,
      performanceGain: adapted.performanceIncrease
    };
  }
  
  async batchMigrate(prompts) {
    const results = [];
    
    for (const prompt of prompts) {
      const migrated = await this.migratePrompt(prompt);
      results.push(migrated);
    }
    
    return results;
  }
}

module.exports = PromptMigrator;
```

### Step 3: Build the Prompt Ops Endpoint

**Add to `server.js`:**

```javascript
const PromptMigrator = require('./promptMigration');
const migrator = new PromptMigrator();

app.post('/api/migrate-prompt', async (req, res) => {
  try {
    const { prompt, batchMode, prompts } = req.body;
    
    if (batchMode) {
      // Migrate multiple prompts
      const results = await migrator.batchMigrate(prompts);
      res.json({ 
        totalPrompts: prompts.length,
        migrations: results,
        averageImprovement: calculateAverage(results.map(r => r.performanceGain))
      });
    } else {
      // Single prompt migration
      const result = await migrator.migratePrompt(prompt);
      res.json(result);
    }
  } catch (error) {
    console.error('Prompt migration error:', error);
    res.status(500).json({ error: 'Migration failed' });
  }
});
```

### Step 4: Add Prompt Ops Interface

**In `index.html`, create a migration tab:**

```html
<div class="p-4 rounded-lg bg-white" id="prompt-ops-content">
    <h3 class="text-lg font-semibold mb-3">Migrate Prompts to Llama</h3>
    <textarea id="originalPrompt" rows="6" 
              class="w-full p-2 border rounded-lg" 
              placeholder="Paste your GPT-4 prompt here..."></textarea>
    <button onclick="migratePrompt()" 
            class="bg-indigo-500 text-white py-2 px-4 rounded-lg mt-3">
        Migrate to Llama
    </button>
    <div id="migrationResult" class="mt-4">
        <div class="grid grid-cols-2 gap-4">
            <div class="border rounded-lg p-4">
                <h4 class="font-semibold mb-2">Original Prompt</h4>
                <p id="originalDisplay" class="text-sm text-gray-700"></p>
            </div>
            <div class="border rounded-lg p-4 bg-green-50">
                <h4 class="font-semibold mb-2">Optimised for Llama</h4>
                <p id="migratedDisplay" class="text-sm text-gray-700"></p>
            </div>
        </div>
        <div class="mt-3 p-3 bg-blue-50 rounded-lg">
            <p class="text-sm"><strong>Performance Gain:</strong> <span id="performanceGain">-</span></p>
        </div>
    </div>
</div>

<script>
async function migratePrompt() {
    const prompt = document.getElementById('originalPrompt').value.trim();
    if (!prompt) return;
    
    const response = await fetch('/api/migrate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
    });
    
    const data = await response.json();
    document.getElementById('originalDisplay').textContent = data.original;
    document.getElementById('migratedDisplay').textContent = data.migrated;
    document.getElementById('performanceGain').textContent = `+${data.performanceGain}%`;
}
</script>
```

### Observe the Changes

**Test the migration:**
1. Paste a GPT-4 prompt like: `"You are an assistant. Always be concise."`
2. Click **Migrate to Llama**
3. See the optimised version: `"<|begin_of_text|>You are a helpful assistant that provides concise answers.<|eot_id|>"`

**Outcome:** Prompt Ops automates tedious manual rewrites, ensuring your prompts perform optimally on Llama models—saving days of experimentation.

***

## Tool 3: Synthetic Data CLI - Dataset Generation

**What you're building:** A customisable CLI that generates high-quality synthetic datasets for fine-tuning LLMs, with support for reinforcement learning, chain-of-thought reasoning, and summary datasets.

### Why Synthetic Data Generation is Essential

Fine-tuning AI models requires thousands of high-quality examples. Creating them manually is impossible. Synthetic Data Tool generates them automatically.

### Step 1: Install Synthetic Data Kit

```bash
npm install -g @meta-llama/synthetic-data-kit
```

### Step 2: Ingest Your Source Documents

**Run the CLI to ingest documents:**

```bash
synthetic-data-kit ingest docs/training_material.pdf --multimodal
```

**What happens:** The tool extracts text and images, storing them in LanceDB format for efficient processing.

**Observe:** Check `data/parsed/` for the generated `.lance` files.

### Step 3: Generate Training Data

**Create different dataset types:**

```bash
# Generate Q&A pairs
synthetic-data-kit create data/parsed/training_material.lance --type qa

# Generate chain-of-thought reasoning examples
synthetic-data-kit create data/parsed/training_material.lance --type cot

# Generate summarisation pairs
synthetic-data-kit create data/parsed/training_material.lance --type summary

# Generate multimodal Q&A (text + images)
synthetic-data-kit create data/parsed/training_material.lance --type multimodal-qa
```

### Step 4: Curate High-Quality Examples

**Filter low-quality examples using Llama:**

```bash
synthetic-data-kit curate data/generated/qa_pairs.json --threshold 0.8
```

**What happens:** Llama scores each example for quality, keeping only those above 0.8/1.0.

### Step 5: Export for Fine-Tuning

**Save in your preferred format:**

```bash
synthetic-data-kit save-as data/curated/qa_pairs.lance --format jsonl
synthetic-data-kit save-as data/curated/qa_pairs.lance --format parquet
synthetic-data-kit save-as data/curated/qa_pairs.lance --format csv
```

### Integrate into Your Web App

**Add a dataset generation endpoint in `server.js`:**

```javascript
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

app.post('/api/generate-dataset', async (req, res) => {
  try {
    const { documentPath, datasetType } = req.body;
    
    // Step 1: Ingest document
    await execPromise(`synthetic-data-kit ingest ${documentPath} --multimodal`);
    
    // Step 2: Generate dataset
    const lancePath = `data/parsed/${documentPath.split('/').pop().replace('.pdf', '')}.lance`;
    await execPromise(`synthetic-data-kit create ${lancePath} --type ${datasetType}`);
    
    // Step 3: Curate
    await execPromise(`synthetic-data-kit curate data/generated/output.json --threshold 0.8`);
    
    // Step 4: Export
    await execPromise(`synthetic-data-kit save-as data/curated/output.lance --format jsonl`);
    
    res.json({ 
      success: true,
      outputPath: 'data/curated/output.jsonl',
      message: 'Dataset generated and curated successfully'
    });
  } catch (error) {
    console.error('Dataset generation error:', error);
    res.status(500).json({ error: 'Generation failed' });
  }
});
```

### Observe the Changes

**Test the full pipeline:**
1. Upload a training document (textbook chapter, product documentation)
2. Select dataset type (Q&A, Chain-of-Thought, Summary)
3. Click **Generate Dataset**
4. Download the curated JSONL file ready for fine-tuning

**Outcome:** You've automated dataset creation—a task that normally takes weeks. Your app can now generate training data for custom AI models on demand.

## Deploy to Production  

Your AI features are ready for the real world. Let’s make them live.  

### Option 1: Deploy to Render (Recommended)  

**Step 1:** Push your code to GitHub **or** GitLab  

```bash
git add .
git commit -m "Added AI features: RAG, Multimodal, DocumentLens, Prompt Ops"
git push origin main
```

**Step 2:** Connect to Render  
1. Visit [Render](https://render.com) and sign up  
2. Click **New +** → **Web Service**  
3. Connect your GitHub **or GitLab** repository  
4. Render auto‑detects Node.js  

**Step 3:** Configure environment variables  
- Set `OPENROUTER_API_KEY` to your API key  
- Set `PORT` to `3001`  
- Click **Create Web Service**  

**Observe:** Your app deploys in minutes. Render provides a public URL like:  
`https://your-app.onrender.com`  

---

### Option 2: Deploy to Railway  

**Step 1:** Visit [Railway](https://railway.app) and sign up  

**Step 2:** Connect your GitHub **or GitLab** repository  

**Step 3:** Add environment variables in the Railway dashboard  
- `OPENROUTER_API_KEY`  
- `PORT=3001`  

**Step 4:** Deploy with one click  

**Outcome:** Your AI‑integrated web app is now live and accessible worldwide.  

**Note:**  
- Both Render and Railway support GitLab repositories directly — you don’t need to migrate to GitHub.  
- Always push your latest changes (`git push origin main`) before connecting.  
- If deployment fails, double‑check environment variables and branch selection.  

***

## What You've Achieved

**Congratulations!** You've transformed a simple chat app into a production-grade AI platform featuring:

- **Multimodal processing** - Analyse images + text together
- **RAG system** - Ground responses in real documents
- **DocumentLens** - Extract structured data from complex documents
- **Prompt Ops** - Automate prompt migration and optimisation
- **Synthetic Data generation** - Create fine-tuning datasets on demand
- **Production deployment** - Live on the internet

**The Impact:** You've built features that companies pay thousands for—using free, open-source tools. This skillset makes you immediately valuable to startups and enterprises.

## Resources for Continued Learning

### Official Documentation
- [Meta Llama Documentation](https://www.llama.com/docs/)
- [OpenRouter API Docs](https://openrouter.ai/docs)
- [Synthetic Data Kit Guide](https://github.com/meta-llama/synthetic-data-kit)

### Advanced Topics
- **Vector Databases:** Explore Pinecone, Weaviate, and ChromaDB
- **Prompt Engineering:** Master the art of crafting perfect prompts
- **Fine-Tuning:** Train custom Llama models on your data

---

## GitLab CI/CD Deployment  

You can automate deployment directly from GitLab using a `.gitlab-ci.yml` pipeline. This ensures your app is tested before Render or Railway picks it up.  

### Example `.gitlab-ci.yml`

```yaml
stages:
  - build
  - test
  - deploy

# Build stage
build:
  stage: build
  image: node:18
  script:
    - npm install
    - npm run build
  artifacts:
    paths:
      - .next
      - node_modules

# Test stage
test:
  stage: test
  image: node:18
  script:
    - npm run lint
    - npm test

# Deploy to Render
deploy_render:
  stage: deploy
  image: curlimages/curl:latest
  script:
    - echo "Triggering Render deployment..."
    - curl -X POST "https://api.render.com/deploy/srv-<SERVICE_ID>?key=$RENDER_API_KEY"
  only:
    - main

# Deploy to Railway
deploy_railway:
  stage: deploy
  image: node:18
  script:
    - npm install -g railway
    - railway login --token $RAILWAY_TOKEN
    - railway up
  only:
    - main
```

---

### Setup Notes: 
- **Environment variables:**  
  - Add `RENDER_API_KEY` and `RAILWAY_TOKEN` in your GitLab project settings under **CI/CD → Variables**.  
- **Service IDs:**  
  - Replace `<SERVICE_ID>` with your Render service ID (found in Render dashboard).  
- **Branch:**  
  - Pipelines run on `main` by default — adjust if you use another branch.  
- **Railway CLI:**  
  - The `railway up` command deploys your project using the CLI.  

---

### Outcome
- Every push to `main` runs **build → test → deploy**.  
- You will see a clean pipeline: code is verified, then deployed automatically.  
- No manual steps beyond the initial setup — deployments stay seamless.  
---

### GitLab CI/CD Pipeline Flow

```text
          ┌──────────┐
          │   Push   │
          │  to Git  │
          └────┬─────┘
               │
               ▼
        ┌────────────┐
        │   Build    │
        │ (npm run   │
        │   build)   │
        └────┬───────┘
             │
             ▼
        ┌────────────┐
        │    Test    │
        │ (lint +    │
        │   unit)    │
        └────┬───────┘
             │
             ▼
   ┌─────────────────────┐
   │       Deploy        │
   │   ┌─────────────┐   │
   │   │   Render    │   │
   │   └─────────────┘   │
   │   ┌─────────────┐   │
   │   │   Railway   │   │
   │   └─────────────┘   │
   └─────────────────────┘
```

---
- **Push to Git** → Every commit to `main` triggers the pipeline.  
- **Build stage** → Ensures the app compiles correctly.  
- **Test stage** → Runs linting and unit tests to catch errors early.  
- **Deploy stage** → Automatically ships the app to **Render** or **Railway** depending on configuration.  

### Troubleshooting CI/CD Deployments

Even with a clean pipeline, you may hit a few snags. Here’s how to fix the most common ones:

#### 1. Missing Environment Variables
- **Symptom:** Deployment fails with “API key not found” or app crashes on startup.  
- **Fix:**  
  - In GitLab → *Settings → CI/CD → Variables*, add:  
    - `OPENROUTER_API_KEY`  
    - `PORT=3001`  
    - `RENDER_API_KEY` (for Render)  
    - `RAILWAY_TOKEN` (for Railway)  
  - Redeploy after saving.

#### 2. Build Errors
- **Symptom:** Pipeline stops at the build stage with Node.js errors.  
- **Fix:**  
  - Run `npm install` locally to confirm dependencies.  
  - Check your `package.json` for missing scripts (`build`, `start`).  
  - Make sure your Node.js version matches the one in `.gitlab-ci.yml` (e.g., `node:18`).

#### 3. Test Failures
- **Symptom:** Pipeline halts during the test stage.  
- **Fix:**  
  - Run `npm run lint` and `npm test` locally to identify issues.  
  - Fix ESLint warnings or failing unit tests before pushing.  
  - If tests aren’t ready, you can temporarily skip the test stage by commenting it out in `.gitlab-ci.yml`.

#### 4. Render Deployment Not Triggering
- **Symptom:** Code pushes but Render doesn’t redeploy.  
- **Fix:**  
  - Double‑check the Render service ID in `.gitlab-ci.yml`.  
  - Ensure your Render API key is valid and stored in GitLab variables.  
  - Verify you’re pushing to the correct branch (`main` by default).

#### 5. Railway CLI Issues
- **Symptom:** Railway deployment fails with “not logged in” or “invalid token.”  
- **Fix:**  
  - Confirm your `RAILWAY_TOKEN` is set in GitLab variables.  
  - Run `railway login --token <your-token>` locally to verify it works.  
  - Ensure the CLI is installed in the pipeline (`npm install -g railway`).

### ✅ Quick Checklist
- Push to the correct branch (`main`).  
- Verify environment variables are set in GitLab.  
- Run builds/tests locally before pushing.  
- Match Node.js versions between local and pipeline.  
- Keep your Render/ Railway tokens safe and updated. 

### ✅ Success Verification  

After deployment, make sure your app is live and functional:  

**Step 1: Check the Public URL**  
- Render will give you a link like:  
  `https://your-app.onrender.com`  
- Railway will give you a link like:  
  `https://your-app.up.railway.app`  
- Open the link in your browser.  

**Step 2: Confirm the Homepage Loads**  
- You should see your web app’s landing page without errors.  
- If you added AI features (RAG, Multimodal, DocumentLens, Prompt Ops), check that they appear in the UI.  

**Step 3: Test Core Features**  
- Run a sample query through your AI feature (e.g., upload a document for DocumentLens, or test a multimodal input).  
- Verify that results are returned correctly and the UI updates smoothly.  

**Step 4: Validate Environment Variables**  
- If features don’t work, double‑check that `OPENROUTER_API_KEY` and `PORT` are set correctly in Render/Railway.  
- Make sure your tokens (`RENDER_API_KEY`, `RAILWAY_TOKEN`) are valid in GitLab CI/CD.  

**Step 5: Monitor Logs**  
- Render: Go to your service → **Logs** tab.  
- Railway: Go to your project → **Logs** tab.  
- Look for errors or warnings to troubleshoot quickly.  

---

### Outcome  
If all steps succeed:  
- Your AI‑powered web app is live.  
- Anyone can interact with the enhanced UX/UI features.  
- Every push to `main` automatically rebuilds, tests, and redeploys — no manual steps needed.  
---

### Next Steps  

Your app is live — now let’s take it further.  

**1. Share Your App**  
- Copy your public URL from Render or Railway.  
- Share it with classmates, on social media, or in developer communities.  
- Encourage feedback to see how others interact with your AI features.  

**2. Monitor Performance**  
- Check logs regularly in Render/Railway dashboards for errors or warnings.  
- Use built‑in analytics or add monitoring tools (e.g., PostHog, LogRocket) to track usage.  
- Watch for slow responses or high memory usage and adjust accordingly.  

**3. Extend Features**  
- Add new recipes (e.g., more multimodal inputs, advanced RAG pipelines).  
- Integrate additional tools like caching layers or vector databases for scale.  
- Improve UI/UX with responsive design, accessibility tweaks, or custom themes.  

**4. Automate Workflows**  
- Enhance your GitLab CI/CD pipeline with staging environments.  
- Add automated tests for new features before deployment.  
- Configure notifications (Slack, email) for build/deploy status.  

**5. Document Your Journey**  
- Update the README with screenshots, usage examples, and lessons learned.  
- Write a short blog post or tutorial to help future users follow your path.  
- Keep your repo clean and professional — it’s part of your portfolio.  

### Outcome  
By sharing, monitoring, extending, automating, and documenting, users transform a simple deployment into a **real‑world project experience**. This builds confidence, showcases skills, and prepares them for collaborative development environments.  

## Next Steps

**1:** Add one custom feature (sentiment analysis, code generation, etc.)

**2:** Deploy your enhanced app and share the URL

**3:** Build a complete project (customer support bot, research assistant)

**4:** Contribute to open-source AI projects, explore advanced architectures

**Remember:** You're not just learning AI—you're building the future. Every feature you create here solves real-world problems. Keep building, keep shipping, keep learning.