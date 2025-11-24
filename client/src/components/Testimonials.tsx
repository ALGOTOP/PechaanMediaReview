import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      quote: "Working with Pehchaan Media transformed our entire brand presence. Their team understood our story and brought it to life visually in ways we couldn't have imagined.",
      author: "Ayesha Khan",
      role: "CEO",
      company: "Glow Beauty Co.",
    },
    {
      quote: "The passion and dedication Pehchaan Media brings is unmatched. They became an integral part of our team during the rebrand and helped us grow exponentially.",
      author: "Sara Ahmed",
      role: "Founder",
      company: "Urban Brew",
    },
    {
      quote: "Pehchaan Media turned a bland corporate message into a human story. The result increased our leads and made internal stakeholders finally agree on one voice.",
      author: "Omar Farooq",
      role: "Director",
      company: "Blue Harbor Logistics",
    },
    {
      quote: "Their visual storytelling is next level. The showreel they made for us opened doors to three festivals and two commercial partnerships.",
      author: "Daniel Kim",
      role: "Creative Director",
      company: "Arcadia Media",
    },
    {
      quote: "They modernised our ecommerce look and simplified the UX in ways that actually reduced bounce rates. Design choices were bold but data-driven.",
      author: "Lina Rodriguez",
      role: "Head of Marketing",
      company: "Solstice Apparel",
    },
    {
      quote: "What surprised me most was how they listen. Feedback cycles were concise and meaningful — the final product felt like a clear collaboration, not a handoff.",
      author: "Meera Patel",
      role: "Creative Lead",
      company: "Minima Studio",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-muted/30" data-testid="section-testimonials">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="text-testimonials-title">
            Client Stories
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Trusted by forward-thinking brands who value creativity, strategy, and measurable impact.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={`p-8 hover-elevate transition-all ${
                index % 3 === 0 ? "md:mt-8" : ""
              }`}
              data-testid={`card-testimonial-${index}`}
            >
              <blockquote className="space-y-6">
                <p className="text-lg md:text-xl leading-relaxed italic">
                  "{testimonial.quote}"
                </p>

                <footer className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {testimonial.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </footer>
              </blockquote>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
