import { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

const STATEMENT =
  "We are Pehchaan Media, a creative agency, crafting digital landmarks that turn fleeting clicks into lasting legacies.";

const words = STATEMENT.split(" ");

const metadata = [
  { num: "01", label: "STRATEGY" },
  { num: "02", label: "DESIGN" },
  { num: "03", label: "IMPACT" },
];

// ─────────────────────────────────────────────
// Scroll-driven giant brand text
// ─────────────────────────────────────────────
function PehchaanHero() {
  const zoneRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLSpanElement>(null);

  const { scrollYProgress } = useScroll({
    target: zoneRef,
    offset: ["start end", "end start"],
  });

  // Scale: small → big → settle
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [0.45, 1.08, 1.12, 0.75]
  );

  // Letter-spacing: wide → tight → wide
  const ls = useTransform(
    scrollYProgress,
    [0, 0.35, 0.7, 1],
    ["0.18em", "-0.03em", "0.02em", "0.12em"]
  );

  // Skew for "alive" distortion
  const skewX = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [4, -2, 0, 2, -3]
  );

  // Blur: blurry → sharp → blurry
  const blur = useTransform(
    scrollYProgress,
    [0, 0.15, 0.45, 0.8, 1],
    [10, 1, 0, 1, 8]
  );
  const filterVal = useMotionTemplate`blur(${blur}px)`;

  // Gradient shift via direct DOM — runs on every scroll tick without re-renders
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const el = gradientRef.current;
      if (!el) return;
      // Slide the 300%-wide gradient background as scroll progresses
      el.style.backgroundPosition = `${v * 160}% 50%`;
    });
  }, [scrollYProgress]);

  return (
    // Tall zone gives ~200vh of scroll distance for the animation to breathe
    <div ref={zoneRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale, letterSpacing: ls, skewX }}
          className="px-4 text-center will-change-transform"
        >
          <motion.span
            ref={gradientRef}
            style={{
              filter: filterVal,
              backgroundImage:
                "linear-gradient(90deg," +
                "#c084fc 0%," +   // violet
                "#f472b6 8%," +   // pink
                "#fb923c 18%," +  // orange
                "#facc15 28%," +  // yellow
                "#4ade80 38%," +  // green
                "#22d3ee 48%," +  // cyan
                "#60a5fa 58%," +  // blue
                "#818cf8 68%," +  // indigo
                "#e879f9 78%," +  // fuchsia
                "#f43f5e 88%," +  // rose
                "#c084fc 100%"    // back to violet (seamless loop)
                + ")",
              backgroundSize: "300% 100%",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              display: "inline-block",
            }}
            className="text-[15vw] md:text-[13vw] font-black leading-none select-none"
            aria-label="Pehchaan Media"
          >
            Pehchaan&nbsp;Media
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Word-by-word scroll reveal (existing)
// ─────────────────────────────────────────────
function Word({
  word,
  progress,
  range,
}: {
  word: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className="inline-block mr-[0.25em] text-black"
    >
      {word}
    </motion.span>
  );
}

// ─────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────
export default function About() {
  const textRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 0.85", "end 0.3"],
  });

  return (
    <section
      id="about"
      className="border-t border-border/40"
      style={{ backgroundColor: "#f9f9f9" }}
      data-testid="section-about"
    >
      {/* ── Giant scroll-animated brand name ── */}
      <PehchaanHero />

      {/* ── Word-by-word manifesto ── */}
      <div ref={textRef} className="py-32 md:py-40">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-24 md:mb-32">
            <p className="sr-only">
              Pehchaan Media is a creative agency based in Pakistan, crafting
              brand identities, films, and digital experiences for global brands.
            </p>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-center leading-tight tracking-tight"
              data-testid="text-about-title"
            >
              {words.map((word, i) => {
                const start = i / words.length;
                const end = (i + 1) / words.length;
                return (
                  <Word
                    key={i}
                    word={word}
                    progress={scrollYProgress}
                    range={[start, end]}
                  />
                );
              })}
            </h2>
          </div>

          {/* Metadata footer */}
          <div className="grid grid-cols-3 gap-8 border-t border-black/10 pt-12">
            {metadata.map(({ num, label }) => (
              <div key={num} className="text-center" data-testid={`meta-${num}`}>
                <p className="text-xs md:text-sm tracking-widest font-mono text-black/40 mb-1">
                  {num}
                </p>
                <p className="text-sm md:text-base tracking-widest font-semibold text-black uppercase">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
