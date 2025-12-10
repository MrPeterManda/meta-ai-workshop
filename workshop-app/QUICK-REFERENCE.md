# Quick Reference Card - Meta AI Workshop

## Important URLs

- **Workshop Repo**: https://github.com/MrPeterManda/meta-ai-workshop
- **OpenRouter Keys**: https://openrouter.ai/keys
- **Render Dashboard**: https://render.com/dashboard
- **Analytics Portal**: https://meta-workshop-analytics.onrender.com

## Quick Commands

### Fork & Clone
```bash
# After forking on GitHub
git clone https://github.com/YOUR_USERNAME/meta-ai-workshop.git
cd meta-ai-workshop
npm install
```

### Local Development
```bash
# Create .env file with your API key
echo "OPENROUTER_API_KEY=your-key-here" > .env
echo "PORT=3001" >> .env

# Start server
npm start
# Visit: http://localhost:3001
```

### Deploy Changes
```bash
git add .
git commit -m "Your changes"
git push origin main
# Render auto-deploys!
```

## Render Configuration

**Build Command**: `npm install`
**Start Command**: `npm start`

**Environment Variables**:
- `OPENROUTER_API_KEY`: Your API key from OpenRouter
- `PORT`: 3001

## Troubleshooting

| Issue | Solution |
|-------|----------|
| API Key Error | Check key in Render environment variables |
| App Won't Start | Verify `node server.js` is the start command |
| Changes Not Showing | Wait 2-3 mins, check Render logs |
| 404 Error | Check file paths in server.js |

## Support

- Workshop facilitators: performance@wethinkcode.co.za; lawrence@wethinkcode.co.za
- Render support: https://render.com/docs
- OpenRouter support: https://openrouter.ai/docs

---

Keep this card handy during the workshop!
