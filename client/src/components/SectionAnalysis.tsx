import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, TrendingUp } from "lucide-react";
import type { SectionAnalysis as SectionAnalysisType } from "@shared/schema";

interface SectionAnalysisProps {
  sections: SectionAnalysisType[];
}

export default function SectionAnalysis({ sections }: SectionAnalysisProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2" data-testid="text-section-analysis-title">
          Section-by-Section Analysis
        </h2>
        <p className="text-muted-foreground">
          Detailed breakdown of each page section compared to Awwwards winners
        </p>
      </div>

      <Tabs defaultValue={sections[0]?.name.toLowerCase().replace(/\s+/g, '-')} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 gap-2 h-auto p-1">
          {sections.map((section, index) => (
            <TabsTrigger 
              key={index} 
              value={section.name.toLowerCase().replace(/\s+/g, '-')}
              className="text-xs md:text-sm"
              data-testid={`tab-${section.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {section.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {sections.map((section, index) => (
          <TabsContent 
            key={index} 
            value={section.name.toLowerCase().replace(/\s+/g, '-')}
            className="mt-4 space-y-4"
          >
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <CardTitle className="text-xl">{section.name}</CardTitle>
                  <Badge variant="outline" className="shrink-0">
                    Current State Analysis
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">What You Have:</span>
                  </h4>
                  <p className="text-foreground">{section.currentState}</p>
                </div>

                {section.issues.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-red-600 dark:text-red-400">
                      <AlertTriangle className="w-4 h-4" />
                      Issues Identified
                    </h4>
                    <ul className="space-y-2">
                      {section.issues.map((issue, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm">
                          <span className="text-red-600 dark:text-red-400 mt-0.5">✗</span>
                          <span>{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="border-t pt-6">
                  <h4 className="font-semibold mb-2 flex items-center gap-2 text-primary">
                    <TrendingUp className="w-4 h-4" />
                    Awwwards Comparison
                  </h4>
                  <p className="text-foreground italic border-l-2 border-primary pl-4 py-2">
                    {section.awwardsComparison}
                  </p>
                </div>

                {section.recommendations.length > 0 && (
                  <div className="bg-muted/50 rounded-md p-4">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      💡 Recommendations
                    </h4>
                    <ul className="space-y-2">
                      {section.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm">
                          <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
