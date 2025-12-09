// Meta AI Cookbook Example - Text Summarization
const { pipeline } = require('@xenova/transformers');

class Summarizer {
  static task = 'summarization';
  static model = 'Xenova/distilbart-cnn-12-6';
  static instance = null;

  static async getInstance() {
    if (this.instance === null) {
      this.instance = pipeline(this.task, this.model);
    }
    return this.instance;
  }
}

module.exports = async function summarizeText(text) {
  try {
    const summarizer = await Summarizer.getInstance();
    const result = await summarizer(text, {
      max_length: 100,
      min_length: 30,
    });
    return result[0].summary_text;
  } catch (error) {
    console.error('Summarization error:', error);
    throw error;
  }
};