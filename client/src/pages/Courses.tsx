import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faUserNurse, faStethoscope, faFlask, faHeartbeat, faPrescriptionBottleMedical, faSpa, faXRay, faMicroscope, faEye, faShieldAlt, faTooth } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CourseType } from "@shared/schema";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

// Map course slugs to icons
const courseIcons: Record<string, IconDefinition> = {
  "gnm": faUserNurse,
  "bsc-nursing": faStethoscope,
  "dmlt": faFlask,
  "physiotherapy": faHeartbeat,
  "dpharm": faPrescriptionBottleMedical,
  "paramedical-cosmetology": faSpa,
  "dccn": faUserNurse,
  "pgdmlt": faMicroscope,
  "xray-technician": faXRay,
  "ct-scan-technician": faXRay,
  "ecg-technician": faHeartbeat,
  "ot-technician": faStethoscope,
  "pg-radiology": faXRay,
  "radiology-technician": faXRay,
  "optometry": faEye,
  "sanitary-health-inspector": faShieldAlt,
  "dental-health-technician": faTooth
};

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: coursesData, isLoading, error } = useQuery<{ success: boolean, data: CourseType[] }>({ 
    queryKey: ["/api/courses"],
    retry: 3,
    refetchOnWindowFocus: false,
  });
  
  // Filter courses based on search term
  const filteredCourses = coursesData?.data ? coursesData.data.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.overview.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];
  
  return (
    <>
      <Helmet>
        <title>Courses - MDKSD Paramedical College</title>
        <meta name="description" content="Explore our range of UGC-approved healthcare education programs including nursing, pharmacy, medical laboratory technology, and physiotherapy courses." />
      </Helmet>
      
      <Header />
      
      <main className="pt-24 pb-12">
        <section className="bg-[#172f4f] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-6 text-center">
              Our Academic Programs
            </h1>
            <p className="text-xl text-center text-[#a8c7dc] max-w-3xl mx-auto">
              Comprehensive healthcare education designed to prepare you for a successful career in the medical field
            </p>
          </div>
        </section>
        
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Search */}
            <div className="mb-10">
              <div className="relative max-w-xl mx-auto">
                <input 
                  type="text" 
                  placeholder="Search courses..." 
                  className="w-full px-5 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#172f4f]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} 
                />
                <button className="absolute right-4 top-3 text-[#2c5282]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Course List */}
            {isLoading ? (
              <div className="text-center py-20">
                <FontAwesomeIcon icon={faSpinner} className="animate-spin text-4xl text-[#172f4f]" />
                <p className="mt-4 text-[#2c5282]">Loading courses...</p>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-red-500">Failed to load courses. Please try again later.</p>
              </div>
            ) : (
              <>
                {filteredCourses.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-[#2c5282]">No courses found matching your search criteria.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCourses.map((course) => (
                      <div key={course.id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden h-full">
                        <div 
                          className="relative h-48 bg-cover bg-center" 
                          style={{ backgroundImage: `url(${course.imageUrl})` }}
                        >
                          {/* White gradient overlay for text visibility */}
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white/90"></div>
                          
                          {/* Badge position over image */}
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-[#f39c12] hover:bg-[#f39c12] font-medium text-white">{course.duration}</Badge>
                          </div>

                          {/* Heading positioned at bottom of image with gradient behind it */}
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <h2 className="font-heading font-semibold text-xl text-[#172f4f]">{course.title}</h2>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-start mb-4">
                            <div className="w-10 h-10 bg-[#172f4f]/10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                              <FontAwesomeIcon 
                                icon={courseIcons[course.slug] || faUserNurse} 
                                className="text-lg text-[#172f4f]" 
                              />
                            </div>
                            <p className="text-[#2c5282] line-clamp-3">{course.overview}</p>
                          </div>
                        </div>
                        
                        <div className="p-6 pt-0 mt-auto">
                          <Link href={`/courses/${course.slug}`}>
                            <Button className="w-full bg-[#172f4f] hover:bg-[#0b1a2f]">
                              View Course Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
        
        {/* Why Choose Our Programs */}
        <section className="py-16 bg-[#f1faff]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading font-bold text-3xl text-[#172f4f] mb-12 text-center">
              Why Choose Our Programs?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-[#172f4f]/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#172f4f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-xl text-[#172f4f] text-center mb-2">UGC Approved Programs</h3>
                <p className="text-[#2c5282] text-center">All our courses are recognized by regulatory bodies, ensuring your qualification is valued nationwide.</p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-[#172f4f]/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#172f4f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-xl text-[#172f4f] text-center mb-2">Expert Faculty</h3>
                <p className="text-[#2c5282] text-center">Learn from experienced professionals with decades of experience in clinical practice and teaching.</p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-[#172f4f]/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#172f4f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-xl text-[#172f4f] text-center mb-2">Hands-on Training</h3>
                <p className="text-[#2c5282] text-center">Extensive practical sessions and clinical rotations to build real-world skills that employers value.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}