import { useEffect, useRef, useState } from "react";

interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

export default function Statistics() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats: Stat[] = [
    { value: "40", label: "International Brands", suffix: "+" },
    { value: "3.2", label: "Higher Noticeability", suffix: "×" },
    { value: "92", label: "Client Retention", suffix: "%" },
    { value: "70", label: "Global Campaigns", suffix: "+" },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32"
      data-testid="section-statistics"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-stats-title">
            Results That Matter
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We measure success in impact, not just deliverables
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center"
              data-testid={`stat-${index}`}
            >
              <div className="mb-3">
                <span
                  className={`text-5xl md:text-6xl lg:text-7xl font-bold transition-all duration-1000 ${
                    isVisible ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {stat.value}
                  {stat.suffix}
                </span>
              </div>
              <p className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
