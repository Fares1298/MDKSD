import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      res.status(201).json({ 
        success: true, 
        message: "Contact form submitted successfully", 
        data: submission 
      });
    } catch (error) {
      console.error("Contact form submission error:", error);
      res.status(400).json({ 
        success: false, 
        message: "Invalid form data", 
        error: (error as Error).message 
      });
    }
  });

  // Course endpoints
  // Get all courses
  app.get("/api/courses", async (_req: Request, res: Response) => {
    try {
      const courses = await storage.getCourses();
      res.status(200).json({
        success: true,
        data: courses
      });
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch courses",
        error: (error as Error).message
      });
    }
  });

  // Get course by slug
  app.get("/api/courses/:slug", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const course = await storage.getCourseBySlug(slug);
      
      if (!course) {
        return res.status(404).json({
          success: false,
          message: `Course with slug '${slug}' not found`
        });
      }
      
      res.status(200).json({
        success: true,
        data: course
      });
    } catch (error) {
      console.error(`Error fetching course with slug ${req.params.slug}:`, error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch course",
        error: (error as Error).message
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
