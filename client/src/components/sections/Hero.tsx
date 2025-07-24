import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
// Import banner images
import img1 from "@/assets/banner_photos/30x40.jpg";
import img2 from "@/assets/banner_photos/WhatsApp Image 2024-11-14 at 1.36.23 PM.jpeg";
import img3 from "@/assets/banner_photos/DSC_6363.jpg";

interface HeroProps {
  onExploreClick: () => void;
  onContactClick: () => void;
}

export default function Hero({ onExploreClick, onContactClick }: HeroProps) {
  // Slideshow logic
  const images = [img1, img2, img3];
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const fadeTimeout = setTimeout(() => setFade(false), 3500);
    const interval = setInterval(() => {
      setFade(true);
      setCurrent((prev) => (prev + 1) % images.length);
      setTimeout(() => setFade(false), 500);
    }, 4000);
    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimeout);
    };
  }, [images.length]);

  return (
    <section id="home" className="relative bg-[#0b1a2f] min-h-[600px] flex items-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0 transition-opacity duration-700" style={{ opacity: fade ? 1 : 0.85 }}>
        <img
          src={images[current]}
          alt="College campus banner"
          className="w-full h-full object-cover transition-opacity duration-700"
          loading="eager"
        />
      </div>
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 py-24">
        <div className="max-w-3xl">
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
            Empowering Future Healthcare Leaders
          </h1>
          <p className="text-xl md:text-2xl text-[#a8c7dc] mb-8">
            Excellence in Nursing & Allied Sciences with UGC-approved programs, flexible learning modes, and hands-on clinical training.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onExploreClick}
              className="bg-[#f39c12] hover:bg-[#e67e22] text-white font-bold py-3 px-8 rounded-md text-center transition duration-300"
            >
              Explore Our Courses
            </button>
            <button
              onClick={onContactClick}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#172f4f] font-bold py-3 px-8 rounded-md text-center transition duration-300"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
