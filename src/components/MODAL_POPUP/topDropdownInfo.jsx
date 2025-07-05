// import { useState } from "react";
import { motion as Motion } from "framer-motion";
import { Bell, Info, ShieldAlert, Home } from "lucide-react"; // Icons
import { HalfScreenDropdown } from "./topDropdownModal";

const WarningInfo = ({ isDropdownOpen, setIsDropdownOpen }) => {
	// const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	return (
		<div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8 font-inter text-white">
			{/* Logo and Title - positioned at top-left, responsive */}
			<Motion.div
				className="fixed top-6 left-6 md:top-10 md:left-10 z-10"
				initial={{ opacity: 0, x: -50 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
			>
				<a href="/" className="flex items-center gap-2 md:gap-3 group">
					<div className="p-2 rounded-full shadow-lg bg-gradient-to-br from-purple-600 to-blue-600 group-hover:scale-110 transition-transform duration-300">
						<Home className="text-white h-5 w-5 md:h-6 md:w-6 animate-pulse" />
					</div>
					<h1 className="hidden sm:block text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 animate-fade-in">
						Department of Innovation
					</h1>
				</a>
			</Motion.div>

			<Motion.div
				className="relative z-10 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-20 shadow-2xl rounded-xl p-8 text-center max-w-xl"
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
			>
				<h1 className="text-4xl font-bold mb-4 text-white drop-shadow">
					Demonstrating the Dropdown
				</h1>
				<p className="text-lg text-gray-300 mb-8">
					Click the button below to open the half-screen animated dropdown.
				</p>
				<button
					onClick={() => setIsDropdownOpen(true)}
					className="py-3 px-8 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-teal-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
				>
					Open Quick Access
				</button>
			</Motion.div>

			{/* The HalfScreenDropdown component */}
			<HalfScreenDropdown
				isOpen={isDropdownOpen}
				onClose={() => setIsDropdownOpen(false)}
				title="Innovation University Alerts"
			>
				{/* You can pass custom content here, or use the default content */}
				<h3 className="text-2xl md:text-3xl font-semibold mb-4 text-white drop-shadow">
					Important Notifications
				</h3>
				<p className="text-gray-300 mb-6 leading-relaxed text-sm md:text-base">
					Stay up-to-date with the latest news and essential information from
					Innovation University. Your academic success and security are our top
					priorities.
				</p>
				<ul className="text-left space-y-3 text-gray-200 text-sm md:text-base">
					<li className="flex items-start gap-3">
						<Bell size={20} className="text-yellow-300 flex-shrink-0 mt-1" />
						<div>
							<span className="font-medium">
								New Course Registration Period:
							</span>{" "}
							Opens August 1st for Fall Semester.
						</div>
					</li>
					<li className="flex items-start gap-3">
						<ShieldAlert
							size={20}
							className="text-red-300 flex-shrink-0 mt-1"
						/>
						<div>
							<span className="font-medium">Security Advisory:</span> Phishing
							attempts reported. Always verify sender before clicking links.
						</div>
					</li>
					<li className="flex items-start gap-3">
						<Info size={20} className="text-blue-300 flex-shrink-0 mt-1" />
						<div>
							<span className="font-medium">Campus Events:</span> Check the
							student portal for upcoming workshops and seminars.
						</div>
					</li>
				</ul>
			</HalfScreenDropdown>

			{/* Custom CSS for animations and font */}
			<style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

                .font-inter {
                    font-family: 'Inter', sans-serif;
                }

                /* Custom gradient for text and background elements */
                .gradient_bg_colors {
                    background: linear-gradient(to right, #8b5cf6, #6366f1);
                }

                .text_gradient {
                    background: linear-gradient(to right, #fbcfe8, #d8b4fe, #93c5fd);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                /* Blob animation for background elements */
                @keyframes blob {
                    0% {
                        transform: translate(0px, 0px) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                    100% {
                        transform: translate(0px, 0px) scale(1);
                    }
                }

                .animate-blob {
                    animation: blob 7s infinite cubic-bezier(0.6, 0.01, 0.4, 1);
                }

                .animation-delay-2000 {
                    animation-delay: 2s;
                }

                .animation-delay-4000 {
                    animation-delay: 4s;
                }

                /* Fade-in animation for title */
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 1s ease-out forwards;
                }

                /* Custom scrollbar for content area */
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }

                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 10px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.5);
                }
            `}</style>
		</div>
	);
};

export default WarningInfo;
