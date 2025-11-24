import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Target, Rocket, ChevronRight } from "lucide-react";
import type { Recommendation } from "@shared/schema";

interface RecommendationsListProps {
  recommendations: Recommendation[];
}

export default function RecommendationsList({ recommendations }: RecommendationsListProps) {
  const quickWins = recommendations.filter(r => r.priority === "quick-win");
  const mediumEffort = recommendations.filter(r => r.priority === "medium-effort");
  const majorOverhauls = recommendations.filter(r => r.priority === "major-overhaul");

  const PriorityIcon = ({ priority }: { priority: string }) => {
    switch (priority) {
      case "quick-win":
        return <Zap className="w-4 h-4" />;
      case "medium-effort":
        return <Target className="w-4 h-4" />;
      case "major-overhaul":
        return <Rocket className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "quick-win":
        return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20";
      case "medium-effort":
        return "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20";
      case "major-overhaul":
        return "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20";
      default:
        return "";
    }
  };

  const RecommendationCard = ({ rec, index }: { rec: Recommendation; index: number }) => (
    <Card className="hover-elevate" data-testid={`card-recommendation-${index}`}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <PriorityIcon priority={rec.priority} />
            {rec.title}
          </CardTitle>
          <Badge variant="outline" className={`shrink-0 ${getPriorityColor(rec.priority)}`}>
            {rec.priority.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground">{rec.description}</p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">Impact</p>
            <p className="text-sm font-semibold">{rec.impact}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">Effort</p>
            <p className="text-sm font-semibold">{rec.effort}</p>
          </div>
        </div>

        {rec.examples.length > 0 && (
          <div className="border-t pt-4">
            <p className="text-xs font-medium text-muted-foreground mb-2">Examples from Award Winners:</p>
            <ul className="space-y-1">
              {rec.examples.map((example, idx) => (
                <li key={idx} className="text-sm flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{example}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2" data-testid="text-recommendations-title">
          Actionable Recommendations
        </h2>
        <p className="text-muted-foreground">
          Prioritized improvements organized by effort and impact
        </p>
      </div>

      <Tabs defaultValue="quick-wins" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-auto p-1">
          <TabsTrigger value="quick-wins" className="gap-2" data-testid="tab-quick-wins">
            <Zap className="w-4 h-4" />
            <span className="hidden sm:inline">Quick Wins</span>
            <span className="sm:hidden">Quick</span>
            <Badge variant="secondary" className="ml-1">{quickWins.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="medium-effort" className="gap-2" data-testid="tab-medium-effort">
            <Target className="w-4 h-4" />
            <span className="hidden sm:inline">Medium Effort</span>
            <span className="sm:hidden">Medium</span>
            <Badge variant="secondary" className="ml-1">{mediumEffort.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="major-overhauls" className="gap-2" data-testid="tab-major-overhauls">
            <Rocket className="w-4 h-4" />
            <span className="hidden sm:inline">Major Overhauls</span>
            <span className="sm:hidden">Major</span>
            <Badge variant="secondary" className="ml-1">{majorOverhauls.length}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="quick-wins" className="mt-4 space-y-4">
          {quickWins.map((rec, index) => (
            <RecommendationCard key={index} rec={rec} index={index} />
          ))}
        </TabsContent>

        <TabsContent value="medium-effort" className="mt-4 space-y-4">
          {mediumEffort.map((rec, index) => (
            <RecommendationCard key={index} rec={rec} index={index} />
          ))}
        </TabsContent>

        <TabsContent value="major-overhauls" className="mt-4 space-y-4">
          {majorOverhauls.map((rec, index) => (
            <RecommendationCard key={index} rec={rec} index={index} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
