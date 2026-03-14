import { useEffect, useRef, useState } from "react";

interface Stat {
  value: number;
  suffix: string;
  decimals?: number;
  label: string;
  description: string;
}

const stats: Stat[] = [
  {
    value: 40,
    suffix: "+",
    label: "International Brands",
    description: "From MENA to global markets, each brand uniquely positioned.",
  },
  {
    value: 3.2,
    suffix: "×",
    decimals: 1,
    label: "Higher Noticeability",
    description: "Campaigns that break through noise and demand attention.",
  },
  {
    value: 92,
    suffix: "%",
    label: "Client Retention",
    description: "Built on trust, sustained through results that speak.",
  },
  {
    value: 70,
    suffix: "+",
    label: "Global Campaigns",
    description: "Across film, digital, brand identity and experiential media.",
  },
];

function useCountUp(target: number, duration = 1800, active: boolean, decimals = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration, decimals]);
  return count;
}

function StatRow({
  stat,
  index,
  active,
  isLast,
}: {
  stat: Stat;
  index: number;
  active: boolean;
  isLast: boolean;
}) {
  const count = useCountUp(stat.value, 1600 + index * 100, active, stat.decimals ?? 0);

  return (
    <div
      className={`transition-all duration-700 ${
        active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
      data-testid={`stat-row-${index}`}
    >
      <div className="border-t border-white/15 pt-8 pb-8 grid grid-cols-2 md:grid-cols-[1fr_auto_1fr] items-center gap-6 md:gap-12">
        <div className="flex items-baseline gap-1 col-span-2 md:col-span-1">
          <span
            className="font-bold leading-none tracking-tighter text-white"
            style={{ fontSize: "clamp(72px, 10vw, 120px)" }}
            data-testid={`stat-value-${index}`}
          >
            {stat.decimals ? count.toFixed(stat.decimals) : Math.round(count)}
          </span>
          <span
            className="font-bold text-white/50 leading-none"
            style={{ fontSize: "clamp(40px, 5vw, 64px)" }}
          >
            {stat.suffix}
          </span>
        </div>

        <div className="hidden md:block w-px h-12 bg-white/15 justify-self-center" />

        <div className="col-span-2 md:col-span-1 flex flex-col gap-2 md:pl-4">
          <p
            className="text-white font-semibold tracking-wide uppercase text-sm"
            style={{ letterSpacing: "0.08em" }}
          >
            {stat.label}
          </p>
          <p className="text-white/45 text-base leading-relaxed max-w-xs">
            {stat.description}
          </p>
        </div>
      </div>
      {isLast && <div className="border-t border-white/15" />}
    </div>
  );
}

export default function Statistics() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ backgroundColor: "hsl(0 0% 5%)" }}
      data-testid="section-statistics"
    >
      <div
        className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px",
        }}
      />

      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="font-bold text-white uppercase tracking-tighter leading-none whitespace-nowrap"
          style={{
            fontSize: "clamp(100px, 22vw, 280px)",
            opacity: 0.025,
            letterSpacing: "-0.04em",
          }}
        >
          RESULTS
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            data-testid="text-stats-title"
          >
            Results That
            <br />
            <span className="italic font-light text-white/50">Matter</span>
          </h2>
          <p className="text-white/40 text-base md:text-lg max-w-xs leading-relaxed md:text-right">
            We measure success in impact,
            <br />
            not just deliverables.
          </p>
        </div>

        <div>
          {stats.map((stat, index) => (
            <StatRow
              key={index}
              stat={stat}
              index={index}
              active={isVisible}
              isLast={index === stats.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
