import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "https://pixabay.com/get/g8a1953bd95fe6e4bba4284e68e33124c196c5423dd4a3de45fc5b130c3203176a9a4968c2d7e46d3b3ad2e5f0ab95fa95e342d1e35e2f2be47af6827d077a07d_1280.jpg",
    alt: "Medical laboratory with students"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80",
    alt: "Nursing classroom"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80",
    alt: "Campus building"
  }
];

export default function Gallery() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = (index: number) => {
    if (index < 0) {
      setCurrentSlide(galleryImages.length - 1);
    } else if (index >= galleryImages.length) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(index);
    }
  };

  const startAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 5000);
  };

  useEffect(() => {
    startAutoSlide();
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentSlide]);

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1d3557] mb-4">A Glimpse of Campus Life</h2>
          <p className="text-[#457b9d] max-w-2xl mx-auto">
            Experience our modern facilities and vibrant academic environment.
          </p>
        </div>
        
        <div className="relative gallery-carousel">
          {/* Carousel Controls */}
          <button 
            onClick={() => {
              goToSlide(currentSlide - 1);
              startAutoSlide();
            }}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-[#1d3557] rounded-full p-2 shadow-md focus:outline-none"
            aria-label="Previous image"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-xl" />
          </button>
          
          <button 
            onClick={() => {
              goToSlide(currentSlide + 1);
              startAutoSlide();
            }}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-[#1d3557] rounded-full p-2 shadow-md focus:outline-none"
            aria-label="Next image"
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-xl" />
          </button>
          
          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {galleryImages.map((image) => (
                <div key={image.id} className="min-w-full p-2">
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="rounded-lg shadow-md w-full h-[400px] object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Carousel Indicators */}
          <div className="flex justify-center mt-6">
            {galleryImages.map((_, index) => (
              <span 
                key={index}
                onClick={() => {
                  goToSlide(index);
                  startAutoSlide();
                }}
                className={`
                  h-3 w-3 rounded-full mx-1 cursor-pointer
                  ${index === currentSlide ? 'bg-[#3c6e71]' : 'bg-gray-300'}
                `}
                aria-label={`Go to slide ${index + 1}`}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
