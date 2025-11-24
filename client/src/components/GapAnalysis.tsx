import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

interface GapAnalysisProps {
  topGaps: string[];
  strengths: string[];
}

export default function GapAnalysis({ topGaps, strengths }: GapAnalysisProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="border-red-200 dark:border-red-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <TrendingDown className="w-5 h-5" />
            Top 5 Gaps vs. Awwwards Winners
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {topGaps.map((gap, index) => (
              <li key={index} className="flex items-start gap-3" data-testid={`gap-${index}`}>
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-sm">{gap}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-green-200 dark:border-green-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
            <TrendingUp className="w-5 h-5" />
            Your Strengths
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {strengths.map((strength, index) => (
              <li key={index} className="flex items-start gap-3" data-testid={`strength-${index}`}>
                <span className="text-green-600 dark:text-green-400 text-lg shrink-0">✓</span>
                <span className="text-sm">{strength}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
