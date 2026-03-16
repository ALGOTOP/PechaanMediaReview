import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  const triggerExit = useCallback(() => {
    setExiting(true);
    setTimeout(onComplete, 900);
  }, [onComplete]);

  useEffect(() => {
    // Lock scroll while preloader is active
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const totalDuration = 2400;
    const intervalMs = 16;
    const steps = totalDuration / intervalMs;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      // Ease-out curve so it slows near 100
      const t = step / steps;
      const eased = 1 - Math.pow(1 - t, 2.5);
      const pct = Math.min(100, Math.round(eased * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(timer);
        setTimeout(triggerExit, 350);
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [triggerExit]);

  const line1 = "PEHCHAAN".split("");
  const line2 = "MEDIA".split("");

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] bg-[#080808] flex flex-col items-center justify-center select-none"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Main brand text */}
          <div className="flex flex-col items-center">
            {/* PEHCHAAN — large staggered reveal */}
            <div className="overflow-hidden">
              <div className="flex">
                {line1.map((char, i) => (
                  <motion.span
                    key={i}
                    className="text-white text-[clamp(3rem,10vw,8rem)] font-bold tracking-[0.12em] leading-none"
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.15 + i * 0.055,
                      duration: 0.65,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* MEDIA — smaller, spaced, dimmer */}
            <div className="overflow-hidden mt-1">
              <div className="flex">
                {line2.map((char, i) => (
                  <motion.span
                    key={i}
                    className="text-white/40 text-[clamp(0.8rem,2.2vw,1.6rem)] font-light tracking-[0.55em] leading-none"
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.5 + i * 0.055,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar: counter + progress line */}
          <div className="absolute bottom-0 left-0 right-0">
            <div className="flex justify-between items-center px-8 pb-6">
              <motion.span
                className="text-white/30 text-xs font-mono tabular-nums"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                Loading
              </motion.span>
              <motion.span
                className="text-white/30 text-xs font-mono tabular-nums"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                {String(progress).padStart(3, "0")}
              </motion.span>
            </div>

            {/* Progress line */}
            <div className="h-[1px] w-full bg-white/10">
              <motion.div
                className="h-full bg-white/70"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.05, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
