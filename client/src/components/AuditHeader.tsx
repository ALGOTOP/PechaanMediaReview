import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";

interface AuditHeaderProps {
  overallScore: number;
  onExport?: () => void;
}

export default function AuditHeader({ overallScore, onExport }: AuditHeaderProps) {
  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-green-600 dark:text-green-400";
    if (score >= 50) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 75) return "Good Foundation";
    if (score >= 50) return "Needs Improvement";
    return "Significant Gaps";
  };

  return (
    <div className="border-b bg-card">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight" data-testid="text-audit-title">
                Pehchaan Media Website Audit
              </h1>
              <Badge variant="secondary" className="text-xs">
                vs. Awwwards 2025 Winners
              </Badge>
            </div>
            <p className="text-muted-foreground text-base max-w-2xl">
              A brutally honest, comprehensive analysis comparing your portfolio against the top 5 Awwwards 2025 winners
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4">
            <div className="flex flex-col items-start md:items-end gap-1">
              <span className="text-sm text-muted-foreground font-medium">Overall Score</span>
              <div className="flex items-baseline gap-2">
                <span className={`text-5xl font-bold ${getScoreColor(overallScore)}`} data-testid="text-overall-score">
                  {overallScore}
                </span>
                <span className="text-2xl text-muted-foreground font-medium">/100</span>
              </div>
              <Badge variant="outline" className="mt-1">
                {getScoreLabel(overallScore)}
              </Badge>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={onExport}
                data-testid="button-export"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                data-testid="button-share"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
