import { useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Programs from "@/components/sections/Programs";
import About from "@/components/sections/About";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import { Helmet } from "react-helmet-async";

export default function Home() {
  const programsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offsetTop = section.offsetTop - 80; // Adjust for header height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const handleExploreClick = () => {
    scrollToSection('programs');
  };

  const handleContactClick = () => {
    scrollToSection('contact');
  };

  return (
    <>
      <Helmet>
        <title>Matoshree Dr Kanchan Shantilalji Desarda Mahavidyalya</title>
        <meta name="description" content="Empowering Future Healthcare Leaders with Excellence in Nursing & Allied Sciences. UGC-approved programs, flexible learning modes, and hands-on clinical training." />
        <meta name="keywords" content="nursing college, allied health education, medical education, healthcare college, Aurangabad" />
      </Helmet>
      
      <Header />
      
      <main className="pt-16">
        <Hero 
          onExploreClick={handleExploreClick} 
          onContactClick={handleContactClick}
        />
        <div ref={programsRef}>
          <Programs />
        </div>
        <About />
        <Gallery />
        <Testimonials />
        <div ref={contactRef}>
          <Contact />
        </div>
      </main>
      
      <Footer />
    </>
  );
}
