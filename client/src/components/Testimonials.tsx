import "./TestimonialsWall.css";
import avatarAyesha from "@assets/generated_images/avatars/ayesha_khan.png";
import avatarSara from "@assets/generated_images/avatars/sara_ahmed.png";
import avatarOmar from "@assets/generated_images/avatars/omar_farooq.png";
import avatarDaniel from "@assets/generated_images/avatars/daniel_kim.png";
import avatarLina from "@assets/generated_images/avatars/lina_rodriguez.png";
import avatarMeera from "@assets/generated_images/avatars/meera_patel.png";
import avatarRohan from "@assets/generated_images/avatars/rohan_mehta.png";
import avatarPriya from "@assets/generated_images/avatars/priya_sundaram.png";
import avatarJames from "@assets/generated_images/avatars/james_okafor.png";
import avatarSana from "@assets/generated_images/avatars/sana_mirza.png";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Working with Pehchaan Media transformed our entire brand presence. Their team understood our story and brought it to life visually in ways we couldn't have imagined.",
    author: "Ayesha Khan",
    role: "CEO",
    company: "Glow Beauty Co.",
    avatar: avatarAyesha,
  },
  {
    quote: "The passion and dedication Pehchaan Media brings is unmatched. They became an integral part of our team during the rebrand and helped us grow exponentially.",
    author: "Sara Ahmed",
    role: "Founder",
    company: "Urban Brew",
    avatar: avatarSara,
  },
  {
    quote: "Pehchaan Media turned a bland corporate message into a human story. The result increased our leads and made internal stakeholders finally agree on one voice.",
    author: "Omar Farooq",
    role: "Director",
    company: "Blue Harbor Logistics",
    avatar: avatarOmar,
  },
  {
    quote: "Their visual storytelling is next level. The showreel they made for us opened doors to three festivals and two commercial partnerships.",
    author: "Daniel Kim",
    role: "Creative Director",
    company: "Arcadia Media",
    avatar: avatarDaniel,
  },
  {
    quote: "They modernised our ecommerce look and simplified the UX in ways that actually reduced bounce rates. Design choices were bold but data-driven.",
    author: "Lina Rodriguez",
    role: "Head of Marketing",
    company: "Solstice Apparel",
    avatar: avatarLina,
  },
  {
    quote: "What surprised me most was how they listen. Feedback cycles were concise and meaningful. The final product felt like a clear collaboration, not a handoff.",
    author: "Meera Patel",
    role: "Creative Lead",
    company: "Minima Studio",
    avatar: avatarMeera,
  },
  {
    quote: "The logo they delivered on week two wasn't something we expected to keep forever. We kept it. Six months later, the rebrand has done more for our positioning than any campaign we ran in the previous three years.",
    author: "Rohan Mehta",
    role: "Co-founder",
    company: "Kova Interiors",
    avatar: avatarRohan,
  },
  {
    quote: "We'd gone through two agencies before. Both gave us something generic. Pehchaan asked different questions from the start. The brand system they built holds up across every touchpoint without ever feeling forced.",
    author: "Priya Sundaram",
    role: "Marketing Director",
    company: "Noor Skincare",
    avatar: avatarPriya,
  },
  {
    quote: "The typography and colour work alone elevated how we're perceived at trade shows. Before, we blended in. Now people come to our booth specifically because of how the branding looks.",
    author: "James Okafor",
    role: "Director of Sales",
    company: "Elevate Structures",
    avatar: avatarJames,
  },
  {
    quote: "I was skeptical about how much brand identity actually matters for a B2B company. I'm not skeptical anymore. The response from enterprise clients after the rebrand has been different in a way I can measure.",
    author: "Sana Mirza",
    role: "CEO",
    company: "Meridian Consulting",
    avatar: avatarSana,
  },
  {
    quote: "The campaign they built for our product launch wasn't just creative. It was planned with actual intent. We tracked every touchpoint and the conversion rate was double what we'd seen before.",
    author: "Aaron Vance",
    role: "Head of Growth",
    company: "Fieldspark",
    avatar: "https://i.pravatar.cc/150?u=aaron_vance_fieldspark",
  },
  {
    quote: "What I noticed was how much they cared about the strategy underneath the content. Most teams just produce. They think first, then produce. That difference shows in the results.",
    author: "Nadia Hassan",
    role: "Brand Manager",
    company: "Lumi Foods",
    avatar: "https://i.pravatar.cc/150?u=nadia_hassan_lumi",
  },
  {
    quote: "They took a product that most of our target audience didn't understand and built a content strategy that educated without dumbing down. Our sales team says leads are coming in warmer than before.",
    author: "Tariq Ibrahim",
    role: "Co-founder",
    company: "Axiom Wellness",
    avatar: "https://i.pravatar.cc/150?u=tariq_ibrahim_axiom",
  },
  {
    quote: "The six-month plan they put together was detailed in the right places and flexible where it needed to be. We've adjusted some things along the way and they've been easy to work with throughout.",
    author: "Elena Vasquez",
    role: "CMO",
    company: "Drift Analytics",
    avatar: "https://i.pravatar.cc/150?u=elena_vasquez_drift",
  },
  {
    quote: "The showreel opened conversations we couldn't get into before. Three distributors reached out within a week of it going live. The footage was exactly what we needed and the edit was clean.",
    author: "Kabir Nair",
    role: "Director",
    company: "Pulse Films",
    avatar: "https://i.pravatar.cc/150?u=kabir_nair_pulse",
  },
  {
    quote: "They shot our brand documentary over two days and turned it into something that actually moved people. A few of our clients mentioned watching it more than once.",
    author: "Fatima Al-Rashid",
    role: "Founder",
    company: "Bloom Collective",
    avatar: "https://i.pravatar.cc/150?u=fatima_alrashid_bloom",
  },
  {
    quote: "The production team worked with a smaller budget than they were used to and still brought everything to the level we needed. No compromise in how it looked.",
    author: "Marcus Chen",
    role: "Creative Producer",
    company: "Siren Creative",
    avatar: "https://i.pravatar.cc/150?u=marcus_chen_siren",
  },
  {
    quote: "Our previous brand video felt like every other one in the industry. This one doesn't. The pacing is different, the script is different, and the response from our audience confirmed that.",
    author: "Ingrid Larsson",
    role: "VP Communications",
    company: "Nordic Ventures",
    avatar: "https://i.pravatar.cc/150?u=ingrid_larsson_nordic",
  },
  {
    quote: "The redesign was methodical. They didn't just make it look better, they restructured how information was presented. Time on site went up and the bounce rate went down. Both without any paid traffic changes.",
    author: "Yusuf Adeyemi",
    role: "Founder",
    company: "Clavis Digital",
    avatar: "https://i.pravatar.cc/150?u=yusuf_adeyemi_clavis",
  },
  {
    quote: "What stood out to me was the quality of the interaction design. Every hover state, every transition. It wasn't decorative. It guided attention where we actually needed it.",
    author: "Sophie Bernard",
    role: "Product Lead",
    company: "Atelier Lab",
    avatar: "https://i.pravatar.cc/150?u=sophie_bernard_atelier",
  },
  {
    quote: "I came to them with a reference board and they pushed back on half of it, with good reasons. The final site is better than what I originally had in mind.",
    author: "Ben Nakamura",
    role: "Owner",
    company: "Nakamura Woodworks",
    avatar: "https://i.pravatar.cc/150?u=ben_nakamura_woodworks",
  },
  {
    quote: "The site has been live for four months and we haven't needed to call them for a single bug. Clean code, well-documented, and the handoff was genuinely smooth.",
    author: "Leila Ahmadi",
    role: "Operations Director",
    company: "Croft Studio",
    avatar: "https://i.pravatar.cc/150?u=leila_ahmadi_croft",
  },
  {
    quote: "Working with them felt different from the first call. They already understood what we were trying to say before we knew how to say it. The final work reflected that clarity.",
    author: "Rania Khalil",
    role: "Creative Director",
    company: "Forma Bureau",
    avatar: "https://i.pravatar.cc/150?u=rania_khalil_forma",
  },
  {
    quote: "Small team, big output. That's the honest summary. They delivered at a level that teams twice their size have failed to reach for us before.",
    author: "David Osei",
    role: "Founder",
    company: "Caslon Partners",
    avatar: "https://i.pravatar.cc/150?u=david_osei_caslon",
  },
  {
    quote: "I'd worked with bigger studios and smaller freelancers. Neither extreme worked for what we needed. Pehchaan sat in a place where the quality was serious and the process wasn't painful.",
    author: "Mia Johansson",
    role: "Brand Strategist",
    company: "Solberg Agency",
    avatar: "https://i.pravatar.cc/150?u=mia_johansson_solberg",
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
          src={testimonial.avatar}
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
  const row1 = testimonials.slice(0, 13);
  const row2 = testimonials.slice(13);

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
        <div className="tw-row tw-scroll-left" style={{ animationDuration: "70s" }}>
          <div className="tw-content">
            {row1.map((t, i) => (
              <TestimonialCard key={`r1a-${i}`} testimonial={t} />
            ))}
          </div>
          <div className="tw-content" aria-hidden>
            {row1.map((t, i) => (
              <TestimonialCard key={`r1b-${i}`} testimonial={t} />
            ))}
          </div>
        </div>

        <div className="tw-row tw-scroll-right" style={{ animationDuration: "70s" }}>
          <div className="tw-content">
            {row2.map((t, i) => (
              <TestimonialCard key={`r2a-${i}`} testimonial={t} />
            ))}
          </div>
          <div className="tw-content" aria-hidden>
            {row2.map((t, i) => (
              <TestimonialCard key={`r2b-${i}`} testimonial={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
