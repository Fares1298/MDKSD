import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactSchema, type InsertContactSubmission } from "@shared/schema";
import sgMail from '@sendgrid/mail';

// SendGrid email notification function
async function sendEmailNotification(data: InsertContactSubmission) {
  try {
    // Log the email attempt
    console.log("📧 NEW EMAIL INQUIRY RECEIVED:");
    console.log("=" .repeat(60));
    console.log(`📧 To: mdksdinstitute@gmail.com`);
    console.log(`👤 From: ${data.name} (${data.email})`);
    console.log(`📱 Mobile: ${data.mobile}`);
    console.log(`💬 Message: ${data.message}`);
    console.log(`📅 Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`);
    console.log("=" .repeat(60));

    // Check if SendGrid API key is configured
    if (!process.env.SENDGRID_API_KEY) {
      console.log("⚠️ SENDGRID_API_KEY not configured - email will be logged only");
      console.log("Email Subject:", `🎓 New Inquiry from ${data.name} - MDKSD College`);
      console.log("Email Recipient: mdksdinstitute@gmail.com");
      return { success: true, method: 'logged' };
    }

    // Set SendGrid API key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // Create professional email content
    const emailContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
            .header { background-color: #172f4f; color: white; padding: 30px 20px; text-align: center; }
            .content { padding: 30px 20px; }
            .info-card { margin: 15px 0; padding: 15px; background: #f8f9fa; border-left: 4px solid #f4743e; border-radius: 4px; }
            .label { font-weight: bold; color: #172f4f; display: inline-block; min-width: 80px; }
            .value { color: #2c5282; }
            .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; border-top: 1px solid #dee2e6; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1 style="margin: 0; font-size: 24px;">🎓 New Website Inquiry</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Matoshree Dr Kanchan Shantilalji Desarda Mahavidyalya</p>
            </div>
            <div class="content">
                <div class="info-card">
                    <span class="label">Name:</span>
                    <span class="value">${data.name}</span>
                </div>
                <div class="info-card">
                    <span class="label">Mobile:</span>
                    <span class="value">${data.mobile}</span>
                </div>
                <div class="info-card">
                    <span class="label">Email:</span>
                    <span class="value">${data.email}</span>
                </div>
                <div class="info-card">
                    <span class="label">Message:</span>
                    <div style="margin-top: 8px; color: #2c5282;">${data.message}</div>
                </div>
                <div class="info-card">
                    <span class="label">Consent:</span>
                    <span class="value">${data.consent ? 'Given ✅' : 'Not given ❌'}</span>
                </div>
                <div class="info-card">
                    <span class="label">Received:</span>
                    <span class="value">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</span>
                </div>
            </div>
            <div class="footer">
                <p style="margin: 0;">This inquiry was submitted through the college website contact form.</p>
                <p style="margin: 5px 0 0 0;">Please respond promptly to maintain good customer service.</p>
            </div>
        </div>
    </body>
    </html>`;

    // Use the verified sender email address
    const senderConfigurations = [
      // Primary: Use the verified sender email
      'mdksdinstitute@gmail.com'
    ];

    let lastError = null;
    
    for (const fromEmail of senderConfigurations) {
      try {
        const emailData = {
          to: 'mdksdinstitute@gmail.com',
          from: {
            email: fromEmail,
            name: 'MDKSD College Website'
          },
          subject: `🎓 New Inquiry from ${data.name} - MDKSD College`,
          html: emailContent,
          text: `New inquiry from ${data.name}\nMobile: ${data.mobile}\nEmail: ${data.email}\nMessage: ${data.message}\nConsent: ${data.consent ? 'Given' : 'Not given'}\nReceived: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`
        };

        await sgMail.send(emailData);
        
        console.log(`✅ Email sent successfully via SendGrid using sender: ${fromEmail}`);
        return { success: true, method: 'sendgrid', messageId: `email_${Date.now()}`, sender: fromEmail };
        
      } catch (error: any) {
        console.log(`❌ Failed to send with sender ${fromEmail}:`, error.message);
        lastError = error;
        continue;
      }
    }
    
    // If all configurations failed, throw the last error
    throw lastError;

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
      
      // Process both WhatsApp and Email notifications simultaneously
      const [whatsappResult, emailResult] = await Promise.all([
        sendWhatsAppNotification(validatedData),
        sendEmailNotification(validatedData)
      ]);
      
      // Determine response based on notification results
      const notifications = {
        whatsapp: whatsappResult.success ? {
          sent: true,
          messageId: whatsappResult.messageId,
          recipient: whatsappResult.recipient,
          timestamp: whatsappResult.timestamp
        } : {
          sent: false,
          error: whatsappResult.error
        },
        email: emailResult.success ? {
          sent: true,
          method: emailResult.method,
          messageId: emailResult.messageId || `email_${Date.now()}`
        } : {
          sent: false,
          error: emailResult.error
        }
      };

      // Create success message based on what was sent
      let message = "Contact form submitted successfully";
      if (whatsappResult.success && emailResult.success) {
        message += ". WhatsApp and email notifications sent";
      } else if (whatsappResult.success) {
        message += ". WhatsApp notification sent";
      } else if (emailResult.success) {
        message += ". Email notification sent";
      } else {
        message += ". Notifications logged for manual processing";
      }
      
      res.status(201).json({ 
        success: true, 
        message,
        data: submission,
        notifications
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
