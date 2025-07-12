// src/components/layout/AdminLayout.jsx
import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { FaSignOutAlt } from "react-icons/fa";

const AdminLayout = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	// Simple authentication check (replace with more robust context/redux in real app)
	const isAuthenticated = localStorage.getItem("accessToken");

	if (!isAuthenticated) {
		return <Navigate to="/admin-login" replace />;
	}

	return (
		<div className="flex min-h-screen bg-white text-black">
			{/* Navbar for mobile/tablet */}
			<div className="fixed ">
				<Navbar toggleSidebar={toggleSidebar} />
			</div>

			{/* Sidebar - visible on large screens, togglable on small */}
			<Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

			{/* Overlay for when sidebar is open on small screens */}
			{isSidebarOpen && (
				<div
					className="fixed inset-0 bg-[#00000045] bg-opacity-50 shadow-2xs z-40"
					onClick={toggleSidebar}
				></div>
			)}

			{/* Main content area */}
			<div className="flex justify-end w-full">
				<div className=" flex flex-col overflow-hidden w-[87%] lg:w-[95%]">
					<header className="hidden lg:flex bg-secondary text-textSecondary p-4 shadow-md items-center justify-between">
						<h1 className="text-2xl font-bold">
							Innovation University Academy
						</h1>
						{/* Add user info/logout button here for larger screens */}
						<button
							onClick={() => {
								localStorage.removeItem("accessToken");
								localStorage.removeItem("refreshToken");
								localStorage.removeItem("adminId");
								localStorage.removeItem("userRole");
								window.location.href = "/admin-login";
							}}
							className="flex items-center text-accentRed hover:text-red-700 transition-colors duration-200"
						>
							<FaSignOutAlt className="mr-2" /> Logout
						</button>
					</header>

					<main className="flex-1 overflow-y-auto p-4 md:p-6 bg-primary">
						<Outlet /> {/* This is where nested routes will render */}
					</main>
				</div>
			</div>
		</div>
	);
};

export default AdminLayout;
