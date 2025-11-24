import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import heroImage from "@assets/generated_images/hero_film_production_scene.png";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToWork = () => {
    const element = document.querySelector("#work");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
      data-testid="section-hero"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Creative production"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div
          className={`space-y-8 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] tracking-tight"
            data-testid="text-hero-headline"
          >
            We make brands
            <br />
            <span className="italic">unforgettable</span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed">
            Full-service creative agency crafting stories that connect, inspire,
            and move audiences. From design to film to strategy — we create
            experiences that define identities.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              variant="default"
              onClick={scrollToWork}
              className="text-base px-8 bg-white text-black hover:bg-white/90 border border-white/20"
              data-testid="button-view-work"
            >
              View Our Work
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                const element = document.querySelector("#contact");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="text-base px-8 bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20"
              data-testid="button-get-started"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToWork}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 text-white/70 hover:text-white transition-colors animate-bounce"
        data-testid="button-scroll-indicator"
      >
        <ArrowDown className="w-6 h-6" />
      </button>
    </section>
  );
}
