import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import { Home, Menu, X } from "lucide-react";
import "../../../../src/App.css";

const NavBarSection = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div>
			<nav className="fixed top-0 left-0 w-full bg-gray-800 text-white z-50 shadow-md">
				<div className="flex justify-between items-center py-4 px-6 md:px-10 lg:px-20">
					{/* Logo and Title */}

					<Motion.div
						className="flex items-center gap-3"
						initial={{ opacity: 0, x: -30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
					>
						<a href="/" className="flex items-center gap-3">
							<div className="gradient_bg_colors   p-2 rounded-full shadow-lg">
								<Home className="text-white h-6 w-6 animate-pulse" />
							</div>
							<h1 className=" hidden lg:block text-2xl font-extrabold text-transparent bg-clip-text   text_gradient bg_clip_text animate-fade-in">
								Department of Innovation
							</h1>
						</a>
					</Motion.div>

					{/* Desktop Menu (only on large screens) */}
					<div className="hidden lg:flex gap-6">
						<a href="#about" className="hover:text-blue-300 transition-colors">
							About Us
						</a>
						<a
							href="#programs"
							className="hover:text-blue-300 transition-colors"
						>
							Programs
						</a>
						<a
							href="#faculty"
							className="hover:text-blue-300 transition-colors"
						>
							Faculty
						</a>
						<a
							href="#research"
							className="hover:text-blue-300 transition-colors"
						>
							Research
						</a>
						<a href="#news" className="hover:text-blue-300 transition-colors">
							News
						</a>
						<a
							href="#contact"
							className="hover:text-blue-300 transition-colors"
						>
							Contact
						</a>
					</div>

					{/* Mobile/Tablet Menu Toggle (visible below lg) */}
					<div className="lg:hidden">
						<button onClick={() => setIsOpen(!isOpen)}>
							{isOpen ? (
								<X className="w-7 h-7" />
							) : (
								<Menu className="w-7 h-7" />
							)}
						</button>
					</div>
				</div>

				{/* Fullscreen Overlay Menu */}
				{isOpen && (
					<div className="fixed top-20 inset-0 bg-gray-900 bg-opacity-95 z-50 flex flex-col justify-center items-center space-y-8 text-xl lg:hidden">
						<a
							href="#about"
							onClick={() => setIsOpen(false)}
							className="hover:text-blue-300"
						>
							About Us
						</a>
						<a
							href="#programs"
							onClick={() => setIsOpen(false)}
							className="hover:text-blue-300"
						>
							Programs
						</a>
						<a
							href="#faculty"
							onClick={() => setIsOpen(false)}
							className="hover:text-blue-300"
						>
							Faculty
						</a>
						<a
							href="#research"
							onClick={() => setIsOpen(false)}
							className="hover:text-blue-300"
						>
							Research
						</a>
						<a
							href="#news"
							onClick={() => setIsOpen(false)}
							className="hover:text-blue-300"
						>
							News
						</a>
						<a
							href="#contact"
							onClick={() => setIsOpen(false)}
							className="hover:text-blue-300"
						>
							Contact
						</a>
					</div>
				)}
			</nav>
		</div>
	);
};

export default NavBarSection;
