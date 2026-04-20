# Pehchaan Media — Website

Full-service creative agency website built with React + Express + TypeScript.

## Architecture

- **Frontend**: React 18, Vite, Tailwind CSS, shadcn/ui, Framer Motion
- **Backend**: Express (Node.js), TypeScript via `tsx`
- **Database**: PostgreSQL via Drizzle ORM + `@neondatabase/serverless`
- **Routing**: `wouter` (client-side), Express (API)
- **Port**: 5000 (both frontend served via Vite middleware and API)

## Key Pages & Components

- `client/src/pages/Home.tsx` — main landing page
- `client/src/components/Hero.tsx` — full-screen hero with parallax
- `client/src/components/Services.tsx` — bento grid of services
- `client/src/components/Portfolio.tsx` — masonry grid / mobile carousel
- `client/src/components/Showreel.tsx` — video showreel section
- `client/src/components/Testimonials.tsx` — auto-scrolling testimonial wall
- `client/src/components/Contact.tsx` — contact info + booking calendar
- `client/src/components/BookingCalendar.tsx` — custom booking calendar with form

## Backend

- `server/routes.ts` — API routes
  - `POST /api/booking` — sends two emails via Resend (notification to team + confirmation to user)
- `server/storage.ts` — storage interface (Drizzle + PostgreSQL)

## Email (Resend)

- **Provider**: Resend (`resend` npm package)
- **Secret**: `RESEND_API_KEY` stored in Replit Secrets
- **Notify address**: `infopehchaanmedia@gmail.com`
- **From address**: `onboarding@resend.dev` (Resend's shared sender — upgrade to custom domain when ready)
- **Note**: Resend integration was not connected via Replit OAuth; API key is stored directly as a secret.
  When revisiting email setup, check `RESEND_API_KEY` secret exists before making changes.

## Image Optimisation

- All images converted to WebP (93–98% size reduction vs PNG/JPEG)
- Hero image uses `fetchpriority="high"` for fast LCP
- All below-the-fold images use `loading="lazy"`
- Showreel thumbnails live in `client/public/thumbnails/` as `.webp`
- Avatar images in `attached_assets/generated_images/avatars/` as `.webp`

## Development

```bash
npm run dev      # Start dev server on port 5000
npm run build    # Build for production
npm run db:push  # Push schema changes to database
```
