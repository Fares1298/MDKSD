import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#programs", label: "Courses" },
  { href: "#about", label: "About" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
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
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <span className="font-heading font-bold text-xl text-[#1d3557]">MD</span>
            <span className="hidden md:block ml-2 text-sm text-[#457b9d]">
              Matoshree Dr Kanchan Shantilalji Desarda Mahavidyalya
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-[#1d3557] hover:text-[#3c6e71] font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>
          
          {/* Apply Now Button - Desktop */}
          <a 
            href="#apply"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#apply');
            }}
            className="hidden md:block bg-[#e63946] hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md transition duration-300"
          >
            Apply Now
          </a>
          
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden flex items-center px-3 py-2 border rounded text-[#457b9d] border-[#457b9d] hover:text-[#3c6e71] hover:border-[#3c6e71]"
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
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="block py-2 text-[#1d3557] hover:text-[#3c6e71] font-medium"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#apply"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#apply');
            }}
            className="block mt-2 text-center bg-[#e63946] hover:bg-red-700 text-white font-bold py-2 rounded-md transition duration-300"
          >
            Apply Now
          </a>
        </div>
      </div>
    </header>
  );
}
