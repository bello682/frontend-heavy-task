import React from "react";
import imagesAvata from "../../../assets/images/about_2-removebg-preview.png";
import { motion as Motion } from "framer-motion";

// Animation variants
const sectionVariants = {
	hidden: { opacity: 0, y: 50 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: "easeInOut" },
	},
};

const AboutSection = () => {
	return (
		<div>
			<section
				id="about"
				className="py-16 md:py-24 lg:py-32 px-6 md:px-10 lg:px-20"
			>
				<div className="container mx-auto">
					<Motion.div
						variants={sectionVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="grid md:grid-cols-2 gap-12 items-center"
					>
						<div>
							<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
								About Us
							</h2>
							<p className="text-gray-300 text-lg md:text-xl mb-6">
								The Department of Innovation is a leading academic and research
								institution dedicated to advancing the fields of computer
								science, information technology, and related disciplines. Our
								mission is to provide world-class education, conduct
								groundbreaking research, and foster innovation that addresses
								the challenges of the 21st century.
							</p>
							<p className="text-gray-300 text-lg md:text-xl">
								We are committed to excellence in teaching, research, and
								service, preparing our students to become leaders and innovators
								in their respective fields.
							</p>
						</div>
						<div className="">
							<img
								src={imagesAvata}
								alt="About Us"
								className="rounded-lg shadow-lg flex justify-center items-center m-auto"
							/>
						</div>
					</Motion.div>
				</div>
			</section>
		</div>
	);
};

export default AboutSection;
