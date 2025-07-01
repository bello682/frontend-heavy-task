import React from "react";
import { motion as Motion } from "framer-motion";
import {
	ArrowUpRight,
	ArrowDownLeft,
} from "../../../components/Icons/lucid-icons"; // Centralized icon import

// --- Dash_Recent_Transactions Component ---
const Dash_Recent_Transactions = ({ transactions, itemVariants }) => {
	return (
		<Motion.section
			className="bg-white p-4 sm:p-6 rounded-xl shadow-md"
			variants={itemVariants}
		>
			<h2 className="text-xl font-bold mb-6">Recent Transactions</h2>
			<div className="space-y-4">
				{transactions.map((transaction) => (
					<Motion.div
						key={transaction.id}
						className="flex items-center justify-between border-b border-gray-200 pb-3 last:border-b-0 last:pb-0"
						variants={itemVariants}
					>
						<div className="flex items-center space-x-3">
							<div
								className={`w-10 h-10 rounded-full flex items-center justify-center ${
									transaction.type === "debit"
										? "bg-red-100 text-red-600"
										: "bg-green-100 text-green-600"
								}`}
							>
								{transaction.type === "debit" ? (
									<ArrowUpRight size={20} />
								) : (
									<ArrowDownLeft size={20} />
								)}
							</div>
							<div>
								<p className="font-medium text-gray-800">
									{transaction.description}
								</p>
								<p className="text-xs text-gray-500">{transaction.date}</p>
							</div>
						</div>
						<p
							className={`font-semibold ${
								transaction.type === "debit" ? "text-red-600" : "text-green-600"
							}`}
						>
							{transaction.type === "debit" ? "-" : "+"}$
							{Math.abs(transaction.amount).toLocaleString("en-US", {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}
						</p>
					</Motion.div>
				))}
			</div>
		</Motion.section>
	);
};

export default Dash_Recent_Transactions;
