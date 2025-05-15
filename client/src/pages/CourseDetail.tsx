import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCalendarAlt, faCheckCircle, faSpinner, faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CourseType } from "@shared/schema";

export default function CourseDetail() {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: courseData, isLoading, error, isError } = useQuery<{ success: boolean, data: CourseType }>({ 
    queryKey: ["/api/courses", slug],
    enabled: !!slug,
    retry: 3,
    refetchOnWindowFocus: false
  });
  
  const course = courseData?.data;
  
  // Find related courses (to be implemented)
  const showSimilarCourses = false;
  
  return (
    <>
      <Helmet>
        <title>{course ? `${course.title} - MDKSD Paramedical College` : 'Course Details - MDKSD Paramedical College'}</title>
        <meta name="description" content={course?.overview || 'Explore our healthcare education programs at MDKSD Paramedical College.'} />
      </Helmet>
      
      <Header />
      
      <main className="pt-24 pb-12">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center text-sm text-[#2c5282]">
              <Link href="/" className="hover:text-[#172f4f]">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/courses" className="hover:text-[#172f4f]">
                Courses
              </Link>
              {course && (
                <>
                  <span className="mx-2">/</span>
                  <span className="text-[#172f4f] font-medium">{course.title}</span>
                </>
              )}
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="text-center py-20">
            <FontAwesomeIcon icon={faSpinner} className="animate-spin text-4xl text-[#172f4f]" />
            <p className="mt-4 text-[#2c5282]">Loading course details...</p>
          </div>
        ) : isError || error ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Error Loading Course</h2>
            <p className="text-[#2c5282] mb-8">
              We couldn't find the course "{slug}". Please try another course or go back to the courses page.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/courses">
                <Button className="bg-[#172f4f] hover:bg-[#0b1a2f]">
                  <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                  Back to All Courses
                </Button>
              </Link>
            </div>
          </div>
        ) : course ? (
          <>
            {/* Course Header */}
            <section className="bg-[#172f4f] text-white py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                  <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-6">
                    {course.title}
                  </h1>
                  
                  <div className="flex items-center text-[#a8c7dc] mb-8">
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                    <span>Duration: {course.duration}</span>
                  </div>
                  
                  <div className="bg-[#0b1a2f]/50 p-6 rounded-lg">
                    <p className="text-lg text-[#a8c7dc]">
                      {course.overview}
                    </p>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Course Details */}
            <section className="py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-12">
                  {/* Main Content */}
                  <div className="md:col-span-2">
                    {/* Key Benefits */}
                    <div className="mb-12">
                      <h2 className="font-heading font-bold text-2xl text-[#172f4f] mb-6 flex items-center">
                        <span className="w-10 h-10 rounded-full bg-[#172f4f]/10 flex items-center justify-center mr-3">
                          <FontAwesomeIcon icon={faCheckCircle} className="text-[#172f4f]" />
                        </span>
                        Key Benefits
                      </h2>
                      
                      <div className="bg-gradient-to-r from-[#f1faff] to-white p-6 rounded-lg border-l-4 border-[#f39c12] shadow-sm">
                        <ul className="space-y-4">
                          {course.benefits.map((benefit: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <span className="text-[#f39c12] mr-3 mt-1">
                                <FontAwesomeIcon icon={faCheckCircle} />
                              </span>
                              <span className="text-[#2c5282] text-lg">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Future Scope */}
                    <div>
                      <h2 className="font-heading font-bold text-2xl text-[#172f4f] mb-6 flex items-center">
                        <span className="w-10 h-10 rounded-full bg-[#172f4f]/10 flex items-center justify-center mr-3">
                          <FontAwesomeIcon icon={faGraduationCap} className="text-[#172f4f]" />
                        </span>
                        Future Scope
                      </h2>
                      
                      <div className="bg-gradient-to-r from-[#f8f9fa] to-white p-6 rounded-lg border-l-4 border-[#172f4f] shadow-sm">
                        <ul className="space-y-4">
                          {course.futureScope.map((scope: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <span className="text-[#172f4f] mr-3 mt-1">
                                <FontAwesomeIcon icon={faGraduationCap} />
                              </span>
                              <span className="text-[#2c5282] text-lg">{scope}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  {/* Sidebar */}
                  <div>
                    <div className="bg-[#f1faff] p-6 rounded-lg shadow-md sticky top-24">
                      <h3 className="font-heading font-semibold text-xl text-[#172f4f] mb-6">Apply for this Course</h3>
                      
                      <div className="space-y-4 mb-8">
                        <div className="flex justify-between text-[#2c5282]">
                          <span>Duration:</span>
                          <span className="font-medium">{course.duration}</span>
                        </div>
                        <div className="flex justify-between text-[#2c5282]">
                          <span>Level:</span>
                          <span className="font-medium">Diploma/Degree</span>
                        </div>
                        <div className="flex justify-between text-[#2c5282]">
                          <span>Eligibility:</span>
                          <span className="font-medium">10+2 or Equivalent</span>
                        </div>
                      </div>
                      
                      <a 
                        href="#contact"
                        onClick={(e) => {
                          e.preventDefault();
                          const contactSection = document.getElementById('contact');
                          if (contactSection) {
                            const offsetTop = contactSection.offsetTop - 80;
                            window.scrollTo({
                              top: offsetTop,
                              behavior: 'smooth'
                            });
                          } else {
                            // If contact section not on this page, navigate to home page contact
                            window.location.href = '/#contact';
                          }
                        }}
                        className="block w-full bg-[#f39c12] hover:bg-[#e67e22] text-white font-bold py-3 px-4 rounded-md text-center transition duration-300"
                      >
                        Apply Now
                      </a>
                      
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <h4 className="font-heading font-semibold text-lg text-[#172f4f] mb-3">Need More Information?</h4>
                        <p className="text-sm text-[#2c5282] mb-4">
                          Contact our admissions office for detailed program information, eligibility criteria, and application processes.
                        </p>
                        <div className="flex items-center text-sm text-[#2c5282]">
                          <FontAwesomeIcon icon={faPhone} className="mr-2 text-[#f39c12]" />
                          <span>+91 94051 09103</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Comparison with other courses (optional) */}
            {showSimilarCourses && (
              <section className="py-16 bg-[#f1faff]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h2 className="font-heading font-bold text-3xl text-[#172f4f] mb-12 text-center">
                    Similar Courses
                  </h2>
                  
                  {/* Similar courses would be displayed here */}
                  <div className="grid md:grid-cols-3 gap-8">
                    {/* Course cards would go here */}
                  </div>
                </div>
              </section>
            )}
          </>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Course Not Found</h2>
            <p className="text-[#2c5282] mb-8">We couldn't find the course you're looking for.</p>
            <Link href="/courses">
              <Button className="bg-[#172f4f] hover:bg-[#0b1a2f]">
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                Back to All Courses
              </Button>
            </Link>
          </div>
        )}
      </main>
      
      <Footer />
    </>
  );
}