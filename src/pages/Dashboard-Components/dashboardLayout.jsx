import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
// import Data_Balance_Card from "./dash-pages/data-balance-card";
import Dash_Header from "./dash-pages/dashHeader";
// import Dash_Quick_ActionsGrid from "./dash-pages/dash-quick-action";
// import Dash_Recent_Transactions from "./dash-pages/recent-transactions";
import Dash_Sidebar from "./dash-pages/dash_sideBar";
// import { Route, Routes } from "react-router-dom";
import DashContentDisplayOutlet from "./dashContentOutlet";

// --- Main DashboardLayout Component ---
const DashboardLayout = () => {
	// State to toggle balance visibility, managed here as it affects BalanceCard
	// const [showBalance, setShowBalance] = useState(true);
	// NEW: State to manage sidebar visibility
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	// Function to toggle sidebar
	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	// Dummy user data (replace with your actual Redux state or API data)
	const userName = "Alex";
	// const currentBalance = 12345.67;
	const notifications = [
		{ id: 1, message: "New security alert!", type: "warning" },
		{ id: 2, message: "Your statement is ready.", type: "info" },
	];

	// Dummy transaction data
	// const recentTransactions = [
	// 	{
	// 		id: 1,
	// 		description: "Coffee Shop",
	// 		amount: -5.5,
	// 		date: "Jul 1",
	// 		type: "debit",
	// 	},
	// 	{
	// 		id: 2,
	// 		description: "Salary Deposit",
	// 		amount: 2500.0,
	// 		date: "Jun 30",
	// 		type: "credit",
	// 	},
	// 	{
	// 		id: 3,
	// 		description: "Online Subscription",
	// 		amount: -12.99,
	// 		date: "Jun 29",
	// 		type: "debit",
	// 	},
	// 	{
	// 		id: 4,
	// 		description: "Grocery Store",
	// 		amount: -75.2,
	// 		date: "Jun 28",
	// 		type: "debit",
	// 	},
	// ];

	// Animation variants for staggered appearance, defined here and passed down
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1, // Delay between children animations
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<div className="min-h-screen bg-gray-50 font-inter text-gray-800 p-4 sm:p-6 lg:p-8">
			<Motion.div
				className="max-w-7xl mx-auto"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				<Dash_Sidebar
					isOpen={isSidebarOpen}
					onClose={() => setIsSidebarOpen(false)}
				/>

				{/* Header Section */}
				<Dash_Header
					userName={userName}
					notifications={notifications}
					itemVariants={itemVariants}
					toggleSidebar={toggleSidebar}
				/>

				{/* Balance Overview Card */}
				{/* <Data_Balance_Card
					currentBalance={currentBalance}
					showBalance={showBalance}
					setShowBalance={setShowBalance}
					itemVariants={itemVariants}
				/> */}

				{/* Quick Actions Grid */}
				{/* <Dash_Quick_ActionsGrid itemVariants={itemVariants} /> */}

				{/* Recent Transactions */}
				{/* <Dash_Recent_Transactions
					transactions={recentTransactions}
					itemVariants={itemVariants}
				/> */}

				{/* All dashboard content children comes in here  */}
				<DashContentDisplayOutlet />
			</Motion.div>
		</div>
	);
};

export default DashboardLayout;
