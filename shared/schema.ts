import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Contact form submissions schema
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const contactSchema = createInsertSchema(contactSubmissions).pick({
  name: true,
  email: true,
  message: true,
});

export type InsertContactSubmission = z.infer<typeof contactSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

// Courses schema
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  overview: text("overview").notNull(),
  benefits: text("benefits").array().notNull(),
  futureScope: text("future_scope").array().notNull(),
  duration: text("duration").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const courseSchema = createInsertSchema(courses).pick({
  slug: true,
  title: true,
  overview: true,
  benefits: true,
  futureScope: true,
  duration: true,
});

export type InsertCourse = z.infer<typeof courseSchema>;
export type Course = typeof courses.$inferSelect;

// Course structure for in-memory storage
export interface CourseType {
  id: number;
  slug: string;
  title: string;
  overview: string;
  benefits: string[];
  futureScope: string[];
  duration: string;
  createdAt: Date;
  updatedAt: Date;
}
