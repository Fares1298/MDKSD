import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faUserNurse, faStethoscope, faFlask, faHeartbeat, faPrescriptionBottleMedical } from "@fortawesome/free-solid-svg-icons";
import { Link } from "wouter";

interface Program {
  id: number;
  icon: IconDefinition;
  title: string;
  description: string;
  link?: string;
}

const programs: Program[] = [
  {
    id: 1,
    icon: faUserNurse,
    title: "Diploma in Nursing (GNM)",
    description: "Build foundational nursing skills with accredited clinical rotations.",
    link: "/courses/gnm"
  },
  {
    id: 2,
    icon: faStethoscope,
    title: "Bachelor of Science in Nursing (BSc)",
    description: "Advance your career with a research-focused undergraduate degree.",
    link: "/courses/bsc-nursing"
  },
  {
    id: 3,
    icon: faFlask,
    title: "Diploma in Medical Laboratory Technology",
    description: "Master lab techniques from blood analysis to microbiology.",
    link: "/courses/dmlt"
  },
  {
    id: 4,
    icon: faHeartbeat,
    title: "Diploma in Physiotherapy",
    description: "Learn patient assessment and rehabilitative therapies.",
    link: "/courses/physiotherapy"
  },
  {
    id: 5,
    icon: faPrescriptionBottleMedical,
    title: "Diploma in Pharmacy (D.Pharm)",
    description: "Train in pharmaceutical sciences, drug formulation, and patient counseling.",
    link: "/courses/dpharm"
  }
];

interface ProgramCardProps {
  program: Program;
}

function ProgramCard({ program }: ProgramCardProps) {
  return (
    <div className="bg-[#f1faff] rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
      <div className="p-6">
        <div className="w-16 h-16 bg-[#172f4f]/10 rounded-full flex items-center justify-center mb-4 mx-auto">
          <FontAwesomeIcon icon={program.icon} className="text-2xl text-[#172f4f]" />
        </div>
        <h3 className="font-heading font-semibold text-xl text-[#172f4f] text-center mb-2">{program.title}</h3>
        <p className="text-[#2c5282] text-center mb-4">{program.description}</p>
        <Link href={program.link || "#"} className="block text-center text-[#f39c12] hover:text-[#e67e22] font-medium">Learn More →</Link>
      </div>
    </div>
  );
}

export default function Programs() {
  return (
    <section id="programs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#172f4f] mb-4">Explore Our Programs</h2>
          <p className="text-[#2c5282] max-w-2xl mx-auto">
            Comprehensive healthcare education designed to prepare you for a successful career in the medical field.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.slice(0, 3).map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {programs.slice(3, 5).map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/courses" 
            className="inline-block bg-[#f39c12] hover:bg-[#e67e22] text-white font-bold py-3 px-8 rounded-md transition duration-300"
          >
            View All Courses
          </Link>
        </div>
      </div>
    </section>
  );
}
