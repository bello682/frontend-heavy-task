// import React, { useState } from "react";
// import Data_Balance_Card from "./data-balance-card";
// import Dash_Quick_ActionsGrid from "./dash-quick-action";
// import Dash_Recent_Transactions from "./recent-transactions";
// import { motion as Motion } from "framer-motion";

// const Dash_own_details = () => {
// 	// State to toggle balance visibility, managed here as it affects BalanceCard
// 	const [showBalance, setShowBalance] = useState(true);

// 	const currentBalance = 12345.67;

// 	// Dummy transaction data
// 	const recentTransactions = [
// 		{
// 			id: 1,
// 			description: "Coffee Shop",
// 			amount: -5.5,
// 			date: "Jul 1",
// 			type: "debit",
// 		},
// 		{
// 			id: 2,
// 			description: "Salary Deposit",
// 			amount: 2500.0,
// 			date: "Jun 30",
// 			type: "credit",
// 		},
// 		{
// 			id: 3,
// 			description: "Online Subscription",
// 			amount: -12.99,
// 			date: "Jun 29",
// 			type: "debit",
// 		},
// 		{
// 			id: 4,
// 			description: "Grocery Store",
// 			amount: -75.2,
// 			date: "Jun 28",
// 			type: "debit",
// 		},
// 	];

// 	const itemVariants = {
// 		hidden: { opacity: 0, y: 20 },
// 		visible: { opacity: 1, y: 0 },
// 	};

// 	const containerVariants = {
// 		hidden: { opacity: 0 },
// 		visible: {
// 			opacity: 1,
// 			transition: {
// 				staggerChildren: 0.1,
// 			},
// 		},
// 	};

// 	return (
// 		<Motion.div variants={containerVariants} initial="hidden" animate="visible">
// 			{/* Balance Overview Card */}
// 			<Data_Balance_Card
// 				currentBalance={currentBalance}
// 				showBalance={showBalance}
// 				setShowBalance={setShowBalance}
// 				itemVariants={itemVariants}
// 			/>

// 			{/* Quick Actions Grid */}
// 			<Dash_Quick_ActionsGrid itemVariants={itemVariants} />

// 			{/* Recent Transactions */}
// 			<Dash_Recent_Transactions
// 				transactions={recentTransactions}
// 				itemVariants={itemVariants}
// 			/>
// 		</Motion.div>
// 	);
// };

// export default Dash_own_details;

// src/components/user-dashboard/UserDashboardHome.jsx

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
// 	FaUserGraduate,
// 	FaBookOpen,
// 	FaCheckCircle,
// 	FaChartLine,
// 	FaCalendarAlt,
// 	FaClipboardList,
// 	FaBell,
// 	FaArrowRight,
// 	FaStar,
// 	FaHourglassHalf,
// 	FaPercentage,
// 	FaEnvelopeOpenText,
// 	FaArrowUp,
// 	FaArrowDown,
// } from "react-icons/fa";

// const Dash_own_details = () => {
// 	// Define accent colors directly in the component
// 	const accentColors = {
// 		green: "text-[#22C55E]", // Success/Positive
// 		red: "text-[#EF4444]", // Alert/Negative
// 		blue: "text-[#3B82F6]", // Info/Highlight
// 		orange: "text-[#F97316]", // Warning/Attention
// 		purple: "text-[#8B5CF6]", // Another accent color
// 		grayBg: "bg-gray-100", // Lighter gray for card backgrounds on primary white
// 		darkGrayText: "text-gray-700", // Darker gray for secondary text on light backgrounds
// 		darkBgPrimary: "bg-white", // Primary background (main page background)
// 		lightBgSecondary: "bg-black", // Secondary background (for contrast elements)
// 		darkTextPrimary: "text-black", // Primary text on light backgrounds
// 		lightTextSecondary: "text-white", // Secondary text on dark backgrounds
// 	};

// 	// Dummy user data
// 	const [userData, setUserData] = useState({
// 		userName: "Alex Johnson",
// 		coursesEnrolled: 5,
// 		coursesCompleted: 2,
// 		averageGrade: 88.5,
// 		upcomingAssignments: [
// 			{
// 				id: 1,
// 				title: "AI Ethics Essay",
// 				course: "Intro to AI",
// 				dueDate: "2025-07-20",
// 				status: "pending",
// 			},
// 			{
// 				id: 2,
// 				title: "React Project Milestone 1",
// 				course: "Web Dev Basics",
// 				dueDate: "2025-07-25",
// 				status: "pending",
// 			},
// 			{
// 				id: 3,
// 				title: "Cybersecurity Lab Report",
// 				course: "Cybersecurity Fundamentals",
// 				dueDate: "2025-08-01",
// 				status: "pending",
// 			},
// 		],
// 		enrolledCourses: [
// 			{
// 				id: "ai001",
// 				title: "Introduction to AI & Machine Learning",
// 				progress: 75,
// 				instructor: "Dr. Anya Sharma",
// 			},
// 			{
// 				id: "web002",
// 				title: "Web Development Basics",
// 				progress: 40,
// 				instructor: "Prof. Emily White",
// 			},
// 			{
// 				id: "cs003",
// 				title: "Cybersecurity Fundamentals",
// 				progress: 10,
// 				instructor: "Mr. David Lee",
// 			},
// 		],
// 		recentGrades: [
// 			{
// 				id: 1,
// 				course: "Intro to AI",
// 				assignment: "Module 1 Quiz",
// 				grade: 92,
// 				date: "2025-07-05",
// 			},
// 			{
// 				id: 2,
// 				course: "Web Dev Basics",
// 				assignment: "HTML/CSS Basics",
// 				grade: 85,
// 				date: "2025-06-28",
// 			},
// 		],
// 		announcements: [
// 			{
// 				id: 1,
// 				title: "Summer Internship Program Applications Open!",
// 				date: "2025-07-08",
// 			},
// 			{
// 				id: 2,
// 				title: "Guest Lecture: Future of Quantum Computing",
// 				date: "2025-07-07",
// 			},
// 		],
// 	});

// 	// Simulate "real-time" updates for dynamic elements
// 	useEffect(() => {
// 		const interval = setInterval(() => {
// 			setUserData((prevData) => ({
// 				...prevData,
// 				// Simulate slight changes in progress or new assignments
// 				enrolledCourses: prevData.enrolledCourses.map((course) => ({
// 					...course,
// 					progress: Math.min(
// 						100,
// 						course.progress + (Math.random() > 0.7 ? 1 : 0)
// 					),
// 				})),
// 				// Simulate a new announcement occasionally
// 				announcements:
// 					Math.random() > 0.9
// 						? [
// 								{
// 									id: Date.now(),
// 									title: `New Event: Workshop on ${
// 										["AI", "Web", "Data"][Math.floor(Math.random() * 3)]
// 									} Tools`,
// 									date: new Date().toLocaleDateString(),
// 								},
// 								...prevData.announcements.slice(0, 2),
// 						  ]
// 						: prevData.announcements,
// 			}));
// 		}, 15000); // Update every 15 seconds

// 		return () => clearInterval(interval);
// 	}, []);

// 	const StatCard = ({ title, value, icon, unit = "", trend }) => {
// 		const trendColor =
// 			trend > 0
// 				? accentColors.green
// 				: trend < 0
// 				? accentColors.red
// 				: accentColors.darkGrayText;
// 		const TrendIcon = trend > 0 ? FaArrowUp : FaArrowDown;

// 		return (
// 			<div
// 				className={`relative ${accentColors.grayBg} ${accentColors.darkTextPrimary} p-6 rounded-xl shadow-lg overflow-hidden
//                             transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl
//                             flex flex-col justify-between animate-fade-in border border-gray-200`}
// 			>
// 				<div className="absolute top-4 right-4 text-gray-300 opacity-50 text-5xl">
// 					{icon}
// 				</div>
// 				<h3 className="text-lg md:text-xl font-semibold mb-2 z-10">{title}</h3>
// 				<p className="text-4xl md:text-5xl font-extrabold z-10">
// 					{value}
// 					{unit}
// 				</p>
// 				{trend !== undefined && (
// 					<div className="flex items-center mt-3 z-10">
// 						<TrendIcon className={`mr-1 ${trendColor}`} />
// 						<span className={`text-sm md:text-base font-medium ${trendColor}`}>
// 							{Math.abs(trend)}% {trend > 0 ? "Up" : trend < 0 ? "Down" : ""}
// 						</span>
// 						<span
// 							className={`text-sm md:text-base ml-2 ${accentColors.darkGrayText}`}
// 						>
// 							vs. last month
// 						</span>
// 					</div>
// 				)}
// 			</div>
// 		);
// 	};

// 	const ProgressBar = ({ progress }) => (
// 		<div className="w-full bg-gray-300 rounded-full h-2.5">
// 			<div
// 				className={`h-2.5 rounded-full transition-all duration-500 ease-out ${
// 					progress > 75
// 						? "bg-[#22C55E]"
// 						: progress > 40
// 						? "bg-[#3B82F6]"
// 						: "bg-[#F97316]"
// 				}`}
// 				style={{ width: `${progress}%` }}
// 			></div>
// 		</div>
// 	);

// 	return (
// 		<div className={`p-4 md:p-8 ${accentColors.darkBgPrimary} min-h-full`}>
// 			{/* Welcome Section */}
// 			<div
// 				className={`${accentColors.lightBgSecondary} ${accentColors.lightTextSecondary} p-6 md:p-8 rounded-xl shadow-lg mb-8 animate-fade-in-down`}
// 			>
// 				<h2 className="text-3xl md:text-4xl font-extrabold mb-2">
// 					Welcome, {userData.userName}!
// 				</h2>
// 				<p className={`text-lg md:text-xl ${accentColors.lightTextSecondary}`}>
// 					Your personalized learning journey at Innovation University.
// 				</p>
// 			</div>

// 			{/* Key User Metrics */}
// 			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
// 				<StatCard
// 					title="Courses Enrolled"
// 					value={userData.coursesEnrolled}
// 					icon={<FaBookOpen />}
// 				/>
// 				<StatCard
// 					title="Courses Completed"
// 					value={userData.coursesCompleted}
// 					icon={<FaCheckCircle />}
// 					trend={20} // Example trend: 20% more courses completed
// 				/>
// 				<StatCard
// 					title="Average Grade"
// 					value={userData.averageGrade.toFixed(1)}
// 					unit="%"
// 					icon={<FaChartLine />}
// 					trend={-1.5} // Example trend: slight drop
// 				/>
// 			</div>

// 			{/* My Courses & Upcoming Assignments */}
// 			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
// 				{/* My Courses */}
// 				<div
// 					className={`${accentColors.grayBg} ${accentColors.darkTextPrimary} p-6 rounded-xl shadow-lg animate-fade-in-left`}
// 				>
// 					<h3 className="text-2xl font-bold mb-4 flex items-center">
// 						<FaBookOpen className="mr-3" /> My Enrolled Courses
// 					</h3>
// 					<div className="space-y-4">
// 						{userData.enrolledCourses.map((course) => (
// 							<div
// 								key={course.id}
// 								className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 animate-fade-in-up"
// 							>
// 								<h4 className="text-lg font-semibold mb-1">{course.title}</h4>
// 								<p className={`text-sm ${accentColors.darkGrayText} mb-2`}>
// 									Instructor: {course.instructor}
// 								</p>
// 								<div className="flex items-center text-sm">
// 									<span className="mr-2">Progress:</span>
// 									<ProgressBar progress={course.progress} />
// 									<span className="ml-2 font-bold">{course.progress}%</span>
// 								</div>
// 								<Link
// 									to={`/user/courses/${course.id}`}
// 									className={`mt-3 inline-flex items-center text-sm font-semibold ${accentColors.blue} hover:underline`}
// 								>
// 									Go to Course <FaArrowRight className="ml-2 text-xs" />
// 								</Link>
// 							</div>
// 						))}
// 					</div>
// 				</div>

// 				{/* Upcoming Assignments */}
// 				<div
// 					className={`${accentColors.grayBg} ${accentColors.darkTextPrimary} p-6 rounded-xl shadow-lg animate-fade-in-right`}
// 				>
// 					<h3 className="text-2xl font-bold mb-4 flex items-center">
// 						<FaCalendarAlt className="mr-3" /> Upcoming Deadlines
// 					</h3>
// 					<div className="space-y-3">
// 						{userData.upcomingAssignments.length > 0 ? (
// 							userData.upcomingAssignments.map((assignment) => (
// 								<div
// 									key={assignment.id}
// 									className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 animate-fade-in-up"
// 								>
// 									<h4 className="text-lg font-semibold">{assignment.title}</h4>
// 									<p className={`text-sm ${accentColors.darkGrayText}`}>
// 										Course: {assignment.course}
// 									</p>
// 									<p
// 										className={`text-sm font-medium ${accentColors.orange} flex items-center`}
// 									>
// 										<FaHourglassHalf className="mr-2" /> Due:{" "}
// 										{assignment.dueDate}
// 									</p>
// 									<Link
// 										to={`/user/assignments/${assignment.id}`}
// 										className={`mt-2 inline-flex items-center text-sm font-semibold ${accentColors.blue} hover:underline`}
// 									>
// 										View Details <FaArrowRight className="ml-2 text-xs" />
// 									</Link>
// 								</div>
// 							))
// 						) : (
// 							<p className={`${accentColors.darkGrayText}`}>
// 								No upcoming assignments. Keep up the great work!
// 							</p>
// 						)}
// 					</div>
// 				</div>
// 			</div>

// 			{/* Recent Grades & Announcements */}
// 			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
// 				{/* Recent Grades */}
// 				<div
// 					className={`${accentColors.grayBg} ${accentColors.darkTextPrimary} p-6 rounded-xl shadow-lg animate-fade-in-up`}
// 				>
// 					<h3 className="text-2xl font-bold mb-4 flex items-center">
// 						<FaClipboardList className="mr-3" /> Recent Grades
// 					</h3>
// 					<div className="space-y-3">
// 						{userData.recentGrades.length > 0 ? (
// 							userData.recentGrades.map((grade) => (
// 								<div
// 									key={grade.id}
// 									className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex justify-between items-center animate-fade-in-up"
// 								>
// 									<div>
// 										<h4 className="text-lg font-semibold">
// 											{grade.assignment}
// 										</h4>
// 										<p className={`text-sm ${accentColors.darkGrayText}`}>
// 											{grade.course}
// 										</p>
// 									</div>
// 									<span
// 										className={`text-xl font-bold ${
// 											grade.grade >= 90
// 												? accentColors.green
// 												: grade.grade >= 70
// 												? accentColors.blue
// 												: accentColors.red
// 										}`}
// 									>
// 										{grade.grade}%
// 									</span>
// 								</div>
// 							))
// 						) : (
// 							<p className={`${accentColors.darkGrayText}`}>
// 								No grades posted recently.
// 							</p>
// 						)}
// 					</div>
// 				</div>

// 				{/* Announcements */}
// 				<div
// 					className={`${accentColors.grayBg} ${accentColors.darkTextPrimary} p-6 rounded-xl shadow-lg animate-fade-in-up`}
// 				>
// 					<h3 className="text-2xl font-bold mb-4 flex items-center">
// 						<FaBell className="mr-3" /> Latest Announcements
// 					</h3>
// 					<div className="space-y-3">
// 						{userData.announcements.length > 0 ? (
// 							userData.announcements.map((announcement) => (
// 								<div
// 									key={announcement.id}
// 									className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 animate-fade-in-up"
// 								>
// 									<h4 className="text-lg font-semibold">
// 										{announcement.title}
// 									</h4>
// 									<p
// 										className={`text-sm ${accentColors.darkGrayText} flex items-center`}
// 									>
// 										<FaCalendarAlt className="mr-2" /> {announcement.date}
// 									</p>
// 									<Link
// 										to={`/user/announcements/${announcement.id}`}
// 										className={`mt-2 inline-flex items-center text-sm font-semibold ${accentColors.blue} hover:underline`}
// 									>
// 										Read More <FaArrowRight className="ml-2 text-xs" />
// 									</Link>
// 								</div>
// 							))
// 						) : (
// 							<p className={`${accentColors.darkGrayText}`}>
// 								No new announcements.
// 							</p>
// 						)}
// 					</div>
// 				</div>
// 			</div>

// 			{/* Quick Links / Actions */}
// 			<div
// 				className={`${accentColors.lightBgSecondary} ${accentColors.lightTextSecondary} p-6 md:p-8 rounded-xl shadow-lg animate-fade-in-up`}
// 			>
// 				<h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">
// 					Quick Links
// 				</h3>
// 				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
// 					<Link
// 						to="/user/all-courses"
// 						className={`flex flex-col items-center justify-center p-4 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors duration-200 group`}
// 					>
// 						<FaBookOpen
// 							className={`text-4xl mb-2 ${accentColors.blue} group-hover:scale-110 transition-transform`}
// 						/>
// 						<span className="font-semibold text-center">
// 							Browse All Courses
// 						</span>
// 					</Link>
// 					<Link
// 						to="/user/grades"
// 						className={`flex flex-col items-center justify-center p-4 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors duration-200 group`}
// 					>
// 						<FaChartLine
// 							className={`text-4xl mb-2 ${accentColors.green} group-hover:scale-110 transition-transform`}
// 						/>
// 						<span className="font-semibold text-center">View My Grades</span>
// 					</Link>
// 					<Link
// 						to="/user/profile"
// 						className={`flex flex-col items-center justify-center p-4 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors duration-200 group`}
// 					>
// 						<FaUserGraduate
// 							className={`text-4xl mb-2 ${accentColors.orange} group-hover:scale-110 transition-transform`}
// 						/>
// 						<span className="font-semibold text-center">Edit My Profile</span>
// 					</Link>
// 					<Link
// 						to="/user/support"
// 						className={`flex flex-col items-center justify-center p-4 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors duration-200 group`}
// 					>
// 						<FaEnvelopeOpenText
// 							className={`text-4xl mb-2 ${accentColors.purple} group-hover:scale-110 transition-transform`}
// 						/>
// 						<span className="font-semibold text-center">Contact Support</span>
// 					</Link>
// 				</div>
// 			</div>

// 			{/* Custom Animations (re-used from previous designs for consistency) */}
// 			<style jsx="true">{`
// 				@keyframes fadeIn {
// 					from {
// 						opacity: 0;
// 						transform: translateY(20px);
// 					}
// 					to {
// 						opacity: 1;
// 						transform: translateY(0);
// 					}
// 				}
// 				@keyframes fadeInDown {
// 					from {
// 						opacity: 0;
// 						transform: translateY(-20px);
// 					}
// 					to {
// 						opacity: 1;
// 						transform: translateY(0);
// 					}
// 				}
// 				@keyframes fadeInLeft {
// 					from {
// 						opacity: 0;
// 						transform: translateX(-20px);
// 					}
// 					to {
// 						opacity: 1;
// 						transform: translateX(0);
// 					}
// 				}
// 				@keyframes fadeInRight {
// 					from {
// 						opacity: 0;
// 						transform: translateX(20px);
// 					}
// 					to {
// 						opacity: 1;
// 						transform: translateX(0);
// 					}
// 				}
// 				@keyframes fadeInUp {
// 					from {
// 						opacity: 0;
// 						transform: translateY(20px);
// 					}
// 					to {
// 						opacity: 1;
// 						transform: translateY(0);
// 					}
// 				}

// 				.animate-fade-in {
// 					animation: fadeIn 0.6s ease-out forwards;
// 				}
// 				.animate-fade-in-down {
// 					animation: fadeInDown 0.7s ease-out forwards;
// 				}
// 				.animate-fade-in-left {
// 					animation: fadeInLeft 0.7s ease-out forwards;
// 				}
// 				.animate-fade-in-right {
// 					animation: fadeInRight 0.7s ease-out forwards;
// 				}
// 				.animate-fade-in-up {
// 					animation: fadeInUp 0.7s ease-out forwards;
// 				}

// 				/* Staggered animation delays for KPI cards */
// 				.grid > div:nth-child(1) {
// 					animation-delay: 0.1s;
// 				}
// 				.grid > div:nth-child(2) {
// 					animation-delay: 0.2s;
// 				}
// 				.grid > div:nth-child(3) {
// 					animation-delay: 0.3s;
// 				}
// 				.grid > div:nth-child(4) {
// 					animation-delay: 0.4s;
// 				}
// 			`}</style>
// 		</div>
// 	);
// };

// export default Dash_own_details;

// src/components/user-dashboard/UserDashboardHome.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
	FaUserGraduate,
	FaBookOpen,
	FaCheckCircle,
	FaChartLine,
	FaCalendarAlt,
	FaClipboardList,
	FaBell,
	FaArrowRight,
	FaStar,
	FaHourglassHalf,
	FaPercentage,
	FaEnvelopeOpenText,
	FaArrowUp,
	FaArrowDown,
	FaPlusCircle, // Added for "Enroll in a course" button
} from "react-icons/fa";
import { useUserData } from "../../../components/api/userDatasApi";

const UserDashboardHome = () => {
	const { user, loading, error } = useUserData();
	// Define accent colors directly in the component
	const accentColors = {
		green: "text-[#22C55E]", // Success/Positive
		red: "text-[#EF4444]", // Alert/Negative
		blue: "text-[#3B82F6]", // Info/Highlight
		orange: "text-[#F97316]", // Warning/Attention
		purple: "text-[#8B5CF6]", // Another accent color
		grayBg: "bg-gray-100", // Lighter gray for card backgrounds on primary white
		darkGrayText: "text-gray-700", // Darker gray for secondary text on light backgrounds
		darkBgPrimary: "bg-white", // Primary background (main page background)
		lightBgSecondary: "bg-black", // Secondary background (for contrast elements)
		darkTextPrimary: "text-black", // Primary text on light backgrounds
		lightTextSecondary: "text-white", // Secondary text on dark backgrounds
	};

	// Dummy user data - Initial state with some empty/zero values to demonstrate conditions
	const [userData, setUserData] = useState({
		userName: "USER", // This can be dynamically loaded from user profile
		coursesEnrolled: 0, // Changed to 0 for initial empty state demo
		coursesCompleted: 0, // Changed to 0
		averageGrade: 0, // Changed to 0
		upcomingAssignments: [], // Changed to empty array
		enrolledCourses: [], // Changed to empty array
		recentGrades: [], // Changed to empty array
		announcements: [
			// Keep some initial announcements as they might be general info
			{ id: 1, title: "Welcome to Innovation University!", date: "2025-07-01" },
			{ id: 2, title: "Explore our new course catalog!", date: "2025-07-05" },
		],
	});

	useEffect(() => {
		if (user) {
			setUserData((prev) => ({
				...prev,
				userName: user.name, // This can be dynamically loaded from user profile
				coursesEnrolled: 0, // Changed to 0 for initial empty state demo
				coursesCompleted: 0, // Changed to 0
				averageGrade: 0, // Changed to 0
				upcomingAssignments: [], // Changed to empty array
				enrolledCourses: [], // Changed to empty array
				recentGrades: [], // Changed to empty array
				announcements: [
					// Keep some initial announcements as they might be general info
					{
						id: 1,
						title: "Welcome to Innovation University!",
						date: "2025-07-01",
					},
					{
						id: 2,
						title: "Explore our new course catalog!",
						date: "2025-07-05",
					},
				],
			}));
		}
	}, [user]);

	if (error) {
		<>
			<div className="flex flex-wrap justify-center items-center m-auto">
				<p>Oops! Sorrry, {error}</p>
			</div>
		</>;
	}

	// Simulate "real-time" updates for dynamic elements
	useEffect(() => {
		const interval = setInterval(() => {
			setUserData((prevData) => {
				// Simulate new data coming in after some time, or based on user actions
				const newCoursesEnrolled =
					prevData.coursesEnrolled === 0 && Math.random() > 0.8
						? 1
						: prevData.coursesEnrolled;
				const newCoursesCompleted =
					prevData.coursesCompleted === 0 && Math.random() > 0.9
						? 1
						: prevData.coursesCompleted;
				const newAverageGrade =
					prevData.averageGrade === 0 && Math.random() > 0.7
						? 75 + Math.floor(Math.random() * 15)
						: prevData.averageGrade;

				let newEnrolledCourses = [...prevData.enrolledCourses];
				if (newEnrolledCourses.length === 0 && Math.random() > 0.7) {
					newEnrolledCourses = [
						{
							id: "new001",
							title: "Your First Enrolled Course",
							progress: 5,
							instructor: "University Staff",
						},
					];
				} else {
					newEnrolledCourses = prevData.enrolledCourses.map((course) => ({
						...course,
						progress: Math.min(
							100,
							course.progress + (Math.random() > 0.7 ? 1 : 0)
						),
					}));
				}

				let newUpcomingAssignments = [...prevData.upcomingAssignments];
				if (newUpcomingAssignments.length === 0 && Math.random() > 0.8) {
					newUpcomingAssignments = [
						{
							id: 4,
							title: "Your First Assignment",
							course: "Your First Enrolled Course",
							dueDate: "2025-07-28",
							status: "pending",
						},
					];
				}

				let newRecentGrades = [...prevData.recentGrades];
				if (newRecentGrades.length === 0 && Math.random() > 0.9) {
					newRecentGrades = [
						{
							id: 3,
							course: "Your First Enrolled Course",
							assignment: "First Quiz",
							grade: 80,
							date: new Date().toLocaleDateString(),
						},
					];
				}

				// Simulate a new announcement occasionally
				const updatedAnnouncements =
					Math.random() > 0.9
						? [
								{
									id: Date.now(),
									title: `New Event: Workshop on ${
										["AI", "Web", "Data"][Math.floor(Math.random() * 3)]
									} Tools`,
									date: new Date().toLocaleDateString(),
								},
								...prevData.announcements.slice(0, 2),
						  ]
						: prevData.announcements;

				return {
					...prevData,
					coursesEnrolled: newCoursesEnrolled,
					coursesCompleted: newCoursesCompleted,
					averageGrade: newAverageGrade,
					enrolledCourses: newEnrolledCourses,
					upcomingAssignments: newUpcomingAssignments,
					recentGrades: newRecentGrades,
					announcements: updatedAnnouncements,
				};
			});
		}, 15000); // Update every 15 seconds

		return () => clearInterval(interval);
	}, []);

	const StatCard = ({ title, value, icon, unit = "", trend }) => {
		const trendColor =
			trend > 0
				? accentColors.green
				: trend < 0
				? accentColors.red
				: accentColors.darkGrayText;
		const TrendIcon = trend > 0 ? FaArrowUp : FaArrowDown;

		// Conditional display for value
		const displayValue =
			value === 0 && unit !== "%" ? "N/A" : value.toFixed(unit === "%" ? 1 : 0);
		const displayUnit = value === 0 && unit !== "%" ? "" : unit;

		return (
			<div
				className={`relative ${accentColors.grayBg} ${accentColors.darkTextPrimary} p-6 rounded-xl shadow-lg overflow-hidden
                            transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl
                            flex flex-col justify-between animate-fade-in border border-gray-200`}
			>
				<div className="absolute top-4 right-4 text-gray-300 opacity-50 text-5xl">
					{icon}
				</div>
				<h3 className="text-lg md:text-xl font-semibold mb-2 z-10">{title}</h3>
				<p className="text-4xl md:text-5xl font-extrabold z-10">
					{displayValue}
					{displayUnit}
				</p>
				{trend !== undefined &&
					value !== 0 && ( // Only show trend if value is not zero
						<div className="flex items-center mt-3 z-10">
							<TrendIcon className={`mr-1 ${trendColor}`} />
							<span
								className={`text-sm md:text-base font-medium ${trendColor}`}
							>
								{Math.abs(trend)}% {trend > 0 ? "Up" : trend < 0 ? "Down" : ""}
							</span>
							<span
								className={`text-sm md:text-base ml-2 ${accentColors.darkGrayText}`}
							>
								vs. last month
							</span>
						</div>
					)}
				{value === 0 && ( // Message for zero values
					<p className={`text-sm mt-3 ${accentColors.darkGrayText}`}>
						{title === "Courses Enrolled" && "Enroll in your first course!"}
						{title === "Courses Completed" && "Complete a course to see this!"}
						{title === "Average Grade" && "Get your first grade!"}
					</p>
				)}
			</div>
		);
	};

	const ProgressBar = ({ progress }) => (
		<div className="w-full bg-gray-300 rounded-full h-2.5">
			<div
				className={`h-2.5 rounded-full transition-all duration-500 ease-out ${
					progress > 75
						? "bg-[#22C55E]"
						: progress > 40
						? "bg-[#3B82F6]"
						: "bg-[#F97316]"
				}`}
				style={{ width: `${progress}%` }}
			></div>
		</div>
	);

	return (
		<div className={`p-4 md:p-8 ${accentColors.darkBgPrimary} min-h-full`}>
			{/* Welcome Section */}
			<div
				className={`${accentColors.lightBgSecondary} ${accentColors.lightTextSecondary} p-6 md:p-8 rounded-xl shadow-lg mb-8 animate-fade-in-down`}
			>
				{loading ? (
					"Processing Data......"
				) : (
					<h2 className="text-3xl md:text-4xl font-extrabold mb-2">
						Welcome, {userData.userName}!
					</h2>
				)}

				<p className={`text-lg md:text-xl ${accentColors.lightTextSecondary}`}>
					Your personalized learning journey at Innovation University.
				</p>
			</div>

			{/* Key User Metrics */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
				<StatCard
					title="Courses Enrolled"
					value={userData.coursesEnrolled}
					icon={<FaBookOpen />}
				/>
				<StatCard
					title="Courses Completed"
					value={userData.coursesCompleted}
					icon={<FaCheckCircle />}
					trend={20} // Example trend: 20% more courses completed
				/>
				<StatCard
					title="Average Grade"
					value={userData.averageGrade} // Pass raw value, StatCard handles formatting
					unit="%"
					icon={<FaChartLine />}
					trend={-1.5} // Example trend: slight drop
				/>
			</div>

			{/* My Courses & Upcoming Assignments */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
				{/* My Courses */}
				<div
					className={`${accentColors.grayBg} ${accentColors.darkTextPrimary} p-6 rounded-xl shadow-lg animate-fade-in-left`}
				>
					<h3 className="text-2xl font-bold mb-4 flex items-center">
						<FaBookOpen className="mr-3" /> My Enrolled Courses
					</h3>
					<div className="space-y-4">
						{userData.enrolledCourses.length > 0 ? (
							userData.enrolledCourses.map((course) => (
								<div
									key={course.id}
									className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 animate-fade-in-up"
								>
									<h4 className="text-lg font-semibold mb-1">{course.title}</h4>
									<p className={`text-sm ${accentColors.darkGrayText} mb-2`}>
										Instructor: {course.instructor}
									</p>
									<div className="flex items-center text-sm">
										<span className="mr-2">Progress:</span>
										<ProgressBar progress={course.progress} />
										<span className="ml-2 font-bold">{course.progress}%</span>
									</div>
									<Link
										to={`/user/courses/${course.id}`}
										className={`mt-3 inline-flex items-center text-sm font-semibold ${accentColors.blue} hover:underline`}
									>
										Go to Course <FaArrowRight className="ml-2 text-xs" />
									</Link>
								</div>
							))
						) : (
							<div
								className={`p-4 bg-white rounded-lg shadow-sm border border-gray-200 text-center ${accentColors.darkGrayText}`}
							>
								<p className="mb-3">You haven't enrolled in any courses yet.</p>
								<Link
									to="/user/all-courses"
									className={`inline-flex items-center text-sm font-semibold ${accentColors.blue} hover:underline`}
								>
									<FaPlusCircle className="mr-2" /> Browse All Courses to Get
									Started
								</Link>
							</div>
						)}
					</div>
				</div>

				{/* Upcoming Assignments */}
				<div
					className={`${accentColors.grayBg} ${accentColors.darkTextPrimary} p-6 rounded-xl shadow-lg animate-fade-in-right`}
				>
					<h3 className="text-2xl font-bold mb-4 flex items-center">
						<FaCalendarAlt className="mr-3" /> Upcoming Deadlines
					</h3>
					<div className="space-y-3">
						{userData.upcomingAssignments.length > 0 ? (
							userData.upcomingAssignments.map((assignment) => (
								<div
									key={assignment.id}
									className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 animate-fade-in-up"
								>
									<h4 className="text-lg font-semibold">{assignment.title}</h4>
									<p className={`text-sm ${accentColors.darkGrayText}`}>
										Course: {assignment.course}
									</p>
									<p
										className={`text-sm font-medium ${accentColors.orange} flex items-center`}
									>
										<FaHourglassHalf className="mr-2" /> Due:{" "}
										{assignment.dueDate}
									</p>
									<Link
										to={`/user/assignments/${assignment.id}`}
										className={`mt-2 inline-flex items-center text-sm font-semibold ${accentColors.blue} hover:underline`}
									>
										View Details <FaArrowRight className="ml-2 text-xs" />
									</Link>
								</div>
							))
						) : (
							<div
								className={`p-4 bg-white rounded-lg shadow-sm border border-gray-200 text-center ${accentColors.darkGrayText}`}
							>
								<p className="mb-3">No upcoming assignments.</p>
								<p>Assignments will appear here once you enroll in courses.</p>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Recent Grades & Announcements */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
				{/* Recent Grades */}
				<div
					className={`${accentColors.grayBg} ${accentColors.darkTextPrimary} p-6 rounded-xl shadow-lg animate-fade-in-up`}
				>
					<h3 className="text-2xl font-bold mb-4 flex items-center">
						<FaClipboardList className="mr-3" /> Recent Grades
					</h3>
					<div className="space-y-3">
						{userData.recentGrades.length > 0 ? (
							userData.recentGrades.map((grade) => (
								<div
									key={grade.id}
									className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex justify-between items-center animate-fade-in-up"
								>
									<div>
										<h4 className="text-lg font-semibold">
											{grade.assignment}
										</h4>
										<p className={`text-sm ${accentColors.darkGrayText}`}>
											{grade.course}
										</p>
									</div>
									<span
										className={`text-xl font-bold ${
											grade.grade >= 90
												? accentColors.green
												: grade.grade >= 70
												? accentColors.blue
												: accentColors.red
										}`}
									>
										{grade.grade}%
									</span>
								</div>
							))
						) : (
							<div
								className={`p-4 bg-white rounded-lg shadow-sm border border-gray-200 text-center ${accentColors.darkGrayText}`}
							>
								<p className="mb-3">No grades posted recently.</p>
								<p>Your grades will appear here as you complete assignments.</p>
							</div>
						)}
					</div>
				</div>

				{/* Announcements */}
				<div
					className={`${accentColors.grayBg} ${accentColors.darkTextPrimary} p-6 rounded-xl shadow-lg animate-fade-in-up`}
				>
					<h3 className="text-2xl font-bold mb-4 flex items-center">
						<FaBell className="mr-3" /> Latest Announcements
					</h3>
					<div className="space-y-3">
						{userData.announcements.length > 0 ? (
							userData.announcements.map((announcement) => (
								<div
									key={announcement.id}
									className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 animate-fade-in-up"
								>
									<h4 className="text-lg font-semibold">
										{announcement.title}
									</h4>
									<p
										className={`text-sm ${accentColors.darkGrayText} flex items-center`}
									>
										<FaCalendarAlt className="mr-2" /> {announcement.date}
									</p>
									<Link
										to={`/user/announcements/${announcement.id}`}
										className={`mt-2 inline-flex items-center text-sm font-semibold ${accentColors.blue} hover:underline`}
									>
										Read More <FaArrowRight className="ml-2 text-xs" />
									</Link>
								</div>
							))
						) : (
							<div
								className={`p-4 bg-white rounded-lg shadow-sm border border-gray-200 text-center ${accentColors.darkGrayText}`}
							>
								<p className="mb-3">No new announcements at this time.</p>
								<p>Check back later for important updates!</p>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Quick Links / Actions */}
			<div
				className={`${accentColors.lightBgSecondary} ${accentColors.lightTextSecondary} p-6 md:p-8 rounded-xl shadow-lg animate-fade-in-up`}
			>
				<h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">
					Quick Links
				</h3>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					<Link
						to="/user/all-courses"
						className={`flex flex-col items-center justify-center p-4 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors duration-200 group`}
					>
						<FaBookOpen
							className={`text-4xl mb-2 ${accentColors.blue} group-hover:scale-110 transition-transform`}
						/>
						<span className="font-semibold text-center">
							Browse All Courses
						</span>
					</Link>
					<Link
						to="/user/grades"
						className={`flex flex-col items-center justify-center p-4 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors duration-200 group`}
					>
						<FaChartLine
							className={`text-4xl mb-2 ${accentColors.green} group-hover:scale-110 transition-transform`}
						/>
						<span className="font-semibold text-center">View My Grades</span>
					</Link>
					<Link
						to="/user/profile"
						className={`flex flex-col items-center justify-center p-4 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors duration-200 group`}
					>
						<FaUserGraduate
							className={`text-4xl mb-2 ${accentColors.orange} group-hover:scale-110 transition-transform`}
						/>
						<span className="font-semibold text-center">Edit My Profile</span>
					</Link>
					<Link
						to="/user/support"
						className={`flex flex-col items-center justify-center p-4 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors duration-200 group`}
					>
						<FaEnvelopeOpenText
							className={`text-4xl mb-2 ${accentColors.purple} group-hover:scale-110 transition-transform`}
						/>
						<span className="font-semibold text-center">Contact Support</span>
					</Link>
				</div>
			</div>

			{/* Custom Animations (re-used from previous designs for consistency) */}
			<style jsx="true">{`
				@keyframes fadeIn {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
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
				@keyframes fadeInLeft {
					from {
						opacity: 0;
						transform: translateX(-20px);
					}
					to {
						opacity: 1;
						transform: translateX(0);
					}
				}
				@keyframes fadeInRight {
					from {
						opacity: 0;
						transform: translateX(20px);
					}
					to {
						opacity: 1;
						transform: translateX(0);
					}
				}
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

				.animate-fade-in {
					animation: fadeIn 0.6s ease-out forwards;
				}
				.animate-fade-in-down {
					animation: fadeInDown 0.7s ease-out forwards;
				}
				.animate-fade-in-left {
					animation: fadeInLeft 0.7s ease-out forwards;
				}
				.animate-fade-in-right {
					animation: fadeInRight 0.7s ease-out forwards;
				}
				.animate-fade-in-up {
					animation: fadeInUp 0.7s ease-out forwards;
				}

				/* Staggered animation delays for KPI cards */
				.grid > div:nth-child(1) {
					animation-delay: 0.1s;
				}
				.grid > div:nth-child(2) {
					animation-delay: 0.2s;
				}
				.grid > div:nth-child(3) {
					animation-delay: 0.3s;
				}
				.grid > div:nth-child(4) {
					animation-delay: 0.4s;
				}
			`}</style>
		</div>
	);
};

export default UserDashboardHome;
