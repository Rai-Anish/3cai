import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, integer, jsonb, index } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const resumeAnalysis = pgTable(
  "resume_analysis",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),

    title: text("title").default("Untitled resume"),
    fileName: text("file_name"),
    fileUrl: text("file_url"),
    cloudinaryPublicId: text("cloudinary_public_id"),

    targetRole: text("target_role"),
    jobDescription: text("job_description"),

    originalText: text("original_text"),
    editedText: text("edited_text"),

    score: integer("score"),
    analysis: jsonb("analysis").default({}),
    status: text("status", {
      enum: ["pending", "processing", "completed", "failed"],
    }).default("pending").notNull(),

    model: text("model").default("gemini"),
    error: text("error"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
  },
  (table) => [
    index("resume_analysis_userId_idx").on(table.userId),
    index("resume_analysis_status_idx").on(table.status),
  ],
);

export const resumeAnalysisRelations = relations(resumeAnalysis, ({ one }) => ({
  user: one(user, {
    fields: [resumeAnalysis.userId],
    references: [user.id],
  }),
}));
