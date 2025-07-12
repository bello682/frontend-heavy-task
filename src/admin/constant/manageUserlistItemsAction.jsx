// src/components/dashboard/ManageUserListItemAction.jsx
import React from "react";
import Button from "../components/ui/Button";
import {
	FaTrashAlt,
	FaEnvelope,
	FaPhoneAlt,
	FaUserCircle,
	FaExclamationTriangle,
	FaInfoCircle,
	FaCheckCircle,
	FaGift,
} from "react-icons/fa";

const ManageUserListItemAction = ({ user, onActionClick }) => {
	// Define accent colors directly in the component
	const accentColors = {
		grayBg: "bg-gray-800", // Darker gray for card backgrounds on primary black
		lightGrayText: "text-gray-300", // Lighter gray for secondary text on dark backgrounds
		darkTextPrimary: "text-white", // Primary text on dark backgrounds
		red: "text-[#EF4444]", // Red for delete button and warning
		blue: "text-[#3B82F6]", // Blue for info/general actions
		green: "text-[#22C55E]", // Green for success
		orange: "text-[#F97316]", // Orange for promo/gift
	};

	return (
		<div
			className={`flex flex-col sm:flex-row items-center ${accentColors.grayBg} ${accentColors.darkTextPrimary} p-4 rounded-lg shadow-md mb-4
                        border border-gray-700 transition-transform duration-200 hover:scale-[1.01] animate-fade-in-up`}
		>
			{/* User Avatar/Icon */}
			<div className="w-full sm:w-24 h-24 flex-shrink-0 mb-4 sm:mb-0 sm:mr-4 flex items-center justify-center rounded-full overflow-hidden border border-gray-600 bg-gray-700">
				{/* Placeholder for user avatar or default icon */}
				<FaUserCircle className="text-6xl text-gray-400" />
			</div>

			{/* User Details */}
			<div className="flex-1 text-center sm:text-left">
				<h3 className="text-xl font-bold mb-1">{user.name}</h3>
				<p
					className={`text-sm ${accentColors.lightGrayText} flex items-center justify-center sm:justify-start mb-1`}
				>
					<FaEnvelope className="mr-2" /> {user.email}
				</p>
				<p
					className={`text-sm ${accentColors.lightGrayText} flex items-center justify-center sm:justify-start mb-1`}
				>
					<FaPhoneAlt className="mr-2" /> {user.phoneNumber || "N/A"}
				</p>
				<p
					className={`text-md font-semibold flex items-center justify-center sm:justify-start`}
				>
					Role: <span className="ml-1 capitalize">{user.role || "user"}</span>
				</p>
			</div>

			{/* Action Buttons */}
			<div className="mt-4 sm:mt-0 sm:ml-auto flex flex-wrap justify-center sm:justify-end gap-2">
				<Button
					onClick={() => onActionClick(user, "sendWarning")}
					variant="secondary"
					className={`flex items-center justify-center px-3 py-2 text-sm ${accentColors.red} border-gray-600 hover:bg-gray-700`}
					title="Send Warning Message"
				>
					<FaExclamationTriangle className="mr-1" /> Warn
				</Button>
				<Button
					onClick={() => onActionClick(user, "sendAlert")}
					variant="secondary"
					className={`flex items-center justify-center px-3 py-2 text-sm ${accentColors.blue} border-gray-600 hover:bg-gray-700`}
					title="Send Alert Message"
				>
					<FaInfoCircle className="mr-1" /> Alert
				</Button>
				<Button
					onClick={() => onActionClick(user, "sendSuccess")}
					variant="secondary"
					className={`flex items-center justify-center px-3 py-2 text-sm ${accentColors.green} border-gray-600 hover:bg-gray-700`}
					title="Send Success Message"
				>
					<FaCheckCircle className="mr-1" /> Success
				</Button>
				<Button
					onClick={() => onActionClick(user, "sendPromo")}
					variant="secondary"
					className={`flex items-center justify-center px-3 py-2 text-sm ${accentColors.orange} border-gray-600 hover:bg-gray-700`}
					title="Send Promotional Message"
				>
					<FaGift className="mr-1" /> Promo
				</Button>
				<Button
					onClick={() => onActionClick(user, "deleteUser")}
					variant="danger"
					className="flex items-center justify-center px-3 py-2 text-sm"
					title="Delete User"
				>
					<FaTrashAlt className="mr-1" /> Delete
				</Button>
			</div>
			{/* Custom Animations for List Item */}
			<style jsx="true">{`
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
				.animate-fade-in-up {
					animation: fadeInUp 0.5s ease-out forwards;
				}
			`}</style>
		</div>
	);
};

export default ManageUserListItemAction;
