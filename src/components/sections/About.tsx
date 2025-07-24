import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface Feature {
  id: number;
  text: string;
}

const features: Feature[] = [
  {
    id: 1,
    text: "Expert faculty with decades of clinical experience"
  },
  {
    id: 2,
    text: "State-of-the-art labs and hospital affiliations"
  },
  {
    id: 3,
    text: "Flexible on-campus, online, and correspondence options"
  }
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-[#f1faee]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1d3557] mb-6">Our Mission</h2>
            <p className="text-[#457b9d] mb-8 text-lg">
              To deliver dynamic, research-driven nursing and allied-health education that meets evolving patient needs in the 21st century.
            </p>
            
            <h3 className="font-heading font-semibold text-2xl text-[#1d3557] mb-4">Why Choose Us?</h3>
            <ul className="space-y-4">
              {features.map((feature) => (
                <li key={feature.id} className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 bg-[#3c6e71] rounded-full flex items-center justify-center mr-3 mt-1">
                    <FontAwesomeIcon icon={faCheck} className="text-xs text-white" />
                  </span>
                  <span className="text-[#457b9d]">{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="relative">
            <img 
              src="https://pixabay.com/get/gfe49b81c24e2492a924d18a832a40842bd7e2d9a4be3ebc2b3e7470080a6bde6ace7dcdc94a9962518f42ad2709db77f1653a7899b8efd9dbff160cfc09ab397_1280.jpg" 
              alt="Faculty instructing students" 
              className="rounded-lg shadow-xl w-full h-auto object-cover"
              loading="lazy"
            />
            <div className="absolute -bottom-6 -left-6 bg-[#3c6e71] text-white p-4 rounded-lg shadow-lg hidden md:block">
              <p className="font-heading font-bold">25+ Years</p>
              <p className="text-sm">of Excellence in Education</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
