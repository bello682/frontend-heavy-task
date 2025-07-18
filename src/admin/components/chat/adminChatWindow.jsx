// src/components/admin-dashboard/chat/AdminChatWindow.jsx
import React, { useState, useEffect, useRef } from "react";
import {
	FaPaperPlane,
	FaSpinner,
	FaUserCircle,
	FaEnvelope,
} from "react-icons/fa";
import moment from "moment";
import Button from "./../ui/Button";

const AdminChatWindow = ({
	selectedUser,
	messages,
	onSendMessage,
	loadingMessages,
	errorMessages,
}) => {
	// Define accent colors directly in the component
	const accentColors = {
		green: "text-[#22C55E]", // Success/Positive
		red: "text-[#EF4444]", // Error/Negative
		blue: "text-[#3B82F6]", // This specific blue is used for spinner, not general design
		grayBg: "bg-gray-800", // Darker gray for chat window background
		lightGrayText: "text-gray-300", // Lighter gray for secondary text
		darkTextPrimary: "text-white", // Primary text on dark backgrounds
		userBubbleBg: "bg-gray-700", // User message bubble background
		adminBubbleBg: "bg-[#3B82F6]", // Admin message bubble background - Using your specified blue
		inputBg: "bg-gray-900", // Input field background
		inputBorder: "border-gray-700", // Input field border
	};

	const [newMessage, setNewMessage] = useState("");
	const messagesEndRef = useRef(null);

	// Scroll to bottom whenever messages change
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, selectedUser]);

	const handleSend = (e) => {
		e.preventDefault();
		if (newMessage.trim()) {
			onSendMessage(newMessage.trim());
			setNewMessage("");
		}
	};

	// console.log(selectedUser);

	if (!selectedUser) {
		return (
			<div
				className={`flex flex-col items-center justify-center h-full ${accentColors.grayBg} rounded-xl shadow-lg animate-fade-in`}
			>
				<FaUserCircle
					className={`text-6xl mb-4 ${accentColors.lightGrayText}`}
				/>
				<p className={`text-xl font-semibold ${accentColors.darkTextPrimary}`}>
					Select a user to start chatting
				</p>
				<p className={`text-sm ${accentColors.lightGrayText}`}>
					Messages will appear here.
				</p>
			</div>
		);
	}

	return (
		<div
			className={`flex flex-col h-full ${accentColors.grayBg} rounded-xl shadow-lg animate-fade-in-right`}
		>
			{/* Chat Header */}
			<div
				className={`p-4 border-b ${accentColors.inputBorder} flex items-center justify-between ${accentColors.inputBg} rounded-t-xl`}
			>
				<h3 className={`text-xl font-bold ${accentColors.darkTextPrimary}`}>
					Chat with {selectedUser.name}
				</h3>
				<span className={`text-sm ${accentColors.lightGrayText}`}>
					<FaEnvelope className="inline-block mr-1" />
					{selectedUser.email}
				</span>
			</div>

			{/* Messages Area - Added overflow-y-auto and custom-scrollbar for scrolling */}
			<div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
				{loadingMessages ? (
					<div className="flex justify-center items-center h-full">
						<FaSpinner
							className={`animate-spin text-4xl ${accentColors.blue}`}
						/>
					</div>
				) : errorMessages ? (
					<div
						className={`text-center p-4 ${accentColors.red} bg-opacity-10 rounded-lg`}
						style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
					>
						<p>{errorMessages}</p>
					</div>
				) : messages.length === 0 ? (
					<div className="flex flex-col items-center justify-center h-full text-center">
						<FaEnvelope
							className={`text-5xl mb-3 ${accentColors.lightGrayText}`}
						/>
						<p className={`text-lg ${accentColors.darkTextPrimary}`}>
							No messages yet.
						</p>
						<p className={`text-sm ${accentColors.lightGrayText}`}>
							Start the conversation with {selectedUser.name}.
						</p>
					</div>
				) : (
					messages.map((msg) => (
						<div
							key={msg.id}
							// Use msg.isMyMessage for alignment logic, passed from parent AdminChatPage
							className={`flex ${
								msg.isMyMessage ? "justify-end" : "justify-start"
							}`}
						>
							<div
								className={`p-3 rounded-lg shadow-md
                                    max-w-[85%] sm:max-w-[75%] md:max-w-[65%] lg:max-w-[60%]
                                    ${
																			msg.isMyMessage
																				? `${accentColors.adminBubbleBg} ${accentColors.darkTextPrimary} ml-auto` // Admin's message bubble
																				: `${accentColors.userBubbleBg} ${accentColors.darkTextPrimary} mr-auto` // User's message bubble
																		}
                                    break-words whitespace-pre-wrap animate-fade-in-up
                                `}
							>
								{/* Only show sender name/email for user messages if not "My Message" */}
								{!msg.isMyMessage && (
									<div className="font-semibold text-sm mb-1 text-gray-200">
										{msg.name || "User"}
									</div>
								)}
								<p className="text-sm leading-relaxed">{msg.text}</p>
								<p
									className={`text-xs mt-1 text-right ${
										msg.isMyMessage
											? "text-blue-100" // Lighter shade for admin's timestamp
											: accentColors.lightGrayText
									}`}
								>
									{moment(msg.timestamp).format("hh:mm A")}
								</p>
							</div>
						</div>
					))
				)}
				<div ref={messagesEndRef} /> {/* Scroll target */}
			</div>

			{/* Message Input */}
			<form
				onSubmit={handleSend}
				className={`p-4 border-t ${accentColors.inputBorder} flex items-center space-x-3 ${accentColors.inputBg} rounded-b-xl`}
			>
				<input
					type="text"
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					placeholder="Type a message..."
					className={`flex-1 p-3 rounded-lg focus:ring-2 focus:ring-[#3B82F6] outline-none
                                bg-gray-700 ${accentColors.darkTextPrimary} border-gray-600`}
				/>
				<Button
					type="submit"
					variant="primary" // Assuming this variant applies your desired blue button style
					className="p-3 flex items-center justify-center bg-[#3B82F6] hover:bg-[#2A6FF6] text-black cursor-pointer" // Explicitly setting background here to override default Button variant if needed
					disabled={!newMessage.trim()}
				>
					<FaPaperPlane className="text-lg" />
					{/* Removed "Send" text as requested */}
				</Button>
			</form>

			{/* Custom Animations - No changes needed here, still good. */}
			<style jsx="true">{`
				.custom-scrollbar::-webkit-scrollbar {
					width: 8px;
				}
				.custom-scrollbar::-webkit-scrollbar-track {
					background: ${accentColors.grayBg};
					border-radius: 10px;
				}
				.custom-scrollbar::-webkit-scrollbar-thumb {
					background: ${accentColors.adminBubbleBg}; /* Using admin bubble color for scrollbar */
					border-radius: 10px;
				}
				.custom-scrollbar::-webkit-scrollbar-thumb:hover {
					background: #555;
				}

				@keyframes fadeIn {
					from {
						opacity: 0;
					}
					to {
						opacity: 1;
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
						transform: translateY(10px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
				.animate-fade-in {
					animation: fadeIn 0.5s ease-out forwards;
				}
				.animate-fade-in-right {
					animation: fadeInRight 0.5s ease-out forwards;
				}
				.animate-fade-in-up {
					animation: fadeInUp 0.3s ease-out forwards;
				}
			`}</style>
		</div>
	);
};

export default AdminChatWindow;
