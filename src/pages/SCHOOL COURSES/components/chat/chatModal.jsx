// src/components/Chat/ChatModal.jsx

import React, { useState, useRef, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
	X,
	Send,
	User,
	MessageSquare,
	Info,
} from "../../../../components/Icons/lucid-icons"; // Assuming these are exported

// Dummy chat messages for demonstration
const dummyMessages = [
	{
		id: 1,
		sender: "AI",
		text: "Hello! How can I help you today?",
		time: "10:00 AM",
	},
	{
		id: 2,
		sender: "User",
		text: "I have a question about the AI & ML course.",
		time: "10:01 AM",
	},
	{
		id: 3,
		sender: "AI",
		text: "Certainly! What would you like to know about it?",
		time: "10:02 AM",
	},
	{
		id: 4,
		sender: "AI",
		text: "Please type your question below.",
		time: "10:02 AM",
	},
];

const ChatModal = ({ isOpen, onClose }) => {
	const [messages, setMessages] = useState(dummyMessages);
	const [newMessage, setNewMessage] = useState("");
	const messagesEndRef = useRef(null);

	// Scroll to the latest message
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		if (isOpen) {
			scrollToBottom(); // Scroll to bottom when modal opens or messages update
		}
	}, [messages, isOpen]);

	// Handle sending a new message (dummy logic)
	const handleSendMessage = (e) => {
		e.preventDefault();
		if (newMessage.trim() === "") return;

		const userMessage = {
			id: messages.length + 1,
			sender: "User",
			text: newMessage.trim(),
			time: new Date().toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			}),
		};

		setMessages((prevMessages) => [...prevMessages, userMessage]);
		setNewMessage("");

		// Simulate an AI response after a short delay
		setTimeout(() => {
			const aiResponse = {
				id: messages.length + 2,
				sender: "AI",
				text: "Thank you for your message. An admin will get back to you shortly.",
				time: new Date().toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit",
				}),
			};
			setMessages((prevMessages) => [...prevMessages, aiResponse]);
		}, 1500);
	};

	// Variants for the modal sliding in/out
	const modalVariants = {
		hidden: { opacity: 0, y: "100vh", x: "-50%", scale: 0.8 }, // Start bottom-center, scaled
		visible: {
			opacity: 1,
			y: "0",
			x: "-50%", // Keep centered horizontally
			scale: 1,
			transition: {
				duration: 0.5,
				type: "spring",
				damping: 25,
				stiffness: 500,
			},
		},
		exit: {
			opacity: 0,
			y: "100vh", // Exit to bottom
			x: "-50%",
			scale: 0.8,
			transition: { duration: 0.3 },
		},
	};

	const overlayVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { duration: 0.3 } },
		exit: { opacity: 0, transition: { duration: 0.2 } },
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<Motion.div
					className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6 bg-black bg-opacity-70 backdrop-blur-sm"
					variants={overlayVariants}
					initial="hidden"
					animate="visible"
					exit="exit"
					onClick={onClose} // Close modal when clicking on overlay
				>
					<Motion.div
						className="bg-primary-white rounded-xl shadow-2xl w-full max-w-md h-[85vh] sm:h-[70vh] flex flex-col overflow-hidden relative"
						variants={modalVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
						style={{ left: "50%", transform: "translateX(-50%)" }} // Ensure horizontal centering
					>
						{/* Chat Header */}
						<div className="flex items-center justify-between p-4 border-b border-gray-light bg-accent-blue text-primary-white">
							<div className="flex items-center space-x-2">
								<MessageSquare size={24} />
								<h2 className="text-xl font-semibold">Chat with Support</h2>
							</div>
							<Motion.button
								onClick={onClose}
								className="p-2 rounded-full hover:bg-blue-700 transition-colors"
								whileTap={{ scale: 0.9 }}
								aria-label="Close chat modal"
							>
								<X size={20} />
							</Motion.button>
						</div>

						{/* Chat Body - Messages */}
						<div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-800">
							{messages.map((msg) => (
								<div
									key={msg.id}
									className={`flex ${
										msg.sender === "User" ? "justify-end" : "justify-start"
									}`}
								>
									<div
										className={`p-3 rounded-lg max-w-[75%] shadow-sm
                                                     ${
																												msg.sender === "User"
																													? "bg-accent-blue text-primary-white"
																													: "bg-gray-900 text-gray-text"
																											}`}
									>
										<p className="text-sm">{msg.text}</p>
										<p
											className={`text-xs mt-1 ${
												msg.sender === "User"
													? "text-blue-200"
													: "text-gray-500"
											} text-right`}
										>
											{msg.time}
										</p>
									</div>
								</div>
							))}
							<div ref={messagesEndRef} /> {/* Scroll target */}
						</div>

						{/* Chat Input */}
						<form
							onSubmit={handleSendMessage}
							className="p-4 border-t border-gray-light bg-primary-white flex items-center space-x-3"
						>
							<input
								type="text"
								value={newMessage}
								onChange={(e) => setNewMessage(e.target.value)}
								placeholder="Type your message..."
								className="flex-1 p-3 border border-gray-light rounded-lg focus:ring-accent-blue focus:border-accent-blue outline-none"
							/>
							<Motion.button
								type="submit"
								className="p-3 bg-accent-blue text-primary-white rounded-full shadow-md hover:bg-blue-700 transition-colors"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								aria-label="Send message"
							>
								<Send size={24} />
							</Motion.button>
						</form>
					</Motion.div>
				</Motion.div>
			)}
		</AnimatePresence>
	);
};

export default ChatModal;
