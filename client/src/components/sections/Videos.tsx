import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPlayCircle, faYoutube } from "@fortawesome/free-solid-svg-icons";

interface Video {
  id: number;
  embedUrl: string;
  title: string;
  description: string;
}

const collegeVideos: Video[] = [
  {
    id: 1,
    embedUrl: "https://www.youtube.com/embed/RXmxCQBdSxc",
    title: "मातोश्री डॉ कंचन शांतिलालजी देसरडा महाविद्यालय",
    description: "Learn about our college's state-of-the-art facilities and academic programs."
  },
  {
    id: 2,
    embedUrl: "https://www.youtube.com/embed/IyLlyQ-PWnA",
    title: "जाँबगँरंटी कोर्सेस DMLT/PGDMLT/X-RAY C.T.Scan",
    description: "Explore our job-guaranteed courses in DMLT, PGDMLT, and X-Ray CT Scan technology."
  },
  {
    id: 3,
    embedUrl: "https://www.youtube.com/embed/9RUBBej1tHo",
    title: "पैरामेडिकल कोर्स के प्रवेश जारी",
    description: "Admissions are open for our paramedical courses. Learn about the application process."
  }
];

export default function Videos() {
  const [activeVideo, setActiveVideo] = useState<number>(0);
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);

  const playVideo = (index: number) => {
    setActiveVideo(index);
    if (videoRefs.current[index]) {
      videoRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="videos" className="py-20 bg-gradient-to-b from-[#f8f9fa] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <span className="w-12 h-12 rounded-full bg-[#172f4f]/10 flex items-center justify-center mr-3">
              <FontAwesomeIcon icon={faYoutube} className="text-2xl text-red-600" />
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1d3557]">College Videos</h2>
          </div>
          <p className="text-[#457b9d] max-w-2xl mx-auto">
            Experience our campus life, courses, and facilities through these informative videos.
          </p>
        </div>
        
        {/* Desktop Layout - Videos Grid */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-8">
          {collegeVideos.map((video, index) => (
            <div 
              key={video.id} 
              ref={el => videoRefs.current[index] = el}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]"
            >
              <div className="relative aspect-video">
                <iframe 
                  src={video.embedUrl}
                  title={video.title}
                  width="100%" 
                  height="100%"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                  className="absolute inset-0"
                ></iframe>
              </div>
              <div className="p-4">
                <h3 className="font-heading font-semibold text-lg text-[#1d3557] mb-2">{video.title}</h3>
                <p className="text-[#457b9d] text-sm mb-3">{video.description}</p>
                <button 
                  onClick={() => playVideo(index)} 
                  className="inline-flex items-center text-[#3c6e71] hover:text-[#1d3557] font-medium transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faPlay} className="mr-2" />
                  Watch Video
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile Layout - Featured Video with Thumbnails */}
        <div className="md:hidden">
          <div className="mb-6">
            <div className="aspect-video bg-black rounded-lg shadow-md overflow-hidden">
              <iframe 
                src={collegeVideos[activeVideo].embedUrl}
                title={collegeVideos[activeVideo].title}
                width="100%" 
                height="100%"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              ></iframe>
            </div>
            <div className="bg-white p-4 rounded-b-lg shadow-md">
              <h3 className="font-heading font-semibold text-lg text-[#1d3557] mb-2">
                {collegeVideos[activeVideo].title}
              </h3>
              <p className="text-[#457b9d] text-sm">
                {collegeVideos[activeVideo].description}
              </p>
            </div>
          </div>
          
          <h4 className="font-semibold text-[#1d3557] mb-3">More Videos</h4>
          <div className="grid grid-cols-3 gap-3">
            {collegeVideos.map((video, index) => (
              <button
                key={video.id}
                onClick={() => setActiveVideo(index)}
                className={`p-1 rounded-md ${activeVideo === index ? 'ring-2 ring-[#3c6e71]' : ''}`}
              >
                <div className="aspect-video relative bg-gray-100 rounded overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faPlayCircle}
                      className={`text-2xl ${activeVideo === index ? 'text-[#3c6e71]' : 'text-gray-400'}`}
                    />
                  </div>
                </div>
                <p className="text-xs mt-1 truncate">
                  {video.title.substring(0, 15)}...
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}