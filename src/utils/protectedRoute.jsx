import { Navigate, Outlet } from "react-router-dom";
import { getAuthToken, getUserRole } from "./authStorage";

// Example: getUserRole returns "admin" or "user"

// ADMIN PROTECTED ROUTE
export const AdminProtectedRoute = () => {
	const token = getAuthToken();
	const role = getUserRole();

	if (!token || role !== "admin") {
		console.log(
			"AdminProtectedRoute - REDIRECTING to /admin-login. Reason: ",
			!token ? "Missing Token" : "Incorrect Role"
		);
		return <Navigate to="/admin-login" replace />;
	}

	return <Outlet />;
};

// USER PROTECTED ROUTE
export const UserProtectedRoute = () => {
	const token = getAuthToken();
	const role = getUserRole();

	if (!token || role !== "user") {
		console.log(
			"AdminProtectedRoute - REDIRECTING to /login. Reason: ",
			!token ? "Missing Token" : "Incorrect Role"
		);
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
};
