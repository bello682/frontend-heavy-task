import React from "react";
// import NavBarSection from "./web/navBar";
import Herosection from "./web/herosection";
import AboutSection from "./web/aboutSection";
import ProgramSection from "./web/programSection";
import FacultySection from "./web/facultySection";
import ReasearchSection from "./web/reaserchSection";
import ContactSection from "./web/contactSection";
// import FooterSection from "./web/footerSection";
import NewsSection from "./web/newsSectiobn";

const DepartmentLandingPage = () => {
	return (
		<div className="bg-gray-900 text-white">
			{/* Hero Section */}
			<Herosection />
			{/* About Us Section */}
			<AboutSection />
			{/* Programs Section */}
			<ProgramSection />
			{/* Faculty Section */}
			<FacultySection />
			{/* Research Section */}
			<ReasearchSection />
			{/* News Section */}
			<NewsSection />
			{/* Contact Section */}
			<ContactSection />
		</div>
	);
};

export default DepartmentLandingPage;
