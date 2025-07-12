// import { useLocation } from "react-router-dom";
// import AdminAppRoutes from "./admin/routes/adminRoutes";
// import UserAppRoutes from "./routes/userRoute";

// const App = () => {
// 	const location = useLocation();

// 	const isAdminRoute = location.pathname.startsWith("/admin");

// 	return isAdminRoute ? <AdminAppRoutes /> : <UserAppRoutes />;
// };

// export default App;

import { useLocation } from "react-router-dom";
import AdminAppRoutes from "./admin/routes/adminRoutes";
import UserAppRoutes from "./routes/userRoute";

const App = () => {
	const location = useLocation();

	// Adjusted this condition to include all `/admin-*` auth routes
	const isAdmin =
		location.pathname.startsWith("/admin") ||
		location.pathname.startsWith("/admin-");

	return isAdmin ? <AdminAppRoutes /> : <UserAppRoutes />;
};

export default App;

// to avoid all the error from eslint on vercel
// ===== install this ======
// npm install eslint --save-dev
// npx eslint --init

// ===== run this ======
// npx eslint src --fix

// to avoid all the error from eslint on vercel
// ===== install this ======
// npm install eslint --save-dev
// npx eslint --init

// ===== run this ======
// npx eslint src --fix
