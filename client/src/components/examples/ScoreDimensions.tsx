import ScoreDimensions from '../ScoreDimensions';
import type { AuditDimension } from '@shared/schema';

export default function ScoreDimensionsExample() {
  const mockDimensions: AuditDimension[] = [
    {
      name: "Visual Design",
      score: 5,
      description: "Overall aesthetic quality, visual hierarchy, and design sophistication",
      issues: [
        "Generic three-column service grid lacks visual interest",
        "Inconsistent spacing and typography hierarchy"
      ],
      recommendations: ["Implement asymmetric layouts", "Upgrade typography system"]
    },
    {
      name: "Typography",
      score: 4,
      description: "Font choices, hierarchy, readability, and typographic rhythm",
      issues: [
        "Weak headline hierarchy - lacks impact",
        "Inconsistent font sizing across sections"
      ],
      recommendations: ["Use larger, bolder headlines (72-96px)", "Establish clear type scale"]
    },
    {
      name: "Animations & Interactions",
      score: 3,
      description: "Micro-interactions, transitions, and motion design",
      issues: [
        "No meaningful scroll animations or reveals",
        "Basic hover states with no personality"
      ],
      recommendations: ["Add stagger fade-ins on scroll", "Implement sophisticated hover effects"]
    },
    {
      name: "User Experience",
      score: 6,
      description: "Navigation, flow, accessibility, and overall usability",
      issues: [
        "Navigation could be more minimal",
        "Portfolio grid lacks filtering options"
      ],
      recommendations: ["Simplify navigation structure", "Add project category filters"]
    }
  ];

  return <ScoreDimensions dimensions={mockDimensions} />;
}
