import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface AwwardsWinner {
  name: string;
  url: string;
  award: string;
  keyFeatures: string[];
  screenshot?: string;
}

export default function ComparisonShowcase() {
  const winners: AwwardsWinner[] = [
    {
      name: "Olha Lazarieva",
      url: "https://olhalazarieva.com/",
      award: "Portfolio Honors Sep 2025, SOTD Oct 2",
      keyFeatures: [
        "Minimal, elegant layouts with refined typography",
        "Asymmetric grid systems with visual hierarchy",
        "Sophisticated scroll-based reveals",
        "Premium whitespace usage"
      ]
    },
    {
      name: "Form&Fun Studio",
      url: "https://www.formandfun.co/",
      award: "Portfolio Honors Aug 2025, SOTD Aug 30",
      keyFeatures: [
        "Video backgrounds with ambient motion",
        "Interactive 3D elements and immersive experiences",
        "Bold typography with strong visual impact",
        "Experimental UI blending art and technology"
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2" data-testid="text-comparison-title">
          Awwwards 2025 Winners Reference
        </h2>
        <p className="text-muted-foreground">
          Top portfolios setting the standard for excellence
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {winners.map((winner, index) => (
          <Card key={index} className="hover-elevate" data-testid={`card-winner-${index}`}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-lg mb-1">{winner.name}</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {winner.award.split(',')[0]}
                  </Badge>
                </div>
                <a
                  href={winner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-primary hover-elevate p-2 rounded-md"
                  data-testid={`link-winner-${index}`}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Key Design Features:</p>
                  <ul className="space-y-1.5">
                    {winner.keyFeatures.map((feature, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-muted/50 border-dashed">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground italic">
            <strong>Note:</strong> These sites represent the cutting edge of web design in 2025. They combine technical excellence with creative storytelling, minimal aesthetics with bold visual impact, and functional design with emotional resonance. Your goal should be to match this level of sophistication while maintaining Pehchaan Media's unique brand identity.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
