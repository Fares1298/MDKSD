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
    text: "MDKSD College ने मला nursing field मध्ये एक successful career बनवायला मदत केली. येथील practical training अतिशय उत्तम आहे आणि faculty खूप supportive आहे.",
    name: "Priya Patil",
    title: "GNM Graduate 2023, Currently working at Sahyadri Hospital",
    initial: "P"
  },
  {
    id: 2,
    text: "मी येथे DMLT course केला आहे. College चे lab facilities खूप चांगले आहेत आणि placement assistance पण उत्तम मिळाली. आता मी एका reputed lab मध्ये काम करतोय.",
    name: "Rohit Deshmukh", 
    title: "DMLT Graduate 2022, Lab Technician at Path Labs",
    initial: "R"
  },
  {
    id: 3,
    text: "Physiotherapy course during करताना मला येथील experienced faculty कडून खूप काही शिकायला मिळालं. Clinical exposure पण खूप चांगलं होतं. Highly recommended college!",
    name: "Sneha Bhosale",
    title: "BPT Student, Final Year",
    initial: "S"
  },
  {
    id: 4,
    text: "MDKSD मध्ये B.Sc Nursing करून मी आता Pune मधील एका मोठ्या hospital मध्ये Staff Nurse म्हणून काम करतेय. College ने माझ्या career ला एक नवी दिशा दिली.",
    name: "Akash Jadhav",
    title: "B.Sc Nursing Graduate 2021, Staff Nurse at Ruby Hall Clinic",
    initial: "A"
  },
  {
    id: 5,
    text: "D.Pharm course येथे करून मी आता स्वतःचं medical store चालवतोय. College मधील pharmacy practical sessions खूप helpful होते. Faculty सुद्धा खूप cooperative आहे.",
    name: "Manjusha Kale",
    title: "D.Pharm Graduate 2020, Pharmacy Owner",
    initial: "M"
  },
  {
    id: 6,
    text: "मी DCCN course केला आहे MDKSD मध्ये. Critical care nursing मध्ये specialization मिळाल्यामुळे मला ICU मध्ये job मिळाली. College चे infrastructure खूप modern आहे.",
    name: "Vaishali Shinde",
    title: "DCCN Graduate 2023, ICU Nurse at Government Medical College",
    initial: "V"
  }
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="testimonial-slide min-w-[320px] md:min-w-[400px] flex-1 bg-white rounded-lg shadow-lg p-6 text-[#1d3557] h-auto">
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400 text-sm" />
        ))}
      </div>
      <p className="italic mb-6 text-[#457b9d] text-sm leading-relaxed">"{testimonial.text}"</p>
      <div className="flex items-start">
        <div className="w-12 h-12 bg-[#172f4f] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white font-bold text-lg">{testimonial.initial}</span>
        </div>
        <div className="flex-1">
          <p className="font-bold text-[#172f4f] mb-1">{testimonial.name}</p>
          <p className="text-xs text-[#457b9d] leading-tight">{testimonial.title}</p>
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
          {/* Desktop View: Show 3 cards at a time in a scrollable grid */}
          <div className="hidden md:block">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.slice(0, 6).map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
          
          {/* Mobile View: Show single card with transition */}
          <div className="md:hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="min-w-full px-4">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
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
