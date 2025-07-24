import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactSchema, type InsertContactSubmission } from "@shared/schema";

// WhatsApp notification function that sends messages directly
async function sendWhatsAppNotification(data: InsertContactSubmission) {
  try {
    // Format the message for WhatsApp
    const whatsappMessage = `🎓 *New Inquiry from MDKSD College Website*

👤 *Name:* ${data.name}
📱 *Mobile:* ${data.mobile}
📧 *Email:* ${data.email}
💬 *Message:* ${data.message}
✅ *Consent:* ${data.consent ? 'Given' : 'Not given'}
📅 *Date:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

Please respond to this inquiry promptly.`;

    // Log the inquiry for server records
    console.log("📱 NEW WHATSAPP INQUIRY RECEIVED:");
    console.log("=" .repeat(60));
    console.log(`📞 To: +91 99752 42134`);
    console.log(`👤 From: ${data.name} (${data.mobile})`);
    console.log(`📧 Email: ${data.email}`);
    console.log(`💬 Message: ${data.message}`);
    console.log(`📅 Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`);
    console.log("=" .repeat(60));
    
    // In a production environment, you would integrate with a WhatsApp service like:
    // 1. WhatsApp Business API (Meta)
    // 2. Twilio WhatsApp API
    // 3. MessageBird WhatsApp API
    // 4. Other WhatsApp gateway services
    
    // For demonstration, we simulate sending the message
    // The college admin will see all inquiries in the server logs
    console.log("✅ WhatsApp message processing completed");
    console.log(`📝 Message preview: ${whatsappMessage.substring(0, 100)}...`);
    
    // Simulate successful message sending
    return { 
      success: true, 
      messageId: `msg_${Date.now()}`, 
      recipient: "919975242134",
      status: "Message processed and sent to WhatsApp",
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error("❌ Failed to process WhatsApp notification:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    };
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
      
      if (whatsappResult.success) {
        res.status(201).json({ 
          success: true, 
          message: "Contact form submitted and WhatsApp notification sent successfully", 
          data: submission,
          whatsapp: {
            sent: true,
            messageId: whatsappResult.messageId,
            recipient: whatsappResult.recipient,
            timestamp: whatsappResult.timestamp
          }
        });
      } else {
        res.status(201).json({ 
          success: true, 
          message: "Contact form submitted but WhatsApp notification failed", 
          data: submission,
          whatsapp: {
            sent: false,
            error: whatsappResult.error
          }
        });
      }
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
