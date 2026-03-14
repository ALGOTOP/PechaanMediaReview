import { useEffect, useRef, useState } from "react";

interface Stat {
  value: number;
  suffix: string;
  decimals?: number;
  label: string;
  sub: string;
}

const stats: Stat[] = [
  { value: 40,  suffix: "+", label: "International\nBrands",     sub: "Worldwide" },
  { value: 3.2, suffix: "×", decimals: 1, label: "Higher\nNoticeability", sub: "On Average" },
  { value: 92,  suffix: "%", label: "Client\nRetention",         sub: "Year on Year" },
  { value: 70,  suffix: "+", label: "Global\nCampaigns",         sub: "Delivered" },
];

const tickerItems = [
  "40+ Brands",
  "3.2× Noticeability",
  "92% Retention",
  "70+ Campaigns",
  "Award-Winning Work",
  "Global Reach",
];

function useCountUp(target: number, duration: number, active: boolean, decimals = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const raf = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setCount(parseFloat((eased * target).toFixed(decimals)));
      if (p < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [active, target, duration, decimals]);
  return count;
}

function StatCell({
  stat,
  index,
  active,
  outline,
}: {
  stat: Stat;
  index: number;
  active: boolean;
  outline: boolean;
}) {
  const count = useCountUp(stat.value, 1800 + index * 150, active, stat.decimals ?? 0);
  const [hovered, setHovered] = useState(false);
  const displayOutline = outline !== hovered;

  return (
    <div
      className={`relative flex flex-col justify-between p-8 md:p-10 cursor-default
        transition-all duration-700 overflow-hidden group
        ${active ? "opacity-100" : "opacity-0"}
        ${index === 0 || index === 1 ? "border-b border-white/10" : ""}
        ${index === 0 || index === 2 ? "border-r border-white/10" : ""}
      `}
      style={{ transitionDelay: `${index * 100}ms`, minHeight: "clamp(220px, 28vw, 380px)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-testid={`stat-cell-${index}`}
    >
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: hovered
            ? "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)"
            : "transparent",
        }}
      />

      <p
        className="text-xs font-semibold uppercase tracking-[0.18em] text-white/30 transition-colors duration-300 group-hover:text-white/50"
        style={{ letterSpacing: "0.18em" }}
      >
        {stat.sub}
      </p>

      <div className="flex flex-col">
        <div
          className="font-bold leading-none transition-all duration-500 select-none"
          style={{
            fontSize: "clamp(80px, 11vw, 160px)",
            lineHeight: 0.85,
            color: displayOutline ? "transparent" : "white",
            WebkitTextStroke: displayOutline ? "2px rgba(255,255,255,0.85)" : "0px transparent",
            transition: "color 0.45s ease, -webkit-text-stroke 0.45s ease",
            letterSpacing: "-0.04em",
          }}
          data-testid={`stat-value-${index}`}
        >
          {stat.decimals ? count.toFixed(stat.decimals) : Math.round(count)}
          <span
            style={{
              fontSize: "clamp(40px, 5vw, 80px)",
              opacity: displayOutline ? 0.6 : 0.5,
            }}
          >
            {stat.suffix}
          </span>
        </div>

        <p
          className="mt-4 text-sm md:text-base font-medium text-white/50 uppercase tracking-widest leading-tight group-hover:text-white/70 transition-colors duration-300 whitespace-pre-line"
          style={{ letterSpacing: "0.12em" }}
        >
          {stat.label}
        </p>
      </div>
    </div>
  );
}

function Ticker() {
  const items = [...tickerItems, ...tickerItems, ...tickerItems];
  return (
    <div className="overflow-hidden border-b border-white/10 py-4 mb-0">
      <div
        className="flex gap-12 whitespace-nowrap"
        style={{
          animation: "stats-ticker 18s linear infinite",
          width: "max-content",
        }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="text-xs font-semibold tracking-[0.22em] uppercase text-white/25 flex items-center gap-12"
          >
            {item}
            <span className="inline-block w-1 h-1 rounded-full bg-white/20" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Statistics() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: "hsl(0 0% 4%)" }}
      data-testid="section-statistics"
    >
      <style>{`
        @keyframes stats-ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
      `}</style>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px",
          opacity: 0.03,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 pt-20 md:pt-28">
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2
            className="font-bold text-white leading-none tracking-tighter"
            style={{ fontSize: "clamp(36px, 5vw, 56px)", letterSpacing: "-0.03em" }}
            data-testid="text-stats-title"
          >
            Results That{" "}
            <span className="italic font-light" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.45)", color: "transparent" }}>
              Matter
            </span>
          </h2>
          <p className="text-white/30 text-sm max-w-[200px] md:text-right leading-relaxed uppercase tracking-widest">
            Impact over<br />deliverables
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-2">
        <Ticker />
      </div>

      <div
        className={`max-w-7xl mx-auto px-6 pb-20 md:pb-28 transition-all duration-700 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "200ms" }}
      >
        <div className="border border-white/10 grid grid-cols-1 sm:grid-cols-2">
          {stats.map((stat, i) => (
            <StatCell
              key={i}
              stat={stat}
              index={i}
              active={isVisible}
              outline={i === 0 || i === 3}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
