import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { THEME_COLORS } from "@/lib/constants";
import collegeLogo from "@/assets/college-logo.png";

const navLinks = [
  { href: "#home", label: "Home", isPageLink: false },
  { href: "/courses", label: "Courses", isPageLink: true },
  { href: "#about", label: "About", isPageLink: false },
  { href: "#gallery", label: "Gallery", isPageLink: false },
  { href: "#videos", label: "Videos", isPageLink: false },
  { href: "#contact", label: "Contact", isPageLink: false },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    closeMobileMenu();
    
    // Check if we're on a course detail page or another page that's not the homepage
    const isOnHomePage = window.location.pathname === "/" || window.location.pathname === "";
    
    if (!isOnHomePage) {
      // If we're not on the homepage, navigate to the homepage first
      window.location.href = `/${sectionId}`;
      return;
    }
    
    // We're on the homepage, so scroll to the section
    const section = document.getElementById(sectionId.substring(1));
    if (section) {
      const offsetTop = section.offsetTop - 80; // Adjust for header height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`fixed w-full top-0 z-50 bg-white transition-shadow duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <img 
              src={collegeLogo} 
              alt="MDKSD Paramedical College Logo" 
              className="h-12 w-auto mr-3"
            />
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg text-[#172f4f]">MDKSD</span>
              <span className="hidden md:block text-xs text-[#2c5282]">
                Paramedical College
              </span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  if (link.isPageLink) {
                    // Let the default navigation to the page URL happen
                    return;
                  }
                  // For section links within the homepage
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-[#172f4f] hover:text-[#f39c12] font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>
          
          {/* Apply Now Button - Desktop */}
          <a 
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const isOnHomePage = window.location.pathname === "/" || window.location.pathname === "";
              
              if (!isOnHomePage) {
                window.location.href = "/#contact";
              } else {
                scrollToSection('#contact');
              }
            }}
            className="hidden md:block bg-[#f39c12] hover:bg-[#e67e22] text-white font-bold py-2 px-6 rounded-md transition duration-300"
          >
            Apply Now
          </a>
          
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden flex items-center px-3 py-2 border rounded text-[#172f4f] border-[#172f4f] hover:text-[#f39c12] hover:border-[#f39c12]"
            aria-label="Toggle menu"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div className={`md:hidden py-2 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                if (link.isPageLink) {
                  // Close mobile menu but let default navigation happen
                  closeMobileMenu();
                  return;
                }
                // For section links
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="block py-2 text-[#172f4f] hover:text-[#f39c12] font-medium"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const isOnHomePage = window.location.pathname === "/" || window.location.pathname === "";
              
              if (!isOnHomePage) {
                window.location.href = "/#contact";
              } else {
                scrollToSection('#contact');
              }
            }}
            className="block mt-2 text-center bg-[#f39c12] hover:bg-[#e67e22] text-white font-bold py-2 rounded-md transition duration-300"
          >
            Apply Now
          </a>
        </div>
      </div>
    </header>
  );
}
