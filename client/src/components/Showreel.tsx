import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface ShowreelProject {
  title: string;
  tools: string;
  thumbnail: string;
}

export default function Showreel() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal({ delay: 200 });

  const projects: ShowreelProject[] = [
    {
      title: "KENETIK - 3D Motion Ad",
      tools: "Blender • After Effects • Premiere Pro",
      thumbnail: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80",
    },
    {
      title: "TRULY - 4D Graphic Post",
      tools: "Cinema 4D • Redshift • After Effects",
      thumbnail: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&q=80",
    },
    {
      title: "Denver Fragrances",
      tools: "Sony FX3 • DaVinci Resolve",
      thumbnail: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=600&q=80",
    },
    {
      title: "Kinstu By BRIZO",
      tools: "Canon R5 • Cinema 4D",
      thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-black text-white" data-testid="section-showreel">
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="text-showreel-title">
            Our Showreel
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Every frame tells a story. Every story defines a brand.
          </p>
        </div>

        {/* Main Showreel Video Placeholder */}
        <Card className="mb-12 overflow-hidden bg-white/5 border-white/10 hover-elevate">
          <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-black">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto hover-elevate active-elevate-2 cursor-pointer transition-transform hover:scale-110">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
                <p className="text-white/60 text-sm">Play Showreel</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Featured Projects Grid */}
        <div
          ref={gridRef}
          className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 ${
            gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group overflow-hidden bg-white/5 border-white/10 hover-elevate active-elevate-2 cursor-pointer"
              data-testid={`card-showreel-${index}`}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-white mb-2">{project.title}</h3>
                <Badge variant="outline" className="text-xs border-white/20 text-white/70">
                  {project.tools}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
