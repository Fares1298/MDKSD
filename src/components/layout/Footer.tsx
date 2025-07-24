import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import collegeLogo from "@/assets/college-logo.png";

const quickLinks = [
  { href: "#home", label: "Home" },
  { href: "#programs", label: "Courses" },
  { href: "#about", label: "About Us" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

const programs = [
  { href: "#", label: "Diploma in Nursing (GNM)" },
  { href: "#", label: "BSc Nursing" },
  { href: "#", label: "Diploma in Medical Lab Technology" },
  { href: "#", label: "Diploma in Physiotherapy" },
  { href: "#", label: "Diploma in Pharmacy (D.Pharm)" },
];

const accreditations = [
  { label: "UGC Approved" },
  { label: "ISO 9001:2015" },
  { label: "NAAC Accredited" },
];

const languages = [
  { value: "english", label: "English" },
  { value: "hindi", label: "Hindi" },
  { value: "marathi", label: "Marathi" },
];

const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId.substring(1));
  if (section) {
    const offsetTop = section.offsetTop - 80; // Adjust for header height
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
};

export default function Footer() {
  return (
    <footer className="bg-[#0b1a2f] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center mb-4">
              <img 
                src={collegeLogo} 
                alt="MDKSD Paramedical College Logo" 
                className="h-12 w-auto mr-3"
              />
              <h3 className="font-heading font-bold text-xl">MDKSD</h3>
            </div>
            <p className="text-[#a8c7dc] mb-4">
              Matoshree Dr Kanchan Shantilalji Desarda Mahavidyalya - Empowering Future Healthcare Leaders
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-[#f39c12] transition-colors" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="text-white hover:text-[#f39c12] transition-colors" aria-label="Twitter">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="text-white hover:text-[#f39c12] transition-colors" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="text-white hover:text-[#f39c12] transition-colors" aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-[#a8c7dc] hover:text-[#f39c12] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Programs */}
          <div>
            <h3 className="font-heading font-bold text-xl mb-4">Programs</h3>
            <ul className="space-y-2">
              {programs.map((program, index) => (
                <li key={index}>
                  <a href={program.href} className="text-[#a8c7dc] hover:text-[#f39c12] transition-colors">
                    {program.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 4: Accreditations */}
          <div>
            <h3 className="font-heading font-bold text-xl mb-4">Accreditations</h3>
            <div className="flex flex-wrap gap-4">
              {accreditations.map((accreditation, index) => (
                <span key={index} className="bg-[#172f4f] p-2 rounded text-sm">
                  {accreditation.label}
                </span>
              ))}
            </div>
            
            <div className="mt-6">
              <Select defaultValue="english">
                <SelectTrigger className="w-full bg-[#172f4f] border-[#2c5282]/40">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((language) => (
                    <SelectItem key={language.value} value={language.value}>
                      {language.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-[#2c5282]/40 mt-8 pt-8 text-center">
          <p className="text-[#a8c7dc]">
            &copy; {new Date().getFullYear()} Matoshree Dr Kanchan Shantilalji Desarda Mahavidyalya. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
