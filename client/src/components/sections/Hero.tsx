import { Button } from "@/components/ui/button";

interface HeroProps {
  onExploreClick: () => void;
  onContactClick: () => void;
}

export default function Hero({ onExploreClick, onContactClick }: HeroProps) {
  return (
    <section id="home" className="relative bg-[#1d3557] min-h-[600px] flex items-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800&q=80" 
          alt="College campus" 
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 py-24">
        <div className="max-w-3xl">
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
            Empowering Future Healthcare Leaders
          </h1>
          <p className="text-xl md:text-2xl text-[#a8dadc] mb-8">
            Excellence in Nursing & Allied Sciences with UGC-approved programs, flexible learning modes, and hands-on clinical training.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onExploreClick}
              className="bg-[#3c6e71] hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-md text-center transition duration-300"
            >
              Explore Our Courses
            </button>
            <button
              onClick={onContactClick}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#1d3557] font-bold py-3 px-8 rounded-md text-center transition duration-300"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
