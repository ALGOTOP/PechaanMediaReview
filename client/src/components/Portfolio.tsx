import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  aspectRatio: "square" | "portrait" | "landscape";
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("all");

  const projects: Project[] = [
    {
      title: "LUMINA",
      category: "Branding",
      description: "Complete brand identity and creative direction for luxury beauty brand",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80",
      aspectRatio: "landscape",
    },
    {
      title: "AMWAJ",
      category: "Web",
      description: "Website redesign and development for hospitality group",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      aspectRatio: "portrait",
    },
    {
      title: "KENETIK",
      category: "Film",
      description: "3D motion ad and brand identity for tech startup",
      image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&q=80",
      aspectRatio: "square",
    },
    {
      title: "Zarrafa Coffee",
      category: "Strategy",
      description: "Creative strategy and brand positioning",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
      aspectRatio: "landscape",
    },
    {
      title: "TRULY",
      category: "Film",
      description: "4D graphic post production and advertising campaign",
      image: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&q=80",
      aspectRatio: "portrait",
    },
    {
      title: "Matrix",
      category: "Branding",
      description: "Brand identity for fintech platform",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      aspectRatio: "square",
    },
  ];

  const categories = ["all", "Branding", "Film", "Web", "Strategy"];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const getGridClass = (aspectRatio: string) => {
    switch (aspectRatio) {
      case "landscape":
        return "md:col-span-2";
      case "portrait":
        return "md:row-span-2";
      default:
        return "";
    }
  };

  return (
    <section id="work" className="py-24 md:py-32" data-testid="section-portfolio">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight" data-testid="text-portfolio-title">
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

        <div className="grid md:grid-cols-3 auto-rows-[280px] gap-4">
          {filteredProjects.map((project, index) => (
            <Card
              key={index}
              className={`group overflow-hidden hover-elevate active-elevate-2 cursor-pointer transition-all duration-300 ${getGridClass(
                project.aspectRatio
              )}`}
              data-testid={`card-project-${index}`}
            >
              <div className="relative h-full overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <Badge variant="outline" className="mb-3 border-white/30 text-white">
                    {project.category}
                  </Badge>
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-white/90 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
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
