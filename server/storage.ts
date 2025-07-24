import { 
  users, type User, type InsertUser,
  contactSubmissions, type ContactSubmission, type InsertContactSubmission,
  type CourseType
} from "@shared/schema";

// Storage interface for CRUD operations
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact form submissions
  getContactSubmissions(): Promise<ContactSubmission[]>;
  getContactSubmission(id: number): Promise<ContactSubmission | undefined>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  
  // Course methods
  getCourses(): Promise<CourseType[]>;
  getCourse(id: number): Promise<CourseType | undefined>;
  getCourseBySlug(slug: string): Promise<CourseType | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contacts: Map<number, ContactSubmission>;
  private courses: Map<number, CourseType>;
  private userCurrentId: number;
  private contactCurrentId: number;
  private courseCurrentId: number;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.courses = new Map();
    this.userCurrentId = 1;
    this.contactCurrentId = 1;
    this.courseCurrentId = 1;
    
    // Initialize with course data
    this.initializeCourses();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Contact form submission methods
  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contacts.values());
  }

  async getContactSubmission(id: number): Promise<ContactSubmission | undefined> {
    return this.contacts.get(id);
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.contactCurrentId++;
    const timestamp = new Date();
    
    const submission: ContactSubmission = {
      ...insertSubmission,
      id,
      createdAt: timestamp
    };
    
    this.contacts.set(id, submission);
    console.log(`New contact form submission: ${JSON.stringify(submission)}`);
    return submission;
  }
  
  // Course methods
  async getCourses(): Promise<CourseType[]> {
    return Array.from(this.courses.values());
  }
  
  async getCourse(id: number): Promise<CourseType | undefined> {
    return this.courses.get(id);
  }
  
  async getCourseBySlug(slug: string): Promise<CourseType | undefined> {
    return Array.from(this.courses.values()).find(
      (course) => course.slug === slug
    );
  }
  
  // Initialize courses with data
  private initializeCourses() {
    const courseData: Omit<CourseType, 'id' | 'createdAt' | 'updatedAt'>[] = [
      {
        slug: "dpharm",
        title: "Diploma in Pharmacy (D. Pharm)",
        duration: "2 years",
        overview: "A two-year, UGC-approved program that trains you in pharmaceutical sciences, drug formulation, dispensing practices, and patient counseling.",
        benefits: [
          "Foundational grounding in pharmacology and pharmaceutics—ideal for roles in retail and hospital pharmacies.", 
          "Eligibility to register as a \"Pharmacist\" under the Pharmacy Act, 1948."
        ],
        futureScope: [
          "Work as a hospital pharmacist, community pharmacist, or in clinical research organizations (CROs).",
          "Higher studies: B.Pharm, M.Pharm, MBA in Pharmaceutical Management, or specialization in clinical research."
        ],
        imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=400&auto=format&fit=crop"
      },
      {
        slug: "bsc-nursing",
        title: "Basic Bachelor of Science in Nursing (BSc Nursing)",
        duration: "4 years",
        overview: "A four-year degree that combines rigorous theoretical instruction with hands-on clinical training across departments such as medical-surgical, pediatric, psychiatric, and community health nursing.",
        benefits: [
          "Eligibility to become a Registered Nurse (RN) in India and abroad.",
          "Exposure to diverse specialties—critical care, emergency, maternity, and community health."
        ],
        futureScope: [
          "Pursue MSc Nursing (Medical-Surgical, Pediatric, Public Health) or specialized diplomas (Critical Care, Oncology, Mental Health).",
          "Career roles include Nurse Educator, Nurse Administrator, Clinical Instructor, and opportunities in research and policy."
        ],
        imageUrl: "https://images.unsplash.com/photo-1631815587646-b85a1bb027e1?q=80&w=400&auto=format&fit=crop"
      },
      {
        slug: "gnm",
        title: "Diploma in General Nursing & Midwifery (GNM)",
        duration: "3 years",
        overview: "A three-year full-time diploma that covers fundamentals of nursing, midwifery, anatomy, physiology, and community health, with extensive clinical rotations.",
        benefits: [
          "Quick entry into the workforce as a Staff Nurse or Midwife.",
          "Strong hands-on exposure to obstetrics, pediatric, and geriatric nursing."
        ],
        futureScope: [
          "Upgradable to BSc Nursing via lateral entry.",
          "Roles in government hospitals, private clinics, NGOs, forensics, and defence services."
        ],
        imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=400&auto=format&fit=crop"
      },
      {
        slug: "dccn",
        title: "Diploma in Critical Care Nursing (DCCN)",
        duration: "1-3 years",
        overview: "A one-year diploma (up to 3-year duration) designed to equip nurses with skills for managing critically ill patients in ICU and emergency settings.",
        benefits: [
          "Advanced training in ventilator management, hemodynamic monitoring, and life-support protocols.",
          "Hands-on clinical postings in reputed hospital ICUs."
        ],
        futureScope: [
          "High demand for Critical Care Nurses in tertiary hospitals and specialized centres.",
          "Pathway to postgraduate studies: MSc in Critical Care Nursing or PG Diploma in Emergency Nursing."
        ],
        imageUrl: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=400&auto=format&fit=crop"
      },
      {
        slug: "dmlt",
        title: "Diploma in Medical Laboratory Technology (DMLT)",
        duration: "2 years",
        overview: "A two-year course teaching laboratory techniques in hematology, microbiology, clinical biochemistry, and immunology, with practical sessions on automated analyzers.",
        benefits: [
          "Proficiency in sample collection, slide preparation, and operating diagnostic equipment.",
          "Immediate employability in diagnostic labs, hospitals, and blood banks."
        ],
        futureScope: [
          "Roles as Lab Technician, Lab Supervisor, Quality Control Analyst.",
          "Further studies: BSc MLT, MSc in Medical Laboratory Technology, or specialized certifications."
        ],
        imageUrl: "https://images.unsplash.com/photo-1581093196277-9f6e9b82d000?q=80&w=400&auto=format&fit=crop"
      },
      {
        slug: "physiotherapy",
        title: "Diploma in Physiotherapy (DPT / Diploma PTA)",
        duration: "2 years",
        overview: "A two-year program covering musculoskeletal, neurological, and cardiopulmonary rehabilitation techniques, plus modalities like electrotherapy and manual therapy.",
        benefits: [
          "Hands-on training in therapeutic exercises, mobilization, and patient assessment.",
          "Exposure to sports physiotherapy, geriatric care, and pediatric rehabilitation."
        ],
        futureScope: [
          "Employment in hospitals, sports academies, rehabilitation centres, and private practice.",
          "Pathway to BPT, MPT, and specializations in cardio-respiratory or neuro-physiotherapy."
        ],
        imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=400&auto=format&fit=crop"
      },
      {
        slug: "paramedical-cosmetology",
        title: "Diploma in Paramedical Cosmetology",
        duration: "1 year",
        overview: "A one-year diploma blending dermatology fundamentals with aesthetic procedures—skin analysis, facial therapies, hair and nail treatments.",
        benefits: [
          "Practical mastery of non-invasive cosmetic technologies and patient counseling.",
          "Certification to work in beauty clinics, dermatology labs, and wellness centres."
        ],
        futureScope: [
          "Career options as Cosmetology Technician, Skin Care Specialist, or Salon Manager.",
          "Further credentials: Advanced Diploma in Laser Therapy, PG Diploma in Medical Aesthetics."
        ],
        imageUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=400&auto=format&fit=crop"
      },
      {
        slug: "pgdmlt",
        title: "Postgraduate Diploma in Medical Laboratory Technology (PGDMLT)",
        duration: "1.5 years",
        overview: "An advanced postgraduate program for B.Sc graduates focusing on specialized laboratory techniques and management skills in medical diagnostics.",
        benefits: [
          "Advanced training in specialized laboratory equipment and techniques",
          "Management skills for laboratory supervision and quality control",
          "Research methodology in medical laboratory sciences",
          "Eligibility for senior laboratory positions"
        ],
        futureScope: [
          "Senior Medical Laboratory Technologist in hospitals and diagnostic centers",
          "Laboratory supervisor and quality control manager",
          "Research opportunities in clinical laboratories",
          "Academic positions in paramedical colleges"
        ],
        imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=400&auto=format&fit=crop"
      },
      {
        slug: "xray-technician",
        title: "X-Ray Technician Course",
        duration: "1 year",
        overview: "A specialized one-year program training students in X-ray imaging techniques, radiation safety, and diagnostic imaging procedures.",
        benefits: [
          "Hands-on training with modern X-ray equipment",
          "Understanding of radiation safety protocols",
          "Patient positioning and imaging techniques",
          "Government recognized certification"
        ],
        futureScope: [
          "X-Ray Technician in hospitals and diagnostic centers",
          "Opportunities in mobile X-ray services",
          "Career advancement to senior imaging roles",
          "Government and semi-government job opportunities"
        ],
        imageUrl: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=400&auto=format&fit=crop"
      },
      {
        slug: "ct-scan-technician",
        title: "C.T. Scan Technician Course",
        duration: "1 year",
        overview: "A comprehensive program focused on CT imaging technology, cross-sectional anatomy, and advanced diagnostic imaging techniques.",
        benefits: [
          "Specialized training in CT scan operations",
          "Knowledge of cross-sectional anatomy",
          "Patient care during CT procedures",
          "High-demand technical skills"
        ],
        futureScope: [
          "CT Scan Technician in hospitals and imaging centers",
          "Specialized roles in emergency departments",
          "Career progression to lead technician positions",
          "Opportunities in private diagnostic chains"
        ],
        imageUrl: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=400&auto=format&fit=crop"
      },
      {
        slug: "ecg-technician",
        title: "E.C.G Technician Course",
        duration: "1 year",
        overview: "A focused program on electrocardiography techniques, heart rhythm analysis, and cardiovascular diagnostic procedures.",
        benefits: [
          "Expertise in ECG machine operation and maintenance",
          "Understanding of cardiac rhythms and abnormalities",
          "Patient preparation and procedure techniques",
          "Essential healthcare skill with high demand"
        ],
        futureScope: [
          "ECG Technician in hospitals and cardiac care units",
          "Opportunities in cardiac diagnostic centers",
          "Roles in emergency medical services",
          "Career advancement to cardiac care specialization"
        ],
        imageUrl: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=400&auto=format&fit=crop"
      },
      {
        slug: "ot-technician",
        title: "O.T. Technician (Operation Theatre)",
        duration: "2 years",
        overview: "A comprehensive two-year program training students in operation theatre procedures, surgical assistance, and sterile techniques.",
        benefits: [
          "Training in surgical instruments and equipment",
          "Sterile technique and infection control protocols",
          "Assistance in various surgical procedures",
          "Critical healthcare role with job security"
        ],
        futureScope: [
          "Operation Theatre Technician in hospitals",
          "Surgical assistant roles in specialty departments",
          "Opportunities in day care surgical centers",
          "Career advancement to OT supervisor positions"
        ],
        imageUrl: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?q=80&w=400&auto=format&fit=crop"
      },
      {
        slug: "pg-radiology",
        title: "P.G. Radiology",
        duration: "1.5 years",
        overview: "An advanced postgraduate program for B.Sc Physics graduates focusing on advanced radiological techniques and imaging technologies.",
        benefits: [
          "Advanced knowledge of radiological physics",
          "Training in modern imaging modalities",
          "Radiation safety and protection protocols",
          "Eligibility for senior radiology positions"
        ],
        futureScope: [
          "Senior Radiology Technologist in hospitals",
          "Medical Physics roles in radiation therapy",
          "Quality assurance in imaging departments",
          "Research opportunities in medical imaging"
        ],
        imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=400&auto=format&fit=crop"
      },
      {
        slug: "radiology-technician",
        title: "Radiology Technician",
        duration: "2 years",
        overview: "A comprehensive program covering all aspects of diagnostic imaging including X-ray, ultrasound, and advanced imaging techniques.",
        benefits: [
          "Training in multiple imaging modalities",
          "Patient care and safety protocols",
          "Equipment operation and maintenance",
          "Broad career opportunities in imaging"
        ],
        futureScope: [
          "Radiology Technician in hospitals and diagnostic centers",
          "Specialization in specific imaging modalities",
          "Opportunities in mobile imaging services",
          "Career advancement to chief technologist"
        ],
        imageUrl: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=400&auto=format&fit=crop"
      },
      {
        slug: "optometry",
        title: "Diploma in Optometry",
        duration: "2 years",
        overview: "A specialized program focused on eye care, vision testing, and optical dispensing to prepare qualified optometrists.",
        benefits: [
          "Comprehensive eye examination techniques",
          "Vision testing and correction methods",
          "Optical dispensing and lens fitting",
          "Growing field with increasing demand"
        ],
        futureScope: [
          "Optometrist in eye care clinics and hospitals",
          "Opportunities in optical retail chains",
          "Private practice establishment",
          "Specialization in contact lens fitting"
        ],
        imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=400&auto=format&fit=crop"
      },
      {
        slug: "sanitary-health-inspector",
        title: "Sanitary Health Inspector Course",
        duration: "1 year",
        overview: "A program training students in public health inspection, sanitation management, and community health monitoring.",
        benefits: [
          "Knowledge of public health and sanitation laws",
          "Environmental health assessment skills",
          "Community health monitoring techniques",
          "Government job opportunities"
        ],
        futureScope: [
          "Health Inspector in government departments",
          "Public health officer roles",
          "Environmental health consultant",
          "Career in municipal corporations"
        ],
        imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=400&auto=format&fit=crop"
      },
      {
        slug: "dental-health-technician",
        title: "Dental Health Technician",
        duration: "2 years",
        overview: "A comprehensive program focusing on dental care assistance, oral health education, and dental procedure support.",
        benefits: [
          "Training in dental procedures and equipment",
          "Oral health education and prevention",
          "Patient care in dental settings",
          "Growing demand in dental healthcare"
        ],
        futureScope: [
          "Dental Assistant in dental clinics",
          "Opportunities in dental hospitals",
          "Public health dental programs",
          "Career advancement to dental hygienist"
        ],
        imageUrl: "https://images.unsplash.com/photo-1606811841689-23dfdb7ee46b?q=80&w=400&auto=format&fit=crop"
      }
    ];
    
    // Add each course to the map
    courseData.forEach(course => {
      const id = this.courseCurrentId++;
      const now = new Date();
      
      this.courses.set(id, {
        ...course,
        id,
        createdAt: now,
        updatedAt: now
      });
    });
  }
}

export const storage = new MemStorage();
