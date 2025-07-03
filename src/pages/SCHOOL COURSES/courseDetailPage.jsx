// src/pages/CourseDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import {
	getCourseById,
	getRelatedCourses,
} from "./../../components/COURSE COMPONENTS/API";
import CourseCard from "./../../components/COURSE COMPONENTS/courseCard";
import PaymentSidebar from "./components/payments/paymentSideBar";
import PaymentSuccessCard from "./components/modals & cards/paymentSuccessfullCard";
import ReceiptModal from "./components/modals & cards/paymentReceiptModal";
import {
	ShoppingCart,
	BookOpen,
	DollarSign,
	Calendar,
	Award,
	UserSquare,
	List,
	CheckCircle,
} from "../../components/Icons/lucid-icons"; // Import necessary icons

const CourseDetailPage = () => {
	const { id } = useParams(); // Get course ID from URL
	const navigate = useNavigate();
	const [course, setCourse] = useState(null);
	const [relatedCourses, setRelatedCourses] = useState([]);
	const [isPaymentSidebarOpen, setIsPaymentSidebarOpen] = useState(false);
	const [showPaymentSuccessModal, setShowPaymentSuccessModal] = useState(false); // NEW: State for success card
	const [showReceiptModal, setShowReceiptModal] = useState(false); // NEW: State for receipt modal
	const [receiptDetails, setReceiptDetails] = useState(null); // NEW: State for receipt data

	useEffect(() => {
		// Fetch course details based on ID
		const foundCourse = getCourseById(id);
		if (foundCourse) {
			setCourse(foundCourse);
			// Fetch related courses, excluding the current one
			setRelatedCourses(getRelatedCourses(id, 4)); // Get 4 related courses
			// Reset modal states when a new course is loaded
			setIsPaymentSidebarOpen(false);
			setShowPaymentSuccessModal(false);
			setShowReceiptModal(false);
			setReceiptDetails(null);
		} else {
			// If course not found, navigate to home or a 404 page
			navigate("/");
		}
	}, [id, navigate]);

	// This function is now called by PaymentSidebar upon successful payment
	const handlePaymentSuccess = (receiptData) => {
		// NEW: Receive receiptData from sidebar
		console.log("Payment successful for course:", course.title);
		setReceiptDetails(receiptData); // Store receipt data
		setIsPaymentSidebarOpen(false); // Close sidebar FIRST
		setShowPaymentSuccessModal(true); // THEN show success card
	};

	// This function is called by PaymentSidebar upon failed payment
	const handlePaymentFailure = () => {
		console.log("Payment failed for course:", course.title);
		// You might want to keep the sidebar open or show an error message within it
		// setIsPaymentSidebarOpen(false); // Optionally close sidebar on failure
	};

	// Open receipt modal from success card
	const handleViewReceipt = () => {
		setShowPaymentSuccessModal(false); // Close success card
		setShowReceiptModal(true); // Open receipt modal
	};

	// Close all modals/sidebar when done with receipt
	const handleCloseReceiptModal = () => {
		setShowReceiptModal(false);
		// Optionally navigate away or reset course selection here
	};

	if (!course) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-bg text-gray-text">
				<p className="text-xl font-medium">Loading course details...</p>
			</div>
		); // Or a custom loader component
	}

	return (
		<div className="min-h-screen bg-gray-bg font-inter text-primary-black py-8 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto mt-20">
				{/* Course Title and Purchase Button */}
				<Motion.header
					className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-4 border-b border-gray-light"
					variants={{
						hidden: { opacity: 0, y: -20 },
						visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
					}}
					initial="hidden"
					animate="visible"
				>
					<h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-text mb-4 md:mb-0">
						{course.title}
					</h1>
					<Motion.button
						onClick={() => setIsPaymentSidebarOpen(true)}
						className="px-6 py-3 bg-accent-blue text-primary-white font-bold text-lg rounded-lg shadow-md
                                   hover:bg-[#3b82f6] transition-colors duration-300 transform hover:scale-105 flex items-center space-x-2"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<ShoppingCart size={20} />
						<span>Purchase This Course Now</span>
					</Motion.button>
				</Motion.header>

				{/* Course Details Section */}
				<Motion.section
					className="bg-primary-white rounded-xl shadow-lg p-6 sm:p-8 mb-12 grid grid-cols-1 lg:grid-cols-2 gap-8"
					variants={{
						hidden: { opacity: 0, x: -20 },
						visible: {
							opacity: 1,
							x: 0,
							transition: { duration: 0.6, delay: 0.2 },
						},
					}}
					initial="hidden"
					animate="visible"
				>
					{/* Course Image */}
					<div className="w-full h-auto rounded-lg overflow-hidden shadow-md">
						<img
							src={course.image}
							alt={course.title}
							className="w-full h-full object-cover"
							onError={(e) => {
								e.target.onerror = null;
								e.target.src =
									"https://placehold.co/600x400/E0E7FF/3B82F6?text=Image+Error"; // Fallback
							}}
						/>
					</div>

					{/* Course Info */}
					<div className="space-y-4">
						<p className="text-gray-700 text-lg leading-relaxed">
							{course.description}
						</p>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div className="flex items-center space-x-2 text-gray-700">
								<DollarSign size={20} className="text-accent-blue" />
								<span className="font-semibold">Price:</span>
								<span>
									{new Intl.NumberFormat("en-US", {
										style: "currency",
										currency: "USD",
									}).format(course.price)}
								</span>
							</div>
							<div className="flex items-center space-x-2 text-gray-700">
								<Calendar size={20} className="text-accent-blue" />
								<span className="font-semibold">Duration:</span>
								<span>{course.duration}</span>
							</div>
							<div className="flex items-center space-x-2 text-gray-700">
								<Award size={20} className="text-accent-blue" />
								<span className="font-semibold">Level:</span>
								<span>{course.level}</span>
							</div>
							<div className="flex items-center space-x-2 text-gray-700">
								<UserSquare size={20} className="text-accent-blue" />
								<span className="font-semibold">Instructor:</span>
								<span>{course.instructor}</span>
							</div>
						</div>

						{course.prerequisites && (
							<div>
								<h3 className="text-xl font-semibold text-gray-text mb-2 flex items-center space-x-2">
									<List size={20} className="text-accent-blue" />
									<span>Prerequisites:</span>
								</h3>
								<p className="text-gray-700">{course.prerequisites}</p>
							</div>
						)}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 ">
							{course.modules && course.modules.length > 0 && (
								<div>
									<h3 className="text-xl font-semibold text-gray-text mb-2 flex items-center space-x-2">
										<BookOpen size={20} className="text-accent-blue" />
										<span>Course Modules:</span>
									</h3>
									<ul className="list-disc list-inside text-gray-700 space-y-1">
										{course.modules.map((module, index) => (
											<li key={index}>{module}</li>
										))}
									</ul>
								</div>
							)}

							{course.benefits && course.benefits.length > 0 && (
								<div>
									<h3 className="text-xl font-semibold text-gray-text mb-2 flex items-center space-x-2">
										<CheckCircle size={20} className="text-accent-blue" />
										<span>What You'll Learn:</span>
									</h3>
									<ul className="list-disc list-inside text-gray-700 space-y-1">
										{course.benefits.map((benefit, index) => (
											<li key={index}>{benefit}</li>
										))}
									</ul>
								</div>
							)}
						</div>
					</div>
				</Motion.section>

				{/* Related Courses Section */}
				{relatedCourses.length > 0 && (
					<Motion.section
						className="mb-12  justify-center m-auto items-center flex flex-col"
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.4 }}
					>
						<h2 className="text-3xl sm:text-4xl font-bold text-gray-text mb-10">
							Related Courses
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
							{relatedCourses.map((relatedCourse) => (
								<CourseCard key={relatedCourse.id} course={relatedCourse} />
							))}
						</div>
					</Motion.section>
				)}
			</div>

			{/* Payment Sidebar - now only controls its own visibility */}
			<PaymentSidebar
				isOpen={isPaymentSidebarOpen}
				onClose={() => setIsPaymentSidebarOpen(false)}
				course={course}
				onPaymentSuccess={handlePaymentSuccess} // Pass the updated handler
				onPaymentFailure={handlePaymentFailure}
			/>

			{/* Payment Success Card Modal - Rendered directly here */}
			<PaymentSuccessCard
				isOpen={showPaymentSuccessModal}
				onClose={() => setShowPaymentSuccessModal(false)}
				onViewReceipt={handleViewReceipt}
				courseTitle={course.title}
			/>

			{/* Receipt Modal - Rendered directly here */}
			<ReceiptModal
				isOpen={showReceiptModal}
				onClose={handleCloseReceiptModal} // Use the specific close handler
				receiptDetails={receiptDetails}
			/>
		</div>
	);
};

export default CourseDetailPage;


