# Advanced Guide: Synthetic Data Generation

**What you're building:** A system that generates high-quality synthetic datasets for fine-tuning LLMs, with support for reinforcement learning, chain-of-thought reasoning, and summary datasets.

---

## Why Synthetic Data Generation is Essential

Fine-tuning AI models requires thousands of high-quality examples. Creating them manually is impossible. Synthetic data generation automates this process, enabling:
- **Custom model training** without manual labelling
- **Rapid dataset creation** from existing documents
- **Diverse example generation** for better model performance
- **Cost-effective fine-tuning** without expensive annotation

---

## Prerequisites

- ✅ Completed main workshop
- ✅ Understanding of machine learning basics
- ✅ Familiarity with dataset formats (JSON, JSONL, Parquet)

---

## Step 1: Install Synthetic Data Kit

If the official Meta package is available:

```bash
npm install -g @meta-llama/synthetic-data-kit
```

Otherwise, we'll build a custom solution:

```bash
cd workshop-app
npm install pdf-parse fs-extra
```

---

## Step 2: Create Synthetic Data Generator

Create `syntheticDataGenerator.js`:

```javascript
const axios = require('axios');
const pdfParse = require('pdf-parse');
const fs = require('fs-extra');
const path = require('path');

class SyntheticDataGenerator {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://openrouter.ai/api/v1/chat/completions';
  }

  async ingestDocument(filePath) {
    console.log(`📖 Ingesting document: ${filePath}`);

    const dataBuffer = await fs.readFile(filePath);
    const pdfData = await pdfParse(dataBuffer);

    // Split into chunks
    const chunks = this.splitIntoChunks(pdfData.text, 1000);

    console.log(`✅ Ingested ${chunks.length} chunks`);
    return chunks;
  }

  splitIntoChunks(text, chunkSize) {
    const words = text.split(/\s+/);
    const chunks = [];

    for (let i = 0; i < words.length; i += chunkSize) {
      chunks.push(words.slice(i, i + chunkSize).join(' '));
    }

    return chunks;
  }

  async generateQAPairs(chunk) {
    const prompt = `Based on the following text, generate 5 question-answer pairs for training a language model. Format as JSON array:

Text: ${chunk}

Generate questions that test understanding, facts, and reasoning. Format:
[
  {"question": "...", "answer": "..."},
  {"question": "...", "answer": "..."}
]`;

    const response = await axios.post(this.baseURL, {
      model: "meta-llama/llama-3-70b-instruct",
      messages: [{ role: "user", content: prompt }]
    }, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const content = response.data.choices[0].message.content;

    try {
      // Extract JSON from response
      const jsonMatch = content.match(/\[\s*\{[\s\S]*\}\s*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.error('Failed to parse QA pairs:', error);
    }

    return [];
  }

  async generateChainOfThought(chunk) {
    const prompt = `Based on the following text, generate a reasoning example with chain-of-thought. Format as JSON:

Text: ${chunk}

Generate a complex question that requires multi-step reasoning, then provide the step-by-step thought process. Format:
{
  "question": "...",
  "reasoning": ["Step 1: ...", "Step 2: ...", "Step 3: ..."],
  "answer": "..."
}`;

    const response = await axios.post(this.baseURL, {
      model: "meta-llama/llama-3-70b-instruct",
      messages: [{ role: "user", content: prompt }]
    }, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const content = response.data.choices[0].message.content;

    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.error('Failed to parse CoT:', error);
    }

    return null;
  }

  async generateSummary(chunk) {
    const prompt = `Summarise the following text concisely, capturing key points:

${chunk}

Provide a 2-3 sentence summary.`;

    const response = await axios.post(this.baseURL, {
      model: "meta-llama/llama-3-70b-instruct",
      messages: [{ role: "user", content: prompt }]
    }, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    return {
      text: chunk,
      summary: response.data.choices[0].message.content
    };
  }

  async curateData(dataset, threshold = 0.8) {
    console.log(`🔍 Curating ${dataset.length} examples...`);

    const curated = [];

    for (const example of dataset) {
      const score = await this.scoreQuality(example);
      if (score >= threshold) {
        curated.push({ ...example, qualityScore: score });
      }
    }

    console.log(`✅ Kept ${curated.length}/${dataset.length} high-quality examples`);
    return curated;
  }

  async scoreQuality(example) {
    // Simple quality scoring
    let score = 0;

    if (example.question && example.answer) {
      // Check question length
      if (example.question.length > 10 && example.question.length < 200) score += 0.3;
      // Check answer length
      if (example.answer.length > 20 && example.answer.length < 500) score += 0.3;
      // Check for question mark
      if (example.question.includes('?')) score += 0.2;
      // Check answer completeness
      if (example.answer.split(' ').length > 5) score += 0.2;
    }

    return score;
  }

  async saveDataset(dataset, outputPath, format = 'jsonl') {
    await fs.ensureDir(path.dirname(outputPath));

    if (format === 'jsonl') {
      const lines = dataset.map(item => JSON.stringify(item)).join('\n');
      await fs.writeFile(outputPath, lines);
    } else if (format === 'json') {
      await fs.writeJson(outputPath, dataset, { spaces: 2 });
    } else if (format === 'csv') {
      // Convert to CSV
      const csv = this.convertToCSV(dataset);
      await fs.writeFile(outputPath, csv);
    }

    console.log(`✅ Saved dataset to ${outputPath}`);
  }

  convertToCSV(dataset) {
    if (dataset.length === 0) return '';

    const headers = Object.keys(dataset[0]);
    const rows = dataset.map(item => 
      headers.map(h => JSON.stringify(item[h])).join(',')
    );

    return [headers.join(','), ...rows].join('\n');
  }
}

module.exports = SyntheticDataGenerator;
```

---

## Step 3: Build API Endpoints

Add to `server.js`:

```javascript
const SyntheticDataGenerator = require('./syntheticDataGenerator');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const dataGenerator = new SyntheticDataGenerator(process.env.OPENROUTER_API_KEY);

app.post('/api/generate-dataset', upload.single('document'), async (req, res) => {
  try {
    const { datasetType, format } = req.body;
    const filePath = req.file.path;

    // Step 1: Ingest document
    const chunks = await dataGenerator.ingestDocument(filePath);

    // Step 2: Generate dataset based on type
    let dataset = [];

    for (const chunk of chunks.slice(0, 5)) { // Limit for demo
      if (datasetType === 'qa') {
        const qaPairs = await dataGenerator.generateQAPairs(chunk);
        dataset.push(...qaPairs);
      } else if (datasetType === 'cot') {
        const cot = await dataGenerator.generateChainOfThought(chunk);
        if (cot) dataset.push(cot);
      } else if (datasetType === 'summary') {
        const summary = await dataGenerator.generateSummary(chunk);
        dataset.push(summary);
      }
    }

    // Step 3: Curate
    const curated = await dataGenerator.curateData(dataset);

    // Step 4: Save
    const outputPath = `output/dataset_${Date.now()}.${format || 'jsonl'}`;
    await dataGenerator.saveDataset(curated, outputPath, format || 'jsonl');

    res.json({
      success: true,
      totalGenerated: dataset.length,
      totalCurated: curated.length,
      outputPath: outputPath
    });
  } catch (error) {
    console.error('Dataset generation error:', error);
    res.status(500).json({ error: 'Generation failed' });
  }
});
```

---

## Step 4: Add Frontend Interface

Add this tab to `index.html`:

```html
<li class="mr-2" role="presentation">
    <button class="inline-block p-4 border-b-2 rounded-t-lg" 
            id="synthetic-data-tab" 
            type="button">Synthetic Data</button>
</li>

<div class="hidden p-4 rounded-lg bg-white" id="synthetic-data-content" role="tabpanel">
    <h3 class="text-lg font-semibold mb-3">Generate Training Datasets</h3>

    <input type="file" id="datasetDocument" accept=".pdf" 
           class="mb-3 p-2 border rounded-lg w-full">

    <div class="mb-3">
        <label class="block text-sm font-medium mb-2">Dataset Type:</label>
        <select id="datasetType" class="p-2 border rounded-lg w-full">
            <option value="qa">Q&A Pairs</option>
            <option value="cot">Chain-of-Thought</option>
            <option value="summary">Summarisation</option>
        </select>
    </div>

    <div class="mb-3">
        <label class="block text-sm font-medium mb-2">Output Format:</label>
        <select id="datasetFormat" class="p-2 border rounded-lg w-full">
            <option value="jsonl">JSONL</option>
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
        </select>
    </div>

    <button onclick="generateDataset()" 
            class="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg">
        Generate Dataset
    </button>

    <div id="datasetResult" class="mt-4 p-4 border rounded-lg bg-gray-50"></div>
</div>
```

Add JavaScript:

```javascript
async function generateDataset() {
    const fileInput = document.getElementById('datasetDocument');
    const datasetType = document.getElementById('datasetType').value;
    const format = document.getElementById('datasetFormat').value;
    const resultDiv = document.getElementById('datasetResult');

    const file = fileInput.files[0];
    if (!file) {
        alert('Please select a document');
        return;
    }

    resultDiv.innerHTML = '<p>Generating dataset... This may take a few minutes.</p>';

    const formData = new FormData();
    formData.append('document', file);
    formData.append('datasetType', datasetType);
    formData.append('format', format);

    try {
        const response = await fetch('/api/generate-dataset', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        resultDiv.innerHTML = `
            <h4 class="font-semibold mb-2 text-green-600">✅ Dataset Generated!</h4>
            <div class="grid grid-cols-2 gap-3 mb-3">
                <div class="p-3 bg-blue-50 rounded">
                    <p class="text-sm font-medium">Total Generated:</p>
                    <p class="text-2xl font-bold text-blue-600">${data.totalGenerated}</p>
                </div>
                <div class="p-3 bg-green-50 rounded">
                    <p class="text-sm font-medium">High Quality:</p>
                    <p class="text-2xl font-bold text-green-600">${data.totalCurated}</p>
                </div>
            </div>
            <p class="text-sm text-gray-600">Output: ${data.outputPath}</p>
            <button onclick="downloadDataset('${data.outputPath}')" 
                    class="bg-indigo-500 text-white py-2 px-4 rounded-lg mt-3">
                Download Dataset
            </button>
        `;
    } catch (error) {
        console.error('Generation error:', error);
        resultDiv.innerHTML = '<p class="text-red-500">Generation failed. Try again.</p>';
    }
}

async function downloadDataset(path) {
    window.location.href = `/download/${path.split('/').pop()}`;
}
```

---

## Dataset Types Explained

### 1. Q&A Pairs
**Best for:** General knowledge, factual Q&A, chatbots
```json
{
  "question": "What is photosynthesis?",
  "answer": "Photosynthesis is the process by which plants convert light energy into chemical energy..."
}
```

### 2. Chain-of-Thought (CoT)
**Best for:** Reasoning, problem-solving, math
```json
{
  "question": "How many miles in 5 kilometres?",
  "reasoning": [
    "Step 1: 1 kilometre = 0.621371 miles",
    "Step 2: Multiply 5 × 0.621371",
    "Step 3: Result = 3.10686 miles"
  ],
  "answer": "Approximately 3.11 miles"
}
```

### 3. Summarisation
**Best for:** Content summarisation, abstractive tasks
```json
{
  "text": "Long article text...",
  "summary": "Brief 2-3 sentence summary..."
}
```

---

## Best Practices

1. **Start Small**: Generate 100-500 examples first
2. **Quality Over Quantity**: Use high curation thresholds (0.8+)
3. **Diverse Sources**: Use multiple documents for variety
4. **Manual Review**: Spot-check generated examples
5. **Iterate**: Refine prompts based on output quality

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| **Low quality output** | Increase curation threshold, improve source documents |
| **Generation too slow** | Process fewer chunks, use batch requests |
| **Formatting errors** | Validate JSON parsing, add error handling |
| **Repetitive examples** | Use more diverse source material |

---

## Resources

- [Fine-Tuning Guide](https://platform.openai.com/docs/guides/fine-tuning)
- [Dataset Formats](https://huggingface.co/docs/datasets/)
- [Data Quality Metrics](https://arxiv.org/abs/2104.08758)

---

**Return to:** [Main README](README.md) | [Documentation Index](DOCUMENTATION-INDEX.md)
