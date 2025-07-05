import { motion as Motion, AnimatePresence } from "framer-motion";
import {
	X,
	Info,
	Mail,
	Phone,
	LayoutDashboard,
	Settings,
	Bell,
} from "lucide-react"; // Icons

// Reusable HalfScreenDropdown Component
export const HalfScreenDropdown = ({ isOpen, onClose, title, children }) => {
	// Animation variants for the dropdown panel
	const dropdownVariants = {
		hidden: { y: "-100%", opacity: 0 }, // Starts off-screen above
		visible: {
			y: "0%", // Slides down to cover half screen
			opacity: 1,
			transition: {
				type: "spring",
				stiffness: 200,
				damping: 25,
				duration: 0.5,
				ease: "easeOut",
			},
		},
		exit: {
			y: "-100%", // Slides back up off-screen
			opacity: 0,
			transition: {
				duration: 0.3,
				ease: "easeIn",
			},
		},
	};

	// Animation variants for internal content (optional, for staggered effect)
	const contentVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.4, ease: "easeOut" },
		},
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<Motion.div
					className="fixed top-0 left-0 right-0 z-200  bg-black text-white shadow-2xl rounded-b-xl flex flex-col overflow-hidden"
					style={{ height: "70vh" }} // Covers half of the viewport height
					initial="hidden"
					animate="visible"
					exit="exit"
					variants={dropdownVariants}
				>
					{/* Close Button */}
					<button
						onClick={onClose}
						className="absolute top-4 right-4 p-2 rounded-full bg-black bg-opacity-20 hover:bg-opacity-30 transition-colors duration-200 z-10 focus:outline-none focus:ring-2 focus:ring-white"
						aria-label="Close dropdown"
					>
						<X className="w-6 h-6 text-white" />
					</button>

					{/* Navigation Bar */}
					<Motion.nav
						className="flex items-center justify-around p-4 md:p-6 border-b border-white border-opacity-20 flex-shrink-0"
						variants={contentVariants}
					>
						<h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 drop-shadow">
							{title || "Quick Access Panel"}
						</h2>
						{/* <div className="flex space-x-4 md:space-x-6">
							<a
								href="#"
								className="flex items-center gap-2 text-gray-200 hover:text-white transition-colors text-sm md:text-base"
							>
								<LayoutDashboard size={18} /> Dashboard
							</a>
							<a
								href="#"
								className="flex items-center gap-2 text-gray-200 hover:text-white transition-colors text-sm md:text-base"
							>
								<Settings size={18} /> Settings
							</a>
							<a
								href="#"
								className="flex items-center gap-2 text-gray-200 hover:text-white transition-colors text-sm md:text-base"
							>
								<Bell size={18} /> Notifications
							</a>
						</div> */}
					</Motion.nav>

					{/* Main Content Area */}
					<div className="flex-grow flex items-center justify-center p-4 md:p-8 overflow-y-auto custom-scrollbar">
						<Motion.div
							className="text-center max-w-2xl w-full"
							variants={contentVariants}
						>
							{children || (
								<>
									<h3 className="text-2xl md:text-3xl font-semibold mb-4 text-white drop-shadow">
										Important Updates & Announcements
									</h3>
									<p className="text-gray-300 mb-6 leading-relaxed text-sm md:text-base">
										Welcome to your personalized quick access panel. Here you'll
										find important announcements, system alerts, and quick links
										to frequently used features. We strive to keep you informed
										and provide a seamless experience.
									</p>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
										<div className="bg-white bg-opacity-15 p-4 rounded-lg shadow-inner">
											<h4 className="font-bold text-lg mb-2 flex items-center gap-2">
												<Info size={20} /> Latest Feature Rollout
											</h4>
											<p className="text-gray-300 text-sm">
												Discover our new collaborative document editing tools.
												Now available for all students and faculty.
											</p>
										</div>
										<div className="bg-white bg-opacity-15 p-4 rounded-lg shadow-inner">
											<h4 className="font-bold text-lg mb-2 flex items-center gap-2">
												<AlertTriangle size={20} className="text-yellow-300" />{" "}
												Scheduled Maintenance
											</h4>
											<p className="text-gray-300 text-sm">
												System maintenance is scheduled for July 15th, 2 AM - 4
												AM WAT. Services may be temporarily unavailable.
											</p>
										</div>
									</div>
								</>
							)}
						</Motion.div>
					</div>

					{/* Footer */}
					<Motion.footer
						className="p-4 md:p-6 border-t border-white border-opacity-20 text-center text-gray-400 text-xs md:text-sm flex-shrink-0"
						variants={contentVariants}
					>
						<div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6">
							<a
								href="#"
								className="hover:text-white transition-colors flex items-center gap-1"
							>
								<Mail size={14} /> support@innovationuni.edu
							</a>
							<a
								href="#"
								className="hover:text-white transition-colors flex items-center gap-1"
							>
								<Phone size={14} /> +1 (234) 567-8900
							</a>
							<span>
								&copy; 2025 Innovation University. All rights reserved.
							</span>
						</div>
					</Motion.footer>
				</Motion.div>
			)}
		</AnimatePresence>
	);
};
