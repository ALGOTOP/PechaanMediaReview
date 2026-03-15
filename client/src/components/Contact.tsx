import { Mail, Phone } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/pehchaanmedia";

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
          <div className="md:sticky md:top-24">
            <p className="text-[11px] font-mono tracking-[0.22em] text-gray-400 uppercase mb-7">
              Book a Discovery Call
            </p>

            <h2
              className="text-5xl md:text-6xl lg:text-[5.5rem] font-black leading-[1.05] text-gray-950 mb-6"
              data-testid="text-contact-title"
            >
              See if Pehchaan
              <br />
              is the right fit
              <br />
              <em className="font-black not-italic text-gray-400">for you</em>
            </h2>

            <p className="text-base md:text-lg text-gray-500 leading-relaxed max-w-sm mb-10">
              Schedule a free 30-minute discovery call. We'll walk you through
              our process and see how we can bring your brand to life.
            </p>

            <div className="space-y-3 text-sm text-gray-500">
              <a
                href="mailto:infopehchaanmedia@gmail.com"
                className="flex items-center gap-3 hover:text-gray-900 transition-colors group"
                data-testid="link-email"
              >
                <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-gray-400 transition-colors shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                infopehchaanmedia@gmail.com
              </a>
              <a
                href="tel:+923355312242"
                className="flex items-center gap-3 hover:text-gray-900 transition-colors group"
                data-testid="link-phone"
              >
                <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-gray-400 transition-colors shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                +92 335 5312242
              </a>
            </div>
          </div>

          {/* ── RIGHT — Calendly embed ── */}
          <div
            className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm min-h-[680px]"
            data-testid="calendly-embed"
          >
            <iframe
              src={`${CALENDLY_URL}?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=ffffff&text_color=111111&primary_color=111111`}
              width="100%"
              height="680"
              frameBorder="0"
              title="Schedule a call with Pehchaan Media"
              className="w-full"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
