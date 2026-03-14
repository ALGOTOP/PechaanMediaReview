import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const scrollToSection = (href: string) => {
    if (href === "#hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* ─── Navbar bar ─── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled && !isOpen
            ? "bg-background/80 backdrop-blur-lg border-b"
            : "bg-transparent"
        }`}
        data-testid="nav-main"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollToSection("#hero"); }}
            className={`text-xl md:text-2xl font-bold tracking-tight z-50 relative transition-colors duration-300 ${
              isOpen ? "text-foreground" : ""
            }`}
            data-testid="link-logo"
          >
            Pehchaan Media
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.slice(1).map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                className="text-sm font-medium hover-elevate px-3 py-2 rounded-md transition-colors"
                data-testid={`link-${item.label.toLowerCase()}`}
              >
                {item.label}
              </a>
            ))}
            <Button
              size="sm"
              onClick={() => scrollToSection("#contact")}
              data-testid="button-cta"
            >
              Get Started
            </Button>
          </div>

          {/* Animated hamburger / × — mobile only */}
          <button
            className="md:hidden relative z-50 flex flex-col justify-center items-center w-10 h-10 gap-0"
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            data-testid="button-mobile-menu"
          >
            {/* Top line */}
            <motion.span
              className="block h-[1.5px] w-6 bg-foreground origin-center"
              animate={isOpen
                ? { rotate: 45, y: 4, width: 28 }
                : { rotate: 0, y: 0, width: 24 }
              }
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
            {/* Bottom line */}
            <motion.span
              className="block h-[1.5px] w-6 bg-foreground origin-center mt-[6px]"
              animate={isOpen
                ? { rotate: -45, y: -5.5, width: 28 }
                : { rotate: 0, y: 0, width: 24 }
              }
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </button>
        </div>
      </nav>

      {/* ─── Full-screen mobile overlay ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-40 bg-background flex flex-col md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            data-testid="mobile-menu-overlay"
          >
            {/* Nav items — centred */}
            <div className="flex-1 flex flex-col items-center justify-center gap-1">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 24 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.08 + i * 0.07,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="block text-5xl font-bold tracking-tight leading-tight py-2 text-foreground hover:opacity-50 transition-opacity duration-200"
                    data-testid={`mobile-link-${item.label.toLowerCase()}`}
                  >
                    {item.label}
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Bottom utility links */}
            <motion.div
              className="flex flex-col items-center gap-2 pb-12 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.45, duration: 0.3 }}
            >
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
