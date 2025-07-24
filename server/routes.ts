import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactSchema, type InsertContactSubmission } from "@shared/schema";

// WhatsApp notification function using a simple webhook approach
async function sendWhatsAppNotification(data: InsertContactSubmission) {
  try {
    // Format the message for WhatsApp
    const whatsappMessage = `*🎓 New Inquiry from MDKSD College Website*

*Name:* ${data.name}
*Mobile:* ${data.mobile}
*Email:* ${data.email}
*Message:* ${data.message}
*Consent:* ${data.consent ? 'Given ✅' : 'Not given ❌'}
*Date:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

Please respond to this inquiry as soon as possible.`;

    // Log the formatted message for the college admin
    console.log("📱 WhatsApp Message for +91 88308 38903:");
    console.log("=" .repeat(50));
    console.log(whatsappMessage);
    console.log("=" .repeat(50));
    
    // Create a WhatsApp Web URL that can be used programmatically
    const whatsappNumber = "918830838903";
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    console.log("🔗 WhatsApp URL generated:", whatsappURL);
    console.log("📧 Contact details:", `${data.name} - ${data.mobile} - ${data.email}`);
    
    // For a production environment with WhatsApp Business API:
    // You would need to:
    // 1. Set up WhatsApp Business API
    // 2. Get authentication token
    // 3. Make API call to send message
    // Example:
    /*
    const response = await fetch('https://graph.facebook.com/v17.0/YOUR_PHONE_NUMBER_ID/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: '918830838903',
        type: 'text',
        text: { body: whatsappMessage }
      })
    });
    */
    
    return { success: true, url: whatsappURL, message: whatsappMessage };
  } catch (error) {
    console.error("Failed to send WhatsApp notification:", error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Routes that need to be defined first (API)
  
  // Course endpoints
  // Get course by slug - MUST be defined before '/api/courses' to avoid routing conflicts
  app.get("/api/courses/:slug", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      console.log(`Fetching course with slug: ${slug}`);
      const course = await storage.getCourseBySlug(slug);
      
      if (!course) {
        console.log(`Course with slug '${slug}' not found`);
        return res.status(404).json({
          success: false,
          message: `Course with slug '${slug}' not found`
        });
      }
      
      console.log(`Course found: ${course.title}`);
      return res.status(200).json({
        success: true,
        data: course
      });
    } catch (error) {
      console.error(`Error fetching course with slug ${req.params.slug}:`, error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch course",
        error: (error as Error).message
      });
    }
  });
  
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
  
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      
      // Process WhatsApp notification
      const whatsappResult = await sendWhatsAppNotification(validatedData);
      
      res.status(201).json({ 
        success: true, 
        message: "Contact form submitted successfully", 
        data: submission,
        whatsapp: whatsappResult
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

  const httpServer = createServer(app);
  return httpServer;
}
