import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

import webImage    from "@assets/web_digital_hd.webp";
import halvaImage  from "@assets/halva_hd.webp";
import sphinxImage from "@assets/sphinx_hd.webp";
import trulyImage  from "@assets/truly_hd.webp";
import brandImage  from "@assets/10002_1773591659727.webp";

/* ─── JSON-LD schemas ────────────────────────────────────────────── */
const schemaService = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Web Design",
  name: "Web Design Agency",
  provider: {
    "@type": "Organization",
    name: "Pehchaan Media",
    url: "https://pnmh.site",
    sameAs: [
      "REPLACE_WITH_INSTAGRAM_URL",
      "REPLACE_WITH_LINKEDIN_URL",
    ],
  },
  areaServed: "Worldwide",
  description:
    "Custom web design agency for brands worldwide. Mobile-responsive, SEO-ready sites built to convert.",
  url: "https://pnmh.site/services/web-design-agency",
};

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does a website project take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most projects run 3 to 6 weeks from kickoff to launch. Timeline depends on scope, how quickly feedback rounds move, and whether copy and assets are ready on your end.",
      },
    },
    {
      "@type": "Question",
      name: "Do you handle hosting and deployment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We build, deploy to your domain, configure hosting, and hand over full access with documentation, so you're never locked in to us for maintenance.",
      },
    },
    {
      "@type": "Question",
      name: "Will the site rank on Google?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every site we build ships with clean semantic HTML, proper meta tags, fast load times, a sitemap, and structured data where relevant. Ranking still depends on content quality and authority over time.",
      },
    },
    {
      "@type": "Question",
      name: "Can my team update the site after launch?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We structure the CMS and write handoff docs specifically so your team can edit content, add pages, and swap images without touching code.",
      },
    },
  ],
};

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://pnmh.site" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://pnmh.site/services" },
    { "@type": "ListItem", position: 3, name: "Web Design Agency", item: "https://pnmh.site/services/web-design-agency" },
  ],
};

/* ─── Data ───────────────────────────────────────────────────────── */
const services = [
  "Custom design from scratch, no templates, no recycled layouts",
  "Mobile-first, fully responsive builds tested across devices",
  "SEO-ready semantic HTML, clean URLs, and proper meta structure",
  "Fast load times optimised for Core Web Vitals from day one",
  "Easy content editing with a clear post-launch handoff",
  "Conversion-focused layout. Every section earns its place.",
];

const steps = [
  { n: "01", title: "Discovery", body: "We learn your goals, audience, and competitors before a single pixel is designed. A project without context is guesswork." },
  { n: "02", title: "Strategy", body: "We map the site architecture, plan the content hierarchy, and agree on the conversion flow — so design decisions have a reason." },
  { n: "03", title: "Design", body: "Wireframes first, then high-fidelity visuals. You review and approve before anything is built." },
  { n: "04", title: "Build", body: "Clean, maintainable code. We run QA on real devices, not just a browser emulator, before sign-off." },
  { n: "05", title: "Launch & Handoff", body: "We deploy to your domain, set up hosting, and hand over full control — with documentation your team can actually use." },
];

const faqs: { q: string; a: string }[] = [
  {
    q: "How long does a website project take?",
    a: "Most projects run 3 to 6 weeks from kickoff to launch. Timeline depends on scope, how quickly feedback rounds move, and whether copy and assets are ready on your end. We'll give you an honest estimate after the discovery call.",
  },
  {
    q: "Do you handle hosting and deployment?",
    a: "Yes. We build, deploy to your domain, configure hosting, and hand over full access with documentation, so you're never locked in to us for maintenance.",
  },
  {
    q: "Will the site rank on Google?",
    a: "Every site we build ships with clean semantic HTML, proper meta tags, fast load times, a sitemap, and structured data where relevant. That's the technical foundation search engines need. Ranking still depends on content quality and authority over time. We won't promise otherwise.",
  },
  {
    q: "Can my team update the site after launch?",
    a: "Yes. We structure the CMS and write handoff docs specifically so your team can edit content, add pages, and swap images without touching code.",
  },
];

const proofImages = [
  { src: halvaImage,  alt: "Halva ecommerce website homepage design",   label: "Halva" },
  { src: sphinxImage, alt: "Sphinx brand website design",               label: "Sphinx" },
  { src: trulyImage,  alt: "Truly brand website design",                label: "Truly" },
  { src: brandImage,  alt: "Brand identity design system example",      label: "Brand" },
];

/* ─── FAQ accordion row ──────────────────────────────────────────── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
        aria-expanded={open}
      >
        <h3 className="text-sm md:text-base font-semibold leading-snug group-hover:opacity-70 transition-opacity">
          {q}
        </h3>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 w-6 h-6 border border-border rounded-full flex items-center justify-center text-muted-foreground"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="text-sm text-muted-foreground leading-relaxed pb-5 max-w-2xl">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function WebDesignAgency() {
  const bookCall = () => {
    window.location.href = "mailto:infopehchaanmedia@gmail.com?subject=Web%20Design%20Enquiry";
  };

  return (
    <div className="bg-white text-foreground font-sans overflow-x-hidden">
      {/* JSON-LD: Service */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaService) }} />
      {/* JSON-LD: FAQPage */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }} />
      {/* JSON-LD: BreadcrumbList */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />

      <Navigation />

      {/* ══ HERO ══════════════════════════════════════════════════════
          Left half: image   |   Right half: headline + sub + CTA
          Visible in full on both desktop and mobile without scrolling. */}
      <section
        id="hero"
        className="pt-[64px] min-h-[100svh] flex flex-col md:flex-row"
        data-testid="section-hero"
      >
        {/* Text panel */}
        <div className="w-full md:w-1/2 flex items-center px-6 md:px-14 lg:px-20 py-12 md:py-0">
          <div className="max-w-lg">
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-muted-foreground mb-5">
              Pehchaan Media · Web Design Agency
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.02] mb-6">
              The web design agency<br />
              <span className="italic font-light text-muted-foreground">built for brands.</span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4 max-w-sm">
              We design and build high-performance websites: custom, conversion-focused, and fast. No templates. No shortcuts.
            </p>

            <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-sm">
              Pehchaan Media is a web design agency that builds custom, mobile-first websites designed to convert visitors into customers.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                onClick={bookCall}
                className="px-8 font-semibold"
                data-testid="button-hero-cta"
              >
                Book A Free Call
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 font-semibold"
              >
                See What's Included
              </Button>
            </div>
          </div>
        </div>

        {/* Image panel */}
        <div className="relative w-full md:w-1/2 h-[42vw] md:h-auto min-h-[260px]">
          <img
            src={webImage}
            alt="Custom website design project by Pehchaan Media web design agency"
            className="absolute inset-0 w-full h-full object-cover"
            fetchpriority="high"
          />
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-l from-transparent to-white hidden md:block" />
        </div>
      </section>

      {/* ══ PROOF STRIP ═══════════════════════════════════════════════
          Real project visuals — no fabricated logos or stats. */}
      <section id="work" className="border-t border-border bg-white py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-mono tracking-[0.18em] uppercase text-muted-foreground mb-6 text-center">
            Selected work
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {proofImages.map(({ src, alt, label }) => (
              <div key={label} className="group relative overflow-hidden rounded-lg aspect-[4/3] bg-muted">
                <img
                  src={src}
                  alt={alt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                <span className="absolute bottom-3 left-3 text-[11px] font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SERVICE BREAKDOWN ═════════════════════════════════════════ */}
      <section id="services" className="py-20 md:py-28 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">

            {/* Left — heading */}
            <div>
              <p className="text-xs font-mono tracking-[0.18em] uppercase text-muted-foreground mb-4">
                What's included
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-[1.05] mb-6">
                Everything your site needs<br />
                <span className="italic font-light text-muted-foreground">to actually perform.</span>
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-sm mb-8">
                Every engagement covers the full stack: strategy, design, and development as a single unified team, not handed off between silos.
              </p>
              <Button size="lg" onClick={bookCall} className="px-8 font-semibold">
                Start a Project
              </Button>
            </div>

            {/* Right — bullet list */}
            <ul className="flex flex-col divide-y divide-border">
              {services.map((item, i) => (
                <li key={i} className="flex items-start gap-4 py-4">
                  <span className="mt-[2px] shrink-0 w-5 h-5 rounded-full bg-foreground flex items-center justify-center">
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                      <path d="M1.5 4.5l2 2 4-4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="text-sm md:text-base leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ══ PROCESS ═══════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 border-t border-border bg-[#f9f9f9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-xs font-mono tracking-[0.18em] uppercase text-muted-foreground mb-4">
              How it works
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-[1.05]">
              From first call to<br />
              <span className="italic font-light text-muted-foreground">live site.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {steps.map((s, i) => (
              <div
                key={s.n}
                className="relative bg-white border border-border rounded-xl p-6 flex flex-col gap-3 hover-elevate transition-shadow duration-300"
              >
                {/* Connecting line between cards on desktop */}
                {i < steps.length - 1 && (
                  <span className="hidden md:block absolute top-8 -right-3 w-6 border-t border-dashed border-border z-10" />
                )}
                <span className="text-xs font-mono text-muted-foreground">{s.n}</span>
                <h3 className="text-base font-bold">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>

          {/* Mid-page CTA */}
          <div className="mt-14 text-center">
            <Button size="lg" onClick={bookCall} className="px-10 font-semibold">
              Book A Free Call
            </Button>
            <p className="text-xs text-muted-foreground mt-3">15 minutes. No pressure. We'll tell you honestly if we're the right fit.</p>
          </div>
        </div>
      </section>

      {/* ══ WHY US ════════════════════════════════════════════════════ */}
      <section id="about" className="py-20 md:py-28 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">

            <div>
              <p className="text-xs font-mono tracking-[0.18em] uppercase text-muted-foreground mb-4">
                Why Pehchaan Media
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-[1.05]">
                We're a creative agency,<br />
                <span className="italic font-light text-muted-foreground">not a template shop.</span>
              </h2>
            </div>

            <div className="flex flex-col gap-6">
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Most web design agencies pick from a library of themes and swap in your logo. We don't. Every project starts from a blank canvas, shaped by who your audience is, what action you want them to take, and how your brand needs to feel to get them there.
              </p>
              {/* TODO: insert real client result/stat here */}
              <p className="text-base text-muted-foreground leading-relaxed">
                We've built websites for product brands, SaaS startups, luxury retail, and service businesses. The work is different every time because the briefs are different every time. Strategy, design, and development stay under one roof, so nothing gets lost in handoffs and no one is making decisions without context.
              </p>
            </div>
          </div>

          {/* Image pair */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="relative overflow-hidden rounded-xl aspect-[4/3] bg-muted col-span-2 md:col-span-2">
              <img
                src={trulyImage}
                alt="Truly website design project by Pehchaan Media"
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="relative overflow-hidden rounded-xl aspect-[4/3] bg-muted">
              <img
                src={sphinxImage}
                alt="Sphinx website design project by Pehchaan Media"
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ═══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 border-t border-border bg-[#f9f9f9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">

            <div className="md:sticky md:top-28">
              <p className="text-xs font-mono tracking-[0.18em] uppercase text-muted-foreground mb-4">
                FAQ
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter leading-[1.05] mb-6">
                Questions we<br />
                <span className="italic font-light text-muted-foreground">get asked first.</span>
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                If something isn't answered here, ask us on the call. That's what it's for.
              </p>
            </div>

            <div>
              <div className="border-t border-border">
                {faqs.map((f) => (
                  <FaqItem key={f.q} q={f.q} a={f.a} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ═════════════════════════════════════════════════ */}
      <section id="contact" className="py-24 md:py-36 border-t border-border bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-mono tracking-[0.18em] uppercase text-background/50 mb-6">
            Let's work together
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95] mb-6">
            Ready to build<br />
            <span className="italic font-light text-background/40">something real?</span>
          </h2>
          <p className="text-base md:text-lg text-background/60 max-w-md mx-auto leading-relaxed mb-10">
            Book a free 15-minute call. We'll tell you honestly what your site needs and whether we're the right team to build it.
          </p>
          <Button
            size="lg"
            variant="outline"
            onClick={bookCall}
            className="px-10 font-semibold bg-transparent text-background border-background/30 hover:bg-background hover:text-foreground transition-colors"
            data-testid="button-footer-cta"
          >
            Book A Free Call →
          </Button>
          <p className="text-xs text-background/30 mt-4">
            Or email us directly: infopehchaanmedia@gmail.com
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
