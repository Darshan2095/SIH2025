This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

1) Set env vars in Vercel → Project → Settings → Environment Variables
   - `MONGODB_URI` = your MongoDB connection string

2) Build settings
   - Framework Preset: Next.js
   - Build Command: `next build`
   - Output Directory: `.next`

3) Seed data (optional)
   - After deploy, send a POST to `/api/colleges/import` once to import `ext/jammu_kashmir_colleges_govt_private.json`.

4) Local dev
   - Create `.env.local` with `MONGODB_URI`
   - Run `npm run dev`
