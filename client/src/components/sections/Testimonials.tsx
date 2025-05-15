import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface Testimonial {
  id: number;
  text: string;
  name: string;
  title: string;
  initial: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "Desarda College's hands-on training prepared me for real-world nursing challenges.",
    name: "Alumni",
    title: "Class of 2023",
    initial: "A"
  },
  {
    id: 2,
    text: "The faculty's mentorship and state-of-the-art labs were instrumental in my success.",
    name: "Current Student",
    title: "Physiotherapy Program",
    initial: "S"
  },
  {
    id: 3,
    text: "The clinical rotations provided valuable real-world experience that employers notice.",
    name: "Recent Graduate",
    title: "BSc Nursing",
    initial: "P"
  }
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="testimonial-slide min-w-[320px] md:min-w-[400px] flex-1 bg-white rounded-lg shadow-lg p-8 text-[#1d3557]">
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400" />
        ))}
      </div>
      <p className="italic mb-6 text-[#457b9d]">"{testimonial.text}"</p>
      <div className="flex items-center">
        <div className="w-12 h-12 bg-[#1d3557]/20 rounded-full flex items-center justify-center mr-4">
          <span className="text-[#1d3557] font-bold">{testimonial.initial}</span>
        </div>
        <div>
          <p className="font-bold text-[#1d3557]">{testimonial.name}</p>
          <p className="text-sm text-[#457b9d]">{testimonial.title}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const startAutoRotate = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
  };
  
  useEffect(() => {
    startAutoRotate();
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    startAutoRotate();
  };

  return (
    <section className="py-20 bg-[#3c6e71] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">Student Success Stories</h2>
          <p className="text-[#a8dadc] max-w-2xl mx-auto">
            Hear what our alumni and current students have to say about their experience.
          </p>
        </div>
        
        <div className="relative testimonial-carousel">
          <div className="overflow-x-auto pb-12 hide-scrollbar">
            <div className="flex gap-8 w-full testimonial-wrapper overflow-hidden">
              {/* Desktop View: Show multiple cards */}
              <div className="hidden md:flex gap-8 w-full">
                {testimonials.map((testimonial) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
              </div>
              
              {/* Mobile View: Show single card with transition */}
              <div 
                className="md:hidden flex transition-transform duration-500 ease-in-out w-full"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="min-w-full">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Testimonial Navigation Dots (only for mobile) */}
          <div className="flex justify-center mt-6 md:hidden">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full mx-1 focus:outline-none ${
                  index === activeIndex ? "bg-white" : "bg-white/40"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
