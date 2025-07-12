// src/components/dashboard/DashboardHome.jsx
import React, { useState, useEffect } from "react";
import {
	FaGraduationCap,
	FaUsers,
	FaChartLine,
	FaBook,
	FaBell,
	FaClipboardList,
	FaArrowUp,
	FaArrowDown,
} from "react-icons/fa"; // Importing various icons
import { Link } from "react-router-dom";
import { useAdminData } from "../../api/dummyApi";

const DashboardHome = () => {
	const { admin, loading, error } = useAdminData();
	// Define accent colors directly in the component
	const accentColors = {
		green: "text-[#22C55E]", // Success/Positive
		red: "text-[#EF4444]", // Error/Negative
		blue: "text-[#3B82F6]", // Info/Highlight
		// grayBg: "bg-gray-800", // Darker gray for card backgrounds on primary black
		grayBg: "bg-white", // Darker gray for card backgrounds on primary black
		lightGrayText: "text-gray-300", // Lighter gray for secondary text on dark backgrounds
	};

	// Dummy "real-time" data with state for potential updates
	const [stats, setStats] = useState({
		totalCourses: 0,
		totalStudents: 0,
		pendingEnrollments: 0,
		newRegistrationsToday: 0,
		courseCompletionRate: 0, // percentage
		revenueTrend: 0, // change %
	});

	// const [recentActivities, setRecentActivities] = useState([
	const [recentActivities] = useState([
		{
			id: 1,
			type: "system",
			description: "Welcome to your admin dashboard!",
			time: "Just now",
			icon: <FaClipboardList className={accentColors.lightGrayText} />,
		},
	]);

	// Simulate real-time updates (optional, for demonstration)
	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		setStats((prevStats) => ({
	// 			...prevStats,
	// 			totalStudents: prevStats.totalStudents + Math.floor(Math.random() * 5), // Simulate new students
	// 			pendingEnrollments: Math.max(
	// 				0,
	// 				prevStats.pendingEnrollments + (Math.random() > 0.5 ? 1 : -1)
	// 			), // Simulate changes
	// 		}));
	// 		// Add new dummy activity
	// 		const newActivity = {
	// 			id: Date.now(),
	// 			type: "activity",
	// 			description: `Random activity ${Math.floor(
	// 				Math.random() * 100
	// 			)} occurred`,
	// 			time: "Just now",
	// 			icon: <FaClipboardList className={accentColors.lightGrayText} />,
	// 		};
	// 		setRecentActivities((prev) => [newActivity, ...prev.slice(0, 4)]); // Keep last 5 activities
	// 	}, 10000); // Update every 10 seconds

	// 	return () => clearInterval(interval); // Cleanup
	// }, []);

	useEffect(() => {
		const interval = setInterval(() => {
			setStats((prevStats) => ({
				...prevStats,
				totalStudents: prevStats.totalStudents + Math.floor(Math.random() * 2),
				pendingEnrollments: Math.max(
					0,
					prevStats.pendingEnrollments + (Math.random() > 0.5 ? 1 : -1)
				),
				courseCompletionRate: Math.min(
					100,
					prevStats.courseCompletionRate + 0.5
				),
			}));
		}, 10000); // update every 10 seconds

		return () => clearInterval(interval);
	}, []);

	const StatCard = ({ title, value, icon, trend, unit = "" }) => {
		const trendColor =
			trend > 0
				? accentColors.green
				: trend < 0
				? accentColors.red
				: accentColors.lightGrayText;
		const TrendIcon = trend > 0 ? FaArrowUp : FaArrowDown;

		if (error) {
			return (
				<>
					<div className="flex justify-center items-center m-auto">
						{`OOP! SORRY ${error} `}
					</div>
				</>
			);
		}

		return (
			<div
				className={`relative ${accentColors.grayBg} text-textPrimary p-6 rounded-lg shadow-xl overflow-hidden
                            transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl
                            flex flex-col justify-between animate-fade-in`}
			>
				{/* Background icon for visual flair */}
				<div className="absolute top-4 right-4 text-gray-700 opacity-30 text-5xl">
					{icon}
				</div>
				<h3 className="text-lg md:text-xl font-semibold mb-2 z-10">{title}</h3>
				<p className="text-4xl md:text-5xl font-extrabold z-10">
					{value}
					{unit}
				</p>
				{trend !== undefined && (
					<div className="flex items-center mt-3 z-10">
						<TrendIcon className={`mr-1 ${trendColor}`} />
						<span className={`text-sm md:text-base font-medium ${trendColor}`}>
							{Math.abs(trend)}% {trend > 0 ? "Up" : trend < 0 ? "Down" : ""}
						</span>
						<span
							className={`text-sm md:text-base ml-2 ${accentColors.lightGrayText}`}
						>
							since last month
						</span>
					</div>
				)}
			</div>
		);
	};

	const ActivityItem = ({ description, time, icon }) => (
		<div className="flex items-center p-3 border-b border-gray-700 last:border-b-0 animate-fade-in-up">
			<div className="mr-3 text-xl">{icon}</div>
			<div className="flex-1">
				<p className="text-base text-textPrimary">{description}</p>
				<p className={`text-xs ${accentColors.lightGrayText}`}>{time}</p>
			</div>
		</div>
	);

	return (
		<div className="p-4 md:p-8 bg-primary min-h-full">
			{/* Welcome Section */}
			<div className="bg-secondary text-textSecondary p-6 md:p-8 rounded-xl shadow-lg mb-8 animate-fade-in-down">
				{loading ? (
					<h2 className="text-3xl md:text-4xl font-extrabold mb-2">
						Loading...
					</h2>
				) : error ? (
					<h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-red-500">
						Failed to load admin
					</h2>
				) : (
					<h2 className="text-3xl md:text-4xl font-extrabold mb-2">
						Welcome, {admin?.data?.admin?.name || "Admin"}!
					</h2>
				)}

				<p className={`text-lg md:text-xl ${accentColors.lightGrayText}`}>
					Overview of Innovation University Academy.
				</p>
			</div>

			{/* Key Metrics Section */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
				<StatCard
					title="Total Courses"
					value={stats.totalCourses}
					icon={<FaBook />}
				/>
				<StatCard
					title="Total Students"
					value={stats.totalStudents}
					icon={<FaUsers />}
					trend={stats.revenueTrend} // Reusing revenueTrend for student growth
				/>
				<StatCard
					title="Pending Enrollments"
					value={stats.pendingEnrollments}
					icon={<FaClipboardList />}
					trend={-2} // Example negative trend
				/>
				<StatCard
					title="Completion Rate"
					value={stats.courseCompletionRate}
					unit="%"
					icon={<FaGraduationCap />}
					trend={1.5} // Example positive trend
				/>
			</div>

			{/* Recent Activity / Quick Insights Section */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Recent Activity Card */}
				<div
					className={`${accentColors.grayBg} text-textPrimary p-6 rounded-xl shadow-lg animate-fade-in-left`}
				>
					<h3 className="text-2xl font-bold mb-4">Recent Activity</h3>
					<div className="space-y-2">
						{recentActivities.map((activity) => (
							<ActivityItem
								key={activity.id}
								description={activity.description}
								time={activity.time}
								icon={activity.icon}
							/>
						))}
					</div>
				</div>

				{/* Quick Insights / Placeholder Chart */}
				<div
					className={`${accentColors.grayBg} text-textPrimary p-6 rounded-xl shadow-lg animate-fade-in-right`}
				>
					<h3 className="text-2xl font-bold mb-4">Course Performance</h3>
					<div className="flex items-center justify-between mb-4">
						<span className={`text-lg font-semibold ${accentColors.green}`}>
							+5.2%
						</span>
						<span className={`${accentColors.lightGrayText}`}>
							vs. last month
						</span>
					</div>
					{/* Placeholder for a simple chart or trend visualization */}
					<div className="w-full h-48 bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 text-sm">
						<FaChartLine className="text-4xl mr-2" />
						Course Trend Chart (Placeholder)
					</div>
					<p className={`mt-4 text-sm ${accentColors.lightGrayText}`}>
						Detailed analytics available in the{" "}
						<Link
							to="/admin/analytics"
							className={`${accentColors.blue} hover:underline`}
						>
							Analytics
						</Link>{" "}
						section.
					</p>
				</div>
			</div>
		</div>
	);
};

export default DashboardHome;
