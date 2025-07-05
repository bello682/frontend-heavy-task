import { Routes, Route, useLocation } from "react-router-dom";
import DepartmentLandingPage from "./pages/landing/DepartmentLandingPage";
import SignUp from "./pages/auth/signUp";
import LoginPage from "./pages/auth/login";
import NavBarSection from "./pages/landing/web/navBar";
import FooterSection from "./pages/landing/web/footerSection";
import NotFound from "./pages/Errors/notFound";
import Dashboard_Body from "./pages/Dashboard-Components/dashboardBody";
import Dash_own_details from "./pages/Dashboard-Components/dash-pages/dash_own_details";
import Herosection from "./pages/landing/web/herosection";
import AboutSection from "./pages/landing/web/aboutSection";
import ProgramSection from "./pages/landing/web/programSection";
import FacultySection from "./pages/landing/web/facultySection";
import ReasearchSection from "./pages/landing/web/reaserchSection";
import NewsSection from "./pages/landing/web/newsSectiobn";
import ContactSection from "./pages/landing/web/contactSection";
import Deactivate_User_Account from "./pages/Dashboard-Components/dash-pages/deactivate_userAccount";
import CoursesAllExport from "./pages/SCHOOL COURSES/coursesAllExport";
import CourseDetailPage from "./pages/SCHOOL COURSES/courseDetailPage";
import UserVerificationPage from "./pages/auth/userVerification";
import Resend_User_Otp from "./pages/auth/resendOtp";
import Forget_Password from "./pages/auth/forgetPassword";
import Reset_Password from "./pages/auth/resetPassword";
import Scam_Security_alert_Page from "./pages/auth/ScamSecurity_alert";
import Contact_Support_Page from "./pages/auth/contact_support";

function App() {
	const location = useLocation();
	const userDashboard =
		location.pathname.includes("/dashboard") ||
		location.pathname.includes("/signup") ||
		location.pathname.includes("/otp-verification") ||
		location.pathname.includes("/otp-resending") ||
		location.pathname.includes("/forgot-password") ||
		location.pathname.includes("/password-reset/") ||
		location.pathname.includes("/security-alert") ||
		location.pathname.includes("/contact-support") ||
		location.pathname.includes("/login");
	location.pathname.includes("/*");
	return (
		<>
			{!userDashboard && <NavBarSection />}
			<Routes>
				<Route index path="/" element={<DepartmentLandingPage />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/otp-verification" element={<UserVerificationPage />} />
				<Route path="/otp-resending" element={<Resend_User_Otp />} />
				<Route path="/forgot-password" element={<Forget_Password />} />
				<Route path="/password-reset/:token" element={<Reset_Password />} />
				\
				<Route path="/security-alert" element={<Scam_Security_alert_Page />} />
				<Route path="/contact-support" element={<Contact_Support_Page />} />
				<Route path="/login" element={<LoginPage />} />
				{/* Courses Home Section */}
				<Route path="/all-our-courses" element={<CoursesAllExport />} />
				{/* Single Section Page Per Course */}
				<Route path="/course/:id" element={<CourseDetailPage />} />
				{/* Hero Section */}
				<Route path="/" element={<Herosection />} />
				{/* About Us Section */}
				<Route path="/about" element={<AboutSection />} />
				{/* Programs Section */}
				<Route path="/programs" element={<ProgramSection />} />
				{/* Faculty Section */}
				<Route path="/faculty" element={<FacultySection />} />
				{/* Research Section */}
				<Route path="/research" element={<ReasearchSection />} />
				{/* News Section */}
				<Route path="/news" element={<NewsSection />} />
				{/* Contact Section */}
				<Route path="/contact" element={<ContactSection />} />
				<Route path="/dashboard" element={<Dashboard_Body />}>
					<Route
						index
						//  path="user-home"
						element={<Dash_own_details />}
					/>
					<Route
						path="deactivating-account"
						element={<Deactivate_User_Account />}
					/>
					<Route
						path="cards"
						element={
							<h1 className="text-9xl flex justify-center m-auto">CARDS</h1>
						}
					/>
					<Route
						index
						path="accounts"
						element={
							<h1 className="text-9xl flex justify-center m-auto">ACCOUNTS</h1>
						}
					/>
					<Route
						index
						path="settings"
						element={
							<h1 className="text-9xl flex justify-center m-auto">SETTINGS</h1>
						}
					/>
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>

			{!userDashboard && <FooterSection />}
		</>
	);
}

export default App;

// to avoid all the error from eslint on vercel
// ===== install this ======
// npm install eslint --save-dev
// npx eslint --init

// ===== run this ======
// npx eslint src --fix
