import React from "react";
import { motion as Motion } from "framer-motion";
import { Bell, User, Menu } from "../../../components/Icons/lucid-icons"; // Centralized icon import
import { getGreeting } from "../../../components/timeGreetings";

// --- Dash_Header Component ---
// NEW: Receive toggleSidebar prop
const Dash_Header = ({
	userName,
	notifications,
	itemVariants,
	toggleSidebar,
}) => {
	return (
		<Motion.header
			className="flex items-center justify-between py-4 mb-8"
			variants={itemVariants}
		>
			<div className="flex items-center space-x-3">
				{/* Sidebar Toggle Button - Always visible on all screen sizes */}
				{/* NEW: Added onClick handler to call toggleSidebar */}
				<Motion.button
					onClick={toggleSidebar} // Call the toggleSidebar function
					className="p-2 rounded-md hover:bg-gray-200 transition-colors"
					whileTap={{ scale: 0.95 }}
					aria-label="Toggle Sidebar"
				>
					<Menu size={24} className="text-gray-600" />
				</Motion.button>

				<div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
					<User size={24} />
				</div>
				<div>
					<p className="text-sm text-gray-500">{getGreeting()},</p>
					<h1 className="text-2xl sm:text-3xl font-bold">{userName}!</h1>
				</div>
			</div>
			<div className="relative">
				<Bell
					size={24}
					className="text-gray-600 cursor-pointer hover:text-blue-500 transition-colors"
				/>
				{notifications.length > 0 && (
					<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
						{notifications.length}
					</span>
				)}
			</div>
		</Motion.header>
	);
};

export default Dash_Header;
