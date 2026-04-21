import { Mail, Phone } from "lucide-react";
import BookingCalendar from "./BookingCalendar";

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-white py-20 md:py-28"
      data-testid="section-contact"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">

          {/* ── LEFT ── */}
          <div>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-950 mb-6"
              data-testid="text-contact-title"
            >
              See if Pehchaan
              <br />
              is the right fit
              <br />
              <span className="text-gray-400">for you</span>
            </h2>

            <p className="text-base md:text-lg text-gray-500 leading-relaxed max-w-sm mb-4">
              Schedule a quick, 15 minute guided call with us to see if we can
              help you in anyway.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm mb-10">
              We work with product brands, startups, and established businesses on brand identity, film production, advertising campaigns, and web design.
            </p>

            <div className="flex flex-col gap-3">
              {/* Email pill */}
              <a
                href="mailto:infopehchaanmedia@gmail.com"
                data-testid="link-email"
                className="group flex items-center gap-3 px-5 py-3 rounded-full w-fit transition-all duration-300 hover:shadow-md"
                style={{
                  background: "#f0f0f0",
                  border: "1px solid rgba(0,0,0,0.09)",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shrink-0"
                  style={{ background: "#e4e4e4", border: "1px solid rgba(0,0,0,0.07)" }}
                >
                  <Mail className="w-3.5 h-3.5 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                  infopehchaanmedia@gmail.com
                </span>
              </a>

              {/* Phone pill */}
              <a
                href="tel:+923355312242"
                data-testid="link-phone"
                className="group flex items-center gap-3 px-5 py-3 rounded-full w-fit transition-all duration-300 hover:shadow-md"
                style={{
                  background: "#f0f0f0",
                  border: "1px solid rgba(0,0,0,0.09)",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shrink-0"
                  style={{ background: "#e4e4e4", border: "1px solid rgba(0,0,0,0.07)" }}
                >
                  <Phone className="w-3.5 h-3.5 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                  +92 335 5312242
                </span>
              </a>
            </div>
          </div>

          {/* ── RIGHT — Custom booking calendar ── */}
          <BookingCalendar />

        </div>

      </div>
    </section>
  );
}
