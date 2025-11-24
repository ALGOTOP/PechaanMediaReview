import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import type { AuditDimension } from "@shared/schema";

interface ScoreDimensionsProps {
  dimensions: AuditDimension[];
}

export default function ScoreDimensions({ dimensions }: ScoreDimensionsProps) {
  const getScoreIcon = (score: number) => {
    if (score >= 7) return <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />;
    if (score >= 4) return <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
    return <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />;
  };

  const getProgressColor = (score: number) => {
    if (score >= 7) return "bg-green-600 dark:bg-green-400";
    if (score >= 4) return "bg-amber-600 dark:bg-amber-400";
    return "bg-red-600 dark:bg-red-400";
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2" data-testid="text-dimensions-title">
          Scoring Breakdown
        </h2>
        <p className="text-muted-foreground">
          Your site evaluated across 8 critical dimensions
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {dimensions.map((dimension, index) => (
          <Card key={index} className="hover-elevate" data-testid={`card-dimension-${index}`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg mb-1">{dimension.name}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2">
                    {dimension.description}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {getScoreIcon(dimension.score)}
                  <span className="text-2xl font-bold" data-testid={`text-score-${index}`}>
                    {dimension.score}/10
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="relative">
                <Progress 
                  value={dimension.score * 10} 
                  className="h-2"
                />
                <div 
                  className={`absolute top-0 left-0 h-2 rounded-full transition-all ${getProgressColor(dimension.score)}`}
                  style={{ width: `${dimension.score * 10}%` }}
                />
              </div>

              {dimension.issues.length > 0 && (
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Key Issues:</p>
                  <ul className="space-y-1">
                    {dimension.issues.slice(0, 2).map((issue, idx) => (
                      <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                        <span className="text-muted-foreground mt-1">•</span>
                        <span className="flex-1">{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
