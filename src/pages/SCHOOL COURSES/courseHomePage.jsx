// src/pages/HomePage.jsx

import React from "react";
import { motion as Motion } from "framer-motion";
import CourseSlider from "./../../components/COURSE COMPONENTS/coursesSlider";
import {
	courses,
	getMostPurchasedCourses,
	getHotCourses,
} from "../../components/COURSE COMPONENTS/API";

const CourseHomePage = () => {
	// Filter courses for different sections using dummy data functions
	const ourCourses = courses; // All courses for "Our Courses" section
	const mostPurchasedCourses = getMostPurchasedCourses(5); // Get top 5 most purchased
	const hotCourses = getHotCourses(5); // Get top 5 hot courses

	return (
		<div className="min-h-screen bg-gray-bg font-inter text-primary-black py-8">
			{/* Hero Section */}
			<Motion.header
				className="text-center py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-black to-gray-text text-primary-white rounded-b-3xl shadow-lg mb-12"
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
					Innovation University Academy
				</h1>
				<p className="text-lg sm:text-xl max-w-2xl mx-auto opacity-90">
					Unlock Your Potential with Cutting-Edge Tech & Diverse Courses.
				</p>
				<Motion.button
					className="mt-8 px-8 py-4 bg-accent-blue text-primary-white font-bold text-lg rounded-full shadow-lg
                                hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					Explore All Courses
				</Motion.button>
			</Motion.header>

			{/* Course Sections */}
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section 1: Our Courses */}
				<CourseSlider title="Our Courses" courses={ourCourses} />

				{/* Section 2: Most Purchased Courses */}
				<CourseSlider
					title="Most Popular Courses"
					courses={mostPurchasedCourses}
				/>

				{/* Section 3: Hot Courses */}
				<CourseSlider title="Trending Courses" courses={hotCourses} />
			</main>
		</div>
	);
};

export default CourseHomePage;
