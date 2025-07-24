# Matoshree Dr Kanchan Shantilalji Desarda Mahavidyalya Website

## Project Overview
A modern, responsive web application for Matoshree Dr Kanchan Shantilalji Desarda Mahavidyalya (MDKSD), a nursing and paramedical college in Sambhajinagar (Aurangabad), Maharashtra. The website showcases the college's academic programs, facilities, and provides information for prospective students.

## Tech Stack
- **Frontend**: React.js with TypeScript, Vite build tool
- **Backend**: Node.js with Express.js
- **Styling**: Tailwind CSS with ShadCN UI components
- **Icons**: FontAwesome icons for course representation
- **Storage**: In-memory storage for course and contact data
- **Routing**: Wouter for client-side routing

## Project Architecture

### Frontend Structure
- **Home Page**: Landing page with hero section, programs overview, gallery, videos, and contact form
- **Courses Page**: Comprehensive listing of all academic programs with search functionality
- **Course Detail Pages**: Individual pages for each course with benefits and future scope
- **Components**: Reusable header, footer, and UI components

### Backend Structure
- **API Routes**: RESTful endpoints for courses and contact submissions
- **Storage**: In-memory data storage with course and contact management
- **Express Server**: Serves both API and static frontend assets

## Recent Changes (January 24, 2025)

### Course Expansion
- Added 8 new paramedical and allied healthcare courses to the database
- Expanded from 7 to 15 total courses offered
- New courses include: PGDMLT, X-Ray Technician, CT Scan Technician, ECG Technician, OT Technician, PG Radiology, Radiology Technician, Optometry, Sanitary Health Inspector, and Dental Health Technician
- Updated course icons mapping for all new courses
- Added relevant course images with white gradient overlays for text visibility

### Navigation Improvements
- Fixed navbar "Courses" link to navigate to /courses page instead of homepage section
- Updated both desktop and mobile navigation to handle page links vs section links
- Made navbar logo clickable to return to homepage
- Fixed "Apply Now" button to work from any page, directing to contact section

### "Get in Touch" Section Redesign
- Replaced "Contact Us" with modern "Get in touch" section following provided design
- Updated form layout with side-by-side "Your Name" and "Mobile No." fields
- Added comprehensive form fields: name, mobile, email, and comment with appropriate icons
- Implemented clickable Terms & Conditions and Privacy Policy with modal popups
- Added scrollable content in modals with comprehensive legal text
- Updated backend schema to handle mobile number and consent fields
- Applied college color theme (blue #172f4f and orange #f4743e) throughout

### Dual Notification System (WhatsApp + Email)
- Integrated dual notification system for comprehensive inquiry management
- WhatsApp notifications sent to +91 88308 38903 with formatted inquiry details
- Professional HTML emails sent to mdksdinstitute@gmail.com via SendGrid
- Both notifications processed simultaneously for immediate alert coverage
- Messages include full inquiry details, timestamp, and consent status
- SendGrid sender verification completed for reliable email delivery
- Secondary contact number: +91 94051 09103 (general contact only)
- Server logs provide detailed notification status for troubleshooting

### Performance Optimizations
- Reduced image sizes from 1400-1600px to 400px for faster loading
- Added lazy loading for course images to improve initial page load
- Fixed CSS import order to eliminate warnings
- Enhanced React Query caching with stale time configuration
- Added skeleton loading states for better perceived performance

### UI Enhancements
- Course cards now feature background images with white gradient overlays
- Improved course card layout with image header, title positioning, and content organization
- Enhanced visual appeal while maintaining text readability
- Responsive design maintained across all screen sizes

## Course Offerings
The college now offers 15 comprehensive programs:

### Nursing Programs
- Diploma in General Nursing & Midwifery (GNM) - 3 Years
- B.Sc. Nursing - 4 Years  
- Diploma in Critical Care Nursing (DCCN) - 1-3 Years

### Medical Technology
- Diploma in Medical Laboratory Technology (DMLT) - 2 Years
- Postgraduate Diploma in Medical Laboratory Technology (PGDMLT) - 1.5 Years

### Imaging & Radiology
- X-Ray Technician Course - 1 Year
- C.T. Scan Technician Course - 1 Year
- P.G. Radiology - 1.5 Years
- Radiology Technician - 2 Years

### Specialized Healthcare
- Bachelor of Physiotherapy (BPT) - 4.5 Years (updated from 2-year diploma)
- Diploma in Pharmacy (D.Pharm) - 2 Years
- E.C.G Technician Course - 1 Year
- O.T. Technician (Operation Theatre) - 2 Years
- Diploma in Optometry - 2 Years
- Sanitary Health Inspector Course - 1 Year
- Dental Health Technician - 2 Years
- Diploma in Paramedical Cosmetology - 1-2 Years

## Key Features
- Government recognized courses with job assurance
- UGC approved programs
- Comprehensive course details with benefits and career scope
- Responsive design for mobile, tablet, and desktop
- Search functionality for course discovery
- Contact form integration
- YouTube video showcasing
- Google Maps integration for campus directions

## User Preferences
- Course information should be comprehensive and detailed
- Visual elements (images, icons) are important for course representation
- Navigation should be intuitive and work consistently across all pages
- Course cards should be visually appealing with good text visibility

## Contact Information
- Phone: 9405109103, 8830838903
- Address: Behind Bibika Maqbara, Hanuman Tekdi Jawal, Pahadsingpura, Sambhajinagar (Aurangabad), Maharashtra