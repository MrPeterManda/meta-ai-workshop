# Meta AI Workshop Guide

## Workshop Structure

### Day 1: Guided Workshop
1. **Introduction to Meta AI and OpenRouter**
   - Overview of Meta AI capabilities
   - Getting OpenRouter API keys
   - Understanding the API documentation

2. **Hands-on Session**
   - Setting up the project (`npm install`)
   - Configuring environment variables
   - Testing the basic chat endpoint
   - Exploring the Meta AI Cookbook examples

3. **Building the Interface**
   - Understanding the frontend code
   - Customizing the chat interface
   - Adding new features

### Day 2: Independent Projects
1. **Project Planning**
   - Brainstorming project ideas
   - Defining project requirements
   - Planning API integration

2. **Implementation**
   - Setting up new projects
   - Integrating OpenRouter API
   - Adding Meta AI Cookbook recipes

3. **Presentation**
   - Demo of completed projects
   - Discussion of challenges and solutions
   - Next steps for further learning

## Setup Instructions

1. **Get your OpenRouter API key**
   - Visit https://openrouter.ai/keys
   - Sign up and generate your API key

2. **Clone the repository**
   - `git clone <repo-url>`
   - `cd workshop-app`

3. **Install dependencies**
   - Run `npm install` in the `workshop-app` directory
   - If you see errors, check your Node.js version (recommended: v18+)

4. **Configure environment variables**
   - Copy `.env.example` to `.env`
   - Paste your API key in the `OPENROUTER_API_KEY` field
   - Default port is `3001` (can be changed in `.env`)

5. **Start the server**
   - Run `npm start` (starts on port 3001 by default)
   - Visit `http://localhost:3001` in your browser

## Troubleshooting Tips

### API Key Issues
- **401 Unauthorized**: Double-check your API key in `.env`. It should look like `OPENROUTER_API_KEY=sk-...`
- **No response from API**: Make sure your key is active and not expired. Test in the OpenRouter playground.
- **Key not found**: Ensure `.env` is in the `workshop-app` directory and named correctly (not `.env.txt`).

### Dependency Installation
- **npm install errors**: Make sure you are in the `workshop-app` directory. Try deleting `node_modules` and running `npm install` again.
- **Missing package**: If you see errors about missing modules (e.g., `express`, `@xenova/transformers`), run `npm install` again.
- **Node.js version**: Some packages require Node.js v18+. Check with `node -v`.

### Server Issues
- **Port already in use**: Change the `PORT` value in `.env` to another number (e.g., 3002).
- **Server not starting**: Check for typos in `.env` and make sure all dependencies are installed.

### General Tips
- Restart the server after changing `.env` or installing new packages.
- Use the browser console (F12) for frontend errors.
- Check terminal output for backend errors.

## Resources
- [OpenRouter API Documentation](https://openrouter.ai/docs)
- [Meta AI Cookbook](https://www.llama.com/resources/cookbook/)
- [Workshop Code Reference](README.md)