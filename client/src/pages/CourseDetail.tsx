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
  
  const { data: courseData, isLoading, error } = useQuery<{ success: boolean, data: CourseType }>({ 
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
        ) : error ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Error Loading Course</h2>
            <p className="text-[#2c5282] mb-8">We couldn't find the course you're looking for.</p>
            <Link href="/courses">
              <Button className="bg-[#172f4f] hover:bg-[#0b1a2f]">
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                Back to All Courses
              </Button>
            </Link>
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
                      
                      <ul className="space-y-4">
                        {course.benefits.map((benefit, index) => (
                          <li key={index} className="flex">
                            <span className="text-[#f39c12] mr-3">•</span>
                            <span className="text-[#2c5282]">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Future Scope */}
                    <div>
                      <h2 className="font-heading font-bold text-2xl text-[#172f4f] mb-6 flex items-center">
                        <span className="w-10 h-10 rounded-full bg-[#172f4f]/10 flex items-center justify-center mr-3">
                          <FontAwesomeIcon icon={faGraduationCap} className="text-[#172f4f]" />
                        </span>
                        Future Scope
                      </h2>
                      
                      <ul className="space-y-4">
                        {course.futureScope.map((scope, index) => (
                          <li key={index} className="flex">
                            <span className="text-[#f39c12] mr-3">•</span>
                            <span className="text-[#2c5282]">{scope}</span>
                          </li>
                        ))}
                      </ul>
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
                        href="#apply"
                        onClick={(e) => {
                          e.preventDefault();
                          const applySection = document.getElementById('apply');
                          if (applySection) {
                            const offsetTop = applySection.offsetTop - 80;
                            window.scrollTo({
                              top: offsetTop,
                              behavior: 'smooth'
                            });
                          }
                        }}
                        className="block w-full bg-[#f39c12] hover:bg-[#e67e22] text-white font-bold py-3 px-4 rounded-md text-center transition duration-300"
                      >
                        Apply Now
                      </a>
                      
                      <p className="text-sm text-[#2c5282] mt-4 text-center">
                        Need more information? Contact our admissions office.
                      </p>
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