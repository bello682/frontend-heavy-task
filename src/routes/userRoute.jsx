import { Routes, Route, useLocation } from "react-router-dom";
import DepartmentLandingPage from "../pages/landing/DepartmentLandingPage";
import SignUp from "../pages/auth/signUp";
import LoginPage from "../pages/auth/login";
import NavBarSection from "../pages/landing/web/navBar";
import FooterSection from "../pages/landing/web/footerSection";
import NotFound from "../pages/Errors/notFound";
import Dashboard_Body from "../pages/Dashboard-Components/dashboardBody";
import Dash_own_details from "../pages/Dashboard-Components/dash-pages/dash_own_details";
import Herosection from "../pages/landing/web/herosection";
import AboutSection from "../pages/landing/web/aboutSection";
import ProgramSection from "../pages/landing/web/programSection";
import FacultySection from "../pages/landing/web/facultySection";
import ReasearchSection from "../pages/landing/web/reaserchSection";
import NewsSection from "../pages/landing/web/newsSectiobn";
import ContactSection from "../pages/landing/web/contactSection";
import Deactivate_User_Account from "../pages/Dashboard-Components/dash-pages/deactivate_userAccount";
import CoursesAllExport from "../pages/SCHOOL COURSES/coursesAllExport";
import CourseDetailPage from "../pages/SCHOOL COURSES/courseDetailPage";
import UserVerificationPage from "../pages/auth/userVerification";
import Resend_User_Otp from "../pages/auth/resendOtp";
import Forget_Password from "../pages/auth/forgetPassword";
import Reset_Password from "../pages/auth/resetPassword";
import Scam_Security_alert_Page from "../pages/auth/ScamSecurity_alert";
import Contact_Support_Page from "../pages/auth/contact_support";
import { UserProtectedRoute } from "../utils/protectedRoute";
import UserCourseDetailPageDashboard from "../pages/Dashboard-Components/dash-pages/userCourseDisplayDashboard";
import UserSettings from "../pages/Dashboard-Components/dash-pages/userSettings";
import UserAccountPage from "../pages/Dashboard-Components/dash-pages/userAccountPage";

const UserAppRoutes = () => {
	const location = useLocation();
	const hideLayoutPaths = [
		"/dashboard",
		"/signup",
		"/otp-verification",
		"/otp-resending",
		"/forgot-password",
		"/password-reset",
		"/security-alert",
		"/contact-support",
		"/login",
	];

	const hideLayout = hideLayoutPaths.some((path) =>
		location.pathname.includes(path)
	);

	return (
		<div className="bg-gray-900 text-white">
			{!hideLayout && <NavBarSection />}

			<Routes>
				<Route path="/" element={<DepartmentLandingPage />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/otp-verification" element={<UserVerificationPage />} />
				<Route path="/otp-resending" element={<Resend_User_Otp />} />
				<Route path="/forgot-password" element={<Forget_Password />} />
				<Route path="/password-reset/:token" element={<Reset_Password />} />
				<Route path="/security-alert" element={<Scam_Security_alert_Page />} />
				<Route path="/contact-support" element={<Contact_Support_Page />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/all-our-courses" element={<CoursesAllExport />} />
				<Route path="/course/:id" element={<CourseDetailPage />} />
				<Route path="/about" element={<AboutSection />} />
				<Route path="/programs" element={<ProgramSection />} />
				<Route path="/faculty" element={<FacultySection />} />
				<Route path="/research" element={<ReasearchSection />} />
				<Route path="/news" element={<NewsSection />} />
				<Route path="/contact" element={<ContactSection />} />

				{/* User Protected Routes */}
				<Route path="/dashboard" element={<UserProtectedRoute />}>
					<Route element={<Dashboard_Body />}>
						<Route index element={<Dash_own_details />} />
						<Route
							path="deactivating-account"
							element={<Deactivate_User_Account />}
						/>
						<Route
							path="all-courses"
							element={<UserCourseDetailPageDashboard />}
						/>
						<Route
							path="cards"
							element={
								<h1 className="flex justify-center items-center m-auto text-3xl">
									Cards Page
								</h1>
							}
						/>
						<Route path="accounts" element={<UserAccountPage />} />
						<Route path="settings" element={<UserSettings />} />
						<Route path="all-our-courses" element={<CoursesAllExport />} />
					</Route>
				</Route>

				{/* Not Found */}
				<Route path="*" element={<NotFound />} />
			</Routes>

			{!hideLayout && <FooterSection />}
		</div>
	);
};

export default UserAppRoutes;
