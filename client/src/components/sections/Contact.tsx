import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faClock, faEnvelope, faPhone, faDirections } from "@fortawesome/free-solid-svg-icons";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/contact", data);
      
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
        variant: "default",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "Your message couldn't be sent. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1d3557] mb-4">Contact Us</h2>
          <p className="text-[#457b9d] max-w-2xl mx-auto">
            Have questions? We're here to help you take the next step in your healthcare education journey.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <div className="bg-[#f1faee] p-8 rounded-lg shadow-md mb-8">
              <h3 className="font-heading font-semibold text-2xl text-[#1d3557] mb-6">Visit Us</h3>
              
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#3c6e71]/10 flex items-center justify-center mr-4">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#3c6e71]" />
                </div>
                <div>
                  <p className="text-[#457b9d]">Behind Bibi Ka Maqbara,</p>
                  <p className="text-[#457b9d]">Aurangabad-431001</p>
                </div>
              </div>
              
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#3c6e71]/10 flex items-center justify-center mr-4">
                  <FontAwesomeIcon icon={faClock} className="text-[#3c6e71]" />
                </div>
                <div>
                  <p className="text-[#457b9d]">Hours:</p>
                  <p className="text-[#457b9d]">Mon–Sun, 10 AM–6:30 PM</p>
                </div>
              </div>
              
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#3c6e71]/10 flex items-center justify-center mr-4">
                  <FontAwesomeIcon icon={faEnvelope} className="text-[#3c6e71]" />
                </div>
                <div>
                  <p className="text-[#457b9d]">Email:</p>
                  <a href="mailto:mdksdinstitute@gmail.com" className="text-[#3c6e71] hover:text-[#1d3557]">
                    mdksdinstitute@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#3c6e71]/10 flex items-center justify-center mr-4">
                  <FontAwesomeIcon icon={faPhone} className="text-[#3c6e71]" />
                </div>
                <div>
                  <p className="text-[#457b9d]">Phone:</p>
                  <a href="tel:+919405109103" className="text-[#3c6e71] hover:text-[#1d3557]">
                    +91 94051 09103
                  </a>
                </div>
              </div>
            </div>
            
            {/* Map */}
            <div className="rounded-lg shadow-md overflow-hidden">
              <div className="h-[300px] relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m24!1m12!1m3!1d29982.8941943432!2d75.31979945723444!3d19.873634249999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m9!3e0!4m3!3m2!1d19.8806642!2d75.3560346!4m3!3m2!1d19.865258299999998!2d75.317125!5e0!3m2!1sen!2sin!4v1747294257!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="bg-gradient-to-r from-[#f1faee] to-[#edf6f6] p-4 text-center">
                <a 
                  href="https://www.google.com/maps/dir/19.8806642,75.3560346/19.8652583,75.317125/@19.8736343,75.2947972,13z/data=!3m1!4b1!4m4!4m3!1m1!4e1!1m0?entry=ttu&g_ep=EgoyMDI1MDUxMi4wIKXMDSoASAFQAw%3D%3D" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#457b9d] bg-[#3c6e71]/10 hover:bg-[#3c6e71]/20 px-4 py-2 rounded-md transition-colors duration-200 font-medium"
                >
                  <FontAwesomeIcon icon={faDirections} className="mr-2 text-[#3c6e71]" />
                  Get Directions to Campus
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div id="apply" className="bg-[#f1faee] p-8 rounded-lg shadow-md">
            <h3 className="font-heading font-semibold text-2xl text-[#1d3557] mb-6">Send Us a Message</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#457b9d]">Full Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your Name" 
                          className="px-4 py-3 border-gray-300 focus:ring-[#3c6e71] focus:border-[#3c6e71]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#457b9d]">Email Address</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="you@example.com" 
                          className="px-4 py-3 border-gray-300 focus:ring-[#3c6e71] focus:border-[#3c6e71]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#457b9d]">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Your questions or comments..." 
                          className="px-4 py-3 border-gray-300 focus:ring-[#3c6e71] focus:border-[#3c6e71]"
                          rows={4}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-[#e63946] hover:bg-red-700 text-white font-bold py-3 rounded-md transition duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit & Schedule a Tour"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
