import React from "react";
import { motion as Motion } from "framer-motion";
import { Eye, EyeOff } from "../../../components/Icons/lucid-icons"; // Centralized icon import

// --- Data_Balance_Card Component ---
const Data_Balance_Card = ({
	currentBalance,
	showBalance,
	setShowBalance,
	itemVariants,
}) => {
	return (
		<Motion.section
			className=" bg-gray-900 text-white p-6 sm:p-8 rounded-xl shadow-lg mb-8 relative overflow-hidden"
			variants={itemVariants}
		>
			<div className="absolute inset-0 opacity-10 pointer-events-none">
				{/* Subtle background pattern for visual interest */}
				<svg
					className="w-full h-full"
					viewBox="0 0 200 200"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<circle
						cx="100"
						cy="100"
						r="80"
						stroke="currentColor"
						strokeWidth="1"
						strokeOpacity="0.2"
					/>
					<circle
						cx="100"
						cy="100"
						r="60"
						stroke="currentColor"
						strokeWidth="1"
						strokeOpacity="0.15"
					/>
				</svg>
			</div>
			<div className="relative z-10 flex items-center justify-between mb-4">
				<h2 className="text-lg sm:text-xl font-semibold">Current Balance</h2>
				<Motion.button
					onClick={() => setShowBalance(!showBalance)}
					className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
					whileTap={{ scale: 0.95 }}
				>
					{showBalance ? <EyeOff size={24} /> : <Eye size={24} />}
				</Motion.button>
			</div>
			<p className="text-4xl sm:text-5xl font-extrabold mb-6">
				{showBalance
					? `$${currentBalance.toLocaleString("en-US", {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
					  })}`
					: "••••••••"}
			</p>
			<Motion.button
				className="w-full bg-white text-gray-900 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition-colors"
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
			>
				Add Funds
			</Motion.button>
		</Motion.section>
	);
};

export default Data_Balance_Card;
