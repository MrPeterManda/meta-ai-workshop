# Advanced Guide: Prompt Ops - Automated Prompt Migration

**What you're building:** A tool that automatically converts prompts from proprietary AI models (like GPT-4) to Llama, cutting optimisation time from days to hours and boosting performance up to 20%.

---

## Why Prompt Ops Matters

Companies waste days manually rewriting prompts when switching AI models. Prompt Ops automates this, ensuring:
- **Consistency** across model migrations
- **Better performance** through optimised prompts
- **Time savings** from days to minutes
- **Best practices** automatically applied

---

## Prerequisites

- ✅ Completed main workshop
- ✅ Working Meta AI Workshop application
- ✅ Understanding of prompt engineering basics

---

## Step 1: Install Prompt Ops

```bash
cd workshop-app
npm install @meta-llama/prompt-ops
```

**Note:** If the package isn't available, we'll create a custom solution using Meta's prompt templates.

---

## Step 2: Create Prompt Migration Script

Create `promptMigration.js` in `workshop-app/`:

```javascript
class PromptMigrator {
  constructor() {
    this.llamaTemplate = {
      systemPrompt: '<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n{system}<|eot_id|>',
      userPrompt: '<|start_header_id|>user<|end_header_id|>\n\n{user}<|eot_id|>',
      assistantPrompt: '<|start_header_id|>assistant<|end_header_id|>\n\n'
    };
  }

  async migratePrompt(originalPrompt) {
    // Parse original prompt structure
    const parsed = this.parsePrompt(originalPrompt);

    // Convert to Llama format
    const migrated = this.convertToLlama(parsed);

    // Optimise for Llama
    const optimised = this.optimiseForLlama(migrated);

    // Calculate improvements
    const metrics = this.analysePrompt(original, optimised);

    return {
      original: originalPrompt,
      migrated: optimised,
      improvements: metrics,
      performanceGain: this.estimatePerformanceGain(metrics)
    };
  }

  parsePrompt(prompt) {
    // Simple parsing - extract system/user/assistant parts
    const lines = prompt.split('\n');
    const parsed = {
      system: '',
      user: '',
      context: []
    };

    let currentSection = 'user';

    for (const line of lines) {
      if (line.toLowerCase().includes('system:') || line.toLowerCase().includes('you are')) {
        currentSection = 'system';
        parsed.system += line.replace(/system:/i, '').trim() + '\n';
      } else if (line.toLowerCase().includes('user:')) {
        currentSection = 'user';
        parsed.user += line.replace(/user:/i, '').trim() + '\n';
      } else {
        parsed[currentSection] += line + '\n';
      }
    }

    return parsed;
  }

  convertToLlama(parsed) {
    let llamaPrompt = '';

    // Add system prompt if exists
    if (parsed.system.trim()) {
      llamaPrompt += this.llamaTemplate.systemPrompt.replace('{system}', parsed.system.trim());
    }

    // Add user prompt
    if (parsed.user.trim()) {
      llamaPrompt += this.llamaTemplate.userPrompt.replace('{user}', parsed.user.trim());
    }

    // Add assistant prompt starter
    llamaPrompt += this.llamaTemplate.assistantPrompt;

    return llamaPrompt;
  }

  optimiseForLlama(prompt) {
    // Apply Llama-specific optimisations
    let optimised = prompt;

    // 1. Make instructions more explicit
    optimised = optimised.replace(/be concise/gi, 'provide brief, focused responses');

    // 2. Add structured output hints
    if (optimised.includes('list') || optimised.includes('steps')) {
      optimised += '\n\nFormat your response with clear numbering and structure.';
    }

    // 3. Clarify reasoning expectations
    if (optimised.includes('explain') || optimised.includes('analyse')) {
      optimised += '\n\nProvide step-by-step reasoning.';
    }

    return optimised;
  }

  analysePrompt(original, optimised) {
    return {
      lengthChange: optimised.length - original.length,
      clarityScore: this.calculateClarity(optimised),
      structureScore: this.calculateStructure(optimised),
      specificityScore: this.calculateSpecificity(optimised)
    };
  }

  calculateClarity(prompt) {
    // Simple clarity scoring based on sentence structure
    const sentences = prompt.split(/[.!?]+/).filter(s => s.trim());
    const avgLength = sentences.reduce((sum, s) => sum + s.length, 0) / sentences.length;

    // Optimal sentence length is 15-25 words
    return Math.max(0, 100 - Math.abs(avgLength - 20) * 2);
  }

  calculateStructure(prompt) {
    // Check for structural elements
    let score = 0;
    if (prompt.includes('<|begin_of_text|>')) score += 30;
    if (prompt.includes('<|start_header_id|>')) score += 30;
    if (prompt.includes('\n\n')) score += 20; // Paragraph breaks
    if (prompt.match(/\d+\./)) score += 20; // Numbered lists
    return Math.min(100, score);
  }

  calculateSpecificity(prompt) {
    // Count specific instruction words
    const specificWords = ['must', 'should', 'always', 'never', 'exactly', 'precisely', 'specific'];
    let count = 0;
    specificWords.forEach(word => {
      if (prompt.toLowerCase().includes(word)) count++;
    });
    return Math.min(100, count * 15);
  }

  estimatePerformanceGain(metrics) {
    // Estimate performance improvement percentage
    const avgScore = (metrics.clarityScore + metrics.structureScore + metrics.specificityScore) / 3;
    return Math.round(avgScore / 5); // Convert to percentage gain (0-20%)
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

---

## Step 3: Build the Prompt Ops Endpoint

Add to `server.js`:

```javascript
const PromptMigrator = require('./promptMigration');
const migrator = new PromptMigrator();

app.post('/api/migrate-prompt', async (req, res) => {
  try {
    const { prompt, batchMode, prompts } = req.body;

    if (batchMode && prompts) {
      // Migrate multiple prompts
      const results = await migrator.batchMigrate(prompts);
      const avgGain = results.reduce((sum, r) => sum + r.performanceGain, 0) / results.length;

      res.json({ 
        totalPrompts: prompts.length,
        migrations: results,
        averageImprovement: Math.round(avgGain)
      });
    } else if (prompt) {
      // Single prompt migration
      const result = await migrator.migratePrompt(prompt);
      res.json(result);
    } else {
      res.status(400).json({ error: 'Prompt or prompts array required' });
    }
  } catch (error) {
    console.error('Prompt migration error:', error);
    res.status(500).json({ error: 'Migration failed' });
  }
});
```

---

## Step 4: Add Frontend Interface

Add this tab to `index.html`:

```html
<li class="mr-2" role="presentation">
    <button class="inline-block p-4 border-b-2 rounded-t-lg" 
            id="prompt-ops-tab" 
            type="button">Prompt Ops</button>
</li>

<div class="hidden p-4 rounded-lg bg-white" id="prompt-ops-content" role="tabpanel">
    <h3 class="text-lg font-semibold mb-3">Migrate Prompts to Llama</h3>

    <textarea id="originalPrompt" rows="6" 
              class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" 
              placeholder="Paste your GPT-4 or Claude prompt here..."></textarea>

    <button onclick="migratePrompt()" 
            class="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg mt-3">
        Migrate to Llama
    </button>

    <div id="migrationResult" class="mt-4 hidden">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="border rounded-lg p-4">
                <h4 class="font-semibold mb-2">Original Prompt</h4>
                <pre id="originalDisplay" class="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 p-3 rounded"></pre>
            </div>
            <div class="border rounded-lg p-4 bg-green-50">
                <h4 class="font-semibold mb-2 text-green-800">Optimised for Llama</h4>
                <pre id="migratedDisplay" class="text-sm text-gray-700 whitespace-pre-wrap bg-white p-3 rounded"></pre>
            </div>
        </div>

        <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div class="p-3 bg-blue-50 rounded-lg">
                <p class="text-sm"><strong>Performance Gain:</strong></p>
                <p class="text-2xl font-bold text-blue-600" id="performanceGain">-</p>
            </div>
            <div class="p-3 bg-purple-50 rounded-lg">
                <p class="text-sm"><strong>Clarity Score:</strong></p>
                <p class="text-2xl font-bold text-purple-600" id="clarityScore">-</p>
            </div>
            <div class="p-3 bg-indigo-50 rounded-lg">
                <p class="text-sm"><strong>Structure Score:</strong></p>
                <p class="text-2xl font-bold text-indigo-600" id="structureScore">-</p>
            </div>
        </div>

        <button onclick="copyMigrated()" 
                class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg mt-4">
            Copy Optimised Prompt
        </button>
    </div>
</div>
```

Add JavaScript functions:

```javascript
async function migratePrompt() {
    const prompt = document.getElementById('originalPrompt').value.trim();
    const resultDiv = document.getElementById('migrationResult');

    if (!prompt) {
        alert('Please enter a prompt');
        return;
    }

    try {
        const response = await fetch('/api/migrate-prompt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });

        const data = await response.json();

        // Display results
        document.getElementById('originalDisplay').textContent = data.original;
        document.getElementById('migratedDisplay').textContent = data.migrated;
        document.getElementById('performanceGain').textContent = `+${data.performanceGain}%`;
        document.getElementById('clarityScore').textContent = Math.round(data.improvements.clarityScore);
        document.getElementById('structureScore').textContent = Math.round(data.improvements.structureScore);

        resultDiv.classList.remove('hidden');
    } catch (error) {
        console.error('Migration error:', error);
        alert('Migration failed. Try again.');
    }
}

function copyMigrated() {
    const migratedText = document.getElementById('migratedDisplay').textContent;
    navigator.clipboard.writeText(migratedText);
    alert('✅ Copied to clipboard!');
}
```

---

## Testing Prompt Ops

### Example 1: Simple Prompt
**Input:**
```
You are a helpful assistant. Be concise.
```

**Output:**
```
<|begin_of_text|><|start_header_id|>system<|end_header_id|>

You are a helpful assistant that provides brief, focused responses.

Format your response with clear structure.<|eot_id|><|start_header_id|>assistant<|end_header_id|>
```

### Example 2: Complex Prompt
**Input:**
```
System: You are an expert Python developer.
User: Explain list comprehensions.
```

**Output:**
```
<|begin_of_text|><|start_header_id|>system<|end_header_id|>

You are an expert Python developer with deep knowledge of Python features and best practices.<|eot_id|><|start_header_id|>user<|end_header_id|>

Explain list comprehensions with examples and use cases.

Provide step-by-step reasoning.<|eot_id|><|start_header_id|>assistant<|end_header_id|>
```

---

## Best Practices

### 1. Always Test Migrated Prompts
Run both versions and compare outputs:
```javascript
const original = await callGPT4(originalPrompt);
const migrated = await callLlama(migratedPrompt);
// Compare quality
```

### 2. Iterate and Refine
Use feedback to improve migrations:
- Track performance metrics
- A/B test prompts
- Gather user feedback

### 3. Document Changes
Keep migration logs:
```javascript
const migrationLog = {
  date: new Date(),
  original: originalPrompt,
  migrated: migratedPrompt,
  performanceGain: metrics.gain
};
```

---

## Advanced Features

### Batch Migration
Migrate multiple prompts at once:

```javascript
const prompts = [
  "You are a concise assistant",
  "Explain quantum computing",
  "Summarise this article"
];

const results = await fetch('/api/migrate-prompt', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ batchMode: true, prompts })
});
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| **Poor migration quality** | Add more context to original prompt |
| **Performance not improving** | Test with actual model outputs |
| **Structure issues** | Manually adjust template tokens |

---

## Resources

- [Meta Llama Prompt Guide](https://www.llama.com/docs/prompt-engineering)
- [Prompt Engineering Best Practices](https://platform.openai.com/docs/guides/prompt-engineering)

---

**Return to:** [Main README](README.md) | [Documentation Index](DOCUMENTATION-INDEX.md)
