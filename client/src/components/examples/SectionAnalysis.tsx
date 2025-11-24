import SectionAnalysis from '../SectionAnalysis';
import type { SectionAnalysis as SectionAnalysisType } from '@shared/schema';

export default function SectionAnalysisExample() {
  const mockSections: SectionAnalysisType[] = [
    {
      name: "Hero",
      currentState: "Text-based hero with headline 'We make brands unforgettable' and a CTA button",
      issues: [
        "No full-bleed video or cinematic imagery - just text on solid background",
        "Headline is good but lacks animated reveal on load",
        "Missing scroll indicator for downward navigation",
        "No visual storytelling - purely text-driven"
      ],
      awwardsComparison: "Olha Lazarieva uses full-width creative imagery with elegant typography overlays. Form&Fun has video backgrounds with bold, oversized headlines. Your hero feels static and corporate by comparison.",
      recommendations: [
        "Add full-bleed video background showing your creative process (film set, design work, brand campaigns)",
        "Implement fade-up animation for headline on page load",
        "Add animated scroll indicator (downward arrow)",
        "Consider asymmetric layout with large imagery + minimal text overlay"
      ]
    },
    {
      name: "Services",
      currentState: "Generic grid layout with 5 service cards (Brand Identity, Film Production, Web Design, Marketing, Community Building)",
      issues: [
        "Cookie-cutter three-column grid - seen on 10,000 agency sites",
        "All cards look identical with no visual hierarchy",
        "Icons are basic and don't add value",
        "No unique visual storytelling or personality"
      ],
      awwardsComparison: "Award-winning sites avoid uniform grids. They use asymmetric masonry layouts, varying card sizes, and bold imagery instead of icons. Your grid screams 'template' while theirs scream 'bespoke design.'",
      recommendations: [
        "Replace uniform grid with asymmetric masonry layout",
        "Use large-scale imagery/video for each service instead of icons",
        "Vary card heights and widths to create visual rhythm",
        "Add hover effects that reveal project examples for each service"
      ]
    },
    {
      name: "Portfolio",
      currentState: "Case study cards in uniform grid with thumbnail images",
      issues: [
        "All thumbnails same size - no visual variety",
        "Minimal hover interaction",
        "No filtering or categorization options",
        "Layout feels rigid and predictable"
      ],
      awwardsComparison: "Top portfolios use masonry/Pinterest-style grids with varying aspect ratios. They implement sophisticated hover states (scale, overlay reveals) and filter tags for easy navigation.",
      recommendations: [
        "Implement masonry grid with varying image heights",
        "Add category filter tags (Film, Branding, Web, etc.)",
        "Enhance hover states: subtle scale (1.02) + text overlay reveal",
        "Consider lazy-loading with stagger fade-in animation"
      ]
    }
  ];

  return <SectionAnalysis sections={mockSections} />;
}
