import { Card } from "@/components/ui/card";
import { useStaggeredReveal } from "@/hooks/useScrollReveal";
import brandImage from "@assets/generated_images/brand_identity_design_work.png";
import webImage from "@assets/generated_images/web_design_workspace.png";
import marketingImage from "@assets/generated_images/marketing_strategy_session.png";
import productImage from "@assets/generated_images/product_photography_example.png";

interface Service {
  title: string;
  description: string;
  image: string;
  size: "large" | "medium" | "small";
}

export default function Services() {
  const services: Service[] = [
    {
      title: "Brand Identity & Design",
      description: "From logos to full brand systems, we design visuals that communicate your essence and create lasting impressions.",
      image: brandImage,
      size: "large",
    },
    {
      title: "Film & Production",
      description: "Cinematic storytelling that builds emotional connections and elevates your message through powerful visuals.",
      image: productImage,
      size: "medium",
    },
    {
      title: "Web & Digital",
      description: "Responsive, elegant, and high-performance digital experiences that engage and convert.",
      image: webImage,
      size: "medium",
    },
    {
      title: "Marketing & Strategy",
      description: "Integrated campaigns combining creativity with data-driven growth strategies for measurable impact.",
      image: marketingImage,
      size: "large",
    },
  ];

  const { containerRef, visibleItems } = useStaggeredReveal(services.length, 150);

  return (
    <section id="services" className="py-24 md:py-32 bg-muted/30" data-testid="section-services">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="text-services-title">
            What We Do
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            We blend strategy with creativity to build experiences that transform businesses into beloved brands.
          </p>
        </div>

        <div ref={containerRef} className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`group overflow-hidden hover-elevate active-elevate-2 cursor-pointer transition-all duration-700 ${
                service.size === "large" ? "md:row-span-2" : ""
              } ${
                visibleItems.has(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              data-testid={`card-service-${index}`}
            >
              <div className="relative overflow-hidden">
                <div
                  className={`relative ${
                    service.size === "large" ? "h-96 md:h-full" : "h-80"
                  }`}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">
                    {service.title}
                  </h3>
                  <p className="text-white/90 text-base leading-relaxed">
                    {service.description}
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
