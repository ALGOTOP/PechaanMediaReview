# Design Guidelines for Pehchaan Media Portfolio Redesign

## Design Approach: Reference-Based (Awwwards 2025 Winners)

Drawing inspiration from Olha Lazarieva, Form&Fun Studio, and elite creative portfolios while maintaining Pehchaan Media's brand identity.

**Core Philosophy:** Premium minimalism meets bold storytelling. Every pixel serves purpose. Less quantity, more impact.

---

## Typography System

**Primary Font:** Space Grotesk or Inter (Google Fonts)
- Hero Headlines: 72-96px (clamp), 700 weight, tight line-height (1.1)
- Section Headers: 48-64px, 600 weight
- Body Large: 20-24px, 400 weight, 1.6 line-height
- Body Regular: 16-18px, 400 weight
- Captions: 14px, 500 weight, uppercase tracking (0.1em)

**Secondary Font:** Manrope or Epilogue
- Used for statistics, quotes, and special callouts

---

## Layout System

**Spacing Units:** Tailwind 4, 8, 12, 16, 24, 32 exclusively
- Section padding: py-32 (desktop), py-20 (tablet), py-12 (mobile)
- Container max-width: max-w-7xl
- Component gaps: gap-8 to gap-16

**Grid Strategy:**
- Hero: Full-width, 80vh minimum
- Features: 3-column grid (lg:grid-cols-3)
- Portfolio: Masonry-style asymmetric grid
- Testimonials: 2-column stagger

---

## Core Components

### Navigation
- Fixed transparent header, blur-on-scroll
- Minimal logo left, 4-5 nav items right
- Hamburger menu (mobile) with full-screen overlay
- Micro-interactions on hover (underline animation)

### Hero Section
- Full-bleed video background OR large-scale imagery
- Oversized headline with animated reveal (fade-up on load)
- Single focused CTA with blurred background treatment
- Scroll indicator (animated downward arrow)

### Portfolio Grid
- Asymmetric masonry layout (varying heights)
- Hover states: subtle scale (1.02) + overlay reveal
- Project cards: Image + minimal text overlay
- Filter tags: Horizontal scrolling pill buttons

### Case Study Cards
- Large thumbnail (16:9 ratio)
- Bold project title (40-48px)
- Category tags + brief descriptor
- "View Project" link with arrow

### Showreel Section
- Embedded video player (16:9, center-aligned)
- Grid of smaller work samples below (3-4 columns)
- Each thumbnail: play icon overlay on hover

### Testimonial Display
- Large quote typography (28-32px)
- Client avatar + name + company
- Horizontal carousel OR vertical stagger layout
- No traditional cards - raw quotes on canvas

### Statistics Module
- Large numbers (72-96px) with minimal labels
- 4-column grid on desktop, stacked mobile
- Counter animation on scroll-into-view

### Contact Section
- 2-column: Form left, info/map right
- Minimal form fields (Name, Email, Message)
- Large, confident submit button
- Social icons + email/phone displayed prominently

---

## Images

**Hero:** Full-width cinematic image or video showing creative work in action (film set, design studio, or brand campaign). Minimum 1920x1080px.

**Portfolio Thumbnails:** High-quality project screenshots, 1200x800px minimum, consistent aspect ratios within sections.

**Case Study Headers:** Hero-style project images, 1920x600px.

**Team/About:** Candid studio photos showing personality and craft.

---

## Animations (Minimal & Purposeful)

- Hero headline: Fade-up on load (0.8s ease-out)
- Portfolio items: Stagger fade-in on scroll (100ms delay between)
- Statistics: Count-up animation when visible
- Navigation: Smooth blur transition on scroll
- Hover states: Subtle scale (1.02), 200ms transition

**Critical:** No distracting scroll-jacking, parallax, or excessive motion. Prioritize performance.

---

## Visual Hierarchy Principles

1. **Whitespace is premium** - generous padding between sections (py-24 to py-32)
2. **Focal points** - one hero element per section
3. **Contrast** - bold headlines vs. minimal body text
4. **Rhythm** - alternate dense/sparse sections
5. **Depth** - subtle shadows (shadow-xl) on cards only

---

## Key Differentiators from Current Site

- **Replace generic three-column service grids** with asymmetric, visually-led storytelling
- **Eliminate repetitive testimonial carousel** - show 6-8 best quotes in staggered layout
- **Upgrade portfolio presentation** - masonry grid vs. uniform cards
- **Reduce section count** - merge "Who We Are" + "What We Do" into single impactful manifesto
- **Add micro-interactions** - subtle hover states, smooth transitions
- **Implement better vertical rhythm** - consistent spacing creates premium feel

---

## Accessibility

- Minimum contrast ratio 4.5:1 for all text
- Focus states: 2px outline with offset
- Form labels always visible (no placeholder-only)
- Keyboard navigation: logical tab order
- Alt text for all portfolio images

---

This redesign elevates Pehchaan Media from competent to award-worthy through strategic minimalism, bold typography, asymmetric layouts, and purposeful restraint.