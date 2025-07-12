// src/components/dashboard/AnalyticsPage.jsx
import React, { useState, useEffect } from "react";
import {
	FaUsers,
	FaBookOpen,
	FaDollarSign,
	FaGlobe,
	FaArrowUp,
	FaArrowDown,
} from "react-icons/fa";

const AnalyticsPage = () => {
	// Define accent colors directly in the component
	const accentColors = {
		green: "text-[#22C55E]", // Success/Positive
		red: "text-[#EF4444]", // Error/Negative
		blue: "text-[#3B82F6]", // Info/Highlight
		orange: "text-[#F97316]", // Warning/Attention
		purple: "text-[#8B5CF6]", // Another accent color for charts
		grayBg: "bg-gray-800", // Darker gray for card backgrounds on primary black
		lightGrayText: "text-gray-300", // Lighter gray for secondary text on dark backgrounds
		darkBgPrimary: "bg-black", // Primary background
		lightBgSecondary: "bg-white", // Secondary background
		darkTextPrimary: "text-white", // Primary text on dark backgrounds
		lightTextSecondary: "text-black", // Secondary text on light backgrounds
	};

	// Dummy data for analytics
	// const [analyticsData, setAnalyticsData] = useState({
	const [analyticsData] = useState({
		totalStudents: 1250,
		newStudentsLastMonth: 85,
		totalCourses: 30,
		mostPopularCourse: "Advanced Data Science",
		revenueLastMonth: 125000,
		enrollmentsByMonth: [
			{ month: "Jan", count: 120 },
			{ month: "Feb", count: 150 },
			{ month: "Mar", count: 130 },
			{ month: "Apr", count: 180 },
			{ month: "May", count: 200 },
			{ month: "Jun", count: 220 },
			{ month: "Jul", count: 250 }, // Current month
		],
		courseCategories: [
			{ name: "AI & ML", students: 400 },
			{ name: "Web Dev", students: 350 },
			{ name: "Cybersecurity", students: 200 },
			{ name: "Data Science", students: 300 },
		],
		studentDemographics: {
			ageGroups: { "18-24": 300, "25-34": 500, "35-44": 250, "45+": 200 },
			gender: { Male: 700, Female: 550 },
			location: { "North America": 600, Europe: 300, Asia: 200, Africa: 150 },
		},
	});

	// Simulate data loading/updates
	useEffect(() => {
		// In a real application, you would fetch this data from your backend API
		// For now, we'll just simulate a slight delay
		const timer = setTimeout(() => {
			// You could simulate data changes here if needed for "real-time" feel
			// e.g., setAnalyticsData(prev => ({ ...prev, totalStudents: prev.totalStudents + 5 }));
		}, 1000);
		return () => clearTimeout(timer);
	}, []);

	const StatCard = ({ title, value, icon, trend, unit = "" }) => {
		const trendColor =
			trend > 0
				? accentColors.green
				: trend < 0
				? accentColors.red
				: accentColors.lightGrayText;
		const TrendIcon = trend > 0 ? FaArrowUp : FaArrowDown;

		return (
			<div
				className={`relative ${accentColors.grayBg} ${accentColors.darkTextPrimary} p-6 rounded-xl shadow-xl overflow-hidden
                            transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl
                            flex flex-col justify-between animate-fade-in border border-gray-700`}
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
							vs. last month
						</span>
					</div>
				)}
			</div>
		);
	};

	const BarChart = ({ data, title, xLabel, barColor }) => {
		const maxVal = Math.max(...data.map((d) => d.count || d.students || 0));
		const chartHeight = 150; // px

		return (
			<div className="mb-6">
				<h4 className="text-xl font-semibold mb-4 text-center">{title}</h4>
				<div className="flex items-end h-[150px] bg-gray-700 p-2 rounded-lg relative">
					{/* Y-axis labels (simplified) */}
					<div
						className={`absolute left-0 top-0 h-full w-6 flex flex-col justify-between py-2 text-xs ${accentColors.lightGrayText}`}
					>
						<span>{maxVal}</span>
						<span>{maxVal / 2}</span>
						<span>0</span>
					</div>
					<div className="flex flex-1 justify-around items-end h-full pl-8">
						{data.map((item, index) => (
							<div
								key={index}
								className={`w-8 rounded-t-lg transition-all duration-500 ease-out animate-grow-bar-chart ${barColor}`}
								style={{
									height: `${
										((item.count || item.students) / maxVal) * chartHeight
									}px`,
									animationDelay: `${index * 100}ms`,
								}}
							>
								<span
									className={`block text-center text-xs mt-1 ${accentColors.darkTextPrimary}`}
								>
									{item.count || item.students}
								</span>
								<span
									className={`block text-center text-xs ${accentColors.lightGrayText} mt-1`}
								>
									{item.month || item.name}
								</span>
							</div>
						))}
					</div>
				</div>
				<div
					className={`text-center text-sm mt-2 ${accentColors.lightGrayText}`}
				>
					{xLabel}
				</div>
			</div>
		);
	};

	const PieChart = ({ data, title, colors }) => {
		const total = data.reduce((sum, item) => sum + item.value, 0);
		let currentAngle = 0;

		return (
			<div className="mb-6 flex flex-col items-center">
				<h4 className="text-xl font-semibold mb-4 text-center">{title}</h4>
				<div className="relative w-48 h-48 rounded-full shadow-lg overflow-hidden">
					{data.map((item, index) => {
						const percentage = (item.value / total) * 100;
						const angle = (percentage / 100) * 360;
						const style = {
							background: `conic-gradient(
                                ${
																	colors[index % colors.length]
																} ${currentAngle}deg,
                                ${colors[index % colors.length]} ${
								currentAngle + angle
							}deg,
                                transparent ${currentAngle + angle}deg
                            )`,
							transform: "rotate(0deg)", // Initial state for animation
							animation: `pie-slice-appear 0.5s ease-out forwards`,
							animationDelay: `${index * 0.1}s`,
						};
						currentAngle += angle;
						return (
							<div
								key={item.name}
								className="absolute inset-0 rounded-full"
								style={style}
							></div>
						);
					})}
				</div>
				<div className="mt-4 w-full grid grid-cols-2 gap-2 text-sm">
					{data.map((item, index) => (
						<div key={item.name} className="flex items-center">
							<span
								className="w-3 h-3 rounded-full mr-2"
								style={{ backgroundColor: colors[index % colors.length] }}
							></span>
							<span className={`${accentColors.darkTextPrimary}`}>
								{item.name} ({((item.value / total) * 100).toFixed(1)}%)
							</span>
						</div>
					))}
				</div>
			</div>
		);
	};

	const pieColors = [
		"#3B82F6",
		"#22C55E",
		"#F97316",
		"#8B5CF6",
		"#EF4444",
		"#14B8A6",
	]; // Blue, Green, Orange, Purple, Red, Teal

	return (
		<div className={`p-4 md:p-8 ${accentColors.darkBgPrimary} min-h-full`}>
			{/* Page Header */}
			<div
				className={`${accentColors.lightBgSecondary} ${accentColors.lightTextSecondary} p-6 md:p-8 rounded-xl shadow-lg mb-8 animate-fade-in-down`}
			>
				<h2 className="text-3xl md:text-4xl font-extrabold mb-2">
					University Analytics
				</h2>
				<p className={`text-lg md:text-xl ${accentColors.lightTextSecondary}`}>
					In-depth insights into student, course, and financial performance.
				</p>
			</div>

			{/* Key Performance Indicators (KPIs) */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
				<StatCard
					title="Total Students"
					value={analyticsData.totalStudents}
					icon={<FaUsers />}
					trend={7.5} // Example positive trend
				/>
				<StatCard
					title="New Students (Last Month)"
					value={analyticsData.newStudentsLastMonth}
					icon={<FaUsers />}
					trend={-1.2} // Example negative trend
				/>
				<StatCard
					title="Total Courses Offered"
					value={analyticsData.totalCourses}
					icon={<FaBookOpen />}
				/>
				<StatCard
					title="Revenue (Last Month)"
					value={`$${analyticsData.revenueLastMonth.toLocaleString()}`}
					icon={<FaDollarSign />}
					trend={3.8} // Example positive trend
				/>
			</div>

			{/* Charts Section */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
				{/* Enrollments by Month Chart */}
				<div
					className={`${accentColors.grayBg} ${accentColors.darkTextPrimary} p-6 rounded-xl shadow-lg animate-fade-in-left`}
				>
					<BarChart
						title="Enrollments by Month"
						data={analyticsData.enrollmentsByMonth}
						xLabel="Month"
						yLabel="Enrollments"
						barColor={accentColors.blue.replace("text-", "bg-")} // Convert text color to background
					/>
				</div>

				{/* Course Categories by Student Count */}
				<div
					className={`${accentColors.grayBg} ${accentColors.darkTextPrimary} p-6 rounded-xl shadow-lg animate-fade-in-right`}
				>
					<PieChart
						title="Students by Course Category"
						data={analyticsData.courseCategories.map((cat) => ({
							name: cat.name,
							value: cat.students,
						}))}
						colors={pieColors}
					/>
				</div>
			</div>

			{/* Demographics Section */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
				{/* Age Groups */}
				<div
					className={`${accentColors.grayBg} ${accentColors.darkTextPrimary} p-6 rounded-xl shadow-lg animate-fade-in-up`}
				>
					<h3 className="text-2xl font-bold mb-4">Student Age Groups</h3>
					<PieChart
						title="Age Distribution"
						data={Object.entries(
							analyticsData.studentDemographics.ageGroups
						).map(([key, value]) => ({ name: key, value: value }))}
						colors={["#F97316", "#3B82F6", "#22C55E", "#EF4444"]} // Orange, Blue, Green, Red
					/>
				</div>

				{/* Gender Distribution */}
				<div
					className={`${accentColors.grayBg} ${accentColors.darkTextPrimary} p-6 rounded-xl shadow-lg animate-fade-in-up`}
				>
					<h3 className="text-2xl font-bold mb-4">
						Student Gender Distribution
					</h3>
					<PieChart
						title="Gender Distribution"
						data={Object.entries(analyticsData.studentDemographics.gender).map(
							([key, value]) => ({ name: key, value: value })
						)}
						colors={["#8B5CF6", "#14B8A6"]} // Purple, Teal
					/>
				</div>

				{/* Location Distribution (could be a map or another chart) */}
				<div
					className={`${accentColors.grayBg} ${accentColors.darkTextPrimary} p-6 rounded-xl shadow-lg col-span-1 lg:col-span-2 animate-fade-in-up`}
				>
					<h3 className="text-2xl font-bold mb-4 flex items-center">
						<FaGlobe className="mr-3" /> Student Location Distribution
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						{Object.entries(analyticsData.studentDemographics.location).map(
							([region, count]) => (
								<div
									key={region}
									className="p-4 bg-gray-700 rounded-lg flex items-center justify-between"
								>
									<span className="font-semibold">{region}</span>
									<span className={`text-xl font-bold ${accentColors.blue}`}>
										{count}
									</span>
								</div>
							)
						)}
					</div>
					<p className={`mt-4 text-sm ${accentColors.lightGrayText}`}>
						Geographic data provides insights into global reach.
					</p>
				</div>
			</div>

			{/* Custom Animations */}
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
				@keyframes growBarChart {
					from {
						height: 0;
					}
					to {
						height: var(--bar-height);
					}
				}
				@keyframes pie-slice-appear {
					from {
						transform: scale(0);
						opacity: 0;
					}
					to {
						transform: scale(1);
						opacity: 1;
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
				.animate-grow-bar-chart {
					animation: growBarChart 0.8s ease-out forwards;
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

export default AnalyticsPage;
