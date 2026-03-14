import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import heroImage from "@assets/generated_images/hero_film_production_scene.png";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToWork = () => {
    const element = document.querySelector("#work");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Parallax effect
  const parallaxOffset = scrollY * 0.5;

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden"
      data-testid="section-hero"
    >
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      >
        <img
          src={heroImage}
          alt="Creative production"
          className="w-full h-[120%] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
      </div>

      {/* Animated grain overlay */}
      <div className="absolute inset-0 z-[1] opacity-[0.03] mix-blend-overlay pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="space-y-10">
          {/* Main headline with stagger animation */}
          <div className="space-y-2">
            <h1 className="text-6xl md:text-7xl lg:text-[120px] font-bold text-white leading-[0.95] tracking-tighter">
              <span
                className={`inline-block transition-all duration-1000 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
              >
                We make
              </span>
              <br />
              <span
                className={`inline-block transition-all duration-1000 delay-150 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
              >
                brands
              </span>
              <br />
              <span
                className={`inline-block italic font-light transition-all duration-1000 delay-300 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
              >
                unforgettable
              </span>
            </h1>
          </div>

          <p
            className={`text-xl md:text-2xl lg:text-3xl text-white/90 max-w-4xl mx-auto font-light leading-relaxed transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            Full-service creative agency crafting stories that connect, inspire,
            and move audiences
          </p>

          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 transition-all duration-1000 delay-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <Button
              size="lg"
              variant="default"
              onClick={scrollToWork}
              className="text-base px-10 py-6 h-auto bg-white text-black hover:bg-white/90 border border-white/20 font-semibold"
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
              className="text-base px-10 py-6 h-auto bg-white/5 backdrop-blur-md text-white border-white/20 hover:bg-white/10 font-semibold"
              data-testid="button-get-started"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>

    </section>
  );
}
