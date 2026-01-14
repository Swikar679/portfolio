# 🎬 Video Editor Portfolio

A modern, full-stack portfolio website for showcasing video editing work, built with React, TypeScript, and deployed on Vercel with serverless functions.

## ✨ Features

- 🎥 **Video Showcase** - Display your best editing work
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- ⚡ **Fast Performance** - Optimized with Vite and served via global CDN
- 🔄 **Serverless API** - Scalable backend with Vercel Functions
- 💾 **Database Support** - PostgreSQL integration for dynamic content
- 📱 **Responsive** - Works perfectly on all devices

## 🚀 Quick Start

### Prerequisites
- Node.js 20.x or higher
- npm or yarn
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd project_backup
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional)
   ```bash
   cp .env.example .env
   # Edit .env and add your DATABASE_URL if using PostgreSQL
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5000
   ```

## 📦 Project Structure

```
project_backup/
├── api/                      # Serverless API functions
│   ├── reels/               # Reel endpoints
│   │   ├── index.ts        # List/Create reels
│   │   └── [id].ts         # Get reel by ID
│   └── admin/
│       └── seed.ts         # Database seeding
│
├── client/                  # Frontend React app
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   └── main.tsx        # App entry point
│   └── public/             # Static assets
│       ├── reels/          # Video files
│       └── tools/          # Tool images
│
├── server/                  # Backend utilities
│   ├── db-serverless.ts    # Database connection
│   ├── storage-serverless.ts # Data layer
│   └── routes.ts           # API routes (dev mode)
│
├── shared/                  # Shared types and schemas
│   ├── schema.ts           # Database schema
│   └── routes.ts           # API route definitions
│
└── Documentation files (see below)
```

## 📚 Documentation

This project includes comprehensive documentation:

- **[SERVERLESS_CONVERSION.md](SERVERLESS_CONVERSION.md)** - Overview of the serverless architecture
- **[VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)** - Complete deployment guide
- **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - Step-by-step deployment checklist
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Visual architecture diagrams
- **[API_REFERENCE.md](API_REFERENCE.md)** - API endpoint documentation

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Click "Deploy"

3. **Configure environment variables** (if using database)
   - Add `DATABASE_URL` in Vercel dashboard
   - Format: `postgresql://user:password@host:port/database`

4. **Seed the database** (if using database)
   ```bash
   curl -X POST https://your-app.vercel.app/api/admin/seed
   ```

For detailed deployment instructions, see [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md).

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server (local)
npm run check        # Type check with TypeScript
npm run db:push      # Push database schema
```

## 🔌 API Endpoints

### Reels
- `GET /api/reels` - List all reels
- `GET /api/reels/:id` - Get specific reel
- `POST /api/reels` - Create new reel

### Admin
- `POST /api/admin/seed` - Seed database with sample data

For complete API documentation, see [API_REFERENCE.md](API_REFERENCE.md).

## 🗄️ Database

### Using PostgreSQL (Production)

1. Create a PostgreSQL database on:
   - [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
   - [Neon](https://neon.tech/)
   - [Supabase](https://supabase.com/)
   - [Railway](https://railway.app/)

2. Set `DATABASE_URL` environment variable

3. Push schema:
   ```bash
   npm run db:push
   ```

### Using In-Memory Storage (Development)

If no `DATABASE_URL` is set, the app uses in-memory storage. Data is lost on restart.

## 🎨 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Wouter** - Routing
- **TanStack Query** - Data fetching
- **Framer Motion** - Animations

### Backend
- **Vercel Functions** - Serverless API
- **Drizzle ORM** - Database ORM
- **PostgreSQL** - Database
- **Zod** - Schema validation

### Deployment
- **Vercel** - Hosting platform
- **GitHub** - Version control

## 📝 Adding Your Reels

### Method 1: Via Seed Data (Recommended)

1. Add your video files to `client/public/reels/`

2. Edit `api/admin/seed.ts` and add your reel info:
   ```typescript
   {
     title: "Your Reel Title",
     description: "Your description",
     filename: "your-video.mp4",
     isFeatured: false,
   }
   ```

3. Run seed endpoint:
   ```bash
   curl -X POST https://your-app.vercel.app/api/admin/seed
   ```

### Method 2: Via API

```bash
curl -X POST https://your-app.vercel.app/api/reels \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Your Reel",
    "description": "Description",
    "videoUrl": "/reels/video.mp4",
    "isFeatured": false
  }'
```

## 🔒 Environment Variables

Create a `.env` file (see `.env.example`):

```env
DATABASE_URL=postgresql://user:password@host:5432/database
NODE_ENV=production
PORT=5000
```

## 🐛 Troubleshooting

### Build fails
- Run `npm run build` locally to test
- Check build logs in Vercel dashboard
- Verify all dependencies are installed

### API returns errors
- Check Vercel function logs
- Verify environment variables are set
- Test database connection

### Videos not playing
- Ensure video files are in `client/public/reels/`
- Check video format (MP4 recommended)
- Verify file paths are correct

For more troubleshooting, see [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md).

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ using React, TypeScript, and Vercel**
