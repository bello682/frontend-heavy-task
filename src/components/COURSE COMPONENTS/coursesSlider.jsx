// src / components / CourseSlider.jsx;

import React from "react";
import { motion as Motion } from "framer-motion"; // Using Motion as alias
import CourseCard from "./courseCard";

const CourseSlider = ({ title, courses }) => {
	// Animation variants for staggered appearance of cards within the slider
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.08, // Slightly faster stagger for cards
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, x: -50 }, // Cards slide in from left
		visible: { opacity: 1, x: 0 },
	};

	return (
		<section className="mb-12">
			<Motion.h2
				className="text-3xl sm:text-4xl font-bold text-gray-text mb-6 pl-4 sm:pl-0"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				{title}
			</Motion.h2>

			<Motion.div
				className="flex overflow-x-auto snap-x snap-mandatory pb-4 px-4 sm:px-0
                           scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
				// FIX: Removed lg:overflow-x-hidden lg:snap-none to allow scrolling on all screen sizes
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				{courses.map((course) => (
					<div
						key={course.id}
						className="snap-center flex-shrink-0 mr-4 last:mr-0"
					>
						<CourseCard course={course} itemVariants={itemVariants} />
					</div>
				))}
			</Motion.div>
		</section>
	);
};

export default CourseSlider;
