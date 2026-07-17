import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

import halvaImage  from "@assets/halva_hd.webp";
import trulyImage  from "@assets/truly_hd.webp";
import sphinxImage from "@assets/sphinx_hd.webp";
import webImage    from "@assets/web_digital_hd.webp";

/* ─── JSON-LD ─────────────────────────────────────────────────────── */
const schema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Pehchaan Media — Services",
  description: "Full-service creative agency offering brand identity, marketing strategy, film production, and web design.",
  url: "https://pnmh.site/services",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Brand Identity & Design" },
    { "@type": "ListItem", position: 2, name: "Marketing & Strategy" },
    { "@type": "ListItem", position: 3, name: "Film & Production" },
    { "@type": "ListItem", position: 4, name: "Web & Digital" },
  ],
};

/* ─── Data ────────────────────────────────────────────────────────── */
const heroRows = [
  { n: "01", label: "Brand Identity & Design", img: halvaImage,  href: "#brand" },
  { n: "02", label: "Marketing & Strategy",    img: trulyImage,  href: "#marketing" },
  { n: "03", label: "Film & Production",       img: sphinxImage, href: "#film" },
  { n: "04", label: "Web & Digital",           img: webImage,    href: "#web" },
];

const services = [
  {
    n: "01", id: "brand",
    title: "Brand Identity",
    sub: "& Design",
    body: "We build visual identities that mean something — from the mark to the full system. Every decision traces back to who you are and who you're for. Not trends. Not templates.",
    items: ["Logo & Mark System", "Brand Guidelines", "Typography & Colour", "Packaging Design", "Brand Collateral", "Visual Language"],
    img: halvaImage,
    alt: "Halva — brand identity by Pehchaan Media",
    imgRight: true,
    dark: false,
    tinted: false,
    cta: "Start a Brand Project",
    subject: "Brand%20Identity%20Enquiry",
  },
  {
    n: "02", id: "marketing",
    title: "Marketing",
    sub: "& Strategy",
    body: "Strategy before tactics. We map where your audience lives, what they need to hear, and build the system that reaches them — then we measure everything and do it better.",
    items: ["Market Positioning", "Content Strategy", "Social Media Systems", "Paid Media Planning", "Campaign Architecture", "Performance Analytics"],
    img: trulyImage,
    alt: "Marketing strategy by Pehchaan Media",
    imgRight: false,
    dark: false,
    tinted: true,
    cta: "Start a Campaign",
    subject: "Marketing%20Enquiry",
  },
  {
    n: "03", id: "film",
    title: "Film",
    sub: "& Production",
    body: "From brand films to ad creatives, we produce content that moves. Every frame is intentional — directed, edited, and delivered ready to perform across every platform.",
    items: ["Brand Films", "Ad Creatives", "Motion Graphics", "Social Content", "Product Showcase", "Corporate Videos"],
    img: sphinxImage,
    alt: "Film & production by Pehchaan Media",
    imgRight: true,
    dark: true,
    tinted: false,
    cta: "Start a Production",
    subject: "Film%20Production%20Enquiry",
  },
  {
    n: "04", id: "web",
    title: "Web",
    sub: "& Digital",
    body: "Custom-built websites and digital experiences — responsive, fast, and designed to convert. No templates. No shortcuts. Full handoff, full control, from day one.",
    items: ["Custom Web Design", "Development & Build", "SEO & Performance", "CMS & Handoff", "Analytics Setup", "Conversion Optimisation"],
    img: webImage,
    alt: "Web design by Pehchaan Media",
    imgRight: false,
    dark: false,
    tinted: false,
    cta: "See Web Design →",
    subject: "Web%20Design%20Enquiry",
    link: "/services/web-design-agency",
  },
];

/* ─── Scroll-triggered fade-up ────────────────────────────────────── */
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Staggered deliverables list ─────────────────────────────────── */
function DeliverableList({ items, dark }: { items: string[]; dark: boolean }) {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <ul ref={ref} className="flex flex-col divide-y divide-border/40 mt-8">
      {items.map((item, i) => (
        <motion.li
          key={item}
          initial={{ opacity: 0, x: -12 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 * i }}
          className={`flex items-center gap-3 py-3 text-sm ${dark ? "text-white/70" : "text-muted-foreground"}`}
        >
          <span className={`shrink-0 w-1.5 h-1.5 rounded-full ${dark ? "bg-white/40" : "bg-foreground/30"}`} />
          {item}
        </motion.li>
      ))}
    </ul>
  );
}

/* ─── Individual service section ──────────────────────────────────── */
function ServiceSection({ s }: { s: (typeof services)[number] }) {
  const bg = s.dark
    ? "bg-[#0f0f0f] text-white"
    : s.tinted
    ? "bg-[#f7f7f5] text-foreground"
    : "bg-white text-foreground";

  const borderColor = s.dark ? "border-white/10" : "border-border";

  const handleCta = () => {
    if (s.link) {
      window.location.href = s.link;
    } else {
      window.location.href = `mailto:infopehchaanmedia@gmail.com?subject=${s.subject}`;
    }
  };

  return (
    <section
      id={s.id}
      className={`relative py-24 md:py-36 border-t ${borderColor} ${bg} overflow-hidden`}
    >
      {/* Ghost number watermark */}
      <span
        className={`absolute top-0 ${s.imgRight ? "right-0" : "left-0"} text-[22vw] font-black leading-none select-none pointer-events-none ${
          s.dark ? "text-white/[0.03]" : "text-black/[0.04]"
        }`}
      >
        {s.n}
      </span>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Mono label */}
        <FadeUp>
          <p className={`text-xs font-mono tracking-[0.22em] uppercase mb-4 ${s.dark ? "text-white/40" : "text-muted-foreground"}`}>
            {s.n} — {s.title} {s.sub}
          </p>
        </FadeUp>

        <div
          className={`grid md:grid-cols-2 gap-12 md:gap-16 items-center ${
            s.imgRight ? "" : "md:[&>*:first-child]:order-2"
          }`}
        >
          {/* Text block */}
          <div>
            <FadeUp delay={0.05}>
              <h2
                className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.02] mb-6 ${
                  s.dark ? "text-white" : "text-foreground"
                }`}
              >
                {s.title}
                <br />
                <span className={`italic font-light ${s.dark ? "text-white/40" : "text-muted-foreground"}`}>
                  {s.sub}
                </span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.1}>
              <p className={`text-base md:text-lg leading-relaxed max-w-md ${s.dark ? "text-white/60" : "text-muted-foreground"}`}>
                {s.body}
              </p>
            </FadeUp>

            <DeliverableList items={s.items} dark={s.dark} />

            <FadeUp delay={0.2} className="mt-10">
              <Button
                size="lg"
                onClick={handleCta}
                className={
                  s.dark
                    ? "bg-white text-black hover:bg-white/90 px-8 font-semibold"
                    : "px-8 font-semibold"
                }
              >
                {s.cta}
              </Button>
            </FadeUp>
          </div>

          {/* Image block */}
          <FadeUp delay={0.08} className="relative">
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
              <img
                src={s.img}
                alt={s.alt}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              {/* Subtle vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ─── Page ────────────────────────────────────────────────────────── */
export default function Services() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const bookCall = () => {
    window.location.href = "mailto:infopehchaanmedia@gmail.com?subject=Services%20Enquiry";
  };

  const activeImg =
    hoveredIdx !== null ? heroRows[hoveredIdx].img : heroRows[0].img;
  const activeImgAlt =
    hoveredIdx !== null ? heroRows[hoveredIdx].label : heroRows[0].label;

  return (
    <div className="bg-white text-foreground font-sans overflow-x-hidden">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Navigation />

      {/* ══ HERO ══════════════════════════════════════════════════════ */}
      <section
        id="hero"
        className="pt-[64px] min-h-[100svh] flex flex-col bg-[#0a0a0a] text-white"
      >
        {/* Top — headline + image preview */}
        <div className="flex flex-col md:flex-row flex-1 px-6 md:px-14 lg:px-20 pt-14 md:pt-20 pb-6 gap-10">

          {/* Left — editorial headline */}
          <div className="flex flex-col justify-center md:w-3/5">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xs font-mono tracking-[0.22em] uppercase text-white/30 mb-8"
            >
              Pehchaan Media · Services
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter leading-[1.0]"
            >
              Four disciplines.
              <br />
              <span className="italic font-light text-white/30">One agency.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 text-sm md:text-base text-white/40 max-w-sm leading-relaxed"
            >
              Brand. Marketing. Film. Web. Every discipline under one roof — so nothing gets lost in handoffs and every decision stays in context.
            </motion.p>
          </div>

          {/* Right — animated image preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden md:flex md:w-2/5 items-center"
          >
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white/5">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImgAlt}
                  src={activeImg}
                  alt={activeImgAlt}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: hoveredIdx !== null ? 1 : 0.5, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </AnimatePresence>
              {hoveredIdx === null && (
                <div className="absolute inset-0 flex items-end p-5 pointer-events-none">
                  <p className="text-xs font-mono text-white/25 tracking-widest uppercase">
                    Hover a service
                  </p>
                </div>
              )}
              {hoveredIdx !== null && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none flex items-end p-5">
                  <p className="text-xs font-mono text-white/60 tracking-widest uppercase">
                    {heroRows[hoveredIdx].label}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Bottom — service index rows */}
        <div className="border-t border-white/[0.08]">
          {heroRows.map((row, i) => (
            <motion.a
              key={row.n}
              href={row.href}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 + i * 0.07 }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(row.href)?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group flex items-center justify-between px-6 md:px-14 lg:px-20 py-5 border-b border-white/[0.08] cursor-pointer transition-colors duration-200 hover:bg-white/[0.04]"
            >
              <div className="flex items-center gap-5 md:gap-8">
                <span className="text-xs font-mono text-white/25 w-6 shrink-0">{row.n}</span>
                <span className="text-lg md:text-2xl lg:text-3xl font-bold tracking-tight text-white group-hover:translate-x-1 transition-transform duration-300">
                  {row.label}
                </span>
              </div>
              <motion.span
                animate={{ x: hoveredIdx === i ? 4 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-white/20 group-hover:text-white/60 transition-colors text-lg font-light"
              >
                →
              </motion.span>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ══ SERVICE SECTIONS ══════════════════════════════════════════ */}
      {services.map((s) => (
        <ServiceSection key={s.id} s={s} />
      ))}

      {/* ══ WHY ONE AGENCY ════════════════════════════════════════════ */}
      <section id="about" className="py-24 md:py-32 border-t border-border bg-[#f7f7f5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10 md:gap-16">
            <FadeUp className="md:col-span-1">
              <p className="text-xs font-mono tracking-[0.2em] uppercase text-muted-foreground mb-4">
                Why one agency
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter leading-[1.05]">
                Everything connected,
                <br />
                <span className="italic font-light text-muted-foreground">nothing lost.</span>
              </h2>
            </FadeUp>

            <div className="md:col-span-2 grid sm:grid-cols-2 gap-8 md:gap-10">
              {[
                {
                  heading: "One brief, all disciplines",
                  body: "Brand, marketing, film, and web all share the same brief, the same audience insight, and the same creative direction. No gaps between teams.",
                },
                {
                  heading: "Strategy drives every output",
                  body: "A brand film doesn't exist in isolation. A website isn't just a brochure. Each piece earns its place within a wider plan.",
                },
                {
                  heading: "Honest about scope",
                  body: "If you only need one discipline, we'll tell you. We'd rather scope the work correctly than oversell a retainer you don't need.",
                },
                {
                  heading: "Trusted by 70+ brands",
                  body: "From startups to established names, across product, retail, and service categories worldwide — we've done the work.",
                },
              ].map((card, i) => (
                <FadeUp key={card.heading} delay={0.08 * i}>
                  <div>
                    <h3 className="text-base font-bold mb-2">{card.heading}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{card.body}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ═════════════════════════════════════════════════ */}
      <section id="contact" className="py-24 md:py-36 border-t border-border bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeUp>
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-background/40 mb-6">
              Let's work together
            </p>
          </FadeUp>
          <FadeUp delay={0.06}>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95] mb-6">
              Ready to build
              <br />
              <span className="italic font-light text-background/30">something real?</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.12}>
            <p className="text-base md:text-lg text-background/50 max-w-md mx-auto leading-relaxed mb-10">
              Book a free 15-minute call. We'll tell you honestly what you need and whether we're the right team to deliver it.
            </p>
          </FadeUp>
          <FadeUp delay={0.18}>
            <Button
              size="lg"
              variant="outline"
              onClick={bookCall}
              className="px-10 font-semibold bg-transparent text-background border-background/30 hover:bg-background hover:text-foreground transition-colors"
            >
              Book A Call →
            </Button>
            <p className="text-xs text-background/25 mt-4">
              Or email us: infopehchaanmedia@gmail.com
            </p>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
