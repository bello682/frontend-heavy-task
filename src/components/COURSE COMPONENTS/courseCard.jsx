// src/components/CourseCard.jsx

import React from "react";
import { motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingCart, DollarSign } from "../Icons/lucid-icons"; // Assuming these are exported from your Icons/index.js

const CourseCard = ({ course, itemVariants }) => {
	// Format price for display
	const formattedPrice = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(course.price);

	return (
		<Motion.div
			className="flex-none w-72 sm:w-80 md:w-96 lg:w-80 xl:w-96 bg-primary-white border border-gray-light rounded-xl shadow-lg
                       overflow-hidden transform hover:scale-103 hover:shadow-xl transition-all duration-300 ease-in-out
                       flex flex-col" // Added flex-col to ensure content pushes to bottom
			variants={itemVariants} // Inherit animation variants from parent slider
			whileHover={{ y: -5 }} // Slight lift on hover
		>
			{/* Course Image */}
			<div className="relative w-full h-48 bg-gray-200 overflow-hidden">
				<img
					src={course.image}
					alt={course.title}
					className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
					onError={(e) => {
						e.target.onerror = null;
						e.target.src =
							"https://placehold.co/400x250/E0E7FF/3B82F6?text=Image+Error"; // Fallback image
					}}
				/>
				<div className="absolute top-3 right-3 bg-primary-black text-black text-sm font-semibold px-3 py-1 rounded-full flex items-center space-x-1">
					<DollarSign size={16} />
					<span>{formattedPrice}</span>
				</div>
			</div>

			{/* Card Body */}
			<div className="p-4 flex-1 flex flex-col justify-between">
				{" "}
				{/* flex-1 to push footer down */}
				<h3 className="text-xl font-bold text-gray-text mb-2 line-clamp-2">
					{" "}
					{/* line-clamp for multiline ellipsis */}
					{course.title}
				</h3>
				<p className="text-gray-600 text-sm mb-4 line-clamp-3">
					{course.summary}
				</p>
				{/* Purchase Button */}
				<Link to={`/course/${course.id}`} className="mt-auto">
					{" "}
					{/* mt-auto pushes button to bottom */}
					<Motion.button
						className="w-full bg-primary-black text-primary-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2
                                   hover:bg-gray-800 transition-colors duration-200 shadow-md"
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
					>
						<ShoppingCart size={20} />
						<span>View Details</span>
					</Motion.button>
				</Link>
			</div>
		</Motion.div>
	);
};

export default CourseCard;
