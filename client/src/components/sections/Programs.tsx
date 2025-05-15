import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faUserNurse, faStethoscope, faFlask, faHeartbeat } from "@fortawesome/free-solid-svg-icons";

interface Program {
  id: number;
  icon: IconDefinition;
  title: string;
  description: string;
}

const programs: Program[] = [
  {
    id: 1,
    icon: faUserNurse,
    title: "Diploma in Nursing (GNM)",
    description: "Build foundational nursing skills with accredited clinical rotations."
  },
  {
    id: 2,
    icon: faStethoscope,
    title: "Bachelor of Science in Nursing (BSc Nursing)",
    description: "Advance your career with a research-focused undergraduate degree."
  },
  {
    id: 3,
    icon: faFlask,
    title: "Diploma in Medical Laboratory Technology (DMLT)",
    description: "Master lab techniques from blood analysis to microbiology."
  },
  {
    id: 4,
    icon: faHeartbeat,
    title: "Diploma in Physiotherapy",
    description: "Learn patient assessment and rehabilitative therapies."
  }
];

interface ProgramCardProps {
  program: Program;
}

function ProgramCard({ program }: ProgramCardProps) {
  return (
    <div className="bg-[#f1faee] rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
      <div className="p-6">
        <div className="w-16 h-16 bg-[#3c6e71]/10 rounded-full flex items-center justify-center mb-4 mx-auto">
          <FontAwesomeIcon icon={program.icon} className="text-2xl text-[#3c6e71]" />
        </div>
        <h3 className="font-heading font-semibold text-xl text-[#1d3557] text-center mb-2">{program.title}</h3>
        <p className="text-[#457b9d] text-center mb-4">{program.description}</p>
        <a href="#" className="block text-center text-[#3c6e71] hover:text-[#1d3557] font-medium">Learn More →</a>
      </div>
    </div>
  );
}

export default function Programs() {
  return (
    <section id="programs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1d3557] mb-4">Explore Our Programs</h2>
          <p className="text-[#457b9d] max-w-2xl mx-auto">
            Comprehensive healthcare education designed to prepare you for a successful career in the medical field.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="#" 
            className="inline-block bg-[#3c6e71] hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-md transition duration-300"
          >
            View All Courses
          </a>
        </div>
      </div>
    </section>
  );
}
