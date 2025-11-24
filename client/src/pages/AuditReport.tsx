import { useState } from "react";
import AuditHeader from "@/components/AuditHeader";
import ScoreDimensions from "@/components/ScoreDimensions";
import SectionAnalysis from "@/components/SectionAnalysis";
import RecommendationsList from "@/components/RecommendationsList";
import GapAnalysis from "@/components/GapAnalysis";
import ComparisonShowcase from "@/components/ComparisonShowcase";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import type { AuditDimension, SectionAnalysis as SectionAnalysisType, Recommendation } from "@shared/schema";

export default function AuditReport() {
  const { toast } = useToast();

  // Comprehensive audit data for Pehchaan Media
  const auditData = {
    overallScore: 42,
    dimensions: [
      {
        name: "Visual Design",
        score: 5,
        description: "Overall aesthetic quality, visual hierarchy, and design sophistication",
        issues: [
          "Generic three-column service grid lacks visual interest",
          "Inconsistent spacing and typography hierarchy",
          "Portfolio cards all identical size - no visual variety"
        ],
        recommendations: [
          "Implement asymmetric masonry layouts",
          "Establish consistent spacing system (8/16/24/32px)",
          "Create visual rhythm with varying card sizes"
        ]
      },
      {
        name: "Typography",
        score: 4,
        description: "Font choices, hierarchy, readability, and typographic rhythm",
        issues: [
          "Weak headline hierarchy - lacks impact and scale",
          "Inconsistent font sizing across sections",
          "Body text line-height too tight in some areas"
        ],
        recommendations: [
          "Use 72-96px headlines for hero sections",
          "Establish clear type scale (14/16/20/24/32/48/64/96px)",
          "Implement 1.6 line-height for body text"
        ]
      },
      {
        name: "Animations & Interactions",
        score: 3,
        description: "Micro-interactions, transitions, and motion design quality",
        issues: [
          "No meaningful scroll animations or reveals",
          "Basic hover states with no personality",
          "No entrance animations for sections",
          "Missing loading states and transitions"
        ],
        recommendations: [
          "Add stagger fade-ins on scroll (100ms delay between items)",
          "Implement subtle scale on hover (1.02 transform)",
          "Add counter animations for statistics",
          "Create smooth page transitions"
        ]
      },
      {
        name: "User Experience",
        score: 6,
        description: "Navigation flow, accessibility, and overall usability",
        issues: [
          "Navigation could be more minimal",
          "Portfolio lacks filtering/categorization",
          "No breadcrumbs or clear navigation hierarchy"
        ],
        recommendations: [
          "Simplify navigation to 4-5 key items",
          "Add category filters for portfolio (Film, Branding, Web)",
          "Implement smooth scroll to sections"
        ]
      },
      {
        name: "Technical Performance",
        score: 6,
        description: "Page speed, optimization, and technical implementation",
        issues: [
          "Some images could be better optimized",
          "Missing lazy loading on portfolio items",
          "Could benefit from modern image formats (WebP)"
        ],
        recommendations: [
          "Implement lazy loading for all images",
          "Convert to WebP with fallbacks",
          "Add loading skeletons for async content"
        ]
      },
      {
        name: "Content Strategy",
        score: 7,
        description: "Content quality, messaging clarity, and storytelling",
        issues: [
          "Too many testimonials - overwhelming",
          "Service descriptions could be more concise"
        ],
        recommendations: [
          "Curate 6-8 best testimonials only",
          "Make service descriptions scannable with bullet points",
          "Add more client success metrics"
        ]
      },
      {
        name: "Brand Storytelling",
        score: 5,
        description: "How well the brand story is communicated visually",
        issues: [
          "No video background showing creative process",
          "Showreel section could be more prominent",
          "Missing 'about' personality and studio culture"
        ],
        recommendations: [
          "Add behind-the-scenes video content",
          "Feature showreel more prominently in hero",
          "Show team and studio environment"
        ]
      },
      {
        name: "Innovation & Uniqueness",
        score: 3,
        description: "Originality and memorable design elements",
        issues: [
          "Layout feels template-based",
          "No unique interactive elements",
          "Missing signature design moments",
          "Doesn't push creative boundaries"
        ],
        recommendations: [
          "Add custom cursor interactions",
          "Create unique portfolio filtering animation",
          "Design a signature visual element/motif",
          "Experiment with unconventional layouts"
        ]
      }
    ] as AuditDimension[],
    sections: [
      {
        name: "Hero",
        currentState: "Text-based hero with headline 'We make brands unforgettable' and a CTA button on solid background",
        issues: [
          "No full-bleed video or cinematic imagery - just text on solid color",
          "Headline is decent but lacks animated reveal on load",
          "Missing scroll indicator for downward navigation",
          "No visual storytelling - purely text-driven",
          "Static and corporate feeling - doesn't showcase creative work"
        ],
        awwardsComparison: "Olha Lazarieva uses full-width creative imagery with elegant typography overlays and subtle animations. Form&Fun features auto-playing video backgrounds with bold, oversized headlines and interactive elements. Your hero feels static and template-based by comparison.",
        recommendations: [
          "Add full-bleed video background showing creative process (film set, design studio, brand campaigns in action)",
          "Implement fade-up animation (0.8s ease-out) for headline on page load",
          "Add animated scroll indicator with bounce animation",
          "Consider asymmetric layout: large video left, minimal text overlay right",
          "Use 80vh minimum height for premium feel"
        ]
      },
      {
        name: "Services",
        currentState: "Five service cards in uniform grid layout with icons, titles, and descriptions",
        issues: [
          "Cookie-cutter three-column grid - seen on thousands of agency sites",
          "All cards identical size with no visual hierarchy or interest",
          "Generic icons that don't add storytelling value",
          "No unique visual personality or creative flair",
          "Feels like a WordPress template, not a creative agency"
        ],
        awwardsComparison: "Award-winning portfolios completely avoid uniform grids. They use asymmetric masonry layouts with varying card sizes, bold imagery instead of icons, and creative typography treatments. Your grid screams 'template' while theirs scream 'bespoke design.'",
        recommendations: [
          "Replace uniform grid with asymmetric masonry layout (Pinterest-style)",
          "Use large-scale imagery or video clips for each service instead of icons",
          "Vary card heights (some 300px, others 500px+) to create visual rhythm",
          "Add sophisticated hover effects revealing project examples for each service",
          "Consider horizontal scrolling showcase instead of traditional grid"
        ]
      },
      {
        name: "Portfolio",
        currentState: "Case study cards in 3-column uniform grid with thumbnail images, titles, and category tags",
        issues: [
          "All thumbnails same size creating monotonous rhythm",
          "Minimal hover interaction (just basic link underline)",
          "No filtering, sorting, or categorization options",
          "Layout feels rigid, predictable, and non-creative",
          "Doesn't showcase the visual quality of your work effectively"
        ],
        awwardsComparison: "Top portfolios use masonry/Pinterest-style grids with varying aspect ratios and image sizes. They implement sophisticated hover states (scale transforms, overlay reveals, blur effects) and interactive filter tags for easy navigation. They let the work breathe with generous whitespace.",
        recommendations: [
          "Implement masonry grid with varying image heights (use 16:9, 1:1, 3:4 aspect ratios)",
          "Add category filter pills (All, Film, Branding, Web, Strategy) with smooth transitions",
          "Enhance hover states: subtle scale (transform: scale(1.02)) + gradient overlay reveal + project title fade-in",
          "Implement lazy-loading with stagger fade-in animation (100ms delay between items)",
          "Consider full-screen project preview on hover for premium feel"
        ]
      },
      {
        name: "Testimonials",
        currentState: "Horizontal scrolling carousel with 12+ client testimonials repeated twice",
        issues: [
          "Too many testimonials - overwhelming and repetitive",
          "Carousel format is outdated and reduces credibility",
          "All cards identical creating visual monotony",
          "Quotes too long - not scannable",
          "Repeated content feels spammy"
        ],
        awwardsComparison: "Modern portfolios curate 6-8 best testimonials maximum and present them in editorial layouts - staggered vertical arrangements, large pull-quotes, or grid mosaics. They focus on quality over quantity and make each testimonial feel premium.",
        recommendations: [
          "Curate only your 6-8 strongest testimonials (remove duplicates)",
          "Replace carousel with 2-column staggered layout",
          "Use large quote typography (28-32px) with minimal cards",
          "Add client avatar, name, company with subtle animations",
          "Consider removing borders entirely for cleaner aesthetic"
        ]
      },
      {
        name: "Showreel",
        currentState: "Embedded video player with grid of project thumbnails below showing work examples",
        issues: [
          "Showreel section is good but could be more prominent",
          "Grid below is uniform - same issues as portfolio section",
          "Video controls could be more elegant/custom"
        ],
        awwardsComparison: "This is actually one of your stronger sections. Award-winning sites also feature showreels prominently. The difference is in the presentation - custom video players, ambient autoplay backgrounds, or full-screen immersive experiences.",
        recommendations: [
          "Consider moving showreel to hero section as ambient background",
          "Add custom video controls with your brand styling",
          "Implement masonry grid for thumbnails below (same as portfolio)",
          "Add play icon overlay on hover with smooth fade transition"
        ]
      },
      {
        name: "Statistics",
        currentState: "Four statistics displayed in grid: '40+ Brands', '3.2× Noticeability', '92% Retention', '70+ Campaigns', '28 days Turnaround'",
        issues: [
          "Good content but presentation is basic",
          "No counter animation on scroll into view",
          "Could have more visual impact with larger numbers",
          "Uniform grid again - consider asymmetric layout"
        ],
        awwardsComparison: "Top sites make statistics hero moments with massive typography (96px+ numbers), counter animations that trigger on scroll, and creative layouts that break the grid.",
        recommendations: [
          "Increase number size to 72-96px with bold weight",
          "Implement count-up animation when section scrolls into view",
          "Use minimal labels below (14px uppercase with tracking)",
          "Consider 2×2 grid or asymmetric layout instead of uniform columns"
        ]
      }
    ] as SectionAnalysisType[],
    recommendations: [
      {
        title: "Upgrade Typography System Immediately",
        description: "Implement a bold, modern type hierarchy with larger headlines (72-96px), clear type scale, and better line-height for body text. This is a quick win that dramatically improves visual sophistication.",
        priority: "quick-win" as const,
        impact: "High - Immediate visual upgrade",
        effort: "2-3 hours",
        examples: [
          "Olha Lazarieva: 72-96px headlines with 1.1 line-height for maximum impact",
          "Form&Fun: Space Grotesk at massive scale creates immediate premium feel"
        ]
      },
      {
        title: "Add Scroll-Based Reveal Animations",
        description: "Implement subtle fade-in and stagger animations as users scroll through content. This adds polish and makes the site feel modern and sophisticated.",
        priority: "quick-win" as const,
        impact: "Medium-High - Adds polish and delight",
        effort: "3-4 hours",
        examples: [
          "Portfolio items fade in with 100ms stagger delay between each",
          "Statistics counter animation on scroll into view",
          "Section headlines fade up on reveal"
        ]
      },
      {
        title: "Curate and Redesign Testimonials Section",
        description: "Reduce to 6-8 best testimonials only and present them in a 2-column staggered editorial layout instead of carousel.",
        priority: "quick-win" as const,
        impact: "Medium - Increases credibility and reduces clutter",
        effort: "1-2 hours",
        examples: [
          "Large quote typography (28-32px) without heavy card styling",
          "Client avatar + name + company in minimal format",
          "Vertical stagger creates visual rhythm"
        ]
      },
      {
        title: "Implement Consistent Spacing System",
        description: "Establish and apply consistent spacing units (4/8/12/16/24/32px) throughout the site for professional polish.",
        priority: "quick-win" as const,
        impact: "Medium - Creates premium cohesive feel",
        effort: "2-3 hours",
        examples: [
          "Section padding: py-32 (desktop), py-20 (tablet), py-12 (mobile)",
          "Component gaps: gap-8 to gap-16 consistently",
          "Card padding: p-6 or p-8 consistently"
        ]
      },
      {
        title: "Redesign Portfolio Grid with Masonry Layout",
        description: "Replace uniform card grid with asymmetric Pinterest-style masonry layout featuring varied image sizes and sophisticated hover effects.",
        priority: "medium-effort" as const,
        impact: "Very High - Transforms visual appeal",
        effort: "1-2 days",
        examples: [
          "Varying aspect ratios (16:9, 1:1, 3:4) create visual interest",
          "Hover: scale(1.02) + gradient overlay + title reveal",
          "Category filters with smooth transitions"
        ]
      },
      {
        title: "Enhance Service Section with Asymmetric Layout",
        description: "Transform generic grid into creative asymmetric layout with large imagery/video instead of icons.",
        priority: "medium-effort" as const,
        impact: "High - Shows creative capability",
        effort: "2-3 days",
        examples: [
          "Varying card heights (some 300px, others 500px+)",
          "Video clips or bold imagery for each service",
          "Hover reveals project examples"
        ]
      },
      {
        title: "Add Advanced Hover Interactions",
        description: "Implement sophisticated micro-interactions throughout the site - custom cursor, smooth transitions, interactive elements.",
        priority: "medium-effort" as const,
        impact: "Medium-High - Adds premium feel",
        effort: "2-3 days",
        examples: [
          "Custom cursor that changes on hover over links/buttons",
          "Smooth page transitions between sections",
          "Interactive project previews on hover"
        ]
      },
      {
        title: "Redesign Hero with Full-Bleed Video Background",
        description: "Replace static text hero with full-screen cinematic video showing your creative process, with elegant text overlay and scroll indicator.",
        priority: "major-overhaul" as const,
        impact: "Very High - Sets premium tone immediately",
        effort: "3-5 days (including video production/editing)",
        examples: [
          "Form&Fun: Auto-playing ambient video with subtle motion",
          "Showreel clips showing film work, design process, brand campaigns",
          "80vh height with fade-up headline animation on load"
        ]
      },
      {
        title: "Implement Advanced Navigation System",
        description: "Create minimal fixed navigation with blur-on-scroll effect, smooth scroll to sections, and mobile full-screen menu overlay.",
        priority: "major-overhaul" as const,
        impact: "Medium - Professional polish",
        effort: "2-3 days",
        examples: [
          "Fixed transparent header that blurs when scrolling",
          "Hamburger menu expands to full-screen overlay on mobile",
          "Smooth scroll with offset for fixed header"
        ]
      },
      {
        title: "Create Custom Interactive Showreel Experience",
        description: "Build immersive full-screen showreel viewer with custom controls and project showcase grid.",
        priority: "major-overhaul" as const,
        impact: "High - Showcases best work dramatically",
        effort: "3-4 days",
        examples: [
          "Full-screen video player with custom branded controls",
          "Interactive thumbnail grid with play-on-hover",
          "Smooth transitions between projects"
        ]
      }
    ] as Recommendation[],
    topGaps: [
      "No asymmetric or masonry layouts - everything is uniform grids which feels template-based",
      "Lack of sophisticated animations and micro-interactions (no scroll reveals, hover effects are basic)",
      "Typography lacks impact - headlines too small (should be 72-96px), weak visual hierarchy",
      "No full-bleed video or cinematic imagery in hero section - missed opportunity to show creative work",
      "Testimonials presented in repetitive carousel format instead of curated editorial layout"
    ],
    strengths: [
      "Strong portfolio of actual client work - impressive brands and real case studies",
      "Clear service offerings and value proposition - messaging is on point",
      "Good mobile responsiveness fundamentals and basic accessibility",
      "Professional copywriting and brand messaging throughout",
      "Comprehensive case studies with real metrics (3.2× noticeability, 92% retention, etc.)"
    ]
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your audit report is being generated as PDF...",
    });
    
    // Simulate export
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Report downloaded successfully",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <AuditHeader 
        overallScore={auditData.overallScore} 
        onExport={handleExport}
      />

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        <GapAnalysis 
          topGaps={auditData.topGaps}
          strengths={auditData.strengths}
        />

        <Separator />

        <ScoreDimensions dimensions={auditData.dimensions} />

        <Separator />

        <SectionAnalysis sections={auditData.sections} />

        <Separator />

        <RecommendationsList recommendations={auditData.recommendations} />

        <Separator />

        <ComparisonShowcase />

        <div className="text-center pt-8 pb-4">
          <p className="text-sm text-muted-foreground">
            This audit was generated to help Pehchaan Media understand gaps and opportunities.
            <br />
            Focus on quick wins first, then tackle medium effort improvements before major overhauls.
          </p>
        </div>
      </div>
    </div>
  );
}
