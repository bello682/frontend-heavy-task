import React from "react";
import { motion as Motion } from "framer-motion";
import {
	ArrowUpRight,
	CreditCard,
	Receipt,
	LifeBuoy,
} from "../../../components/Icons/lucid-icons"; // Centralized icon import

// --- Dash_Quick_ActionsGrid Component ---
const Dash_Quick_ActionsGrid = ({ itemVariants }) => {
	const actions = [
		{ name: "Transfer", icon: ArrowUpRight },
		{ name: "Pay Bills", icon: CreditCard },
		{ name: "Statements", icon: Receipt },
		{ name: "Support", icon: LifeBuoy },
	];

	return (
		<Motion.section
			className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8"
			// Note: This section itself doesn't need variants if its children handle the stagger
			// but keeping it here for consistency with the parent's staggeredChildren setup.
		>
			{actions.map((action) => (
				<Motion.button
					key={action.name}
					className="flex flex-col items-center justify-center bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group"
					variants={itemVariants}
					whileHover={{ scale: 1.03, y: -5 }}
					whileTap={{ scale: 0.98 }}
				>
					<action.icon
						size={32}
						className="text-blue-500 mb-2 group-hover:text-blue-600 transition-colors"
					/>
					<span className="text-sm sm:text-base font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
						{action.name}
					</span>
				</Motion.button>
			))}
		</Motion.section>
	);
};

export default Dash_Quick_ActionsGrid;
