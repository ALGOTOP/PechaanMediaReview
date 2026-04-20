import { z } from "zod";

// Contact / booking form submission
export const bookingSubmissionSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  about: z.string().min(10, "Please write at least 10 characters"),
  notes: z.string().optional(),
  guests: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
});

export type BookingSubmission = z.infer<typeof bookingSubmissionSchema>;

// Audit scoring dimensions
export const auditDimensionSchema = z.object({
  name: z.string(),
  score: z.number().min(0).max(10),
  description: z.string(),
  issues: z.array(z.string()),
  recommendations: z.array(z.string()),
});

export type AuditDimension = z.infer<typeof auditDimensionSchema>;

// Section analysis
export const sectionAnalysisSchema = z.object({
  name: z.string(),
  currentState: z.string(),
  issues: z.array(z.string()),
  awwardsComparison: z.string(),
  recommendations: z.array(z.string()),
});

export type SectionAnalysis = z.infer<typeof sectionAnalysisSchema>;

// Priority level for recommendations
export const priorityLevelSchema = z.enum(["quick-win", "medium-effort", "major-overhaul"]);

export type PriorityLevel = z.infer<typeof priorityLevelSchema>;

// Recommendation
export const recommendationSchema = z.object({
  title: z.string(),
  description: z.string(),
  priority: priorityLevelSchema,
  impact: z.string(),
  effort: z.string(),
  examples: z.array(z.string()),
});

export type Recommendation = z.infer<typeof recommendationSchema>;

// Full audit report
export const auditReportSchema = z.object({
  overallScore: z.number().min(0).max(100),
  dimensions: z.array(auditDimensionSchema),
  sections: z.array(sectionAnalysisSchema),
  recommendations: z.array(recommendationSchema),
  topGaps: z.array(z.string()),
  strengths: z.array(z.string()),
});

export type AuditReport = z.infer<typeof auditReportSchema>;
