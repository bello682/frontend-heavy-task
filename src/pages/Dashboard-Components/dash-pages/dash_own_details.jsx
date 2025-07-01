import React, { useState } from "react";
import Data_Balance_Card from "./data-balance-card";
import Dash_Quick_ActionsGrid from "./dash-quick-action";
import Dash_Recent_Transactions from "./recent-transactions";
import { motion as Motion } from "framer-motion";

const Dash_own_details = () => {
	// State to toggle balance visibility, managed here as it affects BalanceCard
	const [showBalance, setShowBalance] = useState(true);

	const currentBalance = 12345.67;

	// Dummy transaction data
	const recentTransactions = [
		{
			id: 1,
			description: "Coffee Shop",
			amount: -5.5,
			date: "Jul 1",
			type: "debit",
		},
		{
			id: 2,
			description: "Salary Deposit",
			amount: 2500.0,
			date: "Jun 30",
			type: "credit",
		},
		{
			id: 3,
			description: "Online Subscription",
			amount: -12.99,
			date: "Jun 29",
			type: "debit",
		},
		{
			id: 4,
			description: "Grocery Store",
			amount: -75.2,
			date: "Jun 28",
			type: "debit",
		},
	];

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	return (
		<Motion.div variants={containerVariants} initial="hidden" animate="visible">
			{/* Balance Overview Card */}
			<Data_Balance_Card
				currentBalance={currentBalance}
				showBalance={showBalance}
				setShowBalance={setShowBalance}
				itemVariants={itemVariants}
			/>

			{/* Quick Actions Grid */}
			<Dash_Quick_ActionsGrid itemVariants={itemVariants} />

			{/* Recent Transactions */}
			<Dash_Recent_Transactions
				transactions={recentTransactions}
				itemVariants={itemVariants}
			/>
		</Motion.div>
	);
};

export default Dash_own_details;
