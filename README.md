# Portfolio

Next.js (App Router) + TypeScript + Tailwind CSS v4 + GSAP.

- Edit your details and projects in `data/projects.ts`
- Put screenshots in `public/projects/` (about 1440x900, home page / hero) and
  point each project's `image` at them, e.g. `/projects/my-site.png`
- Page structure lives in `app/page.tsx`; each `<Panel>` is one full-screen
  step in the horizontal scroll
- Scroll animation lives in `components/HorizontalScroll.tsx` (GSAP ScrollTrigger).
  Below 768px or with reduced motion enabled it falls back to a normal vertical page
- Run locally: `npm install && npm run dev`
- Deploy: push to GitHub and import the repo in Vercel (no config needed)
