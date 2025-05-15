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
        imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1469&auto=format&fit=crop"
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
        imageUrl: "https://images.unsplash.com/photo-1631815587646-b85a1bb027e1?q=80&w=1632&auto=format&fit=crop"
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
        imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1480&auto=format&fit=crop"
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
        imageUrl: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1332&auto=format&fit=crop"
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
        imageUrl: "https://images.unsplash.com/photo-1581093196277-9f6e9b82d000?q=80&w=1470&auto=format&fit=crop"
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
        imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1470&auto=format&fit=crop"
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
        imageUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1335&auto=format&fit=crop"
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
