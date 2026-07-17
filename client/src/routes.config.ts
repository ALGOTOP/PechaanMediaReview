export interface RouteConfig {
  path: string;
  priority: number;
  changefreq: string;
  title?: string;
  description?: string;
}

export const routes: RouteConfig[] = [
  {
    path: "/",
    priority: 1.0,
    changefreq: "monthly",
    title: "Pehchaan Media — Branding, Web &amp; Creative Agency",
    description: "Pehchaan Media is a full-service creative agency specialising in brand identity, film production, ad creatives, and digital strategy. Trusted by 70+ brands worldwide. Book a free 15-min call.",
  },
  {
    path: "/audit-report",
    priority: 0.7,
    changefreq: "monthly",
  },
  {
    path: "/services",
    priority: 0.9,
    changefreq: "monthly",
    title: "Services | Pehchaan Media — Brand, Marketing, Film & Web",
    description: "Explore Pehchaan Media's four core services: Brand Identity & Design, Marketing & Strategy, Film & Production, and Web & Digital. One agency, every discipline.",
  },
  {
    path: "/services/web-design-agency",
    priority: 0.9,
    changefreq: "monthly",
    title: "Web Design Agency | Pehchaan Media",
    description: "Custom website design and development for brands worldwide. Mobile-responsive, SEO-ready, and built to convert. Book a free 15-min call with Pehchaan Media.",
  },
];
