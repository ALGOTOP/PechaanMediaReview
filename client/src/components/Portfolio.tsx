import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useRef, useEffect } from "react";
import { useStaggeredReveal } from "@/hooks/useScrollReveal";
import luminaImage from "@assets/10001_(3)_(1)_1773614757212.png";
import halvaImage from "@assets/10001_1773615095169.png";
import amwajImage from "@assets/10001_1773615811419.png";
import zarrafaImage from "@assets/10002_1773617422555.jpeg";

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  aspectRatio: "square" | "portrait" | "landscape" | "large";
}

const projects: Project[] = [
  {
    title: "WHIPPED",
    category: "Branding",
    description: "Complete brand identity and creative direction for premium-casual beauty brand",
    image: luminaImage,
    aspectRatio: "landscape",
  },
  {
    title: "SPHINX",
    category: "Web",
    description: "Website redesign and development for an engineering service management eco-system",
    image: amwajImage,
    aspectRatio: "portrait",
  },
  {
    title: "KENETIK",
    category: "Film",
    description: "Filmed and made content + ads for them in 3D and IRL",
    image: "https://i.ibb.co/XxWLxsbJ/573450692-17863784577498906-6594209907700496751-n.jpg",
    aspectRatio: "square",
  },
  {
    title: "HALVA",
    category: "Branding",
    description: "Packaging design that blends bold flavour cues with clean, shelf-ready identity",
    image: halvaImage,
    aspectRatio: "square",
  },
  {
    title: "KURA",
    category: "Strategy",
    description: "Brand architecture and cross-channel creative strategy built around a defined visual system.",
    image: zarrafaImage,
    aspectRatio: "large",
  },
  {
    title: "TRULY",
    category: "Film",
    description: "4D graphic post production and advertising campaign",
    image: "https://i.ibb.co/cKYw95TN/573922484-17864593854498906-87146158841521532-n.jpg",
    aspectRatio: "portrait",
  },
];

const categories = ["all", "Branding", "Film", "Web", "Strategy"];

function MobileCarousel({ items }: { items: Project[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
    scrollRef.current?.scrollTo({ left: 0, behavior: "instant" });
  }, [items]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / items.length;
    const idx = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.min(idx, items.length - 1));
  };

  if (items.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
        No projects in this category.
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Counter */}
      <div className="flex items-center justify-between mb-4 px-1">
        <span className="text-xs font-mono text-muted-foreground tracking-widest">
          DRAG TO EXPLORE
        </span>
        <span className="text-xs font-mono text-muted-foreground tabular-nums">
          {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
      </div>

      {/* Scroll strip */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((project, index) => (
          <div
            key={index}
            className="snap-start shrink-0 w-[78vw] h-[420px] rounded-md overflow-hidden relative cursor-pointer group"
            data-testid={`mobile-card-project-${index}`}
          >
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-active:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
              <h3 className="text-xl font-bold mb-1">{project.title}</h3>
              <p className="text-white/80 text-xs leading-relaxed">{project.description}</p>
            </div>
          </div>
        ))}
        {/* trailing spacer so last card doesn't hug the right edge */}
        <div className="shrink-0 w-6" />
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5 justify-center mt-2">
        {items.map((_, i) => (
          <span
            key={i}
            className={`block rounded-full transition-all duration-300 ${
              i === activeIndex ? "w-5 h-1.5 bg-foreground" : "w-1.5 h-1.5 bg-foreground/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  // Desktop-only reorder: KURA (large) on left cols 1-2, TRULY on right col 3
  const desktopProjects = (() => {
    const items = [...filteredProjects];
    const trulyIdx = items.findIndex((p) => p.title === "TRULY");
    const kuraIdx = items.findIndex((p) => p.title === "KURA");
    // Ensure KURA (large, left cols 1-2) comes before TRULY (right col 3)
    if (trulyIdx !== -1 && kuraIdx !== -1 && trulyIdx < kuraIdx) {
      const [truly] = items.splice(trulyIdx, 1);
      items.splice(kuraIdx, 0, truly);
    }
    return items;
  })();

  const { containerRef, visibleItems } = useStaggeredReveal(desktopProjects.length, 100);

  const getGridClass = (aspectRatio: string) => {
    switch (aspectRatio) {
      case "landscape":
        return "md:col-span-2";
      case "portrait":
        return "md:row-span-2";
      case "large":
        return "md:col-span-2 md:row-span-2";
      default:
        return "";
    }
  };

  return (
    <section id="work" className="py-24 md:py-32" data-testid="section-portfolio">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
              data-testid="text-portfolio-title"
            >
              Selected Work
            </h2>
            <p className="text-lg text-muted-foreground">
              A showcase of our most impactful projects across brand identity, film production, and digital experiences.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={activeFilter === category ? "default" : "outline"}
                className="cursor-pointer px-4 py-2 text-sm hover-elevate"
                onClick={() => setActiveFilter(category)}
                data-testid={`filter-${category.toLowerCase()}`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Badge>
            ))}
          </div>
        </div>

        {/* Mobile: horizontal snap-scroll carousel */}
        <div className="md:hidden -mx-6 px-6">
          <MobileCarousel items={filteredProjects} />
        </div>

        {/* Desktop: masonry grid */}
        <div
          ref={containerRef}
          className="hidden md:grid md:grid-cols-3 auto-rows-[280px] gap-4"
        >
          {desktopProjects.map((project, index) => (
            <Card
              key={index}
              className={`group overflow-hidden hover-elevate active-elevate-2 cursor-pointer transition-all duration-700 h-full ${getGridClass(
                project.aspectRatio
              )} ${
                visibleItems.has(index) ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              data-testid={`card-project-${index}`}
            >
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-white/90 text-sm max-h-0 overflow-hidden group-hover:max-h-24 group-hover:opacity-100 opacity-0 transition-all duration-300">
                    {project.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
