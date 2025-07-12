// src/admin/routes/AdminAppRoutes.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";

import Signup from "../../admin/components/auth/Signup";
import Admin_Login from "../components/auth/adminLogin";
import VerificationOtp from "../../admin/components/auth/VerificationOtp";
import ForgotPassword from "../../admin/components/auth/ForgotPassword";
import ResetPassword from "../../admin/components/auth/ResetPassword";
import ResendOtp from "../../admin/components/auth/ResendOtp";

import AdminLayout from "../../admin/components/layout/AdminLayout";
import DashboardHome from "../../admin/components/admin-dashboard/DashboardHome";
import CreateCourse from "../../admin/components/admin-dashboard/CreateCourse";
import Settings from "../../admin/components/admin-dashboard/Settings";
import { AdminProtectedRoute } from "./../../utils/protectedRoute";
import AnalyticsPage from "../components/admin-dashboard/analyticsPage";
import AminDeleteCoursePage from "./../components/admin-dashboard/deleteCoursePage";
import UpdateCourse from "../components/admin-dashboard/updateCourse";
import AdminDeleteUserPage from "../components/admin-dashboard/deleteUserPage";
import ManageUsers from "../components/admin-dashboard/manageUsers";

const AdminAppRoutes = () => {
	return (
		<div className="bg-white text-black">
			<Routes>
				{/* Public Admin Auth Routes */}
				<Route path="/admin-signup" element={<Signup />} />
				<Route path="/admin-login" element={<Admin_Login />} />
				<Route path="/admin-verify-otp" element={<VerificationOtp />} />
				<Route path="/admin-forgot-password" element={<ForgotPassword />} />
				<Route
					path="/admin-reset-password/:token"
					element={<ResetPassword />}
				/>
				<Route path="/admin-resend-otp" element={<ResendOtp />} />

				{/* Protected Admin Layout Routes */}
				<Route path="/admin" element={<AdminProtectedRoute />}>
					<Route element={<AdminLayout />}>
						<Route index element={<DashboardHome />} />
						<Route path="dashboard" element={<DashboardHome />} />
						<Route path="create-course" element={<CreateCourse />} />
						<Route path="settings" element={<Settings />} />

						<Route path="manage-courses" element={<UpdateCourse />} />
						<Route path="delete-course" element={<AminDeleteCoursePage />} />
						<Route path="manage-users" element={<ManageUsers />} />
						<Route path="delete-user" element={<AdminDeleteUserPage />} />
						<Route path="analytics" element={<AnalyticsPage />} />
					</Route>
				</Route>

				{/* Not Found */}
				<Route
					path="*"
					element={
						<h1 className="text-9xl flex items-center justify-center m-auto">
							PAGE NOT FOUND
						</h1>
					}
				/>
			</Routes>
		</div>
	);
};

export default AdminAppRoutes;
