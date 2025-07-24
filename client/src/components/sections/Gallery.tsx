import { useEffect, useState } from "react";

// Import gallery images
import img1 from "@/assets/gallery_photos/WhatsApp Image 2024-11-06 at 3.28.42 PM.jpeg";
import img2 from "@/assets/gallery_photos/WhatsApp Image 2024-11-06 at 3.28.41 PM.jpeg";
import img3 from "@/assets/gallery_photos/WhatsApp Image 2024-10-21 at 3.01.42 PM (1).jpeg";
import img4 from "@/assets/gallery_photos/WhatsApp Image 2024-10-21 at 3.01.41 PM (2).jpeg";
import img5 from "@/assets/gallery_photos/WhatsApp Image 2024-10-21 at 3.01.41 PM (1).jpeg";
import img6 from "@/assets/gallery_photos/WhatsApp Image 2024-10-21 at 3.01.41 PM.jpeg";

const allImages = [img1, img2, img3, img4, img5, img6];

function getRandomImages(images: string[], count: number) {
  const shuffled = [...images].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function Gallery() {
  const [displayImages, setDisplayImages] = useState(() => getRandomImages(allImages, 4));

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayImages(getRandomImages(allImages, 4));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1d3557] mb-4">A Glimpse of Campus Life</h2>
          <p className="text-[#457b9d] max-w-2xl mx-auto">
            Experience our modern facilities and vibrant academic environment.
          </p>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-6 max-w-2xl mx-auto">
          {displayImages.map((src, idx) => (
            <div key={idx} className="overflow-hidden rounded-lg shadow-md group">
              <img
                src={src}
                alt={`Gallery photo ${idx + 1}`}
                className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
