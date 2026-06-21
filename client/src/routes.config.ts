export interface RouteConfig {
  path: string;
  priority: number;
  changefreq: string;
}

export const routes: RouteConfig[] = [
  { path: "/", priority: 1.0, changefreq: "monthly" },
  { path: "/audit-report", priority: 0.7, changefreq: "monthly" },
];
