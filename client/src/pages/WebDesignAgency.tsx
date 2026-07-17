import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── NAV ─────────────────────────────────────────────────────────── */

const navLinks = ["Work", "Services", "About", "Pricing", "Contact"];

function PageNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? "shadow-[0_1px_0_0_#e5e5e5]" : ""}`}
      >
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 h-[60px] flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <span className="text-[15px] font-bold tracking-tight text-[#111]">Pehchaan Media</span>
            <span className="text-[#D42B2B] text-lg leading-none font-bold">*</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((l) => (
              <button
                key={l}
                onClick={() => scrollTo(`#${l.toLowerCase()}`)}
                className="text-[13px] text-[#555] hover:text-[#111] transition-colors font-medium"
              >
                {l}
              </button>
            ))}
          </div>

          {/* Right CTA */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scrollTo("#contact")}
              className="text-[12px] font-medium border border-[#111] text-[#111] px-4 py-1.5 hover:bg-[#111] hover:text-white transition-colors"
            >
              Get Started
            </button>
            <button onClick={() => scrollTo("#contact")} className="w-8 h-8 border border-[#ddd] flex items-center justify-center text-[#999] hover:border-[#111] hover:text-[#111] transition-colors">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden flex flex-col gap-[5px] p-2" onClick={() => setMenuOpen(v => !v)}>
            <motion.span animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="block w-5 h-[1.5px] bg-[#111] origin-center" />
            <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-5 h-[1.5px] bg-[#111]" />
            <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="block w-5 h-[1.5px] bg-[#111] origin-center" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-6 md:hidden"
          >
            {navLinks.map((l, i) => (
              <motion.button
                key={l}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                onClick={() => scrollTo(`#${l.toLowerCase()}`)}
                className="text-4xl font-bold text-[#111]"
              >
                {l}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              onClick={() => scrollTo("#contact")}
              className="mt-4 border border-[#111] px-8 py-3 text-sm font-medium"
            >
              Get Started
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── DATA ─────────────────────────────────────────────────────────── */

const featureCards = [
  {
    bg: "#F6F6F6", textColor: "#111",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18M9 21V9"/></svg>
    ),
    title: "Designed",
    body: "Custom visual design crafted entirely around your brand — no templates, no shortcuts, no recycled layouts.",
  },
  {
    bg: "#F6F6F6", textColor: "#111",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 3"/></svg>
    ),
    title: "Performance",
    body: "Built for Core Web Vitals from the ground up — compressed assets, lazy loading, semantic HTML.",
  },
  {
    bg: "#D42B2B", textColor: "#fff",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
    ),
    title: "Strategy",
    body: "Every project starts with audience mapping, competitor analysis, and a conversion blueprint — before any design begins.",
  },
  {
    bg: "#111111", textColor: "#fff",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    ),
    title: "Distinct",
    body: "Your site should be instantly recognisable. We build brand coherence into every interaction, colour, and corner radius.",
  },
];

const stats = [
  { value: 98, suffix: "%", label: "Client satisfaction" },
  { value: 70, suffix: "+", label: "Brands served" },
  { value: 24, suffix: "/7", label: "Support available" },
  { value: 5, suffix: "+", label: "Years of craft" },
];

const projectCards = [
  { tag: "E-Commerce", title: "Urban Regalia", sub: "Storefront redesign", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&auto=format&fit=crop&q=80" },
  { tag: "SaaS / Startup", title: "Biofin Systems", sub: "Dashboard & product UI", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80" },
  { tag: "Brand Landing", title: "Granvil Residence", sub: "Campaign landing page", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80" },
];

const filterTabs = ["All", "E-Commerce", "SaaS", "Agency", "Portfolio"];

const faqs = [
  { q: "How long does a project take?", a: "Most projects run 3–6 weeks from kickoff to launch, depending on scope and feedback speed." },
  { q: "Do you handle hosting?", a: "We build and deploy to your domain, set up hosting, and hand over full control with docs." },
  { q: "Will the site rank on Google?", a: "Every site ships with clean HTML, fast load times, proper meta tags, and a sitemap — the technical foundation SEO needs." },
  { q: "Can I update it myself after launch?", a: "Yes. We structure the CMS and handoff docs so your team can edit content without touching code." },
];

/* ─── SUBCOMPONENTS ────────────────────────────────────────────────── */

function RedStar() {
  return <span className="text-[#D42B2B] font-bold text-lg leading-none">*</span>;
}

function FaqRow({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-[#E8E8E8]">
      <button onClick={() => setOpen(v => !v)} className="w-full flex items-center justify-between py-5 text-left group">
        <span className="text-[14px] font-medium text-[#111] group-hover:text-[#D42B2B] transition-colors">{q}</span>
        <span className={`shrink-0 w-5 h-5 border border-[#ddd] flex items-center justify-center transition-transform duration-300 ${open ? "rotate-45" : ""}`}>
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M4.5 1v7M1 4.5h7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="overflow-hidden"
      >
        <p className="text-[13px] text-[#777] leading-relaxed pb-5 max-w-xl">{a}</p>
      </motion.div>
    </div>
  );
}

/* ─── PAGE ─────────────────────────────────────────────────────────── */

export default function WebDesignAgency() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero */
      gsap.fromTo(".hero-label", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.2 });
      gsap.fromTo(".hero-headline", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.35 });
      gsap.fromTo(".hero-sub", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.55 });
      gsap.fromTo(".hero-img-wrap", { scale: 1.04, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.5 });

      /* Section reveals */
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(el, { y: 36, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        });
      });

      /* Feature cards stagger */
      gsap.fromTo(".feat-card", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".feat-grid", start: "top 80%" },
      });

      /* Stats count-up */
      document.querySelectorAll<HTMLElement>(".stat-val").forEach(el => {
        const target = parseInt(el.dataset.target ?? "0");
        const suffix = el.dataset.suffix ?? "";
        let done = false;
        ScrollTrigger.create({
          trigger: el, start: "top 85%",
          onEnter: () => {
            if (done) return; done = true;
            const obj = { v: 0 };
            gsap.to(obj, { v: target, duration: 1.8, ease: "power2.out", onUpdate() { el.textContent = Math.round(obj.v) + suffix; } });
          },
        });
      });

      /* Project cards */
      gsap.fromTo(".proj-card", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".proj-grid", start: "top 80%" },
      });

      /* Full-bleed parallax */
      gsap.to(".fullbleed-img", {
        yPercent: 12, ease: "none",
        scrollTrigger: { trigger: ".fullbleed-section", start: "top bottom", end: "bottom top", scrub: true },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="bg-white text-[#111] font-sans overflow-x-hidden">
      <PageNav />

      {/* ══ JSON-LD ═════════════════════════════════════════════════ */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "Service",
          name: "Web Design Agency", provider: { "@type": "Organization", name: "Pehchaan Media", url: "https://pnmh.site" },
          description: "Custom website design and development for brands worldwide.",
          url: "https://pnmh.site/services/web-design-agency",
        }),
      }} />

      {/* ══ HERO ════════════════════════════════════════════════════ */}
      <section className="pt-[60px]">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">

          {/* Top label row */}
          <div className="hero-label flex items-center gap-2 pt-10 pb-6">
            <RedStar />
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#999]">Web Design Agency</span>
          </div>

          {/* Headline + sub split */}
          <div className="grid md:grid-cols-2 gap-8 pb-8 items-end">
            <h1 className="hero-headline text-[36px] md:text-[50px] lg:text-[60px] font-bold leading-[1.05] tracking-tight text-[#111]">
              High-performance websites built for<br />
              <span className="italic font-light text-[#555]">modern brands.</span>
            </h1>
            <div className="hero-sub flex flex-col gap-4 justify-end pb-2">
              <p className="text-[14px] text-[#666] leading-relaxed max-w-sm">
                We design and build websites that are fast, credible, and conversion-focused — from landing pages to full brand experiences. No templates. No shortcuts.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-[#111] text-white text-[12px] font-medium px-5 py-2.5 hover:bg-[#D42B2B] transition-colors"
                >
                  Book A Call
                </button>
                <button
                  onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-[12px] font-medium text-[#555] underline underline-offset-2 hover:text-[#111] transition-colors"
                >
                  See services ↓
                </button>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div className="hero-img-wrap relative w-full overflow-hidden" style={{ height: "clamp(320px,52vw,660px)" }}>
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&auto=format&fit=crop&q=85"
              alt="Web design studio"
              className="w-full h-full object-cover"
              fetchpriority="high"
            />
            {/* Overlay chip */}
            <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-sm px-4 py-2.5 flex items-center gap-2">
              <span className="text-[11px] font-medium text-[#111]">Explore our work</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 6h10M6 1l5 5-5 5" stroke="#111" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SERVICES FEATURE SECTION ════════════════════════════════ */}
      <section id="services" className="py-20 md:py-28">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">

          {/* Header split */}
          <div className="grid md:grid-cols-2 gap-10 items-start mb-14">
            <h2 className="reveal text-[28px] md:text-[38px] lg:text-[46px] font-bold leading-[1.1] tracking-tight">
              Crafting websites defined by<br />
              <span className="italic font-light text-[#555]">performance, clarity,<br />and timeless design.</span>
            </h2>
            <div className="reveal flex flex-col items-start gap-4 pt-2 md:pt-4">
              <div className="flex items-center gap-2">
                <RedStar />
                <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#999]">What we bring</span>
              </div>
              <p className="text-[13px] text-[#777] leading-relaxed max-w-xs">
                Every engagement comes with strategy, design, and development working as a single unified team — not handed off between silos.
              </p>
            </div>
          </div>

          {/* 2×2 Feature card grid */}
          <div className="feat-grid grid grid-cols-2 md:grid-cols-4 gap-3">
            {featureCards.map((card) => (
              <div
                key={card.title}
                className="feat-card flex flex-col gap-6 p-6 md:p-8"
                style={{ backgroundColor: card.bg, color: card.textColor, minHeight: 220 }}
              >
                <div style={{ opacity: card.textColor === "#fff" ? 0.8 : 0.5 }}>{card.icon}</div>
                <div className="mt-auto flex flex-col gap-2">
                  <h3 className="text-[15px] font-bold">{card.title}</h3>
                  <p className="text-[12px] leading-relaxed" style={{ opacity: card.textColor === "#fff" ? 0.7 : 0.6 }}>{card.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination dots */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-2">
              {[0,1,2,3].map(i => (
                <span key={i} className={`block rounded-full transition-all ${i === 0 ? "w-6 h-1.5 bg-[#111]" : "w-1.5 h-1.5 bg-[#ddd]"}`} />
              ))}
            </div>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 border border-[#e0e0e0] flex items-center justify-center text-[#bbb] hover:border-[#111] hover:text-[#111] transition-colors">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M7 5H1M4 2L1 5l3 3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button className="w-8 h-8 border border-[#e0e0e0] flex items-center justify-center text-[#bbb] hover:border-[#111] hover:text-[#111] transition-colors">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3 5h6M6 2l3 3-3 3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS BAR ═══════════════════════════════════════════════ */}
      <div className="border-y border-[#E8E8E8]">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#E8E8E8]">
            {stats.map((s) => (
              <div key={s.label} className="py-8 px-6 md:px-10 first:pl-0 last:pr-0">
                <div className="flex items-baseline gap-0.5 mb-1">
                  <span
                    className="stat-val text-[36px] md:text-[44px] font-black tabular-nums text-[#111]"
                    data-target={s.value}
                    data-suffix={s.suffix}
                  >
                    0{s.suffix}
                  </span>
                </div>
                <p className="text-[11px] font-mono tracking-widest uppercase text-[#999]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ FULL-BLEED IMAGE ════════════════════════════════════════ */}
      <div className="fullbleed-section relative overflow-hidden" style={{ height: "clamp(280px,42vw,560px)" }}>
        <img
          src="https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?w=1600&auto=format&fit=crop&q=85"
          alt="Creative workspace"
          loading="lazy"
          className="fullbleed-img absolute inset-0 w-full h-full object-cover"
        />
        {/* Chip */}
        <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2.5 flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D42B2B]" />
          <span className="text-[11px] font-medium text-[#111]">Discover our approach</span>
        </div>
      </div>

      {/* ══ EXPLORE WORK ════════════════════════════════════════════ */}
      <section id="work" className="py-20 md:py-28">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">

          {/* Header + filters */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="reveal flex items-center gap-3">
              <h2 className="text-[26px] md:text-[36px] font-bold tracking-tight">
                Explore <span className="italic font-light text-[#555]">latest work</span>
              </h2>
              <RedStar />
            </div>
            <div className="reveal flex items-center gap-1 flex-wrap">
              {filterTabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveFilter(t)}
                  className={`text-[11px] font-medium px-3.5 py-1.5 border transition-colors ${
                    activeFilter === t
                      ? "bg-[#111] text-white border-[#111]"
                      : "border-[#ddd] text-[#777] hover:border-[#111] hover:text-[#111]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Project cards */}
          <div className="proj-grid grid md:grid-cols-3 gap-4">
            {projectCards.map((p) => (
              <div key={p.title} className="proj-card group cursor-pointer">
                <div className="relative overflow-hidden aspect-[4/3] mb-4">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-mono tracking-widest uppercase text-[#999] mb-1">{p.tag}</p>
                    <h3 className="text-[15px] font-bold text-[#111]">{p.title}</h3>
                    <p className="text-[12px] text-[#888] mt-0.5">{p.sub}</p>
                  </div>
                  <div className="w-8 h-8 border border-[#e0e0e0] flex items-center justify-center text-[#bbb] group-hover:border-[#111] group-hover:text-[#111] transition-colors">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 9L9 1M9 1H3M9 1v6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TEXT + IMAGE SPLIT ══════════════════════════════════════ */}
      <section className="py-20 md:py-28 border-t border-[#E8E8E8]">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">

            {/* Left */}
            <div className="flex flex-col gap-8">
              <div className="reveal">
                <h2 className="text-[28px] md:text-[42px] lg:text-[52px] font-bold leading-[1.05] tracking-tight mb-6">
                  Redefining web design through performance, clarity,<br />
                  <span className="italic font-light text-[#555]">and lasting impact.</span>
                </h2>
              </div>

              <div className="reveal flex flex-col gap-6">
                <div>
                  <p className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#D42B2B] mb-2">Experience</p>
                  <p className="text-[13px] text-[#666] leading-relaxed max-w-sm">
                    With over five years building brand websites across industries — from SaaS startups to luxury retail — we bring strategic craft to every project.
                  </p>
                </div>
                <button
                  onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="self-start bg-[#111] text-white text-[12px] font-medium px-5 py-2.5 hover:bg-[#D42B2B] transition-colors"
                >
                  Book A Free Call
                </button>
              </div>

              {/* Trust badges */}
              <div className="reveal flex items-center gap-6 pt-4 border-t border-[#E8E8E8]">
                <RedStar />
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-[20px] font-black text-[#111]">70+</p>
                    <p className="text-[10px] font-mono tracking-widest uppercase text-[#999]">Brands</p>
                  </div>
                  <div className="w-px h-8 bg-[#E8E8E8]" />
                  <div className="text-center">
                    <p className="text-[20px] font-black text-[#111]">98%</p>
                    <p className="text-[10px] font-mono tracking-widest uppercase text-[#999]">Satisfaction</p>
                  </div>
                  <div className="w-px h-8 bg-[#E8E8E8]" />
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(i => (
                      <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#D42B2B"><path d="M6 1l1.4 2.8L10.5 4l-2.25 2.2.53 3.1L6 7.77 3.22 9.3l.53-3.1L1.5 4l3.1-.2L6 1z"/></svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right – tall image */}
            <div className="reveal relative overflow-hidden" style={{ height: "clamp(360px,55vw,640px)" }}>
              <img
                src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&auto=format&fit=crop&q=85"
                alt="Design process"
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              {/* Red asterisk decoration */}
              <div className="absolute top-5 right-5">
                <span className="text-white text-2xl font-bold">*</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ═════════════════════════════════════════════════════ */}
      <section id="about" className="py-20 md:py-24 border-t border-[#E8E8E8]">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="reveal">
              <div className="flex items-center gap-2 mb-6">
                <RedStar />
                <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#999]">FAQ</span>
              </div>
              <h2 className="text-[28px] md:text-[38px] font-bold leading-[1.1] tracking-tight">
                Common questions<br />
                <span className="italic font-light text-[#555]">answered honestly.</span>
              </h2>
            </div>
            <div className="reveal">
              {faqs.map((f) => <FaqRow key={f.q} q={f.q} a={f.a} />)}
              <div className="border-t border-[#E8E8E8]" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ DARK CTA SECTION (Prime Location equivalent) ═══════════ */}
      <section id="contact" className="bg-[#0A0A0A] text-white py-24 md:py-36 relative overflow-hidden">
        {/* Abstract grid bg */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Red glow */}
        <div
          className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(212,43,43,0.25) 0%, transparent 65%)" }}
        />
        {/* Red pin */}
        <div className="absolute right-[28%] top-[42%] flex flex-col items-center gap-0">
          <span className="w-3 h-3 rounded-full bg-[#D42B2B] shadow-[0_0_20px_6px_rgba(212,43,43,0.5)]" />
          <span className="w-px h-10 bg-[#D42B2B]/50" />
        </div>

        <div className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-10">
          <div className="reveal flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D42B2B]" />
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#666]">Let's Work Together</span>
          </div>

          <h2 className="reveal text-[36px] md:text-[60px] lg:text-[72px] font-bold leading-[0.95] tracking-tight mb-8">
            Ready to<br />
            <span className="italic font-light text-white/40">build?</span>
          </h2>

          <p className="reveal text-[14px] text-white/50 max-w-sm leading-relaxed mb-10">
            Book a free 15-minute call. We'll tell you honestly what your site needs and what it will take to get there.
          </p>

          <button
            onClick={() => window.location.href = "mailto:infopehchaanmedia@gmail.com"}
            className="reveal bg-white text-[#111] text-[12px] font-bold px-8 py-3.5 hover:bg-[#D42B2B] hover:text-white transition-colors"
          >
            Book A Call →
          </button>

          {/* Bottom text */}
          <p className="reveal mt-24 md:mt-36 text-[28px] md:text-[48px] lg:text-[64px] font-black text-white/[0.07] tracking-tight uppercase leading-none">
            Built for Performance, Designed for Brands
          </p>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════════════ */}
      <footer className="bg-[#0A0A0A] border-t border-white/[0.07] py-12">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-1.5 mb-3">
                <span className="text-[14px] font-bold text-white">Pehchaan Media</span>
                <span className="text-[#D42B2B] font-bold">*</span>
              </div>
              <p className="text-[12px] text-white/40 leading-relaxed max-w-[180px]">
                Full-service creative agency for modern brands.
              </p>
            </div>
            {[
              { title: "Company", links: ["About", "Services", "Work", "Pricing"] },
              { title: "Services", links: ["Web Design", "Brand Identity", "Film & Video", "Digital Strategy"] },
              { title: "Contact", links: ["Book A Call", "infopehchaanmedia@gmail.com", "Instagram", "LinkedIn"] },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30 mb-4">{col.title}</p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-[12px] text-white/50 hover:text-white transition-colors">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.07]">
            <p className="text-[11px] text-white/25 font-mono">© {new Date().getFullYear()} Pehchaan Media. All rights reserved.</p>
            <p className="text-[11px] text-white/25 font-mono">Privacy Policy · Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
