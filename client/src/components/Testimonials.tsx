import "./TestimonialsWall.css";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarSeed: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Working with Pehchaan Media transformed our entire brand presence. Their team understood our story and brought it to life visually in ways we couldn't have imagined.",
    author: "Ayesha Khan",
    role: "CEO",
    company: "Glow Beauty Co.",
    avatarSeed: "ayesha",
  },
  {
    quote: "The passion and dedication Pehchaan Media brings is unmatched. They became an integral part of our team during the rebrand and helped us grow exponentially.",
    author: "Sara Ahmed",
    role: "Founder",
    company: "Urban Brew",
    avatarSeed: "sara",
  },
  {
    quote: "Pehchaan Media turned a bland corporate message into a human story. The result increased our leads and made internal stakeholders finally agree on one voice.",
    author: "Omar Farooq",
    role: "Director",
    company: "Blue Harbor Logistics",
    avatarSeed: "omar",
  },
  {
    quote: "Their visual storytelling is next level. The showreel they made for us opened doors to three festivals and two commercial partnerships.",
    author: "Daniel Kim",
    role: "Creative Director",
    company: "Arcadia Media",
    avatarSeed: "daniel",
  },
  {
    quote: "They modernised our ecommerce look and simplified the UX in ways that actually reduced bounce rates. Design choices were bold but data-driven.",
    author: "Lina Rodriguez",
    role: "Head of Marketing",
    company: "Solstice Apparel",
    avatarSeed: "lina",
  },
  {
    quote: "What surprised me most was how they listen. Feedback cycles were concise and meaningful — the final product felt like a clear collaboration, not a handoff.",
    author: "Meera Patel",
    role: "Creative Lead",
    company: "Minima Studio",
    avatarSeed: "meera",
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="tw-card">
      <div className="tw-header">
        <img
          src={`https://i.pravatar.cc/150?u=${testimonial.avatarSeed}`}
          alt={testimonial.author}
          className="tw-avatar"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = "none";
            const fallback = target.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = "flex";
          }}
        />
        <div className="tw-avatar-fallback">{getInitials(testimonial.author)}</div>
        <div className="tw-meta">
          <p className="tw-name">{testimonial.author}</p>
          <p className="tw-role">{testimonial.role}, {testimonial.company}</p>
        </div>
      </div>
      <p className="tw-text">"{testimonial.quote}"</p>
    </div>
  );
}

export default function Testimonials() {
  const row1 = testimonials.slice(0, 3);
  const row2 = testimonials.slice(3, 6);

  return (
    <section className="py-24 md:py-32" data-testid="section-testimonials">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="max-w-3xl">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            data-testid="text-testimonials-title"
          >
            Client Stories
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Trusted by forward-thinking brands who value creativity, strategy, and measurable impact.
          </p>
        </div>
      </div>

      <div className="tw-wall">
        <div className="tw-row tw-scroll-left" style={{ animationDuration: "40s" }}>
          <div className="tw-content">
            {[...row1, ...row1].map((t, i) => (
              <TestimonialCard key={`r1a-${i}`} testimonial={t} />
            ))}
          </div>
          <div className="tw-content" aria-hidden>
            {[...row1, ...row1].map((t, i) => (
              <TestimonialCard key={`r1b-${i}`} testimonial={t} />
            ))}
          </div>
        </div>

        <div className="tw-row tw-scroll-right" style={{ animationDuration: "40s" }}>
          <div className="tw-content">
            {[...row2, ...row2].map((t, i) => (
              <TestimonialCard key={`r2a-${i}`} testimonial={t} />
            ))}
          </div>
          <div className="tw-content" aria-hidden>
            {[...row2, ...row2].map((t, i) => (
              <TestimonialCard key={`r2b-${i}`} testimonial={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
