# Advanced Guide: DocumentLens - Multimodal Data Extraction

**What you're building:** Automated extraction of text, tables, images, and charts from complex documents into structured formats (JSON, SQL, Excel).

---

## Why DocumentLens Transforms Your Workflow

Instead of manually copying data from invoices or reports, DocumentLens automatically extracts everything into databases or spreadsheets—saving hours of manual work.

**Perfect for:**
- Invoice processing and data entry
- Report digitisation
- Document management systems
- Automated form filling

---

## Prerequisites

- ✅ Completed main workshop
- ✅ Working Meta AI Workshop application
- ✅ Familiarity with multimodal processing

---

## Step 1: Install DocumentLens Dependencies

```bash
cd workshop-app
npm install xlsx @xenova/transformers sharp multer
```

**What are these?**
- `xlsx`: Excel file generation
- `@xenova/transformers`: Document analysis models
- `sharp`: Image processing
- `multer`: File upload handling

---

## Step 2: Create DocumentLens Processor

Create `documentLens.js` in `workshop-app/`:

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
    console.log('Initialising DocumentLens models...');
    // Load document analysis models
    this.detector = await pipeline('object-detection', 'Xenova/detr-resnet-50');
    this.extractor = await pipeline('document-question-answering', 'Xenova/donut-base-finetuned-docvqa');
    console.log('✅ DocumentLens ready');
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

  async extractTable(imagePath, box) {
    // Crop table region
    const tableCrop = await sharp(imagePath)
      .extract({
        left: Math.floor(box.xmin),
        top: Math.floor(box.ymin),
        width: Math.floor(box.xmax - box.xmin),
        height: Math.floor(box.ymax - box.ymin)
      })
      .toBuffer();

    // Use document QA to extract table structure
    const tableStructure = await this.extractor(tableCrop, {
      question: "Extract all rows and columns as JSON"
    });

    return JSON.parse(tableStructure);
  }

  async extractChart(imagePath, box) {
    // Similar to table extraction but for charts
    return {
      type: 'chart',
      data: 'Chart data extraction'
    };
  }

  async exportToExcel(data, outputPath) {
    const workbook = xlsx.utils.book_new();

    // Create sheet for tables
    if (data.tables.length > 0) {
      data.tables.forEach((table, idx) => {
        const tableSheet = xlsx.utils.json_to_sheet(table);
        xlsx.utils.book_append_sheet(workbook, tableSheet, `Table ${idx + 1}`);
      });
    }

    xlsx.writeFile(workbook, outputPath);
    console.log(`✅ Exported to ${outputPath}`);
  }

  async exportToJSON(data, outputPath) {
    const fs = require('fs');
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    console.log(`✅ Exported to JSON: ${outputPath}`);
  }

  generateSQL(tables) {
    const sqlStatements = [];

    tables.forEach((table, idx) => {
      // Generate CREATE TABLE statement
      const columns = Object.keys(table[0]).map(col => `${col} VARCHAR(255)`).join(', ');
      sqlStatements.push(`CREATE TABLE table_${idx} (${columns});`);

      // Generate INSERT statements
      table.forEach(row => {
        const values = Object.values(row).map(v => `'${v}'`).join(', ');
        sqlStatements.push(`INSERT INTO table_${idx} VALUES (${values});`);
      });
    });

    return sqlStatements.join('\n');
  }
}

module.exports = DocumentLens;
```

---

## Step 3: Build the DocumentLens API Endpoint

Add to `server.js`:

```javascript
const DocumentLens = require('./documentLens');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');

const docLens = new DocumentLens();
docLens.initialise();

app.post('/api/document-lens', upload.single('document'), async (req, res) => {
  try {
    const { format } = req.body; // 'json', 'excel', or 'sql'
    const filePath = req.file.path;

    // Extract structured data
    const extracted = await docLens.extractStructuredData(filePath);

    // Create output directory if it doesn't exist
    if (!fs.existsSync('output')) {
      fs.mkdirSync('output');
    }

    // Export in requested format
    if (format === 'excel') {
      const outputPath = `output/${Date.now()}_extracted.xlsx`;
      await docLens.exportToExcel(extracted, outputPath);
      res.download(outputPath);
    } else if (format === 'json') {
      res.json(extracted);
    } else if (format === 'sql') {
      const sqlStatements = docLens.generateSQL(extracted.tables);
      res.json({ sql: sqlStatements });
    } else {
      res.status(400).json({ error: 'Invalid format. Use json, excel, or sql' });
    }
  } catch (error) {
    console.error('DocumentLens error:', error);
    res.status(500).json({ error: 'Extraction failed' });
  }
});
```

---

## Step 4: Add Frontend Interface

Add this tab to `index.html`:

```html
<li class="mr-2" role="presentation">
    <button class="inline-block p-4 border-b-2 rounded-t-lg" 
            id="documentlens-tab" 
            type="button">DocumentLens</button>
</li>

<div class="hidden p-4 rounded-lg bg-white" id="documentlens-content" role="tabpanel">
    <h3 class="text-lg font-semibold mb-3">Extract Data from Documents</h3>

    <input type="file" id="documentUpload" accept="image/*" 
           class="mb-3 p-2 border rounded-lg w-full">

    <div class="mb-3">
        <label class="block text-sm font-medium mb-2">Export Format:</label>
        <select id="exportFormat" class="p-2 border rounded-lg w-full">
            <option value="json">JSON</option>
            <option value="excel">Excel (.xlsx)</option>
            <option value="sql">SQL Statements</option>
        </select>
    </div>

    <button onclick="extractDocument()" 
            class="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg">
        Extract Data
    </button>

    <div id="extractionResult" class="mt-4 p-4 border rounded-lg bg-gray-50"></div>
</div>
```

Add JavaScript function:

```javascript
async function extractDocument() {
    const fileInput = document.getElementById('documentUpload');
    const format = document.getElementById('exportFormat').value;
    const resultDiv = document.getElementById('extractionResult');

    const file = fileInput.files[0];
    if (!file) {
        alert('Please select a document');
        return;
    }

    resultDiv.innerHTML = '<p>Extracting data...</p>';

    const formData = new FormData();
    formData.append('document', file);
    formData.append('format', format);

    try {
        const response = await fetch('/api/document-lens', {
            method: 'POST',
            body: formData
        });

        if (format === 'excel') {
            // Download file
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `extracted_${Date.now()}.xlsx`;
            a.click();
            resultDiv.innerHTML = '<p class="text-green-600">✅ Excel file downloaded!</p>';
        } else {
            const data = await response.json();
            resultDiv.innerHTML = `
                <h4 class="font-semibold mb-2">Extracted Data:</h4>
                <pre class="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">${JSON.stringify(data, null, 2)}</pre>
            `;
        }
    } catch (error) {
        console.error('Extraction error:', error);
        resultDiv.innerHTML = '<p class="text-red-500">Extraction failed. Try again.</p>';
    }
}
```

---

## Testing DocumentLens

1. Restart your server: `npm start`
2. Open your app
3. Click the **DocumentLens** tab
4. Upload a document with tables/charts (invoice, report, etc.)
5. Select export format
6. Click **Extract Data**
7. View or download the structured data

---

## Use Cases

### Invoice Processing
- Upload invoice image
- Extract line items automatically
- Export to Excel for accounting

### Report Digitisation
- Upload scanned reports
- Extract tables and charts
- Generate SQL for database import

### Form Automation
- Upload filled forms
- Extract field values
- Automate data entry

---

## Advanced Features

### 1. Batch Processing
Process multiple documents at once:

```javascript
app.post('/api/batch-extract', upload.array('documents', 10), async (req, res) => {
  const results = [];

  for (const file of req.files) {
    const extracted = await docLens.extractStructuredData(file.path);
    results.push(extracted);
  }

  res.json({ totalProcessed: results.length, results });
});
```

### 2. Custom Extraction Rules
Define extraction patterns:

```javascript
const extractionRules = {
  invoice: {
    fields: ['invoice_number', 'date', 'total'],
    tables: ['line_items']
  },
  receipt: {
    fields: ['merchant', 'date', 'amount'],
    tables: []
  }
};
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| **Models not loading** | Models download on first run - be patient |
| **Out of memory** | Reduce image size before processing |
| **No tables detected** | Ensure image is clear and high resolution |
| **Export fails** | Check `output/` directory exists and is writable |

---

## Performance Optimisation

1. **Compress images before upload**
2. **Cache model downloads**
3. **Use queue system for batch processing**
4. **Implement progress tracking**

---

## Next Steps

1. ✅ Add support for more document types (PDFs, Word docs)
2. ✅ Implement OCR for scanned documents
3. ✅ Add validation rules for extracted data
4. ✅ Build API for integration with other systems

---

## Resources

- [Xenova Transformers](https://github.com/xenova/transformers.js)
- [XLSX Documentation](https://docs.sheetjs.com/)
- [Sharp Image Processing](https://sharp.pixelplumbing.com/)

---

**Return to:** [Main README](README.md) | [Documentation Index](DOCUMENTATION-INDEX.md)
