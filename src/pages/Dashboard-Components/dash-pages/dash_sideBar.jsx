import React from "react";
import { motion as Motion } from "framer-motion";
import {
	Home,
	Wallet,
	CreditCard,
	Settings,
	LogOut,
	X,
} from "../../../components/Icons/lucid-icons"; // Import necessary icons
import { Link, useNavigate } from "react-router-dom";

const navLinks = [
	{ name: "Dashboard", icon: Home, to: "/dashboard" },
	{ name: "Accounts", icon: Wallet, to: "/dashboard/accounts" },
	{ name: "Cards", icon: CreditCard, to: "/dashboard/cards" },
	{ name: "Settings", icon: Settings, to: "/dashboard/settings" },
];

const Dash_Sidebar = ({ isOpen, onClose }) => {
	const navigate = useNavigate();

	// Animation variants for the sidebar sliding in/out
	const sidebarVariants = {
		open: { x: 0 },
		closed: { x: "-100%" },
	};

	// Animation variants for the overlay fading in/out
	const overlayVariants = {
		open: { opacity: 1 },
		closed: { opacity: 0 },
	};

	// because naturally Link fro react router dom does not support things like motion.Link so we will improvise
	// Create an animated version of Link
	const MotionLink = Motion(Link);

	return (
		<>
			{/* Overlay for all screens when sidebar is open */}
			{isOpen && (
				<Motion.div
					// className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-md shadow-xl"
					className="fixed inset-0 bg-black/40 backdrop-blur-md shadow-2xl z-40"
					variants={overlayVariants}
					initial="closed"
					animate="open"
					exit="closed"
					onClick={onClose}
				/>
			)}

			{/* Sidebar itself */}
			<Motion.div
				className={`fixed top-0 left-0 h-full bg-gray-900 text-white w-64 z-50
                            flex flex-col shadow-lg
                            transform transition-transform duration-300 ease-in-out
                            ${isOpen ? "translate-x-0" : "-translate-x-full"}`} // Removed lg:static, lg:translate-x-0, lg:w-64, lg:flex - always hidden by default
				initial="closed"
				animate={isOpen ? "open" : "closed"}
				variants={sidebarVariants}
				transition={{ duration: 0.3, ease: "easeInOut" }}
			>
				{/* Sidebar Header/Logo */}
				<div className="p-6 flex items-center justify-between border-b border-white">
					{" "}
					{/* Removed lg:justify-center */}
					<h2 className="text-2xl font-bold">Fintech App</h2>
					{/* Close button - Always visible when sidebar is open */}
					<Motion.button
						onClick={onClose}
						className="p-2 rounded-full hover:bg-white hover:text-gray-900" // Removed lg:hidden
						whileTap={{ scale: 0.95 }}
						aria-label="Close Sidebar"
					>
						<X size={24} />
					</Motion.button>
				</div>

				{/* Navigation Links */}
				<nav className="flex-1 p-6 space-y-3">
					{navLinks.map((link) => (
						<MotionLink
							key={link.name}
							to={link.to}
							className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white hover:text-gray-900 transition-colors text-lg font-medium"
							whileHover={{ x: 5 }} // Slight movement on hover
							whileTap={{ scale: 0.98 }}
							onClick={onClose} // Close sidebar on link click (for mobile)
						>
							<link.icon size={20} />
							<span>{link.name}</span>
						</MotionLink>
					))}
				</nav>

				{/* Logout Button */}
				<div className="p-6 border-t border-white">
					<Motion.button
						className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white hover:text-gray-900 transition-colors w-full text-lg font-medium"
						whileHover={{ x: 5 }}
						whileTap={{ scale: 0.98 }}
						onClick={() => {
							navigate("/login");
						}} // Replace with actual logout logic
					>
						<LogOut size={20} />
						<span>Logout</span>
					</Motion.button>
				</div>
			</Motion.div>
		</>
	);
};

export default Dash_Sidebar;
