// src/components/admin-dashboard/chat/UserChatListItem.jsx
import React from "react";
import { FaUserCircle, FaEnvelope, FaClock } from "react-icons/fa";
import moment from "moment";

const UserChatListItem = ({ user, isSelected, onClick }) => {
	// Define accent colors directly in the component
	const accentColors = {
		blue: "text-[#3B82F6]", // Selected/Active color
		grayBg: "bg-gray-800", // Darker gray for list item background
		lightGrayText: "text-gray-300", // Lighter gray for secondary text
		darkTextPrimary: "text-white", // Primary text on dark backgrounds
		whiteBg: "bg-white", // Background for unread indicator
		blackText: "text-black", // Text for unread indicator
	};

	const lastMessageTime = user.lastMessageTime
		? moment(user.lastMessageTime).calendar() // e.g., "Today at 2:30 PM", "Yesterday at 10:00 AM"
		: "No messages yet";

	return (
		<div
			onClick={() => onClick(user.userId)}
			className={`flex items-center p-4 rounded-lg cursor-pointer mb-2
                        transition-all duration-200 ease-in-out
                        ${
													isSelected
														? `${accentColors.blue} bg-opacity-20 backdrop-filter backdrop-blur-sm border-l-4 border-[#3B82F6]`
														: `${accentColors.grayBg} hover:bg-gray-700`
												}
                        relative animate-fade-in-up`}
		>
			{/* User Avatar */}
			<div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center mr-3">
				<FaUserCircle className="text-4xl text-gray-400" />
			</div>

			{/* User Info */}
			<div className="flex-1 overflow-hidden">
				<h4
					className={`text-lg font-semibold truncate ${
						isSelected ? accentColors.blue : accentColors.darkTextPrimary
					}`}
				>
					{user.name}
				</h4>
				<p
					className={`text-sm truncate ${
						isSelected ? accentColors.blue : accentColors.lightGrayText
					}`}
				>
					{user.lastMessage || "Start a conversation..."}
				</p>
			</div>

			{/* Last Message Time & Unread Indicator */}
			<div className="flex flex-col items-end ml-3">
				<p
					className={`text-xs ${
						isSelected ? accentColors.blue : accentColors.lightGrayText
					} mb-1`}
				>
					{lastMessageTime}
				</p>
				{user.hasNewMessages && !isSelected && (
					<span
						className={`w-3 h-3 rounded-full ${accentColors.blue} flex-shrink-0 animate-pulse`}
					></span>
				)}
			</div>

			{/* Custom Animations */}
			<style jsx="true">{`
				@keyframes fadeInUp {
					from {
						opacity: 0;
						transform: translateY(10px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
				.animate-fade-in-up {
					animation: fadeInUp 0.3s ease-out forwards;
				}
			`}</style>
		</div>
	);
};

export default UserChatListItem;
