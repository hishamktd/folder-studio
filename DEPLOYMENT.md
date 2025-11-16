# Deployment Guide

This guide covers how to deploy Folder Studio to various platforms.

## Current Deployment

**Live Production URL**: [https://folder-studio.vercel.app](https://folder-studio.vercel.app)

**Platform**: Vercel
**Status**: ✅ Live
**Version**: 1.0.0
**Last Updated**: 2025-11-16

---

## Vercel Deployment (Recommended)

Folder Studio is optimized for Vercel deployment.

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/folder-studio)

### Manual Deployment

1. **Install Vercel CLI** (optional)
   ```bash
   npm i -g vercel
   ```

2. **Connect Your Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Build Settings**
   ```
   Framework Preset: Next.js
   Build Command: pnpm build
   Output Directory: .next (auto-detected)
   Install Command: pnpm install
   Development Command: pnpm dev
   ```

4. **Environment Variables** (if needed)
   ```
   NODE_ENV=production
   ```

5. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically
   - Get your production URL

### Vercel Features

✅ **Automatic deployments** on git push
✅ **Preview deployments** for pull requests
✅ **Edge Network** for fast global delivery
✅ **Analytics** built-in
✅ **Zero configuration** needed

---

## Netlify Deployment

### Via Netlify Dashboard

1. **Connect Repository**
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository

2. **Build Settings**
   ```
   Base directory: (leave empty)
   Build command: pnpm build
   Publish directory: .next
   ```

3. **Environment Variables**
   ```
   NODE_VERSION=18
   ```

### Via Netlify CLI

```bash
npm i -g netlify-cli
netlify init
netlify deploy --prod
```

---

## Self-Hosting (Node.js Server)

### Prerequisites
- Node.js 18+ installed
- Domain with SSL certificate (recommended)

### Steps

1. **Build the Application**
   ```bash
   pnpm install
   pnpm build
   ```

2. **Start Production Server**
   ```bash
   pnpm start
   ```
   Server runs on `http://localhost:3000`

3. **Use Process Manager (PM2)**
   ```bash
   npm i -g pm2
   pm2 start npm --name "folder-studio" -- start
   pm2 save
   pm2 startup
   ```

4. **Configure Reverse Proxy (Nginx)**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## Docker Deployment

### Dockerfile

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Install pnpm
RUN npm install -g pnpm

# Build
RUN pnpm build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Build and Run

```bash
# Build image
docker build -t folder-studio .

# Run container
docker run -p 3000:3000 folder-studio
```

---

## Environment Variables

Currently, Folder Studio doesn't require any environment variables for basic functionality.

For future features, you might need:

```env
# Optional - for analytics
NEXT_PUBLIC_GA_ID=your-ga-id

# Optional - for error tracking
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

---

## Performance Optimization

### Build Optimizations
- ✅ Automatic code splitting
- ✅ Image optimization (Next.js)
- ✅ CSS minification
- ✅ Tree shaking
- ✅ Static page generation

### Runtime Optimizations
- ✅ Edge runtime support
- ✅ CDN caching
- ✅ Gzip compression
- ✅ Browser caching headers

---

## Monitoring & Analytics

### Vercel Analytics
Built-in analytics available in Vercel dashboard:
- Page views
- Performance metrics
- Geographic distribution
- Device breakdown

### Custom Analytics
Add your own analytics:

1. **Google Analytics**
   ```typescript
   // app/layout.tsx
   import { GoogleAnalytics } from '@next/third-parties/google'

   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <GoogleAnalytics gaId="GA_MEASUREMENT_ID" />
         </body>
       </html>
     )
   }
   ```

---

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules
pnpm install
pnpm build
```

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Memory Issues
```bash
# Increase Node memory limit
NODE_OPTIONS=--max-old-space-size=4096 pnpm build
```

---

## Support

For deployment issues:
- Check [GitHub Issues](https://github.com/yourusername/folder-studio/issues)
- Refer to [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- Contact support team

---

**Last Updated**: 2025-11-16
**Version**: 1.0.0
