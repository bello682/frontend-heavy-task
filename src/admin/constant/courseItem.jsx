// src/components/dashboard/CourseListItem.jsx
import React from "react";
import Button from "./../components/ui/Button";
import {
	FaTrashAlt,
	FaBookOpen,
	FaUserGraduate,
	FaDollarSign,
	FaClock,
} from "react-icons/fa";

const CourseListItem = ({ course, onDeleteClick }) => {
	// Safely get the first image URL if available
	const imageUrl =
		course?.subDepartment?.image?.[0]?.url ||
		"https://placehold.co/100x100/333333/FFFFFF?text=No+Image";
	// Define accent colors directly in the component
	const accentColors = {
		grayBg: "bg-gray-800", // Darker gray for card backgrounds on primary black
		lightGrayText: "text-gray-300", // Lighter gray for secondary text on dark backgrounds
		darkTextPrimary: "text-white", // Primary text on dark backgrounds
		red: "text-[#EF4444]", // Red for delete button
	};

	return (
		<div
			className={`flex flex-col sm:flex-row items-center ${accentColors.grayBg} ${accentColors.darkTextPrimary} p-4 rounded-lg shadow-md mb-4
                        border border-gray-700 transition-transform duration-200 hover:scale-[1.01] animate-fade-in-up`}
		>
			{/* Course Image */}
			<div className="w-full sm:w-24 h-24 flex-shrink-0 mb-4 sm:mb-0 sm:mr-4 rounded-md overflow-hidden border border-gray-600">
				<img
					src={imageUrl}
					alt={course.title}
					className="w-full h-full object-cover"
					onError={(e) => {
						e.target.onerror = null;
						e.target.src =
							"https://placehold.co/100x100/333333/FFFFFF?text=No+Image";
					}}
				/>
			</div>

			{/* Course Details (responsive layout) */}
			<div className="flex-1 text-center sm:text-left">
				{/* <h3 className="text-xl font-bold mb-1">{course.title}</h3>
				<p
					className={`text-sm ${accentColors.lightGrayText} flex items-center justify-center sm:justify-start mb-1`}
				>
					<FaUserGraduate className="mr-2" /> {course.instructor}
				</p>
				<p
					className={`text-sm ${accentColors.lightGrayText} flex items-center justify-center sm:justify-start mb-1`}
				>
					<FaClock className="mr-2" /> {course.duration}
				</p>
				<p
					className={`text-lg font-semibold flex items-center justify-center sm:justify-start`}
				>
					<FaDollarSign className="mr-2" /> ${course.price.toFixed(2)}
				</p> */}
				<h3 className="text-xl font-bold mb-1">
					{course?.subDepartment?.title || "Untitled Course"}
				</h3>
				<p
					className={`text-sm ${accentColors.lightGrayText} flex items-center justify-center sm:justify-start mb-1`}
				>
					<FaUserGraduate className="mr-2" />{" "}
					{course?.subDepartment?.instructor || "Unknown Instructor"}
				</p>
				<p
					className={`text-sm ${accentColors.lightGrayText} flex items-center justify-center sm:justify-start mb-1`}
				>
					<FaClock className="mr-2" />{" "}
					{course?.subDepartment?.duration || "Duration N/A"}
				</p>
				<p
					className={`text-lg font-semibold flex items-center justify-center sm:justify-start`}
				>
					<FaDollarSign className="mr-2" />
					{course?.subDepartment?.price
						? `$${course?.subDepartment?.price}`
						: "Price not set"}
				</p>
			</div>

			{/* Delete Button */}
			<div className="mt-4 sm:mt-0 sm:ml-auto">
				<Button
					key={course._id}
					onClick={() =>
						onDeleteClick(course._id, course?.subDepartment?.title)
					}
					variant="danger"
					className="flex items-center justify-center px-6 py-2"
				>
					<FaTrashAlt className="mr-2" /> Delete Course
				</Button>
			</div>
			{/* Custom Animations for List Item */}
			<style jsx="true">{`
				@keyframes fadeInUp {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
				.animate-fade-in-up {
					animation: fadeInUp 0.5s ease-out forwards;
				}
			`}</style>
		</div>
	);
};

export default CourseListItem;
