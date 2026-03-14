import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const STATEMENT =
  "We are Pehchaan Media, a creative agency, crafting digital landmarks that turn fleeting clicks into lasting legacies.";

const words = STATEMENT.split(" ");

const metadata = [
  { num: "01", label: "STRATEGY" },
  { num: "02", label: "DESIGN" },
  { num: "03", label: "IMPACT" },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.3"],
  });

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-32 md:py-40 border-t border-border/40"
      style={{ backgroundColor: "#f9f9f9" }}
      data-testid="section-about"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Scroll-reveal statement */}
        <div className="mb-24 md:mb-32">
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
              <p
                className="text-xs md:text-sm tracking-widest font-mono text-black/40 mb-1"
              >
                {num}
              </p>
              <p
                className="text-sm md:text-base tracking-widest font-semibold text-black uppercase"
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
