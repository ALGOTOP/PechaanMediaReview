import { useState } from "react";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useStaggeredReveal } from "@/hooks/useScrollReveal";
import brandImage from "@assets/10002_1773591659727.webp";
import webImage from "@assets/web_digital_hd.webp";
import marketingImage from "@assets/10001_(2)_1773610275677.webp";
import productImage from "@assets/generated_images/product_photography_example.webp";
import filmImage from "@assets/10001_(1)_1773596168609.webp";

interface Service {
  title: string;
  description: string;
  image: string;
  height: string;
  num: string;
  titleClass?: string;
  descClass?: string;
  titleMargin?: string;
}

const leftColumn: Service[] = [
  {
    num: "01",
    title: "Brand Identity & Design",
    description:
      "From logos to full brand systems, we design visuals that communicate your essence and create lasting impressions.",
    image: brandImage,
    height: "h-[480px]",
  },
  {
    num: "02",
    title: "Marketing & Strategy",
    description:
      "Integrated campaigns combining creativity with data-driven growth strategies for measurable impact.",
    image: marketingImage,
    height: "h-72",
    titleClass: "text-lg md:text-xl font-bold",
    descClass: "text-white/90 text-xs leading-relaxed",
    titleMargin: "mb-2",
  },
];

const rightColumn: Service[] = [
  {
    num: "03",
    title: "Film & Production",
    description:
      "Cinematic storytelling that builds emotional connections and elevates your message through powerful visuals.",
    image: filmImage,
    height: "h-72",
  },
  {
    num: "04",
    title: "Web & Digital",
    description:
      "Responsive, elegant, and high-performance digital experiences that engage and convert.",
    image: webImage,
    height: "h-72",
  },
];

const allServices = [...leftColumn, ...rightColumn];

function ServiceCard({ service, index, visibleItems }: { service: Service; index: number; visibleItems: Set<number> }) {
  return (
    <Card
      className={`group overflow-hidden hover-elevate active-elevate-2 cursor-pointer transition-all duration-700 ${
        visibleItems.has(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      data-testid={`card-service-${index}`}
    >
      <div className={`relative ${service.height} overflow-hidden`}>
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
          <h3 className={`${service.titleClass ?? "text-xl md:text-2xl font-bold"} ${service.titleMargin ?? "mb-3"}`}>{service.title}</h3>
          <p className={service.descClass ?? "text-white/90 text-sm leading-relaxed"}>{service.description}</p>
        </div>
      </div>
    </Card>
  );
}

function MobileAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-border/60">
      {allServices.map((service, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} data-testid={`accordion-service-${i}`}>
            <button
              className="w-full flex items-center justify-between py-5 text-left group"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              data-testid={`button-accordion-${i}`}
            >
              <div className="flex items-center gap-5">
                <span className="text-xs font-mono text-muted-foreground tracking-widest tabular-nums">
                  {service.num}
                </span>
                <span className="text-xl font-bold leading-tight">{service.title}</span>
              </div>
              <span className="shrink-0 ml-4 text-muted-foreground">
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="overflow-hidden"
                >
                  <div className="pb-6">
                    <div className="relative h-56 rounded-md overflow-hidden mb-4">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function Services() {
  const { containerRef, visibleItems } = useStaggeredReveal(allServices.length, 150);

  return (
    <section id="services" className="py-24 md:py-32 bg-muted/30" data-testid="section-services">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            data-testid="text-services-title"
          >
            What We Do
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            We blend strategy with creativity to build experiences that transform businesses into beloved brands.
          </p>
        </div>

        {/* Mobile: accordion list */}
        <div className="md:hidden">
          <MobileAccordion />
        </div>

        {/* Desktop: two-column bento grid */}
        <div ref={containerRef} className="hidden md:grid md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
            {leftColumn.map((service, i) => (
              <ServiceCard key={i} service={service} index={i} visibleItems={visibleItems} />
            ))}
          </div>
          <div className="flex flex-col gap-6">
            {rightColumn.map((service, i) => (
              <ServiceCard key={i} service={service} index={i + leftColumn.length} visibleItems={visibleItems} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
