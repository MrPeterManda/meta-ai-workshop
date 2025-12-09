const marked = require('marked');

const renderMarkdown = (markdownText) => {
  try {
    return marked.parse(markdownText);
  } catch (error) {
    console.error('Error rendering markdown:', error);
    return markdownText; // Return original text if rendering fails
  }
};

module.exports = {
  renderMarkdown
};