import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faClock, faEnvelope, faPhone, faDirections, faUser, faMobile, faComment, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  mobile: z.string().min(10, { message: "Mobile number must be at least 10 digits." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  consent: z.boolean().refine(val => val === true, { message: "You must agree to the terms and conditions." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      mobile: "",
      email: "",
      message: "",
      consent: false,
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Send to database and WhatsApp via API
      const response = await apiRequest("POST", "/api/contact", data);
      
      toast({
        title: "Message sent successfully!",
        description: "Your inquiry has been sent to our WhatsApp automatically. We'll contact you soon.",
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
    <section id="contact" className="py-20 bg-[#f1faff]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#172f4f] mb-8 text-center">Get in touch !</h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Your Name */}
                <div>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#172f4f] font-medium">Your Name:</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <FontAwesomeIcon icon={faUser} className="absolute left-3 top-3 text-gray-400" />
                            <Input 
                              placeholder="Name :" 
                              className="pl-10 border-gray-300 focus:border-[#172f4f] focus:ring-[#172f4f]" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Mobile No */}
                <div>
                  <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#172f4f] font-medium">Mobile No.:</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <FontAwesomeIcon icon={faMobile} className="absolute left-3 top-3 text-gray-400" />
                            <Input 
                              placeholder="Mobile No. :" 
                              className="pl-10 border-gray-300 focus:border-[#172f4f] focus:ring-[#172f4f]" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Your Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#172f4f] font-medium">Your Email:</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-3 text-gray-400" />
                        <Input 
                          placeholder="Email :" 
                          className="pl-10 border-gray-300 focus:border-[#172f4f] focus:ring-[#172f4f]" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Your Comment */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#172f4f] font-medium">Your Comment:</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <FontAwesomeIcon icon={faComment} className="absolute left-3 top-3 text-gray-400" />
                        <Textarea 
                          placeholder="Message :" 
                          className="pl-10 pt-10 min-h-[120px] border-gray-300 focus:border-[#172f4f] focus:ring-[#172f4f] resize-none" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Terms and Conditions */}
              <FormField
                control={form.control}
                name="consent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border-[#172f4f] data-[state=checked]:bg-[#172f4f]"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm text-gray-700">
                        By clicking send message,I agree to our{" "}
                        <Dialog open={isTermsOpen} onOpenChange={setIsTermsOpen}>
                          <DialogTrigger asChild>
                            <span className="text-[#172f4f] hover:underline cursor-pointer font-medium">
                              Terms & Condition
                            </span>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] p-0">
                            <DialogHeader className="p-6 pb-4">
                              <DialogTitle className="text-[#172f4f] text-xl font-bold">
                                Terms & Conditions
                              </DialogTitle>
                              <DialogDescription>
                                Please read our terms and conditions carefully before using our services.
                              </DialogDescription>
                            </DialogHeader>
                            <ScrollArea className="h-[60vh] px-6 pb-6">
                              <div className="space-y-4 text-sm text-gray-700">
                                <div>
                                  <h3 className="font-semibold text-[#172f4f] mb-2">1. Acceptance of Terms</h3>
                                  <p>By accessing and using the services of Matoshree Dr Kanchan Shantilalji Desarda Mahavidyalya, you agree to comply with and be bound by these terms and conditions.</p>
                                </div>
                                
                                <div>
                                  <h3 className="font-semibold text-[#172f4f] mb-2">2. Educational Services</h3>
                                  <p>Our institution provides nursing and paramedical education programs as approved by relevant regulatory authorities. All courses are subject to approval from respective boards and councils.</p>
                                </div>
                                
                                <div>
                                  <h3 className="font-semibold text-[#172f4f] mb-2">3. Admission Requirements</h3>
                                  <p>Admission to our programs is subject to meeting eligibility criteria, document verification, and availability of seats. The institution reserves the right to verify all submitted documents and may cancel admission if any information is found to be false or misleading.</p>
                                </div>
                                
                                <div>
                                  <h3 className="font-semibold text-[#172f4f] mb-2">4. Fees and Payment</h3>
                                  <p>All fees must be paid as per the schedule provided. Fee structure may change from time to time. Refund of fees will be governed by the institution's refund policy and applicable regulations.</p>
                                </div>
                                
                                <div>
                                  <h3 className="font-semibold text-[#172f4f] mb-2">5. Academic Standards</h3>
                                  <p>Students are expected to maintain academic standards and follow the code of conduct. The institution reserves the right to take disciplinary action against students who violate academic integrity or institutional policies.</p>
                                </div>
                                
                                <div>
                                  <h3 className="font-semibold text-[#172f4f] mb-2">6. Attendance Requirements</h3>
                                  <p>Students must maintain minimum attendance as required by the respective regulatory bodies. Failure to meet attendance requirements may result in debarment from examinations.</p>
                                </div>
                                
                                <div>
                                  <h3 className="font-semibold text-[#172f4f] mb-2">7. Communication Consent</h3>
                                  <p>By providing your contact details, you consent to receive communications from the institution regarding academic matters, events, and institutional updates through SMS, email, or other electronic means.</p>
                                </div>
                                
                                <div>
                                  <h3 className="font-semibold text-[#172f4f] mb-2">8. Limitation of Liability</h3>
                                  <p>The institution shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services or website.</p>
                                </div>
                                
                                <div>
                                  <h3 className="font-semibold text-[#172f4f] mb-2">9. Modifications</h3>
                                  <p>The institution reserves the right to modify these terms and conditions at any time. Updated terms will be posted on our website and will be effective immediately.</p>
                                </div>
                                
                                <div>
                                  <h3 className="font-semibold text-[#172f4f] mb-2">10. Governing Law</h3>
                                  <p>These terms and conditions are governed by the laws of India and subject to the jurisdiction of courts in Sambhajinagar (Aurangabad), Maharashtra.</p>
                                </div>
                                
                                <div className="border-t pt-4 mt-6">
                                  <p className="text-xs text-gray-500">
                                    Last updated: January 2025<br />
                                    For any queries regarding these terms, please contact us at mdksdinstitute@gmail.com
                                  </p>
                                </div>
                              </div>
                            </ScrollArea>
                          </DialogContent>
                        </Dialog>
                        {" "}and{" "}
                        <Dialog open={isPrivacyOpen} onOpenChange={setIsPrivacyOpen}>
                          <DialogTrigger asChild>
                            <span className="text-[#172f4f] hover:underline cursor-pointer font-medium">
                              Privacy Policy
                            </span>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] p-0">
                            <DialogHeader className="p-6 pb-4">
                              <DialogTitle className="text-[#172f4f] text-xl font-bold">
                                Privacy Policy
                              </DialogTitle>
                              <DialogDescription>
                                Learn how we collect, use, and protect your personal information.
                              </DialogDescription>
                            </DialogHeader>
                            <ScrollArea className="h-[60vh] px-6 pb-6">
                              <div className="space-y-4 text-sm text-gray-700">
                                <div>
                                  <h3 className="font-semibold text-[#172f4f] mb-2">1. Information We Collect</h3>
                                  <p>We collect personal information including name, contact details, educational background, and other relevant information necessary for admission and academic purposes.</p>
                                </div>
                                
                                <div>
                                  <h3 className="font-semibold text-[#172f4f] mb-2">2. How We Use Your Information</h3>
                                  <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Processing admissions and maintaining student records</li>
                                    <li>Academic administration and course delivery</li>
                                    <li>Communication regarding academic matters and institutional updates</li>
                                    <li>Compliance with regulatory requirements</li>
                                    <li>Improving our educational services</li>
                                  </ul>
                                </div>
                                
                                <div>
                                  <h3 className="font-semibold text-[#172f4f] mb-2">3. Information Sharing</h3>
                                  <p>We may share your information with:</p>
                                  <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Regulatory bodies and examination boards as required</li>
                                    <li>Affiliated hospitals and clinical training partners</li>
                                    <li>Third-party service providers who assist in our operations</li>
                                    <li>Legal authorities when required by law</li>
                                  </ul>
                                </div>
                                
                                <div>
                                  <h3 className="font-semibold text-[#172f4f] mb-2">4. Data Security</h3>
                                  <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
                                </div>
                                
                                <div>
                                  <h3 className="font-semibold text-[#172f4f] mb-2">5. Communication Preferences</h3>
                                  <p>By providing your contact information, you consent to receive educational and administrative communications via SMS, email, phone calls, and other electronic means.</p>
                                </div>
                                
                                <div>
                                  <h3 className="font-semibold text-[#172f4f] mb-2">6. Data Retention</h3>
                                  <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy and as required by applicable laws and regulations.</p>
                                </div>
                                
                                <div>
                                  <h3 className="font-semibold text-[#172f4f] mb-2">7. Your Rights</h3>
                                  <p>You have the right to:</p>
                                  <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Access your personal information</li>
                                    <li>Request correction of inaccurate information</li>
                                    <li>Request deletion of your information (subject to legal requirements)</li>
                                    <li>Opt-out of marketing communications</li>
                                  </ul>
                                </div>
                                
                                <div>
                                  <h3 className="font-semibold text-[#172f4f] mb-2">8. Cookies and Website Analytics</h3>
                                  <p>Our website may use cookies and similar technologies to improve user experience and analyze website usage patterns.</p>
                                </div>
                                
                                <div>
                                  <h3 className="font-semibold text-[#172f4f] mb-2">9. Third-Party Links</h3>
                                  <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites.</p>
                                </div>
                                
                                <div>
                                  <h3 className="font-semibold text-[#172f4f] mb-2">10. Policy Updates</h3>
                                  <p>We may update this privacy policy from time to time. Changes will be posted on our website with the updated date.</p>
                                </div>
                                
                                <div className="border-t pt-4 mt-6">
                                  <p className="text-xs text-gray-500">
                                    Last updated: January 2025<br />
                                    For privacy-related queries, contact us at mdksdinstitute@gmail.com<br />
                                    Address: Behind Bibika Maqbara, Hanuman Tekdi Jawal, Pahadsingpura, Sambhajinagar (Aurangabad), Maharashtra
                                  </p>
                                </div>
                              </div>
                            </ScrollArea>
                          </DialogContent>
                        </Dialog>
                        {" "}and I am giving my consent to receive updates through SMS/Email/RCS.
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="pt-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-[#172f4f] hover:bg-[#0b1a2f] text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 w-full sm:w-auto"
                >
                  {isSubmitting ? "Sending Message..." : "Send Message"}
                </Button>
                <p className="text-sm text-gray-600 mt-2">
                  Your message will be automatically sent to our WhatsApp for quick response.
                </p>
              </div>
            </form>
          </Form>
        </div>

        {/* Contact Info Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
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
          
          {/* Quick Contact Info */}
          <div className="bg-[#f1faee] p-8 rounded-lg shadow-md">
            <h3 className="font-heading font-semibold text-2xl text-[#172f4f] mb-6">Quick Contact</h3>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="text-[#172f4f] mr-3" />
                <div>
                  <p className="font-medium text-[#172f4f]">Call Us</p>
                  <a href="tel:+919405109103" className="text-[#f4743e] hover:underline">
                    +91 94051 09103
                  </a>
                  <br />
                  <a href="tel:+918830838903" className="text-[#f4743e] hover:underline">
                    +91 88308 38903
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <FontAwesomeIcon icon={faWhatsapp} className="text-[#25D366] mr-3" />
                <div className="flex-1">
                  <p className="font-medium text-[#172f4f]">WhatsApp</p>
                  <a 
                    href="https://wa.me/918830838903" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#25D366] hover:underline font-medium"
                  >
                    +91 88308 38903 (Primary)
                  </a>
                  <br />
                  <a 
                    href="https://wa.me/919405109103" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#25D366] hover:underline text-sm"
                  >
                    +91 94051 09103
                  </a>
                </div>
              </div>
              
              {/* Direct WhatsApp Chat Button */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <Button 
                  onClick={() => {
                    const whatsappNumber = "918830838903";
                    const message = "Hello! I'm interested in learning more about the courses at MDKSD College. Could you please provide me with more information?";
                    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
                    window.open(whatsappURL, '_blank');
                  }}
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 w-full flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faWhatsapp} className="mr-2" />
                  Start WhatsApp Chat
                </Button>
                <p className="text-xs text-gray-500 mt-1 text-center">
                  For immediate assistance and quick questions
                </p>
              </div>
              
              <div className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="text-[#172f4f] mr-3" />
                <div>
                  <p className="font-medium text-[#172f4f]">Email Us</p>
                  <a href="mailto:mdksdinstitute@gmail.com" className="text-[#f4743e] hover:underline">
                    mdksdinstitute@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#172f4f] mr-3 mt-1" />
                <div>
                  <p className="font-medium text-[#172f4f]">Visit Us</p>
                  <p className="text-gray-600 text-sm">
                    Behind Bibika Maqbara, Hanuman Tekdi Jawal, <br />
                    Pahadsingpura, Sambhajinagar (Aurangabad), <br />
                    Maharashtra
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
