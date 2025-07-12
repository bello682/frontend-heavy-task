// src/components/dashboard/AminDeleteCoursePage.jsx
import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaInfoCircle } from "react-icons/fa";
import Modal from "./../ui/adminModal";
import CourseListItem from "./../../constant/courseItem";
import { dummyApi } from "./../../api/dummyApi";

const AminDeleteCoursePage = () => {
	// Define accent colors directly in the component using Tailwind's arbitrary value syntax
	const accentColors = {
		green: "text-[#22C55E]", // Success/Positive
		red: "text-[#EF4444]", // Error/Negative
		blue: "text-[#3B82F6]", // Info/Highlight
		grayBg: "bg-gray-800", // Darker gray for card backgrounds on primary black
		lightGrayText: "text-gray-300", // Lighter gray for secondary text on dark backgrounds
		darkBgPrimary: "bg-black", // Primary background
		lightBgSecondary: "bg-white", // Secondary background
		darkTextPrimary: "text-white", // Primary text on dark backgrounds
		lightTextSecondary: "text-black", // Secondary text on light backgrounds
	};

	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	// State for modal visibility and the course currently selected for deletion
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [courseToDelete, setCourseToDelete] = useState(null); // { id: '...', title: '...' }

	// Function to fetch courses from the dummy API
	const fetchCourses = async () => {
		setLoading(true);
		setError("");
		try {
			const response = await dummyApi.getAllCourses(); // Call your dummy API to get courses
			if (response.success) {
				setCourses(response.courses);
			} else {
				setError(response.message || "Failed to fetch courses.");
			}
		} catch (err) {
			setError("An error occurred while fetching courses.");
			console.error("Fetch courses error:", err);
		} finally {
			setLoading(false);
		}
	};

	console.log(courses);

	// Effect hook to fetch courses when the component mounts
	useEffect(() => {
		fetchCourses();
	}, []); // Empty dependency array ensures this runs only once on mount

	// Handler for when a user clicks the delete button on a specific course item
	const handleDeleteClick = (courseId, courseTitle) => {
		setCourseToDelete({ id: courseId, title: courseTitle }); // Store the course details
		setIsModalOpen(true); // Open the confirmation modal
	};

	// Handler for confirming deletion within the modal
	const handleConfirmDelete = async () => {
		if (!courseToDelete) return; // Ensure a course is selected for deletion
		console.log("Deleting course:", courseToDelete); // 🧪 Debug

		setIsModalOpen(false); // Close the modal immediately
		setLoading(true); // Show loading state
		setSuccess(""); // Clear previous success message
		setError(""); // Clear previous error message

		try {
			const response = await dummyApi.deleteCourse(courseToDelete.id); // Call dummy API to delete course
			if (response.success) {
				setSuccess(`Course '${courseToDelete.title}' deleted successfully!`);
				setCourseToDelete(null); // Clear the course to delete state
				fetchCourses(); // Re-fetch the list of courses to update the UI
			} else {
				setError(
					response.message ||
						`Failed to delete course '${courseToDelete.title}'.`
				);
			}
		} catch (err) {
			setError(
				`An error occurred while deleting course '${courseToDelete.title}'.`
			);
			console.error("Delete course error:", err);
		} finally {
			setLoading(false); // Hide loading state
		}
	};

	// Handler for canceling deletion in the modal
	const handleCancelDelete = () => {
		setIsModalOpen(false); // Close the modal
		setCourseToDelete(null); // Clear the course to delete state
	};

	return (
		<div className={`p-4 md:p-8 ${accentColors.darkBgPrimary} min-h-full`}>
			{/* Page Header Section */}
			<div
				className={`${accentColors.lightBgSecondary} ${accentColors.lightTextSecondary} p-6 md:p-8 rounded-xl shadow-lg mb-8 animate-fade-in-down`}
			>
				<h2 className="text-3xl md:text-4xl font-extrabold mb-2">
					Delete Courses
				</h2>
				<p className={`text-lg md:text-xl ${accentColors.lightTextSecondary}`}>
					Manage and remove courses from the university catalog.
				</p>
			</div>

			{/* Loading, Error, Success Messages */}
			{loading && (
				<p className={`text-center text-lg ${accentColors.lightGrayText} mb-4`}>
					Loading courses...
				</p>
			)}
			{error && (
				<p className={`text-center text-lg ${accentColors.red} mb-4`}>
					{error}
				</p>
			)}
			{success && (
				<p className={`text-center text-lg ${accentColors.green} mb-4`}>
					{success}
				</p>
			)}

			{/* Message when no courses are available */}
			{courses.length === 0 && !loading && !error && (
				<div
					className={`text-center p-8 ${accentColors.grayBg} ${accentColors.darkTextPrimary} rounded-lg shadow-md`}
				>
					<FaInfoCircle
						className={`text-5xl mb-4 ${accentColors.blue} mx-auto`}
					/>
					<p className="text-xl font-semibold">
						No courses available to delete.
					</p>
					<p className={`${accentColors.lightGrayText} mt-2`}>
						Add new courses via the "Create Course" section.
					</p>
				</div>
			)}

			{/* Course List Display (Table-like grid) */}
			<div className="grid grid-cols-1 gap-4">
				{/* Map through the courses and render a CourseListItem for each */}
				{courses.map((course) => (
					<CourseListItem
						key={course._id}
						course={course}
						onDeleteClick={handleDeleteClick} // Pass the delete handler
					/>
				))}
			</div>

			{/* Delete Confirmation Modal */}
			{isModalOpen && courseToDelete && (
				<Modal
					isOpen={isModalOpen}
					onClose={handleCancelDelete}
					title="Confirm Deletion"
					onConfirm={handleConfirmDelete}
					confirmText="Delete Course"
					cancelText="Don't Delete"
					confirmVariant="danger" // Use the danger variant for the delete button
				>
					<p className={`${accentColors.lightTextSecondary} text-center`}>
						Are you sure you want to delete the course: <br />
						<span className={`font-bold text-lg ${accentColors.red}`}>
							"{courseToDelete.title}"
						</span>
						?
						<br /> This action cannot be undone.
					</p>
				</Modal>
			)}

			{/* Custom Animations for the page */}
			<style jsx="true">{`
				@keyframes fadeInDown {
					from {
						opacity: 0;
						transform: translateY(-20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
				.animate-fade-in-down {
					animation: fadeInDown 0.7s ease-out forwards;
				}
			`}</style>
		</div>
	);
};

export default AminDeleteCoursePage;
