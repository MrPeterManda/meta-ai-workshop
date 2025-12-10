# Advanced Guide: RAG (Retrieval-Augmented Generation)

**What you're building:** A knowledge-grounded AI that retrieves relevant information before answering, reducing hallucinations and improving accuracy.

---

## Why RAG is Revolutionary

Standard LLMs "hallucinate"—they make up facts. RAG solves this by retrieving real documents first, then generating answers based on those documents.

This makes your AI perfect for:
- Customer support bots that answer from documentation
- Research assistants that cite sources
- Internal knowledge bases that stay accurate

---

## Prerequisites

Before starting, ensure you have:
- ✅ Completed the main workshop (multimodal recipe)
- ✅ Working Meta AI Workshop application
- ✅ Basic understanding of Node.js and Express

---

## Step 1: Install Vector Database Dependencies

Stop your server and install new packages:

```bash
cd workshop-app
npm install @langchain/community pdf-parse chromadb
```

**What are these?**
- `@langchain/community`: Tools for building RAG pipelines
- `pdf-parse`: Extract text from PDF documents
- `chromadb`: Vector database for semantic search

---

## Step 2: Create Knowledge Base Ingestion Script

Create a new file `ingestDocuments.js` in the `workshop-app/` directory:

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

**What's happening here:**
1. PDF is loaded and text is extracted
2. Text is split into 1000-character chunks with 200-character overlap
3. Chunks are stored in ChromaDB vector database for semantic search

---

## Step 3: Build the RAG Query Endpoint

Add this to your `server.js`:

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

---

## Step 4: Add RAG Interface to Frontend

Add this tab to your `index.html`:

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

Add these JavaScript functions:

```javascript
async function uploadKnowledge() {
    const fileInput = document.getElementById('pdfUpload');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a PDF file');
        return;
    }

    const formData = new FormData();
    formData.append('pdf', file);

    try {
        const response = await fetch('/api/ingest-pdf', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        alert(`✅ Uploaded and indexed ${data.chunkCount} document chunks`);
    } catch (error) {
        console.error('Upload error:', error);
        alert('Failed to upload document');
    }
}

async function queryKnowledge() {
    const question = document.getElementById('ragQuestion').value.trim();
    const answerDiv = document.getElementById('ragAnswer');

    if (!question) return;

    answerDiv.innerHTML = '<p>Searching knowledge base...</p>';

    try {
        const response = await fetch('/api/rag-query', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question })
        });

        const data = await response.json();
        answerDiv.innerHTML = `
            <div class="message-content">${marked.parse(data.answer)}</div>
            <div class="mt-3 text-sm text-gray-600">
                <strong>Sources:</strong> ${data.sources.length} document chunks
            </div>
        `;
    } catch (error) {
        console.error('Query error:', error);
        answerDiv.innerHTML = '<p class="text-red-500">Query failed. Try again.</p>';
    }
}
```

---

## Step 5: Add PDF Upload Endpoint

Add this endpoint to `server.js`:

```javascript
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/api/ingest-pdf', upload.single('pdf'), async (req, res) => {
  try {
    const pdfPath = req.file.path;
    const vectorStore = await ingestPDF(pdfPath);

    res.json({ 
      success: true,
      chunkCount: vectorStore.memoryVectors.length 
    });
  } catch (error) {
    console.error('Ingestion error:', error);
    res.status(500).json({ error: 'Failed to ingest PDF' });
  }
});
```

Don't forget to install multer:

```bash
npm install multer
```

---

## Testing Your RAG System

1. Restart your server: `npm start`
2. Open your app in the browser
3. Click the **Knowledge Q&A** tab
4. Upload a PDF document (research paper, product manual, etc.)
5. Wait for confirmation
6. Ask specific questions like:
   - "What are the main findings?"
   - "How does this product work?"
   - "What are the key recommendations?"

---

## How RAG Works (Under the Hood)

```
User asks question
        ↓
Vector database finds relevant chunks
        ↓
Context is built from retrieved chunks
        ↓
Llama generates answer using context
        ↓
Response includes sources
```

---

## Advanced Optimisations

### 1. Improve Chunk Size
Experiment with different chunk sizes:
```javascript
const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,  // Smaller chunks = more precise retrieval
    chunkOverlap: 100,
});
```

### 2. Retrieve More Documents
Increase the number of retrieved chunks:
```javascript
const relevantDocs = await vectorStore.similaritySearch(question, 5); // Top 5 instead of 3
```

### 3. Add Metadata Filtering
Filter by document type or date:
```javascript
const relevantDocs = await vectorStore.similaritySearch(question, 3, {
    filter: { documentType: 'technical' }
});
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| **"Cannot find module '@langchain/community'"** | Run `npm install @langchain/community` |
| **PDF not uploading** | Check file size limit, ensure `uploads/` directory exists |
| **No relevant results** | Document may not be indexed yet, check chunk count |
| **Slow queries** | Reduce number of retrieved chunks, optimize chunk size |

---

## Use Cases

**Customer Support Bot:**
- Upload product documentation
- Answer customer questions accurately
- Cite specific manual sections

**Research Assistant:**
- Upload research papers
- Get summaries of key findings
- Compare multiple papers

**Internal Knowledge Base:**
- Upload company policies
- Query HR procedures
- Get instant, accurate answers

---

## Next Steps

1. ✅ Add support for multiple PDFs
2. ✅ Implement document management (list, delete)
3. ✅ Add source highlighting in responses
4. ✅ Experiment with different embedding models
5. ✅ Deploy RAG-enabled app to production

---

## Resources

- [LangChain Documentation](https://js.langchain.com/docs/)
- [ChromaDB Guide](https://docs.trychroma.com/)
- [RAG Best Practices](https://www.pinecone.io/learn/retrieval-augmented-generation/)

---

**Ready to build more?** Return to the [main README](README.md) or explore other advanced guides.
