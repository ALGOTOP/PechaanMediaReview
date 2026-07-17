import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

/* ─── DATA ──────────────────────────────────────────────────── */

const servicePanels = [
  {
    n: "01",
    title: "STRATEGY",
    subtitle: "Every site starts with intent, not aesthetics.",
    body: "We map your goals, audience, and competitive landscape before a single pixel is placed. You leave the discovery call with a clear blueprint — not a vague pitch.",
    tags: ["Brand Audit", "User Research", "IA & Wireframes", "Conversion Strategy"],
    img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=900&auto=format&fit=crop&q=80",
  },
  {
    n: "02",
    title: "VISUAL DESIGN",
    subtitle: "No templates. No shortcuts.",
    body: "Full high-fidelity mockups in your brand's exact visual language — desktop and mobile. You review, request revisions, then sign off before we write a line of code.",
    tags: ["UI / UX Design", "Brand Integration", "Motion Concepts", "Design System"],
    img: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=900&auto=format&fit=crop&q=80",
  },
  {
    n: "03",
    title: "DEVELOPMENT",
    subtitle: "Coded for performance, not just appearance.",
    body: "We build with semantic HTML, optimised assets, and real performance budgets. Fast on 4G. Accessible. Ready for Google's Core Web Vitals on day one.",
    tags: ["React / Next.js", "SEO-Ready HTML", "Core Web Vitals", "CMS Integration"],
    img: "https://images.unsplash.com/photo-1555099962-4199c17fc8f6?w=900&auto=format&fit=crop&q=80",
  },
  {
    n: "04",
    title: "OPTIMISATION",
    subtitle: "Built to rank. Built to convert.",
    body: "Schema markup, sitemap, compressed assets, and lazy loading baked in. We don't add SEO as an afterthought — it's part of how we build.",
    tags: ["Page Speed", "Technical SEO", "Accessibility", "Analytics Setup"],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=80",
  },
  {
    n: "05",
    title: "LAUNCH",
    subtitle: "We don't vanish at go-live.",
    body: "Domain connection, Google Search Console submission, 30-day post-launch support, and handoff documentation so your team can update content independently.",
    tags: ["Domain Setup", "Search Console", "Edit Docs", "30-Day Support"],
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&auto=format&fit=crop&q=80",
  },
];

const tiles = [
  { label: "E-Commerce", sub: "Storefront & Product UX", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&auto=format&fit=crop&q=80" },
  { label: "SaaS / Startup", sub: "Product & Dashboard", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&auto=format&fit=crop&q=80" },
  { label: "Brand Landing", sub: "Campaign & Launch", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&auto=format&fit=crop&q=80" },
  { label: "Agency & Studio", sub: "Portfolio & Work", img: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=700&auto=format&fit=crop&q=80" },
  { label: "Professional Services", sub: "Corporate & Trust", img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=700&auto=format&fit=crop&q=80" },
  { label: "Portfolio", sub: "Personal & Creative", img: "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?w=700&auto=format&fit=crop&q=80" },
];

const stats = [
  { value: 70, label: "Brands served" },
  { value: 5, label: "Years of craft" },
  { value: 120, label: "Sites launched" },
  { value: 98, label: "Client satisfaction" },
];

const faqs = [
  { q: "How long does a project take?", a: "Most projects run 3–6 weeks from kickoff to launch. Timelines depend on the number of pages, the speed of feedback rounds, and whether copy and assets are ready from your side. We'll give you a specific estimate after the discovery call." },
  { q: "Do you handle hosting?", a: "We build and deploy your site and can advise on the right hosting setup for your needs. We'll set up the account, connect the domain, and show you exactly what you're paying for." },
  { q: "Will the site rank on Google?", a: "Every site we build has the technical foundations Google needs: clean HTML structure, fast load times, proper meta tags, and a sitemap. Ranking also depends on your content, backlinks, and competition — we'll be honest about what we can and can't control." },
  { q: "Can I update it myself after launch?", a: "Yes. We structure projects so non-technical team members can edit text, swap images, and add new content without touching code. We provide handoff documentation and a short walkthrough on launch day." },
];

/* ─── HELPERS ────────────────────────────────────────────────── */

function Chars({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className={`hero-char inline-block ${className ?? ""}`}
          style={{ whiteSpace: ch === " " ? "pre" : undefined }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </>
  );
}

function scrollToContact() {
  const el = document.querySelector("#contact") ?? document.querySelector("footer");
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

/* ─── MARQUEE ────────────────────────────────────────────────── */

const MARQUEE_TEXT = "WEB DESIGN  ·  UI / UX  ·  BRAND EXPERIENCE  ·  CONVERSION DESIGN  ·  PERFORMANCE BUILD  ·  ";

function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const anim = gsap.to(track, {
      xPercent: -50,
      duration: 22,
      ease: "none",
      repeat: -1,
    });
    return () => { anim.kill(); };
  }, []);

  const repeated = MARQUEE_TEXT.repeat(8);

  return (
    <div className="overflow-hidden border-y border-white/10 py-4 select-none">
      <div ref={trackRef} className="flex whitespace-nowrap" style={{ width: "max-content" }}>
        <span className="text-xs font-mono tracking-[0.3em] text-white/30 uppercase pr-0">
          {repeated}
        </span>
        <span className="text-xs font-mono tracking-[0.3em] text-white/30 uppercase pr-0" aria-hidden>
          {repeated}
        </span>
      </div>
    </div>
  );
}

/* ─── FAQ ITEM ───────────────────────────────────────────────── */

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    if (open) {
      gsap.fromTo(el, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.45, ease: "power3.out" });
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.35, ease: "power3.in" });
    }
  }, [open]);

  return (
    <div className="faq-item border-t border-white/10">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="text-sm md:text-base font-medium text-white group-hover:text-white/70 transition-colors pr-8">
          {q}
        </span>
        <span
          className="shrink-0 w-6 h-6 rounded-full border border-white/20 flex items-center justify-center transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div ref={bodyRef} className="overflow-hidden h-0 opacity-0">
        <p className="text-white/50 text-sm leading-relaxed pb-6 max-w-2xl">{a}</p>
      </div>
    </div>
  );
}

/* ─── PAGE ───────────────────────────────────────────────────── */

export default function WebDesignAgency() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Hero chars ── */
      gsap.fromTo(
        ".hero-char",
        { y: 90, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.025, duration: 1, ease: "power4.out", delay: 0.2 }
      );
      gsap.fromTo(
        ".hero-sub",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 1 }
      );
      gsap.fromTo(
        ".hero-cta",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 1.2 }
      );
      gsap.fromTo(
        ".hero-scroll-hint",
        { opacity: 0 },
        { opacity: 1, duration: 0.6, delay: 1.8 }
      );

      /* ── Service panels ── */
      document.querySelectorAll<HTMLElement>(".service-panel").forEach((panel) => {
        const line = panel.querySelector<HTMLElement>(".panel-line");
        const num = panel.querySelector<HTMLElement>(".panel-num");
        const title = panel.querySelector<HTMLElement>(".panel-title");
        const content = panel.querySelector<HTMLElement>(".panel-content");
        const img = panel.querySelector<HTMLElement>(".panel-img");

        if (line) {
          gsap.fromTo(line,
            { scaleX: 0 },
            { scaleX: 1, duration: 1.1, ease: "power3.inOut", transformOrigin: "left center",
              scrollTrigger: { trigger: panel, start: "top 85%", toggleActions: "play none none none" } }
          );
        }
        if (num) {
          gsap.fromTo(num,
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
              scrollTrigger: { trigger: panel, start: "top 78%", toggleActions: "play none none none" } }
          );
        }
        if (title) {
          gsap.fromTo(title,
            { letterSpacing: "0.01em", opacity: 0.2 },
            { letterSpacing: "0.18em", opacity: 1, duration: 1.4, ease: "power3.out",
              scrollTrigger: { trigger: panel, start: "top 75%", toggleActions: "play none none none" } }
          );
        }
        if (content) {
          gsap.fromTo(content,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out",
              scrollTrigger: { trigger: panel, start: "top 72%", toggleActions: "play none none none" } }
          );
        }
        if (img) {
          gsap.fromTo(img,
            { scale: 1.08, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.3, ease: "power3.out",
              scrollTrigger: { trigger: panel, start: "top 70%", toggleActions: "play none none none" } }
          );
        }
      });

      /* ── Tiles ── */
      gsap.fromTo(".work-tile",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".tiles-grid", start: "top 80%" } }
      );

      /* ── Stats ── */
      document.querySelectorAll<HTMLElement>(".stat-num").forEach((el) => {
        const target = parseInt(el.dataset.target ?? "0", 10);
        const suffix = el.dataset.suffix ?? "+";
        let triggered = false;
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          onEnter: () => {
            if (triggered) return;
            triggered = true;
            const obj = { val: 0 };
            gsap.to(obj, {
              val: target, duration: 1.8, ease: "power2.out",
              onUpdate() { el.textContent = Math.round(obj.val) + suffix; },
            });
          },
        });
      });

      /* ── FAQ ── */
      gsap.fromTo(".faq-item",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.09, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".faq-list", start: "top 80%" } }
      );

      /* ── Section headings ── */
      document.querySelectorAll<HTMLElement>(".section-heading").forEach((el) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" } }
        );
      });

      /* ── CTA section ── */
      gsap.fromTo(".cta-section",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".cta-section", start: "top 80%" } }
      );

      /* ── Hero scroll parallax on the grain overlay ── */
      gsap.to(".hero-grain", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: true },
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-[#000] text-white overflow-x-hidden">
      <Navigation />

      {/* ─── JSON-LD ─── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Web Design Agency",
            provider: { "@type": "Organization", name: "Pehchaan Media", url: "https://pnmh.site" },
            description: "Custom website design and development for brands worldwide. Mobile-responsive, SEO-ready, and built for conversion.",
            url: "https://pnmh.site/services/web-design-agency",
            areaServed: "Worldwide",
          }),
        }}
      />

      {/* ══════════════════════════════════════════════ HERO */}
      <section className="hero-section relative min-h-screen flex flex-col justify-between px-6 md:px-12 pt-28 pb-12 overflow-hidden">

        {/* Noise grain overlay */}
        <div
          className="hero-grain pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
            backgroundSize: "256px 256px",
          }}
        />

        {/* Label */}
        <p className="text-[10px] font-mono tracking-[0.35em] text-white/30 uppercase z-10">
          Pehchaan Media — Web Design
        </p>

        {/* Giant title */}
        <div className="flex-1 flex flex-col justify-center z-10 py-10">
          <div className="overflow-hidden mb-1 md:mb-2">
            <h1
              className="text-[14vw] md:text-[12vw] lg:text-[11vw] font-black leading-[0.88] tracking-tight uppercase"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <Chars text="WEB" />
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1
              className="text-[14vw] md:text-[12vw] lg:text-[11vw] font-black leading-[0.88] tracking-tight uppercase"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <Chars text="DESIGN" />
              <span className="hero-char inline-block italic text-white/30 text-[6vw] md:text-[5vw] align-middle ml-6 md:ml-10 font-light not-italic" style={{ fontStyle: "italic", letterSpacing: "-0.02em" }}>
                AGENCY
              </span>
            </h1>
          </div>
        </div>

        {/* Bottom row */}
        <div className="hero-sub flex flex-col md:flex-row items-start md:items-end justify-between gap-8 z-10">
          <p className="text-base md:text-lg text-white/55 max-w-md leading-relaxed font-light">
            We design and build high-performance websites that look the part and{" "}
            <em className="not-italic text-white/80 font-medium">actually convert</em> — from landing pages to full brand experiences.
          </p>
          <div className="hero-cta flex items-center gap-5 shrink-0">
            <button
              onClick={scrollToContact}
              className="group flex items-center gap-3 bg-white text-black text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-white/90 transition-colors"
            >
              Book A Call
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-0.5 transition-transform">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="text-white/25 text-xs font-mono hidden md:block">↓ scroll</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll-hint absolute bottom-12 right-6 md:right-12 flex flex-col items-center gap-2">
          <div className="w-px h-16 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════ MARQUEE */}
      <Marquee />

      {/* ══════════════════════════════════════════════ SERVICES PANELS */}
      <section className="px-6 md:px-12">
        {/* Section intro */}
        <div className="section-heading max-w-4xl pt-28 pb-16">
          <p className="text-[10px] font-mono tracking-[0.35em] text-white/30 uppercase mb-8">What We Do</p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tight">
            Five disciplines.<br />
            <span className="text-white/30 italic font-light">One seamless build.</span>
          </h2>
        </div>

        {/* Panels */}
        <div className="divide-y divide-white/[0.07]">
          {servicePanels.map((panel, i) => (
            <div key={panel.n} className={`service-panel py-16 md:py-20 service-panel-${i}`}>
              {/* Top divider line */}
              <div className="panel-line h-px bg-white/20 w-full mb-10 origin-left" />

              <div className="grid md:grid-cols-12 gap-8 items-start">
                {/* Left col */}
                <div className="md:col-span-7">
                  <div className="flex items-baseline gap-5 md:gap-8 mb-6">
                    <span className="panel-num text-[10px] font-mono tracking-[0.3em] text-white/30 shrink-0 mt-1">
                      {panel.n}/
                    </span>
                    <h3
                      className="panel-title text-3xl md:text-5xl lg:text-6xl font-black uppercase leading-none"
                      style={{ letterSpacing: "0.01em" }}
                    >
                      {panel.title}
                    </h3>
                  </div>
                  <div className="panel-content pl-0 md:pl-[calc(1ch+2rem)]">
                    <p className="text-white/40 text-sm italic mb-4 font-light">{panel.subtitle}</p>
                    <p className="text-white/65 text-base leading-relaxed mb-8 max-w-xl">{panel.body}</p>
                    <div className="flex flex-wrap gap-2">
                      {panel.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-mono tracking-widest uppercase border border-white/15 text-white/40 px-3 py-1.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right col – image */}
                <div className="md:col-span-5 overflow-hidden rounded-xl">
                  <div className="panel-img aspect-[4/3] overflow-hidden rounded-xl">
                    <img
                      src={panel.img}
                      alt={panel.title}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale opacity-60 hover:opacity-90 hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════ WEBSITE TYPES */}
      <section className="px-6 md:px-12 py-28 border-t border-white/[0.06]">
        <div className="section-heading mb-14">
          <p className="text-[10px] font-mono tracking-[0.35em] text-white/30 uppercase mb-6">Who We Build For</p>
          <h2 className="text-4xl md:text-5xl font-black leading-tight">
            Every kind of brand.
          </h2>
        </div>

        <div className="tiles-grid grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {tiles.map((tile) => (
            <div
              key={tile.label}
              className="work-tile group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-default"
            >
              <img
                src={tile.img}
                alt={tile.label}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover grayscale scale-105 group-hover:scale-100 group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <p className="text-white font-bold text-sm md:text-base leading-tight">{tile.label}</p>
                <p className="text-white/45 text-[10px] md:text-xs font-mono tracking-widest uppercase mt-1">{tile.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════ STATS */}
      <section className="px-6 md:px-12 py-20 border-t border-white/[0.06] bg-white/[0.02]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-2">
              <span
                className="stat-num text-5xl md:text-6xl font-black tabular-nums"
                data-target={s.value}
                data-suffix="+"
              >
                0+
              </span>
              <span className="text-white/35 text-xs font-mono tracking-widest uppercase">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════ PROCESS */}
      <section className="px-6 md:px-12 py-28 border-t border-white/[0.06]">
        <div className="section-heading mb-16">
          <p className="text-[10px] font-mono tracking-[0.35em] text-white/30 uppercase mb-6">Process</p>
          <h2 className="text-4xl md:text-5xl font-black leading-tight">
            From brief to launch.<br />
            <span className="text-white/30 font-light italic">No surprises.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-5 gap-px bg-white/[0.06]">
          {[
            { n: "01", title: "Discovery", body: "Goals, audience, competitive landscape. A clear blueprint before any design." },
            { n: "02", title: "Strategy", body: "Page architecture and user flow approved before we touch visuals." },
            { n: "03", title: "Design", body: "High-fidelity mockups in your brand voice. Desktop and mobile, fully revised." },
            { n: "04", title: "Build & QA", body: "Developed, tested across browsers, performance and accessibility checked." },
            { n: "05", title: "Launch", body: "Deployed to your domain. Google Search Console. Handoff docs. Done." },
          ].map((step) => (
            <div key={step.n} className="bg-black p-6 md:p-8 flex flex-col gap-4">
              <span className="text-[10px] font-mono tracking-[0.3em] text-white/25">{step.n}</span>
              <h3 className="text-base font-bold text-white">{step.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════ FAQ */}
      <section className="px-6 md:px-12 py-28 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto">
          <div className="section-heading mb-12">
            <p className="text-[10px] font-mono tracking-[0.35em] text-white/30 uppercase mb-6">FAQ</p>
            <h2 className="text-4xl md:text-5xl font-black">Common questions.</h2>
          </div>
          <div className="faq-list">
            {faqs.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
            <div className="border-t border-white/10" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ CTA */}
      <section className="cta-section px-6 md:px-12 py-36 border-t border-white/[0.06] relative overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)" }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-[10px] font-mono tracking-[0.35em] text-white/30 uppercase mb-8">Let's Work Together</p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight mb-8">
            Ready<br />
            <span className="text-white/25 italic font-light">to start?</span>
          </h2>
          <p className="text-white/50 text-base md:text-lg mb-12 max-w-lg mx-auto leading-relaxed">
            Book a free 15-minute call. We'll tell you honestly what your site needs and what it'll take.
          </p>
          <button
            onClick={scrollToContact}
            className="group inline-flex items-center gap-3 bg-white text-black text-sm font-semibold px-10 py-4 rounded-full hover:bg-white/90 transition-colors"
          >
            Book A Call
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-0.5 transition-transform">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
