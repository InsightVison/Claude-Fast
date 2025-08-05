# Lightning AI Quick Deploy Guide for Claude Fast

## 🚀 Deploy to Lightning AI in 3 Steps

### Option 1: Using Lightning CLI (Recommended)

1. **Install Lightning AI**
   ```bash
   pip install lightning
   ```

2. **Login to Lightning AI**
   ```bash
   lightning login
   ```

3. **Deploy Your App**
   ```bash
   ./deploy-lightning.sh
   ```

### Option 2: Manual Deployment

1. **Push to GitHub** (if you haven't already)
   ```bash
   git add .
   git commit -m "Add Lightning AI deployment"
   git push origin main
   ```

2. **Create Lightning Studio**
   - Go to https://lightning.ai
   - Click "Create Studio"
   - Import from GitHub: `your-username/Claude-Fast`

3. **Run in Studio**
   ```bash
   npm install
   npm run build
   npm start
   ```

### Option 3: Using Lightning Apps

1. **Run Lightning App Locally First**
   ```bash
   lightning run app lightning_app.py
   ```

2. **Deploy to Cloud**
   ```bash
   lightning run app lightning_app.py --cloud
   ```

## 🔧 Environment Variables

Create a `.env.local` file with:
```env
NEXTAUTH_URL=https://your-lightning-app-url.lightning.ai
NEXTAUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## 📱 Alternative Quick Deploy Options

### Vercel (Easiest)
```bash
npx vercel --prod
```

### Netlify
```bash
npm run build
# Upload the `out` folder to Netlify
```

### Railway
```bash
railway login
railway deploy
```

## 🛠️ Troubleshooting

- **Build Issues**: Make sure all dependencies are in `package.json`
- **Environment Variables**: Set them in Lightning AI dashboard
- **Port Issues**: Lightning AI usually handles this automatically

## 💡 Pro Tips

1. Lightning AI works best with apps that have clear entry points
2. Use the Dockerfile for consistent builds
3. Monitor your app in the Lightning AI dashboard
4. Scale up compute resources if needed

## 🆘 Need Help?

- Lightning AI Docs: https://lightning.ai/docs
- GitHub Issues: Create an issue in your repo
- Discord: Join Lightning AI community
