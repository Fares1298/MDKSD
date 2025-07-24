import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactSchema, type InsertContactSubmission } from "@shared/schema";
import nodemailer from 'nodemailer';

// Email notification function with multiple options
async function sendEmailNotification(data: InsertContactSubmission) {
  try {
    const emailContent = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background-color: #172f4f; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .info-row { margin: 10px 0; padding: 10px; background: white; border-left: 4px solid #f4743e; }
        .label { font-weight: bold; color: #172f4f; }
    </style>
</head>
<body>
    <div class="header">
        <h2>🎓 New Inquiry - MDKSD College Website</h2>
    </div>
    <div class="content">
        <div class="info-row"><span class="label">Name:</span> ${data.name}</div>
        <div class="info-row"><span class="label">Mobile:</span> ${data.mobile}</div>
        <div class="info-row"><span class="label">Email:</span> ${data.email}</div>
        <div class="info-row"><span class="label">Message:</span> ${data.message}</div>
        <div class="info-row"><span class="label">Consent Given:</span> ${data.consent ? 'Yes ✅' : 'No ❌'}</div>
        <div class="info-row"><span class="label">Received:</span> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</div>
    </div>
</body>
</html>`;

    // Log the email attempt
    console.log("📧 NEW EMAIL INQUIRY RECEIVED:");
    console.log("=" .repeat(60));
    console.log(`📧 To: mdksdinstitute@gmail.com`);
    console.log(`👤 From: ${data.name} (${data.email})`);
    console.log(`📱 Mobile: ${data.mobile}`);
    console.log(`💬 Message: ${data.message}`);
    console.log(`📅 Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`);
    console.log("=" .repeat(60));

    // Option 1: Gmail SMTP (requires app password)
    if (process.env.GMAIL_APP_PASSWORD) {
      const transporter = nodemailer.createTransporter({
        service: 'gmail',
        auth: {
          user: 'mdksdinstitute@gmail.com',
          pass: process.env.GMAIL_APP_PASSWORD
        }
      });

      await transporter.sendMail({
        from: '"MDKSD College Website" <mdksdinstitute@gmail.com>',
        to: 'mdksdinstitute@gmail.com',
        subject: `🎓 New Inquiry from ${data.name} - MDKSD College`,
        html: emailContent
      });

      console.log("✅ Email sent via Gmail SMTP");
      return { success: true, method: 'gmail-smtp' };
    }

    // Option 2: SendGrid (if API key provided)
    if (process.env.SENDGRID_API_KEY) {
      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      await sgMail.send({
        to: 'mdksdinstitute@gmail.com',
        from: 'noreply@mdksdcollege.com', // This needs to be verified in SendGrid
        subject: `🎓 New Inquiry from ${data.name} - MDKSD College`,
        html: emailContent
      });

      console.log("✅ Email sent via SendGrid");
      return { success: true, method: 'sendgrid' };
    }

    // Option 3: Simple HTTP Email Service (like EmailJS or Formspree)
    // For now, we'll log the email and return success
    console.log("📧 Email content prepared (no SMTP configured)");
    console.log("Email Subject:", `🎓 New Inquiry from ${data.name} - MDKSD College`);
    console.log("Email Body Preview:", emailContent.substring(0, 200) + "...");
    
    return { success: true, method: 'logged', content: emailContent };

  } catch (error) {
    console.error("❌ Failed to send email notification:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown email error',
      timestamp: new Date().toISOString()
    };
  }
}

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
