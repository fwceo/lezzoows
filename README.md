# Lezzoo Website

## Quick Deploy to Vercel (Recommended — 2 minutes)

### Option 1: GitHub → Vercel (Best)
1. Push this folder to a GitHub repo:
   ```bash
   git init
   git add .
   git commit -m "Lezzoo website"
   gh repo create lezzoo-web --public --push
   ```
2. Go to [vercel.com](https://vercel.com) → "Add New Project"
3. Import your GitHub repo
4. Click "Deploy" — done! You get a shareable URL instantly.

### Option 2: Vercel CLI (Fastest)
1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```
2. Deploy:
   ```bash
   vercel
   ```
3. Follow the prompts. You'll get a live URL in ~60 seconds.

### Option 3: Netlify
1. Run `npm run build`
2. Drag the `.next` folder to [app.netlify.com/drop](https://app.netlify.com/drop)

## Development
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Tech Stack
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
