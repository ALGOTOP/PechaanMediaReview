import GapAnalysis from '../GapAnalysis';

export default function GapAnalysisExample() {
  const mockGaps = [
    "No asymmetric or masonry layouts - everything is uniform grids",
    "Lack of sophisticated animations and micro-interactions",
    "Typography lacks impact - headlines too small, weak hierarchy",
    "No full-bleed video or cinematic imagery in hero section",
    "Testimonials presented in repetitive carousel instead of editorial layout"
  ];

  const mockStrengths = [
    "Strong portfolio of actual work - impressive client list",
    "Clear service offerings and value proposition",
    "Good mobile responsiveness fundamentals",
    "Professional copywriting and brand messaging",
    "Comprehensive case studies with real metrics"
  ];

  return <GapAnalysis topGaps={mockGaps} strengths={mockStrengths} />;
}
