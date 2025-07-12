import React, { useState, useRef, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
	X,
	Send,
	MessageSquare,
} from "../../../../components/Icons/lucid-icons";
import { sendMessage, getMessages } from "../chat/chatApi";
import { getAuthToken } from "../../../../utils/authStorage";
// import { getUserId } from "../../../../utils/authStorage";

// 🔑 Replace with your actual Admin MongoDB _id
const ADMIN_ID = "64fbb31c624b392188bfe123";

const ChatModal = ({ isOpen, onClose }) => {
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		if (isOpen) {
			scrollToBottom();
		}
	}, [messages, isOpen]);

	// Send message handler
	const handleSendMessage = async (e) => {
		e.preventDefault();
		if (newMessage.trim() === "") return;

		const token = getAuthToken();
		// const userId = getUserId();

		const userMessage = {
			id: Date.now(),
			sender: "User",
			text: newMessage.trim(),
			time: new Date().toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			}),
		};

		// Show user message instantly
		setMessages((prev) => [...prev, userMessage]);
		setNewMessage("");

		try {
			await sendMessage(token, ADMIN_ID, newMessage);
			// Optionally refresh chat after sending
			fetchMessages();
		} catch (error) {
			console.error("Send failed:", error);
		}
	};

	// Fetch message history
	const fetchMessages = async () => {
		try {
			const token = getAuthToken();
			const { data } = await getMessages(token, ADMIN_ID);

			const formatted = data.messages.map((msg) => ({
				id: msg._id,
				sender: msg.senderModel === "Admin" ? "AI" : "User",
				text: msg.text,
				time: new Date(msg.createdAt).toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit",
				}),
			}));

			setMessages(formatted);
		} catch (err) {
			console.error("Fetch messages failed:", err);
		}
	};

	useEffect(() => {
		if (isOpen) {
			fetchMessages();
		}
	}, [isOpen]);

	// Modal animation
	const modalVariants = {
		hidden: { opacity: 0, y: "100vh", x: "-50%", scale: 0.8 },
		visible: {
			opacity: 1,
			y: "0",
			x: "-50%",
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
			y: "100vh",
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
					onClick={onClose}
				>
					<Motion.div
						className="bg-primary-white rounded-xl shadow-2xl w-full max-w-md h-[85vh] sm:h-[70vh] flex flex-col overflow-hidden relative"
						variants={modalVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						onClick={(e) => e.stopPropagation()}
						style={{ left: "50%", transform: "translateX(-50%)" }}
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

						{/* Chat Body */}
						<div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-800">
							{messages.map((msg) => (
								<div
									key={msg.id}
									className={`flex ${
										msg.sender === "User" ? "justify-end" : "justify-start"
									}`}
								>
									<div
										className={`p-3 rounded-lg max-w-[75%] shadow-sm ${
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
							<div ref={messagesEndRef} />
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
