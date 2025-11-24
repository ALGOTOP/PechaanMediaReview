import RecommendationsList from '../RecommendationsList';
import type { Recommendation } from '@shared/schema';

export default function RecommendationsListExample() {
  const mockRecommendations: Recommendation[] = [
    {
      title: "Upgrade Typography Hierarchy",
      description: "Implement a bold, modern type system with larger headlines and better visual rhythm.",
      priority: "quick-win",
      impact: "High - Immediate visual upgrade",
      effort: "2-3 hours",
      examples: [
        "Olha Lazarieva: 72-96px headlines with 1.1 line-height",
        "Form&Fun: Space Grotesk at massive scale for impact"
      ]
    },
    {
      title: "Add Scroll-Based Animations",
      description: "Implement subtle fade-in and stagger animations as users scroll through content sections.",
      priority: "quick-win",
      impact: "Medium - Adds polish and sophistication",
      effort: "3-4 hours",
      examples: [
        "Portfolio items fade in with 100ms stagger delay",
        "Statistics counter animation on scroll into view"
      ]
    },
    {
      title: "Redesign Portfolio Grid",
      description: "Replace uniform card grid with asymmetric masonry layout featuring varied image sizes.",
      priority: "medium-effort",
      impact: "High - Transforms visual appeal",
      effort: "1-2 days",
      examples: [
        "Pinterest-style masonry with varying heights",
        "Hover states with scale and overlay reveals"
      ]
    },
    {
      title: "Implement Hero Video Background",
      description: "Add full-bleed cinematic video showing your creative process with text overlay.",
      priority: "major-overhaul",
      impact: "Very High - Sets premium tone immediately",
      effort: "3-5 days (including video production)",
      examples: [
        "Form&Fun: Auto-playing ambient video with subtle motion",
        "Showreel clips showing agency work in action"
      ]
    }
  ];

  return <RecommendationsList recommendations={mockRecommendations} />;
}
