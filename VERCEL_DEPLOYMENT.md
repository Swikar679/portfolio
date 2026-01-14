# 🚀 Vercel Serverless Deployment Guide

## ✅ What We've Done

Your backend has been converted to **Vercel Serverless Functions**! Here's what changed:

### 📁 New Files Created

1. **`/api/reels/index.ts`** - Serverless function for listing and creating reels
   - `GET /api/reels` - List all reels
   - `POST /api/reels` - Create a new reel

2. **`/api/reels/[id].ts`** - Serverless function for getting a specific reel
   - `GET /api/reels/:id` - Get reel by ID

3. **`/api/admin/seed.ts`** - Serverless function for seeding the database
   - `POST /api/admin/seed` - Initialize database with sample reels

4. **`/server/db-serverless.ts`** - Optimized database connection for serverless
   - Connection pooling optimized for serverless environment
   - Reuses connections across function invocations

5. **`/server/storage-serverless.ts`** - Storage layer for serverless functions
   - Works with both PostgreSQL and in-memory storage
   - Falls back to in-memory if no DATABASE_URL is set

### 🔧 Updated Files

1. **`vercel.json`** - Now configured for:
   - Building the frontend (`npm run build`)
   - Serving static files from `dist/public`
   - Running serverless functions from `/api`
   - Proper routing for both API and frontend

2. **`.vercelignore`** - Excludes unnecessary files from deployment

3. **`package.json`** - Added `@vercel/node` for serverless types

## 🎯 How It Works

### Architecture

```
Your App on Vercel
├── Frontend (Static)
│   └── Served from dist/public/
│   └── React SPA with client-side routing
│
└── Backend (Serverless Functions)
    ├── /api/reels → List/Create reels
    ├── /api/reels/[id] → Get specific reel
    └── /api/admin/seed → Seed database
```

### Key Differences from Traditional Server

| Traditional Express | Vercel Serverless |
|---------------------|-------------------|
| Always running | Runs on-demand |
| Single server instance | Function per request |
| Persistent connections | Connection pooling |
| File system access | Limited file system |
| WebSockets supported | Not supported |

## 📋 Deployment Steps

### Step 1: Set Up Database (If Using PostgreSQL)

If you want to use a real database instead of in-memory storage:

1. **Create a PostgreSQL database** on one of these services:
   - [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) (Recommended)
   - [Neon](https://neon.tech/) (Free tier available)
   - [Supabase](https://supabase.com/) (Free tier available)
   - [Railway](https://railway.app/) (Free tier available)

2. **Get your DATABASE_URL** (format: `postgresql://user:password@host:port/database`)

3. **Add to Vercel Environment Variables** (we'll do this in Step 3)

### Step 2: Push Code to GitHub

```bash
# Add all changes
git add .

# Commit
git commit -m "Convert to Vercel serverless functions"

# Push to GitHub
git push
```

### Step 3: Deploy to Vercel

#### Option A: Via Vercel Dashboard (Recommended)

1. **Go to [vercel.com](https://vercel.com)** and sign in

2. **Click "Add New Project"**

3. **Import your GitHub repository**

4. **Configure Project Settings:**
   - Framework Preset: `Other`
   - Build Command: `npm run build` (should be auto-detected)
   - Output Directory: `dist/public` (should be auto-detected)
   - Install Command: `npm install` (should be auto-detected)

5. **Add Environment Variables** (if using database):
   - Click "Environment Variables"
   - Add `DATABASE_URL` with your PostgreSQL connection string
   - Select all environments (Production, Preview, Development)

6. **Click "Deploy"**

7. **Wait for deployment** (usually 2-5 minutes)

8. **Your site is live!** 🎉

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Step 4: Seed the Database (If Using PostgreSQL)

After deployment, you need to:

1. **Run database migrations:**
   ```bash
   # If you have drizzle-kit configured
   npm run db:push
   ```

2. **Seed the database:**
   - Visit: `https://your-app.vercel.app/api/admin/seed`
   - Or use curl:
     ```bash
     curl -X POST https://your-app.vercel.app/api/admin/seed
     ```

## 🧪 Testing Your Deployment

### Test Frontend
Visit: `https://your-app.vercel.app`

### Test API Endpoints

```bash
# List all reels
curl https://your-app.vercel.app/api/reels

# Get specific reel
curl https://your-app.vercel.app/api/reels/1

# Seed database
curl -X POST https://your-app.vercel.app/api/admin/seed
```

## ⚠️ Important Notes

### File Uploads
**Problem:** The current file upload functionality (`multer`) won't work in serverless.

**Solutions:**
1. **Use Vercel Blob Storage** (Recommended)
   - Install: `npm install @vercel/blob`
   - [Documentation](https://vercel.com/docs/storage/vercel-blob)

2. **Use Cloudinary** (Free tier available)
   - Great for images and videos
   - [Documentation](https://cloudinary.com/documentation)

3. **Use AWS S3** (Pay as you go)
   - Industry standard
   - Requires AWS account

### Database Connections
- Serverless functions have limited execution time (10 seconds by default)
- Connection pooling is optimized for serverless (max 1 connection per function)
- Use `DATABASE_URL` environment variable for PostgreSQL

### In-Memory Storage
- If no `DATABASE_URL` is set, uses in-memory storage
- **Data will be lost** between deployments and function cold starts
- Good for testing, not for production

## 🐛 Troubleshooting

### Issue: API returns 500 errors
**Solution:** Check Vercel function logs:
1. Go to your project on Vercel
2. Click "Functions" tab
3. View logs for errors

### Issue: Database connection errors
**Solution:** 
1. Verify `DATABASE_URL` is set correctly in Vercel environment variables
2. Check database is accessible from the internet
3. Verify connection string format

### Issue: CORS errors
**Solution:** CORS headers are already configured in the API functions. If you still see errors:
1. Check browser console for specific error
2. Verify the API endpoint URL is correct
3. Make sure you're using the correct HTTP method

### Issue: 404 on API routes
**Solution:**
1. Verify files are in `/api` folder
2. Check `vercel.json` routing configuration
3. Redeploy the project

### Issue: Frontend works but API doesn't
**Solution:**
1. Check that `/api` folder is not in `.vercelignore`
2. Verify `@vercel/node` is installed
3. Check function logs in Vercel dashboard

## 🎨 Next Steps

### 1. Set Up Database
Choose and configure a PostgreSQL database for persistent storage.

### 2. Configure File Uploads
Implement Vercel Blob or Cloudinary for video/image uploads.

### 3. Add Custom Domain
In Vercel dashboard, go to Settings → Domains to add your custom domain.

### 4. Set Up Analytics
Enable Vercel Analytics for performance monitoring.

### 5. Configure Environment Variables
Add any additional environment variables needed for your app.

## 📚 Useful Resources

- [Vercel Serverless Functions Docs](https://vercel.com/docs/functions/serverless-functions)
- [Vercel Postgres Docs](https://vercel.com/docs/storage/vercel-postgres)
- [Vercel Blob Storage Docs](https://vercel.com/docs/storage/vercel-blob)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)

## 🆘 Need Help?

If you encounter any issues:
1. Check the Vercel function logs
2. Review the troubleshooting section above
3. Check Vercel's status page: https://vercel-status.com
4. Ask me for help!

---

**Ready to deploy?** Follow Step 2 and Step 3 above! 🚀
