import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function scrollToContact() {
  const el = document.querySelector("#contact") ?? document.querySelector("footer");
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

const placeholders = [
  { label: "E-commerce Storefront", tag: "Web Design" },
  { label: "SaaS Dashboard UI", tag: "Product Design" },
  { label: "Brand Landing Page", tag: "Conversion Design" },
  { label: "Portfolio / Agency Site", tag: "Creative Direction" },
];

const services = [
  "Custom visual design — no templates, no shortcuts",
  "Fully mobile-responsive layouts, tested on real devices",
  "SEO-ready HTML structure (semantic headings, meta tags, fast load)",
  "Performance-first builds: compressed assets, minimal JavaScript",
  "Easy content editing — handoff docs included",
  "Integrated contact forms, booking flows, and CTAs",
  "Consistent brand language across every page",
];

const steps = [
  { n: "01", title: "Discovery", body: "We learn your goals, audience, and competitive landscape. You walk us through your brand, your offer, and what a successful site looks like to you." },
  { n: "02", title: "Strategy & Wireframes", body: "We map out the page architecture and user flow before touching visuals. You approve the structure before we design anything." },
  { n: "03", title: "Visual Design", body: "Full high-fidelity mockups in your brand's visual language. Desktop and mobile. You review, request changes, then sign off." },
  { n: "04", title: "Build & QA", body: "We develop the approved designs, test across browsers and screen sizes, then run a full performance and accessibility check." },
  { n: "05", title: "Launch & Handoff", body: "We deploy to your domain, submit to Google Search Console, and hand over edit guides so your team can update content independently." },
];

const faqs = [
  {
    q: "How long does a website project take?",
    a: "Most projects run 3–6 weeks from kickoff to launch. Timelines depend on the number of pages, the speed of feedback rounds, and whether copy and assets are ready from your side. We'll give you a specific estimate after the discovery call.",
  },
  {
    q: "Do you handle hosting?",
    a: "We build and deploy your site and can advise on the right hosting setup for your needs. Ongoing hosting is managed by you — we'll set up the account, connect the domain, and show you exactly what you're paying for.",
  },
  {
    q: "Will the site rank on Google?",
    a: "Every site we build has the technical foundations Google needs: clean HTML structure, fast load times, proper meta tags, and a sitemap. Ranking also depends on your content, backlinks, and competition — we'll be honest about what we can and can't control.",
  },
  {
    q: "Can I update the site myself after launch?",
    a: "Yes. We structure projects so non-technical team members can edit text, swap images, and add new content without touching code. We provide handoff documentation and a short walkthrough on launch day.",
  },
];

export default function WebDesignAgency() {
  const proof = useReveal();
  const breakdown = useReveal();
  const process = useReveal();
  const whyUs = useReveal();
  const faq = useReveal();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navigation />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Web Design Agency",
            "provider": {
              "@type": "Organization",
              "name": "Pehchaan Media",
              "url": "https://pnmh.site",
            },
            "description": "Custom website design and development for brands worldwide. Mobile-responsive, SEO-ready, and built for conversion.",
            "url": "https://pnmh.site/services/web-design-agency",
            "areaServed": "Worldwide",
          }),
        }}
      />

      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-10 pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto w-full">
          <p className="text-xs font-mono tracking-widest text-white/40 uppercase mb-6">
            Web Design Agency
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-8">
            A web design agency<br />
            <span className="text-white/40">built for brands</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-xl leading-relaxed mb-10">
            We design and build high-performance websites that look the part and actually convert — from landing pages to full brand experiences.
          </p>
          <Button
            size="lg"
            onClick={scrollToContact}
            className="text-sm px-8 py-4 h-auto bg-white text-black hover:bg-white/90 font-semibold"
          >
            Book A Call
          </Button>
        </div>
      </section>

      {/* ── PROOF STRIP ── */}
      <section
        ref={proof.ref}
        className={`px-6 md:px-10 pb-24 transition-all duration-700 ${proof.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-mono tracking-widest text-white/30 uppercase mb-6">Recent Work</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {placeholders.map((p) => (
              <div
                key={p.label}
                className="aspect-[4/3] rounded-xl border border-white/10 bg-white/[0.03] flex flex-col items-center justify-center gap-3 p-4"
              >
                <div className="w-10 h-10 rounded-lg border border-white/20 bg-white/5 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/30">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M9 21V9" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-white/50 text-xs font-medium">{p.label}</p>
                  <p className="text-white/25 text-[10px] mt-1 font-mono">{p.tag}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-white/20 text-xs mt-4 font-mono">↑ Project visuals coming soon — final assets in review</p>
        </div>
      </section>

      {/* ── SERVICE BREAKDOWN ── */}
      <section
        id="what-we-build"
        ref={breakdown.ref}
        className={`px-6 md:px-10 py-24 border-t border-white/[0.06] transition-all duration-700 ${breakdown.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
              What's included
            </h2>
            <p className="text-white/50 text-base leading-relaxed">
              Every project is scoped to your goals — here's what we bring to every engagement.
            </p>
          </div>
          <ul className="space-y-4">
            {services.map((s) => (
              <li key={s} className="flex items-start gap-3 text-white/75 text-sm leading-relaxed">
                <span className="mt-1 w-4 h-4 shrink-0 rounded-full border border-white/20 bg-white/5 flex items-center justify-center">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor" className="text-white/60">
                    <path d="M1 4l2 2 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="max-w-5xl mx-auto mt-12">
          <Button
            size="lg"
            onClick={scrollToContact}
            className="text-sm px-8 py-4 h-auto bg-white text-black hover:bg-white/90 font-semibold"
          >
            Book A Call
          </Button>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section
        ref={process.ref}
        className={`px-6 md:px-10 py-24 border-t border-white/[0.06] transition-all duration-700 ${process.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4">How a project runs</h2>
          <p className="text-white/50 text-base mb-12 max-w-lg">From first call to live site — here's the process, step by step.</p>
          <div className="grid md:grid-cols-5 gap-6">
            {steps.map((step) => (
              <div key={step.n} className="flex flex-col gap-3">
                <span className="text-xs font-mono text-white/30 tracking-widest">{step.n}</span>
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section
        ref={whyUs.ref}
        className={`px-6 md:px-10 py-24 border-t border-white/[0.06] transition-all duration-700 ${whyUs.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">Why Pehchaan Media</h2>
          <p className="text-white/60 text-base leading-relaxed">
            We're a creative agency, not a web-only shop — which means your website gets the same strategic thinking and visual craft we apply to brand identity and film. We don't separate "design" from "development" from "strategy." You get one team that thinks in brand outcomes and builds to match.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        ref={faq.ref}
        className={`px-6 md:px-10 py-24 border-t border-white/[0.06] transition-all duration-700 ${faq.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-12">Common questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((item) => (
              <div key={item.q} className="border-t border-white/10 pt-6">
                <h3 className="text-base font-semibold text-white mb-3">{item.q}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="px-6 md:px-10 py-24 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Ready to start?
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-md mx-auto">
            Book a free 15-minute call. We'll tell you honestly what your site needs and what it'll take.
          </p>
          <Button
            size="lg"
            onClick={scrollToContact}
            className="text-sm px-10 py-4 h-auto bg-white text-black hover:bg-white/90 font-semibold"
          >
            Book A Call
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
