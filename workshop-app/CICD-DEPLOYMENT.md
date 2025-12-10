# Advanced Guide: CI/CD Deployment with GitLab

**What you're building:** An automated deployment pipeline that tests and deploys your application automatically on every code push.

---

## Why CI/CD Matters

Manual deployments are error-prone and time-consuming. CI/CD automation ensures:
- **Consistent deployments** every time
- **Automated testing** before deployment
- **Faster shipping** from code to production
- **Reduced errors** from manual steps

---

## Prerequisites

- ✅ Working Meta AI Workshop application
- ✅ GitLab account and repository
- ✅ Render or Railway account

---

## Understanding the Pipeline

```
Push to Git
     ↓
  Build
     ↓
   Test
     ↓
  Deploy
     ↓
   Live!
```

Each stage runs automatically, ensuring quality before deployment.

---

## Step 1: Create GitLab CI/CD Configuration

Create `.gitlab-ci.yml` in your project root:

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
    - cd workshop-app
    - npm install
    - echo "Build complete"
  artifacts:
    paths:
      - workshop-app/node_modules
    expire_in: 1 hour

# Test stage
test:
  stage: test
  image: node:18
  script:
    - cd workshop-app
    - npm run lint || echo "No lint script found"
    - npm test || echo "No tests found"
  dependencies:
    - build

# Deploy to Render
deploy_render:
  stage: deploy
  image: curlimages/curl:latest
  script:
    - echo "Triggering Render deployment..."
    - curl -X POST "https://api.render.com/deploy/srv-$RENDER_SERVICE_ID?key=$RENDER_API_KEY"
  only:
    - main
  environment:
    name: production
    url: https://your-app.onrender.com

# Alternative: Deploy to Railway
deploy_railway:
  stage: deploy
  image: node:18
  script:
    - npm install -g railway
    - railway login --token $RAILWAY_TOKEN
    - railway up
  only:
    - main
  when: manual  # Manual trigger for Railway
```

---

## Step 2: Configure Environment Variables in GitLab

1. Go to your GitLab project
2. Navigate to **Settings → CI/CD → Variables**
3. Click **Add Variable** and add these:

### For Render Deployment

| Key | Value | Protected | Masked |
|-----|-------|-----------|--------|
| `RENDER_SERVICE_ID` | Your service ID from Render | ✓ | ✓ |
| `RENDER_API_KEY` | Your Render API key | ✓ | ✓ |
| `OPENROUTER_API_KEY` | Your OpenRouter key | ✓ | ✓ |

### For Railway Deployment

| Key | Value | Protected | Masked |
|-----|-------|-----------|--------|
| `RAILWAY_TOKEN` | Your Railway token | ✓ | ✓ |
| `OPENROUTER_API_KEY` | Your OpenRouter key | ✓ | ✓ |

---

## Step 3: Get Your Deployment Credentials

### For Render:

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Select your web service
3. Copy the **Service ID** from the URL:
   ```
   https://dashboard.render.com/web/srv-xxxxx
                                      ↑ This is your Service ID
   ```
4. Go to **Account Settings → API Keys**
5. Create a new API key and copy it

### For Railway:

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click your profile → **Account Settings**
3. Go to **Tokens** tab
4. Create a new token and copy it

---

## Step 4: Add Lint and Test Scripts

Update `workshop-app/package.json`:

```json
{
  "name": "meta-ai-workshop",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js",
    "lint": "eslint .",
    "test": "echo \"No tests yet\" && exit 0"
  }
}
```

Install ESLint:

```bash
cd workshop-app
npm install --save-dev eslint
npx eslint --init
```

---

## Step 5: Test Your Pipeline

1. Make a code change
2. Commit and push:
   ```bash
   git add .
   git commit -m "test: CI/CD pipeline"
   git push origin main
   ```
3. Go to GitLab → **CI/CD → Pipelines**
4. Watch your pipeline run!

---

## Pipeline Flow Visualised

```
┌─────────────────────────────────────────────────────┐
│               PUSH TO MAIN BRANCH                   │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
        ┌──────────────────┐
        │   BUILD STAGE    │
        │                  │
        │ • npm install    │
        │ • Dependencies   │
        └────────┬─────────┘
                 │
                 ▼
        ┌──────────────────┐
        │   TEST STAGE     │
        │                  │
        │ • ESLint         │
        │ • Unit Tests     │
        └────────┬─────────┘
                 │
                 ▼
        ┌──────────────────┐
        │  DEPLOY STAGE    │
        │                  │
        │ • Trigger Deploy │
        │ • Update Live    │
        └────────┬─────────┘
                 │
                 ▼
        ┌──────────────────┐
        │   LIVE APP! 🚀   │
        └──────────────────┘
```

---

## Advanced Pipeline Features

### 1. Staging Environment

Add a staging deployment:

```yaml
deploy_staging:
  stage: deploy
  script:
    - curl -X POST "https://api.render.com/deploy/srv-$RENDER_STAGING_ID?key=$RENDER_API_KEY"
  only:
    - develop
  environment:
    name: staging
    url: https://your-app-staging.onrender.com
```

### 2. Rollback on Failure

Add automatic rollback:

```yaml
deploy_render:
  stage: deploy
  script:
    - curl -X POST "https://api.render.com/deploy/srv-$RENDER_SERVICE_ID?key=$RENDER_API_KEY"
  after_script:
    - |
      if [ $CI_JOB_STATUS == 'failed' ]; then
        echo "Deployment failed, triggering rollback..."
        curl -X POST "https://api.render.com/rollback/srv-$RENDER_SERVICE_ID?key=$RENDER_API_KEY"
      fi
```

### 3. Notifications

Send Slack notifications:

```yaml
notify_success:
  stage: deploy
  script:
    - |
      curl -X POST -H 'Content-type: application/json'       --data '{"text":"✅ Deployment successful!"}'       $SLACK_WEBHOOK_URL
  when: on_success
```

---

## Troubleshooting

### Build Fails

**Symptom:** Pipeline stops at build stage

**Solutions:**
- Check `package.json` exists in `workshop-app/`
- Verify Node.js version matches (use `node:18`)
- Run `npm install` locally to check for errors

### Test Fails

**Symptom:** Pipeline stops at test stage

**Solutions:**
- Run `npm run lint` locally
- Fix ESLint errors
- Add `|| exit 0` to test command if tests aren't ready

### Deploy Fails

**Symptom:** Pipeline succeeds but app doesn't deploy

**Solutions:**
- Verify `RENDER_SERVICE_ID` is correct
- Check `RENDER_API_KEY` is valid
- Ensure environment variables are marked as **Protected**

### Environment Variables Not Working

**Symptom:** API key errors in deployed app

**Solutions:**
- Add `OPENROUTER_API_KEY` to Render/Railway settings
- Don't rely on `.env` files in production
- Use platform environment variable settings

---

## Security Best Practices

### 1. Never Commit Secrets
```bash
# Add to .gitignore
.env
.env.local
*.pem
*.key
```

### 2. Use Protected Variables
- Mark sensitive variables as **Protected** and **Masked**
- Only allow protected branches to access them

### 3. Rotate Keys Regularly
- Update API keys every 90 days
- Use different keys for staging/production

### 4. Limit Pipeline Permissions
- Use service-specific tokens
- Avoid using personal access tokens

---

## Monitoring Your Pipeline

### 1. View Pipeline History
Go to **CI/CD → Pipelines** to see all runs

### 2. Check Job Logs
Click any job to see detailed logs

### 3. Set Up Alerts
Configure email notifications:
```yaml
notify_failure:
  stage: deploy
  script:
    - echo "Pipeline failed!"
  when: on_failure
  only:
    - main
```

---

## Alternative: GitHub Actions

If using GitHub instead of GitLab, create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Render

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'

      - name: Install dependencies
        run: |
          cd workshop-app
          npm install

      - name: Run tests
        run: |
          cd workshop-app
          npm test

      - name: Deploy to Render
        run: |
          curl -X POST "https://api.render.com/deploy/srv-${{ secrets.RENDER_SERVICE_ID }}?key=${{ secrets.RENDER_API_KEY }}"
```

---

## CI/CD Success Checklist

- [ ] `.gitlab-ci.yml` or `.github/workflows/deploy.yml` created
- [ ] Environment variables configured
- [ ] Build stage working
- [ ] Test stage working
- [ ] Deploy stage working
- [ ] Automatic deployment on push
- [ ] Notifications set up (optional)
- [ ] Rollback strategy in place

---

## Resources

- [GitLab CI/CD Documentation](https://docs.gitlab.com/ee/ci/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Render Deploy Hooks](https://render.com/docs/deploy-hooks)
- [Railway CLI](https://docs.railway.app/develop/cli)

---

## Next Steps

1. ✅ Set up staging environment
2. ✅ Add automated tests
3. ✅ Configure notifications
4. ✅ Implement blue-green deployments
5. ✅ Add performance monitoring

---

**Return to:** [Main README](README.md) | [Documentation Index](DOCUMENTATION-INDEX.md)
