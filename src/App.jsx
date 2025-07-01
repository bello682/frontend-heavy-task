import { Routes, Route, useLocation } from "react-router-dom";
import DepartmentLandingPage from "./pages/landing/DepartmentLandingPage";
import SignUp from "./pages/auth/signUp";
import LoginPage from "./pages/auth/login";
import NavBarSection from "./pages/landing/web/navBar";
import FooterSection from "./pages/landing/web/footerSection";
import NotFound from "./pages/Errors/notFound";
import Dashboard_Body from "./pages/Dashboard-Components/dashboardBody";
import Dash_own_details from "./pages/Dashboard-Components/dash-pages/dash_own_details";

function App() {
	const location = useLocation();
	const userDashboard = location.pathname.includes("/dashboard");
	return (
		<>
			{!userDashboard && <NavBarSection />}
			<Routes>
				<Route index path="/" element={<DepartmentLandingPage />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/dashboard" element={<Dashboard_Body />}>
					<Route
						index
						//  path="user-home"
						element={<Dash_own_details />}
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
