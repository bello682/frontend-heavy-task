import React from "react";
import { motion as Motion } from "framer-motion";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";
import "../../../../src/App.css";

const Herosection = () => {
	return (
		<div>
			<section className="bg-gradient-to-br from-gray-800 to-gray-900 py-16 md:py-24 lg:py-32 px-6 md:px-10 lg:px-20 h-screen">
				<div className=" mx-auto text-center flex flex-col justify-center items-center m-auto h-full">
					<Motion.h2
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: "easeInOut" }}
						className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text_gradient bg_clip_text"
					>
						Welcome to the Department of Innovation
					</Motion.h2>
					<Motion.p
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
						className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8"
					>
						Shaping the future through cutting-edge research and education.
					</Motion.p>
					<Motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6, ease: "easeInOut", delay: 0.6 }}
					>
						{/* <Link to="/signup"> */}
						<Link to="/all-our-courses">
							<Button
								variant="outline"
								size="lg"
								className="gradient_bg_colors text-white border-none hover:from-blue-600 hover:to-purple-600 cursor-pointer"
							>
								Explore Our Programs
							</Button>
						</Link>
					</Motion.div>
				</div>
			</section>
		</div>
	);
};

export default Herosection;
