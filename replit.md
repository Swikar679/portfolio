# Swikar Video Portfolio

## Overview

A dark-themed, single-page portfolio website for a video editor named Swikar. The site showcases Instagram Reels and short-form video edits with smooth scroll animations, a featured showreel section, and a grid of video work samples. Built as a full-stack TypeScript application with React frontend and Express backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style)
- **Animations**: Framer Motion for scroll-based animations and transitions
- **Fonts**: Syne (headings) and Inter (body text) via Google Fonts
- **Build Tool**: Vite with path aliases (@/ for client/src, @shared/ for shared)

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Pattern**: REST endpoints defined in shared/routes.ts with Zod schemas
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Development**: TSX for running TypeScript directly, Vite dev server for HMR

### Data Storage
- **Database**: PostgreSQL (connection via DATABASE_URL environment variable)
- **Schema**: Single `reels` table with id, title, description, videoUrl, posterUrl, isFeatured fields
- **Migrations**: Drizzle Kit with migrations output to /migrations directory

### Code Organization
```
client/           # React frontend
  src/
    components/   # UI components (shadcn/ui + custom)
    pages/        # Page components (Home, NotFound)
    hooks/        # Custom hooks (use-reels, use-toast, use-mobile)
    lib/          # Utilities (queryClient, utils)
server/           # Express backend
  index.ts        # Server entry point
  routes.ts       # API route handlers
  storage.ts      # Database access layer
  db.ts           # Database connection
shared/           # Shared between frontend/backend
  schema.ts       # Drizzle table definitions + Zod schemas
  routes.ts       # API route definitions with types
```

### Key Design Decisions
1. **Shared Types**: Route definitions and schemas live in /shared to ensure type safety across client and server
2. **Storage Abstraction**: DatabaseStorage class implements IStorage interface for potential swapping of storage backends
3. **Auto-seeding**: Server seeds database with 10 placeholder reels on startup if table is empty
4. **Component Library**: shadcn/ui provides accessible, customizable base components with Radix UI primitives

## External Dependencies

### Database
- PostgreSQL database required (DATABASE_URL environment variable)
- Drizzle ORM handles queries and schema management
- connect-pg-simple for session storage capability

### Third-Party Services
- Google Fonts (Syne, Inter, DM Sans, Fira Code, Geist Mono)
- Placeholder images from placehold.co for reel covers
- Sample video from w3schools for demo content

### Key NPM Packages
- @tanstack/react-query: Server state management
- framer-motion: Animation library
- drizzle-orm + drizzle-zod: Database ORM with Zod integration
- Radix UI primitives: Accessible component foundations
- wouter: Minimal React router
- zod: Runtime type validation