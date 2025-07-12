// src/components/user-dashboard/UserAccountPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import {
	FaUserCircle,
	FaEnvelope,
	FaPhoneAlt,
	FaCalendarAlt,
	FaChartLine,
	FaBookOpen,
	FaCheckCircle,
	FaHistory,
	FaTrophy,
	FaCog,
	FaArrowRight,
	FaStar,
	FaSignInAlt,
	FaGlobe,
} from "react-icons/fa";
import { useUserData } from "../../../components/api/userDatasApi";

const UserAccountPage = () => {
	const { user, Loading, error } = useUserData();
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

	const [accountData, setAccountData] = useState({
		userName: "New User",
		email: "example@mail.com",
		phoneNumber: "N/A",
		memberSince: "N/A",
		totalCoursesEnrolled: 0,
		coursesCompleted: 0,
		totalAchievements: 0,
		lastLogin: "N/A",
		loginHistory: [], // No logins yet
		achievements: [], // No achievements yet
	});

	if (error) {
		<>
			<div className="flex flex-wrap justify-center items-center m-auto">
				<p>Oops! Sorrry, {error}</p>
			</div>
		</>;
	}

	useEffect(() => {
		if (user) {
			setAccountData((prev) => ({
				...prev,
				userName: user?.name || "USER",
				email: user.email || "example@mail.com",
				phoneNumber: user.phoneNumber || "+1 (555) 123-4567",
				memberSince: user.createdAt
					? moment(user.createdAt).format("MMMM DD, YYYY")
					: "MMMM DD, YYYY",
				totalCoursesEnrolled: user.totalCoursesEnrolled || 0,
				coursesCompleted: user.coursesCompleted || 0,
				totalAchievements: user.totalAchievements || 0,
				lastLogin: user.timeOfActive
					? moment(user.timeOfActive).format("YYYY-MM-DD hh:mm A")
					: "N/A",

				loginHistory: [],
				achievements: [],
			}));
		}
	}, [user]);

	// Simulate "real-time" updates (e.g., last login, new achievements)
	useEffect(() => {
		const interval = setInterval(() => {
			setAccountData((prevData) => {
				const now = new Date();
				const newLoginTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString(
					[],
					{ hour: "2-digit", minute: "2-digit", hour12: true }
				)}`;
				const newLoginEntry = {
					id: Date.now(),
					date: now.toLocaleDateString(),
					time: now.toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
						hour12: true,
					}),
					ip: `192.168.1.${Math.floor(Math.random() * 255)}`, // Simulated IP
					location: "Lagos, Nigeria", // Fixed for demo
				};

				// Simulate a new achievement occasionally
				const newAchievements = [...prevData.achievements];
				if (Math.random() > 0.95 && newAchievements.length < 5) {
					// Limit number of dummy achievements
					const newAchievementTitle = `Mastered ${
						["Python", "JavaScript", "Cloud Computing"][
							Math.floor(Math.random() * 3)
						]
					}`;
					newAchievements.push({
						id: Date.now() + 1,
						title: newAchievementTitle,
						description: `Achieved mastery in ${newAchievementTitle
							.toLowerCase()
							.replace("mastered ", "")}`,
						icon: <FaStar />,
					});
				}

				return {
					...prevData,
					lastLogin: newLoginTime,
					loginHistory: [newLoginEntry, ...prevData.loginHistory.slice(0, 4)], // Keep last 5 logins
					achievements: newAchievements,
				};
			});
		}, 30000); // Update every 30 seconds

		return () => clearInterval(interval);
	}, []);

	const StatCard = ({ title, value, icon }) => (
		<div
			className={`relative ${accentColors.grayBg} ${accentColors.darkTextPrimary} p-6 rounded-xl shadow-lg overflow-hidden
                        transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl
                        flex flex-col justify-between animate-fade-in border border-gray-200`}
		>
			<div className="absolute top-4 right-4 text-gray-300 opacity-50 text-5xl">
				{icon}
			</div>
			<h3 className="text-lg md:text-xl font-semibold mb-2 z-10">{title}</h3>
			<p className="text-4xl md:text-5xl font-extrabold z-10">{value}</p>
		</div>
	);

	return (
		<div className={`p-4 md:p-8 ${accentColors.darkBgPrimary} min-h-full`}>
			{/* Page Header */}
			<div
				className={`${accentColors.lightBgSecondary} ${accentColors.lightTextSecondary} p-6 md:p-8 rounded-xl shadow-lg mb-8 animate-fade-in-down`}
			>
				<h2 className="text-3xl md:text-4xl font-extrabold mb-2">
					My Account Overview
				</h2>
				<p className={`text-lg md:text-xl ${accentColors.lightTextSecondary}`}>
					Comprehensive details about your Innovation University account.
				</p>
			</div>

			{/* Basic Account Information */}
			<div
				className={`${accentColors.grayBg} ${accentColors.darkTextPrimary} p-6 rounded-xl shadow-lg mb-8 animate-fade-in-left`}
			>
				<h3 className="text-2xl font-bold mb-4 flex items-center">
					<FaUserCircle className="mr-3" /> Personal Information
				</h3>
				{Loading ? (
					"Loading Data"
				) : (
					<>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="p-4 bg-white rounded-lg border border-gray-200">
								<p className={`text-sm ${accentColors.darkGrayText}`}>
									Full Name:
								</p>
								<p className="text-lg font-semibold">{accountData.userName}</p>
							</div>
							<div className="p-4 bg-white rounded-lg border border-gray-200">
								<p className={`text-sm ${accentColors.darkGrayText}`}>
									Email Address:
								</p>
								<p className="text-lg font-semibold">{accountData.email}</p>
							</div>
							<div className="p-4 bg-white rounded-lg border border-gray-200">
								<p className={`text-sm ${accentColors.darkGrayText}`}>
									Phone Number:
								</p>
								<p className="text-lg font-semibold">
									{accountData.phoneNumber}
								</p>
							</div>
							<div className="p-4 bg-white rounded-lg border border-gray-200">
								<p className={`text-sm ${accentColors.darkGrayText}`}>
									Member Since:
								</p>
								<p className="text-lg font-semibold">
									{accountData.memberSince}
								</p>
							</div>
						</div>
						<div className="mt-6 text-center">
							<Link
								to="/dashboard/settings"
								className={`inline-flex items-center text-lg font-semibold ${accentColors.blue} hover:underline`}
							>
								<FaCog className="mr-2" /> Edit Profile in Settings
							</Link>
						</div>
					</>
				)}
			</div>

			{/* Learning Statistics */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
				<StatCard
					title="Total Courses Enrolled"
					value={accountData.totalCoursesEnrolled}
					icon={<FaBookOpen />}
				/>
				<StatCard
					title="Courses Completed"
					value={accountData.coursesCompleted}
					icon={<FaCheckCircle />}
				/>
				<StatCard
					title="Total Achievements"
					value={accountData.totalAchievements}
					icon={<FaTrophy />}
				/>
			</div>

			{/* Recent Activity / Login History & Achievements */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
				{/* Recent Activity / Login History */}
				<div
					className={`${accentColors.grayBg} ${accentColors.darkTextPrimary} p-6 rounded-xl shadow-lg animate-fade-in-left`}
				>
					<h3 className="text-2xl font-bold mb-4 flex items-center">
						<FaHistory className="mr-3" /> Recent Activity
					</h3>
					<div className="space-y-3">
						<div
							className={`p-4 bg-white rounded-lg shadow-sm border border-gray-200 animate-fade-in-up`}
						>
							<h4 className="text-lg font-semibold flex items-center">
								<FaSignInAlt className="mr-2" /> Last Login:
							</h4>
							<p className={`text-md ${accentColors.darkGrayText}`}>
								{accountData.lastLogin}
							</p>
						</div>
						<h4 className="text-xl font-semibold mt-6 mb-3">Login History</h4>
						{accountData.loginHistory.length > 0 ? (
							<div className="space-y-2">
								{accountData.loginHistory.map((entry) => (
									<div
										key={entry.id}
										className="p-3 bg-white rounded-lg shadow-sm border border-gray-200 flex justify-between items-center text-sm animate-fade-in-up"
									>
										<div>
											<p className="font-semibold">
												{entry.date} at {entry.time}
											</p>
											<p className={`${accentColors.darkGrayText}`}>
												{entry.ip}
											</p>
										</div>
										<p
											className={`${accentColors.darkGrayText} flex items-center`}
										>
											<FaGlobe className="mr-1" /> {entry.location}
										</p>
									</div>
								))}
							</div>
						) : (
							<p className={`${accentColors.darkGrayText}`}>
								No login history available.
							</p>
						)}
					</div>
				</div>

				{/* Achievements */}
				<div
					className={`${accentColors.grayBg} ${accentColors.darkTextPrimary} p-6 rounded-xl shadow-lg animate-fade-in-right`}
				>
					<h3 className="text-2xl font-bold mb-4 flex items-center">
						<FaTrophy className="mr-3" /> My Achievements
					</h3>
					<div className="space-y-3">
						{accountData.achievements.length > 0 ? (
							accountData.achievements.map((achievement) => (
								<div
									key={achievement.id}
									className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center animate-fade-in-up"
								>
									<div className={`text-3xl mr-4 ${accentColors.orange}`}>
										{achievement.icon}
									</div>
									<div>
										<h4 className="text-lg font-semibold">
											{achievement.title}
										</h4>
										<p className={`text-sm ${accentColors.darkGrayText}`}>
											{achievement.description}
										</p>
									</div>
								</div>
							))
						) : (
							<p className={`${accentColors.darkGrayText}`}>
								No achievements unlocked yet. Keep learning!
							</p>
						)}
					</div>
				</div>
			</div>

			{/* Quick Actions / Links */}
			<div
				className={`${accentColors.lightBgSecondary} ${accentColors.lightTextSecondary} p-6 md:p-8 rounded-xl shadow-lg animate-fade-in-up`}
			>
				<h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">
					Quick Actions
				</h3>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					<Link
						to="/dashboard/all-our-courses"
						className={`flex flex-col items-center justify-center p-4 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors duration-200 group`}
					>
						<FaBookOpen
							className={`text-4xl mb-2 ${accentColors.blue} group-hover:scale-110 transition-transform`}
						/>
						<span className="font-semibold text-center">Explore Courses</span>
					</Link>
					<Link
						// to="/user/grades"
						onClick={() => {
							alert("Please bare with us");
						}}
						className={`flex flex-col items-center justify-center p-4 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors duration-200 group`}
					>
						<FaChartLine
							className={`text-4xl mb-2 ${accentColors.green} group-hover:scale-110 transition-transform`}
						/>
						<span className="font-semibold text-center">Check Grades</span>
					</Link>
					<Link
						// to="/user/support"
						onClick={() => {
							alert("Please bare with us");
						}}
						className={`flex flex-col items-center justify-center p-4 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors duration-200 group`}
					>
						<FaEnvelope
							className={`text-4xl mb-2 ${accentColors.purple} group-hover:scale-110 transition-transform`}
						/>
						<span className="font-semibold text-center">Get Support</span>
					</Link>
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
			`}</style>
		</div>
	);
};

export default UserAccountPage;
