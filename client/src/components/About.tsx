import { Card } from "@/components/ui/card";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import officeImage from "@assets/generated_images/creative_office_space.png";

export default function About() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal({ delay: 200 });

  const values = [
    {
      title: "Visual Storytelling",
      description: "We capture emotion through design and film to make every brand story unforgettable.",
    },
    {
      title: "Creative Strategy",
      description: "We craft narratives that align creativity with business goals for meaningful impact.",
    },
    {
      title: "Collaborative Approach",
      description: "Our team works as an extension of yours — open, transparent, and relentlessly passionate.",
    },
  ];

  return (
    <section id="about" className="py-24 md:py-32" data-testid="section-about">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div
            ref={titleRef}
            className={`space-y-8 transition-all duration-1000 ${
              titleVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="text-about-title">
                Who We Are
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                We are thinkers, storytellers, and dreamers. At Pehchaan Media, we blend strategy with creativity to build experiences that transform businesses into beloved brands.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                With over 70 global campaigns and partnerships with 40+ international brands, we've proven that great design isn't just about aesthetics—it's about creating meaningful connections that drive real business results.
              </p>
            </div>

            <div className="space-y-4">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="border-l-2 border-primary pl-6 py-2"
                  data-testid={`value-${index}`}
                >
                  <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            ref={contentRef}
            className={`transition-all duration-1000 delay-300 ${
              contentVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <Card className="overflow-hidden">
              <img
                src={officeImage}
                alt="Pehchaan Media studio"
                className="w-full h-auto object-cover"
              />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
