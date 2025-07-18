// // src/components/Chat/ChatModal.jsx
// import React, { useState, useRef, useEffect, useCallback } from "react";
// import { motion as Motion, AnimatePresence } from "framer-motion";
// import {
// 	X,
// 	Send,
// 	MessageSquare,
// } from "../../../../components/Icons/lucid-icons";
// import { fetchMessages, sendMessage } from "./chatApi";
// import { useAdminPublicId } from "./../../../../admin/api/dummyApi";
// import { socket } from "./../../../../utils/socket";
// import {
// 	getUserId,
// 	getUserName,
// 	getUserEmail,
// } from "../../../../utils/authStorage";

// const ChatModal = ({ isOpen, onClose }) => {
// 	const [messages, setMessages] = useState([]);
// 	const [newMessage, setNewMessage] = useState("");
// 	const messagesEndRef = useRef(null);

// 	const { admin, loading, error } = useAdminPublicId();
// 	const [fetchError, setFetchError] = useState("");

// 	const ADMIN_ID = admin?.id;
// 	const ADMIN_NAME = admin?.name || "Support";
// 	const ADMIN_EMAIL = admin?.email;

// 	const scrollToBottom = () => {
// 		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// 	};

// 	const loadMessages = useCallback(async () => {
// 		if (!ADMIN_ID || !getUserId()) {
// 			return;
// 		}
// 		try {
// 			const res = await fetchMessages(ADMIN_ID);
// 			const formatted = res.map((msg) => ({
// 				id: msg._id, // This is the actual DB _id
// 				sender: msg.senderModel === "Admin" ? ADMIN_NAME : "User", // Corrected 'You' to 'User' for consistency with handleSendMessage
// 				text: msg.text,
// 				time: new Date(msg.createdAt).toLocaleTimeString([], {
// 					hour: "2-digit",
// 					minute: "2-digit",
// 				}),
// 			}));
// 			setMessages(formatted);
// 			scrollToBottom();
// 		} catch (err) {
// 			console.error("Fetch messages failed:", err);
// 			setFetchError("Unable to load messages.");
// 		}
// 	}, [ADMIN_ID, ADMIN_NAME]);

// 	useEffect(() => {
// 		if (!isOpen || !ADMIN_ID) {
// 			socket.disconnect();
// 			return;
// 		}

// 		const userId = getUserId();
// 		const name = getUserName();
// 		const email = getUserEmail();

// 		socket.auth = { userId, email, name };
// 		if (!socket.connected) {
// 			socket.connect();
// 		}

// 		socket.emit("join", {
// 			userId: userId || null,
// 			name,
// 			email,
// 			role: "User",
// 		});

// 		const handleReceiveMessage = (msg) => {
// 			// Check if this message is one we optimistically sent
// 			setMessages((prev) => {
// 				const existingIndex = prev.findIndex(
// 					(m) => m.clientId === msg.clientId // Check for the temporary client ID
// 				);

// 				const formattedMsg = {
// 					id: msg._id, // Use the server-provided _id
// 					sender: msg.senderModel === "Admin" ? ADMIN_NAME : "User", // Correctly identify sender
// 					text: msg.text,
// 					time: new Date(msg.createdAt || new Date()).toLocaleTimeString([], {
// 						hour: "2-digit",
// 						minute: "2-digit",
// 					}),
// 				};

// 				if (existingIndex > -1) {
// 					// If an optimistic message exists, replace it with the confirmed one
// 					const newMessages = [...prev];
// 					newMessages[existingIndex] = formattedMsg;
// 					return newMessages;
// 				} else {
// 					// Otherwise, it's a new message (e.g., from admin, or from another client session)
// 					return [...prev, formattedMsg];
// 				}
// 			});
// 			scrollToBottom();
// 		};

// 		socket.on("receiveMessage", handleReceiveMessage);

// 		return () => {
// 			socket.off("receiveMessage", handleReceiveMessage);
// 			socket.disconnect();
// 		};
// 	}, [isOpen, ADMIN_ID, ADMIN_NAME]);

// 	useEffect(() => {
// 		if (isOpen && ADMIN_ID) {
// 			loadMessages();
// 		}
// 	}, [isOpen, ADMIN_ID, loadMessages]);

// 	const handleSendMessage = async (e) => {
// 		e.preventDefault();
// 		if (newMessage.trim() === "" || !ADMIN_ID) return;

// 		// Generate a temporary client-side ID
// 		const tempClientId = Date.now();

// 		const messageObj = {
// 			text: newMessage.trim(),
// 			senderId: getUserId(),
// 			receiverId: ADMIN_ID,
// 			name: getUserName(),
// 			email: getUserEmail(),
// 			role: "User",
// 			clientId: tempClientId, // Include the temporary ID
// 		};

// 		// Optimistically add the message to the UI
// 		setMessages((prev) => [
// 			...prev,
// 			{
// 				id: tempClientId, // Use clientId as id for optimistic display
// 				clientId: tempClientId, // Keep clientId to match later
// 				sender: "User", // This message is sent by the current user
// 				text: newMessage.trim(),
// 				time: new Date().toLocaleTimeString([], {
// 					hour: "2-digit",
// 					minute: "2-digit",
// 				}),
// 				// You might add a 'status: "sending"' here for visual feedback
// 			},
// 		]);
// 		setNewMessage("");
// 		scrollToBottom();

// 		try {
// 			// Send the message to your API/database
// 			await sendMessage(messageObj);
// 			// Emit via socket for real-time delivery to others (including admin)
// 			// The server should ideally send back the message with its actual _id and the original clientId
// 			socket.emit("sendMessage", messageObj);
// 		} catch (err) {
// 			console.error("Send message failed", err);
// 			setFetchError("Failed to send message. Please try again.");
// 			// If sending fails, remove the optimistic message
// 			setMessages((prev) =>
// 				prev.filter((msg) => msg.clientId !== tempClientId)
// 			);
// 		}
// 	};

// 	return (
// 		<AnimatePresence>
// 			{isOpen && (
// 				<Motion.div
// 					className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6 bg-[#000000aa] bg-opacity-70 backdrop-blur-sm"
// 					variants={{
// 						hidden: { opacity: 0 },
// 						visible: { opacity: 1, transition: { duration: 0.3 } },
// 						exit: { opacity: 0, transition: { duration: 0.2 } },
// 					}}
// 					initial="hidden"
// 					animate="visible"
// 					exit="exit"
// 					onClick={onClose}
// 				>
// 					<Motion.div
// 						className="bg-primary-white rounded-xl shadow-2xl w-full max-w-md h-[85vh] sm:h-[70vh] flex flex-col overflow-hidden relative"
// 						variants={{
// 							hidden: { opacity: 0, y: "100vh", x: "-50%", scale: 0.8 },
// 							visible: {
// 								opacity: 1,
// 								y: "0",
// 								x: "-50%",
// 								scale: 1,
// 								transition: {
// 									duration: 0.5,
// 									type: "spring",
// 									damping: 25,
// 									stiffness: 500,
// 								},
// 							},
// 							exit: {
// 								opacity: 0,
// 								y: "100vh",
// 								x: "-50%",
// 								scale: 0.8,
// 								transition: { duration: 0.3 },
// 							},
// 						}}
// 						initial="hidden"
// 						animate="visible"
// 						exit="exit"
// 						onClick={(e) => e.stopPropagation()}
// 						style={{ left: "50%", transform: "translateX(-50%)" }}
// 					>
// 						<div className="flex items-center justify-between p-4 border-b border-gray-light bg-accent-blue text-primary-white">
// 							<div className="flex items-center space-x-2">
// 								<MessageSquare size={24} />
// 								<h2 className="text-xl font-semibold">
// 									Chat with {ADMIN_NAME}
// 								</h2>
// 							</div>
// 							<Motion.button
// 								onClick={onClose}
// 								className="p-2 rounded-full hover:bg-blue-700 transition-colors"
// 								whileTap={{ scale: 0.9 }}
// 								aria-label="Close chat modal"
// 							>
// 								<X size={20} />
// 							</Motion.button>
// 						</div>

// 						{loading ? (
// 							<div className="flex-1 flex justify-center items-center text-gray-500">
// 								Please wait, fetching chat support info...
// 							</div>
// 						) : error ? (
// 							<div className="flex-1 flex justify-center items-center text-red-500 text-center p-4">
// 								OOP! SORRY: {error}
// 							</div>
// 						) : !ADMIN_ID ? (
// 							<div className="flex-1 flex justify-center items-center text-gray-500 text-center p-4">
// 								Chat support is currently unavailable. Please try again later.
// 							</div>
// 						) : (
// 							<>
// 								{fetchError && (
// 									<div className="text-red-500 text-sm text-center mt-2">
// 										{fetchError}
// 									</div>
// 								)}
// 								<div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-800">
// 									{messages.map((msg) => (
// 										<div
// 											key={msg.id} // Use msg.id, which will be the server _id or temporary clientId
// 											className={`flex ${
// 												msg.sender === "User" ? "justify-end" : "justify-start"
// 											}`}
// 										>
// 											<div
// 												className={`p-3 rounded-lg max-w-[75%] shadow-sm ${
// 													msg.sender === "User"
// 														? "bg-accent-blue text-primary-white"
// 														: "bg-gray-900 text-gray-text"
// 												}`}
// 											>
// 												<p className="text-sm break-words whitespace-pre-wrap">
// 													{msg.text}
// 												</p>
// 												<p
// 													className={`text-xs mt-1 ${
// 														msg.sender === "User"
// 															? "text-blue-200"
// 															: "text-gray-500"
// 													} text-right`}
// 												>
// 													{msg.time}
// 												</p>
// 											</div>
// 										</div>
// 									))}
// 									<div ref={messagesEndRef} />
// 								</div>
// 								<form
// 									onSubmit={handleSendMessage}
// 									className="p-4 border-t border-gray-light bg-primary-white flex items-center space-x-3"
// 								>
// 									<input
// 										type="text"
// 										value={newMessage}
// 										onChange={(e) => setNewMessage(e.target.value)}
// 										placeholder="Type your message..."
// 										className="flex-1 p-3 border border-gray-light rounded-lg focus:ring-accent-blue focus:border-accent-blue outline-none"
// 										disabled={!ADMIN_ID}
// 									/>
// 									<Motion.button
// 										type="submit"
// 										className="p-3 bg-accent-blue text-primary-white rounded-full shadow-md hover:bg-blue-700 transition-colors"
// 										whileHover={{ scale: 1.05 }}
// 										whileTap={{ scale: 0.95 }}
// 										aria-label="Send message"
// 										disabled={!ADMIN_ID || newMessage.trim() === ""}
// 									>
// 										<Send size={24} />
// 									</Motion.button>
// 								</form>
// 							</>
// 						)}
// 					</Motion.div>
// 				</Motion.div>
// 			)}
// 		</AnimatePresence>
// 	);
// };

// export default ChatModal;

// src/components/Chat/ChatModal.jsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
	X,
	Send,
	MessageSquare,
} from "../../../../components/Icons/lucid-icons";
import { fetchMessages, sendMessage } from "./chatApi";
import { useAdminPublicId } from "./../../../../admin/api/dummyApi";
import { socket } from "./../../../../utils/socket";
import {
	getUserId,
	getUserName,
	getUserEmail,
} from "../../../../utils/authStorage";

const ChatModal = ({ isOpen, onClose }) => {
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const messagesEndRef = useRef(null);

	const { admin, loading, error } = useAdminPublicId();
	const [fetchError, setFetchError] = useState("");

	const ADMIN_ID = admin?.id;
	const ADMIN_NAME = admin?.name || "Support";
	// const ADMIN_EMAIL = admin?.email; // Not used directly in UI formatting, so commented out for brevity

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	// Formats a raw message object from API or Socket for UI display
	const formatMessageForUI = useCallback(
		(msg) => {
			return {
				_id: msg._id, // Actual DB ID
				clientId: msg.clientId, // Temporary client ID (if present)
				sender: msg.senderModel === "Admin" ? ADMIN_NAME : "User",
				text: msg.text,
				time: new Date(msg.createdAt || new Date()).toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit",
				}),
				// You might add a status here, e.g., 'sending', 'sent', 'failed'
				// status: msg.status || 'sent', // If your backend sends a status
			};
		},
		[ADMIN_NAME]
	);

	const loadMessages = useCallback(async () => {
		if (!ADMIN_ID || !getUserId()) {
			return;
		}
		try {
			const res = await fetchMessages(ADMIN_ID);
			// When loading messages from DB, ensure they are unique by _id
			// If an optimistic message (by clientId) is still pending,
			// we will reconcile it when its server-confirmed version arrives via socket.
			const fetchedMessages = res.map(formatMessageForUI);

			setMessages((prevMessages) => {
				// Filter out any optimistic messages that have a corresponding
				// fetched message (based on _id)
				const reconciledMessages = prevMessages.filter(
					(prevMsg) =>
						!fetchedMessages.some(
							(fetchedMsg) => fetchedMsg._id === prevMsg._id
						)
				);
				// Combine fetched messages with any *remaining* optimistic messages
				// This scenario is less likely if socket updates are fast, but good for robustness
				return [
					...fetchedMessages,
					...reconciledMessages.filter((msg) => msg.clientId && !msg._id),
				].sort(
					(a, b) =>
						new Date(a.createdAt || 0).getTime() -
						new Date(b.createdAt || 0).getTime()
				);
			});

			scrollToBottom();
		} catch (err) {
			console.error("Fetch messages failed:", err);
			setFetchError("Unable to load messages.");
		}
	}, [ADMIN_ID, formatMessageForUI]); // Include formatMessageForUI in dependencies

	useEffect(() => {
		if (!isOpen || !ADMIN_ID) {
			// Disconnect socket only if the modal is closed OR admin ID is not available
			// This prevents disconnecting if it's just a re-render while open
			if (socket.connected) {
				socket.disconnect();
			}
			return;
		}

		const userId = getUserId();
		const name = getUserName();
		const email = getUserEmail();

		socket.auth = { userId, email, name };
		if (!socket.connected) {
			socket.connect();
		}

		socket.emit("join", {
			userId: userId || null,
			name,
			email,
			role: "User",
		});

		const handleReceiveMessage = (msg) => {
			setMessages((prev) => {
				const formattedMsg = formatMessageForUI(msg);

				// Find if an optimistic message with the same clientId exists
				const existingIndex = prev.findIndex(
					(m) => m.clientId && m.clientId === msg.clientId
				);

				if (existingIndex > -1) {
					// If an optimistic message exists, replace it with the confirmed one
					// Ensure we update by its actual _id and remove clientId if no longer needed
					const newMessages = [...prev];
					newMessages[existingIndex] = {
						...newMessages[existingIndex], // Keep any other optimistic flags
						...formattedMsg, // Overlay with confirmed data from server
						clientId: undefined, // Remove clientId as it's now confirmed
					};
					return newMessages;
				} else {
					// If no optimistic message found OR it's a message from another source (e.g., admin)
					// Check if a message with the *actual server _id* already exists
					// This handles cases where loadMessages might have fetched it concurrently
					// or if multiple clients receive the same broadcast.
					const alreadyExists = prev.some((m) => m._id === formattedMsg._id);
					if (alreadyExists) {
						return prev; // Message already in state, do nothing
					}
					// Otherwise, it's a genuinely new message to add
					return [...prev, formattedMsg];
				}
			});
			scrollToBottom();
		};

		socket.on("receiveMessage", handleReceiveMessage);

		return () => {
			socket.off("receiveMessage", handleReceiveMessage);
			// No need to disconnect here, as it's handled at the start of useEffect
			// if (socket.connected) {
			//     socket.disconnect();
			// }
		};
	}, [isOpen, ADMIN_ID, formatMessageForUI]); // Add formatMessageForUI to dependencies

	useEffect(() => {
		if (isOpen && ADMIN_ID) {
			loadMessages();
		}
	}, [isOpen, ADMIN_ID, loadMessages]);

	const handleSendMessage = async (e) => {
		e.preventDefault();
		if (newMessage.trim() === "" || !ADMIN_ID) return;

		const tempClientId = Date.now(); // Use Date.now() for unique temp ID

		const messageObj = {
			text: newMessage.trim(),
			senderId: getUserId(),
			receiverId: ADMIN_ID,
			name: getUserName(),
			email: getUserEmail(),
			role: "User",
			clientId: tempClientId, // Include the temporary ID for reconciliation
		};

		// Optimistically add the message to the UI
		setMessages((prev) => [
			...prev,
			{
				_id: null, // Temporarily null, will be replaced by server _id
				clientId: tempClientId, // Keep clientId to match later
				sender: "User",
				text: newMessage.trim(),
				time: new Date().toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit",
				}),
				// Consider adding a 'status: "pending"' here for visual feedback
			},
		]);
		setNewMessage("");
		scrollToBottom();

		try {
			// Send to your API/database first.
			// It's crucial that your `sendMessage` API call (and backend)
			// also returns the message with its actual _id and the original clientId.
			const response = await sendMessage(messageObj);

			// If you get a response back that contains the server's _id, you can
			// optionally update the optimistic message here directly instead of
			// waiting for the socket event. However, relying on the socket
			// for the final source of truth is generally more robust for real-time.
			// For now, we'll keep relying on socket.

			// Emit via socket for real-time delivery.
			// The backend should then save this message and broadcast it
			// *back to all connected clients, including the sender*,
			// with the server-assigned `_id` and the original `clientId`.
			socket.emit("sendMessage", response.message || messageObj); // Send the server's response or original object
		} catch (err) {
			console.error("Send message failed", err);
			setFetchError("Failed to send message. Please try again.");
			// If sending fails, remove the optimistic message
			setMessages((prev) =>
				prev.filter((msg) => msg.clientId !== tempClientId)
			);
		}
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<Motion.div
					className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6 bg-[#000000aa] bg-opacity-70 backdrop-blur-sm"
					variants={{
						hidden: { opacity: 0 },
						visible: { opacity: 1, transition: { duration: 0.3 } },
						exit: { opacity: 0, transition: { duration: 0.2 } },
					}}
					initial="hidden"
					animate="visible"
					exit="exit"
					onClick={onClose}
				>
					<Motion.div
						className="bg-primary-white rounded-xl shadow-2xl w-full max-w-md h-[85vh] sm:h-[70vh] flex flex-col overflow-hidden relative"
						variants={{
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
						}}
						initial="hidden"
						animate="visible"
						exit="exit"
						onClick={(e) => e.stopPropagation()}
						style={{ left: "50%", transform: "translateX(-50%)" }}
					>
						<div className="flex items-center justify-between p-4 border-b border-gray-light bg-accent-blue text-primary-white">
							<div className="flex items-center space-x-2">
								<MessageSquare size={24} />
								<h2 className="text-xl font-semibold">
									Chat with {ADMIN_NAME}
								</h2>
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

						{loading ? (
							<div className="flex-1 flex justify-center items-center text-gray-500">
								Please wait, fetching chat support info...
							</div>
						) : error ? (
							<div className="flex-1 flex justify-center items-center text-red-500 text-center p-4">
								OOP! SORRY: {error}
							</div>
						) : !ADMIN_ID ? (
							<div className="flex-1 flex justify-center items-center text-gray-500 text-center p-4">
								Chat support is currently unavailable. Please try again later.
							</div>
						) : (
							<>
								{fetchError && (
									<div className="text-red-500 text-sm text-center mt-2">
										{fetchError}
									</div>
								)}
								<div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-800">
									{messages.map((msg) => (
										<div
											key={msg._id || msg.clientId} // Use _id first, then clientId as fallback
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
												<p className="text-sm break-words whitespace-pre-wrap">
													{msg.text}
												</p>
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
										disabled={!ADMIN_ID}
									/>
									<Motion.button
										type="submit"
										className="p-3 bg-accent-blue text-primary-white rounded-full shadow-md hover:bg-blue-700 transition-colors"
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										aria-label="Send message"
										disabled={!ADMIN_ID || newMessage.trim() === ""}
									>
										<Send size={24} />
									</Motion.button>
								</form>
							</>
						)}
					</Motion.div>
				</Motion.div>
			)}
		</AnimatePresence>
	);
};

export default ChatModal;
