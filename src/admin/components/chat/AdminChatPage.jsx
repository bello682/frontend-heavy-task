// // src/components/admin-dashboard/chat/AdminChatPage.jsx
// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { FaComments, FaSpinner, FaInfoCircle } from "react-icons/fa";
// import moment from "moment";
// import * as chatApi from "../chat/chatApi";
// import AdminChatWindow from "./adminChatWindow";
// import UserChatListItem from "../chat/userChatListItems";
// import { socket } from "../../../utils/socket";
// import { getAuthToken, getAdminId } from "../../../utils/authStorage";
// import { useAdminPublicId } from "../../api/dummyApi";

// const AdminChatPage = () => {
// 	const accentColors = {
// 		blue: "text-[#3B82F6]",
// 		grayBg: "bg-gray-800",
// 		lightGrayText: "text-gray-300",
// 		darkBgPrimary: "bg-black",
// 		lightBgSecondary: "bg-white",
// 		darkTextPrimary: "text-white",
// 		lightTextSecondary: "text-black",
// 		red: "text-[#EF4444]",
// 	};

// 	const [users, setUsers] = useState([]);
// 	const [selectedUserId, setSelectedUserId] = useState(null);
// 	const [messages, setMessages] = useState([]);
// 	const [loadingUsers, setLoadingUsers] = useState(true);
// 	const [loadingMessages, setLoadingMessages] = useState(false);
// 	const [errorUsers, setErrorUsers] = useState("");
// 	const [errorMessages, setErrorMessages] = useState("");

// 	const authToken = getAuthToken();
// 	const adminId = getAdminId(); // This is the ID of the logged-in admin
// 	const { admin } = useAdminPublicId(); // This typically fetches public admin data if needed

// 	// UseMemo for userNameMap: This is correct and should be defined once.
// 	const userNameMap = useMemo(() => {
// 		const map = {};
// 		users.forEach((user) => {
// 			map[user.userId] = { name: user.name, email: user.email };
// 		});
// 		if (admin?.id) {
// 			map[admin.id] = {
// 				name: admin.name || "Admin",
// 				email: admin.email || "admin@example.com",
// 			};
// 		}
// 		return map;
// 	}, [users, admin]); // userNameMap updates only when 'users' or 'admin' objects change

// 	// --- Memoize fetch functions using useCallback ---
// 	const fetchUsersWithLastMessage = useCallback(async () => {
// 		setLoadingUsers(true);
// 		setErrorUsers("");
// 		try {
// 			const response = await chatApi.getUsersWithLastMessage();
// 			if (response.success) {
// 				const newUsers = response.users.sort((a, b) => {
// 					if (a.hasNewMessages && !b.hasNewMessages) return -1;
// 					if (!a.hasNewMessages && b.hasNewMessages) return 1;
// 					return (
// 						moment(b.lastMessageTime).valueOf() -
// 						moment(a.lastMessageTime).valueOf()
// 					);
// 				});
// 				setUsers((prevUsers) => {
// 					if (JSON.stringify(prevUsers) === JSON.stringify(newUsers)) {
// 						return prevUsers;
// 					}
// 					return newUsers;
// 				});
// 				if (newUsers.length > 0 && selectedUserId === null) {
// 					setSelectedUserId(newUsers[0].userId);
// 				}
// 			} else {
// 				setErrorUsers(response.message || "Failed to fetch users.");
// 			}
// 		} catch (err) {
// 			const errorMsg =
// 				err.response?.data?.message ||
// 				err.message ||
// 				"An error occurred while fetching users.";
// 			setErrorUsers(errorMsg);
// 			console.error("Fetch users error:", err.response?.data || err);
// 		} finally {
// 			setLoadingUsers(false);
// 		}
// 	}, [selectedUserId]);

// 	const fetchMessagesForSelectedUser = useCallback(
// 		async (userId) => {
// 			setLoadingMessages(true);
// 			setErrorMessages("");
// 			try {
// 				const response = await chatApi.fetchAdminConversation(userId);
// 				if (response && Array.isArray(response.messages)) {
// 					const formattedMessages = response.messages.map((msg) => {
// 						const senderId = String(msg.sender._id);
// 						const senderInfo = userNameMap[senderId];

// 						return {
// 							...msg,
// 							_id: msg._id, // Ensure _id is consistently used as the unique identifier
// 							isMyMessage: senderId === String(adminId), // Check against the logged-in admin's ID
// 							name: senderInfo?.name || msg.sender.name || "Unknown",
// 							email:
// 								senderInfo?.email || msg.sender.email || "unknown@example.com",
// 							createdAt: msg.createdAt, // Ensure original createdAt is passed
// 						};
// 					});
// 					setMessages((prevMessages) => {
// 						if (
// 							JSON.stringify(prevMessages) === JSON.stringify(formattedMessages)
// 						) {
// 							return prevMessages;
// 						}
// 						return formattedMessages;
// 					});
// 				} else {
// 					setMessages([]);
// 					setErrorMessages(
// 						response?.error || "No messages found or failed to load."
// 					);
// 				}
// 			} catch (err) {
// 				console.error("Error message from fetchMessagesForSelectedUser", err);
// 				setErrorMessages("Failed to load messages.");
// 			} finally {
// 				setLoadingMessages(false);
// 			}
// 		},
// 		[adminId, userNameMap] // Dependency: adminId
// 	);

// 	// Memoize the socket message handler
// 	const handleReceiveMessage = useCallback(
// 		(message) => {
// 			console.log("New message received:", message);

// 			setMessages((prevMessages) => {
// 				// If the message has a clientId, it's an optimistic update from the current client
// 				// We need to replace the temporary message with the confirmed one
// 				if (message.clientId) {
// 					const existingMessageIndex = prevMessages.findIndex(
// 						(msg) => msg.clientId === message.clientId
// 					);

// 					if (existingMessageIndex !== -1) {
// 						const updatedMessages = [...prevMessages];
// 						// Replace the optimistic message with the server-confirmed one
// 						// Ensure _id and createdAt from server are used
// 						updatedMessages[existingMessageIndex] = {
// 							...updatedMessages[existingMessageIndex],
// 							_id: message._id, // Use the real _id from the server
// 							text: message.text, // Use the server's text (if any sanitation happened)
// 							createdAt: message.createdAt, // Use the real timestamp from the server
// 							// clientId remains for reconciliation, but the server _id is now primary
// 						};
// 						return updatedMessages;
// 					}
// 				}

// 				// Refined logic for `isRelevantToCurrentChat` to prevent adding messages not relevant to the current conversation
// 				const isRelevantToCurrentChat =
// 					(message.senderId === selectedUserId &&
// 						String(message.receiverId) === String(adminId)) || // User sent to this admin (current selected conversation)
// 					(String(message.senderId) === String(adminId) &&
// 						message.receiverId === selectedUserId); // This admin sent to user (current selected conversation)

// 				if (isRelevantToCurrentChat) {
// 					const senderInfo = userNameMap[String(message.senderId)];
// 					return [
// 						...prevMessages,
// 						{
// 							_id: message._id, // Use the real _id
// 							sender: message.senderId,
// 							senderModel: message.senderModel,
// 							receiver: message.receiverId,
// 							receiverModel: message.receiverModel,
// 							text: message.text,
// 							createdAt: message.createdAt, // Use createdAt from server
// 							isMyMessage: String(message.senderId) === String(adminId), // Determine who sent it
// 							name: senderInfo?.name || "Unknown",
// 							email: senderInfo?.email || "unknown@example.com",
// 						},
// 					];
// 				}
// 				return prevMessages;
// 			});

// 			// Update user list for new message indicators and sorting
// 			setUsers((prevUsers) => {
// 				const updatedUsers = prevUsers.map((user) => {
// 					// Check if the message is from or to this user in the list
// 					const isMessageRelevantToUserInList =
// 						(user.userId === message.senderId &&
// 							message.senderModel !== "Admin") ||
// 						(user.userId === message.receiverId &&
// 							message.senderModel === "Admin");

// 					if (isMessageRelevantToUserInList) {
// 						return {
// 							...user,
// 							hasNewMessages: user.userId !== selectedUserId, // Only mark new if not the currently open chat
// 							lastMessage: message.text,
// 							lastMessageTime: message.createdAt, // Use createdAt for sorting
// 						};
// 					}
// 					return user;
// 				});

// 				// Sort the users list to bring conversations with new messages to top
// 				// and then by latest message time
// 				return updatedUsers.sort((a, b) => {
// 					if (a.hasNewMessages && !b.hasNewMessages) return -1;
// 					if (!a.hasNewMessages && b.hasNewMessages) return 1;
// 					return (
// 						moment(b.lastMessageTime).valueOf() -
// 						moment(a.lastMessageTime).valueOf()
// 					);
// 				});
// 			});
// 		},
// 		[selectedUserId, userNameMap, adminId]
// 	);

// 	// --- Socket Connection and Event Handling ---
// 	useEffect(() => {
// 		if (authToken && adminId && !socket.connected) {
// 			socket.connect();
// 			socket.emit("join", { userId: adminId, role: "Admin" });
// 			console.log(`Socket joined room: Admin-${adminId}`);
// 		}
// 		socket.on("receiveMessage", handleReceiveMessage);
// 		return () => {
// 			socket.off("receiveMessage", handleReceiveMessage);
// 			// Consider socket.disconnect() here if you want to disconnect on unmount
// 			// or if it's strictly an admin-only page.
// 		};
// 	}, [authToken, adminId, handleReceiveMessage]);

// 	// --- Initial User Fetch and Polling ---
// 	useEffect(() => {
// 		fetchUsersWithLastMessage();

// 		const interval = setInterval(() => {
// 			fetchUsersWithLastMessage();
// 		}, 10000);

// 		return () => clearInterval(interval);
// 	}, [fetchUsersWithLastMessage]);

// 	// --- Fetch Messages for Selected User ---
// 	useEffect(() => {
// 		const loadMessages = async () => {
// 			if (!selectedUserId) return;

// 			setUsers((prevUsers) => {
// 				const userToUpdate = prevUsers.find(
// 					(user) => user.userId === selectedUserId
// 				);
// 				if (userToUpdate && userToUpdate.hasNewMessages) {
// 					return prevUsers.map((user) =>
// 						user.userId === selectedUserId
// 							? { ...user, hasNewMessages: false }
// 							: user
// 					);
// 				}
// 				return prevUsers;
// 			});

// 			await fetchMessagesForSelectedUser(selectedUserId);
// 		};

// 		loadMessages();
// 	}, [selectedUserId, fetchMessagesForSelectedUser]);

// 	const handleSendMessage = async (text) => {
// 		if (!selectedUserId || !text.trim()) return;

// 		const tempClientId = Date.now().toString(); // Use a string for clientId
// 		const newMessage = {
// 			_id: tempClientId, // Use clientId as _id temporarily for optimistic update
// 			sender: adminId,
// 			senderModel: "Admin",
// 			receiver: selectedUserId,
// 			receiverModel: "User",
// 			text: text,
// 			createdAt: new Date().toISOString(), // Use ISO string for consistency
// 			isMyMessage: true, // Optimistically, this is my message
// 			name: admin?.name || "Admin",
// 			email: admin?.email || "admin@example.com",
// 			clientId: tempClientId, // Crucial for server reconciliation
// 		};
// 		setMessages((prev) => [...prev, newMessage]);

// 		try {
// 			const response = await chatApi.adminSendMessage(
// 				selectedUserId,
// 				text,
// 				tempClientId
// 			); // Pass clientId
// 			if (response.success) {
// 				// The actual message reconciliation happens in handleReceiveMessage
// 				// No need to filter by tempClientId here, as handleReceiveMessage will replace it.
// 				fetchUsersWithLastMessage();
// 			} else {
// 				setErrorMessages(response.message || "Failed to send message.");
// 				// If send fails, remove the optimistic message
// 				setMessages((prev) => prev.filter((msg) => msg._id !== tempClientId));
// 			}
// 		} catch (err) {
// 			setErrorMessages("An error occurred while sending message.");
// 			console.error("Send message error:", err);
// 			setMessages((prev) => prev.filter((msg) => msg._id !== tempClientId));
// 		}
// 	};

// 	const selectedUser = users.find((user) => user.userId === selectedUserId);

// 	//  const handleDeleteChat = async (userId) => {
// 	//     if (window.confirm(`Are you sure you want to delete all chat history with this user? This cannot be undone.`)) {
// 	//         try {
// 	//             const response = await chatApi.deleteChat(userId); // 👈 Call the deleteChat API function
// 	//             alert(response.message);
// 	//             // After successful deletion, refresh the list of users or clear the chat view
// 	//             setSelectedUser(null); // Deselect the user
// 	//             const data = await chatApi.getUsersWithLastMessagegetUsersWithLastMessage(); // Reload users list
// 	//             setUsers(data.users);
// 	//         } catch (error) {
// 	//             const errorMessage = error.response?.data?.message || 'Failed to delete chat.';
// 	//             alert(errorMessage);
// 	//             console.error("Error deleting chat:", error);
// 	//         }
// 	//     }
// 	// };

// 	return (
// 		<div className={`p-4 md:p-8 ${accentColors.darkBgPrimary} min-h-full`}>
// 			{/* Page Header Section */}
// 			<div
// 				className={`${accentColors.lightBgSecondary} ${accentColors.lightTextSecondary} p-6 md:p-8 rounded-xl shadow-lg mb-8 animate-fade-in-down`}
// 			>
// 				<h2 className="text-3xl md:text-4xl font-extrabold mb-2">
// 					<FaComments className="inline-block mr-3" /> Admin Chat Support
// 				</h2>
// 				<p className={`text-lg md:text-xl ${accentColors.lightTextSecondary}`}>
// 					Communicate with users in real-time.
// 				</p>
// 			</div>

// 			{/* Main Chat Layout */}
// 			<div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-250px)]">
// 				{/* Left Panel: User List */}
// 				<div
// 					className={`${accentColors.grayBg} rounded-xl shadow-lg lg:w-1/3 p-4 flex flex-col overflow-hidden animate-fade-in-left`}
// 				>
// 					<h3
// 						className={`text-xl font-bold mb-4 ${accentColors.darkTextPrimary}`}
// 					>
// 						Conversations
// 					</h3>
// 					{loadingUsers ? (
// 						<div className="flex justify-center items-center h-full">
// 							<FaSpinner
// 								className={`animate-spin text-4xl ${accentColors.blue}`}
// 							/>
// 						</div>
// 					) : errorUsers ? (
// 						<div
// 							className={`text-center p-4 ${accentColors.red} bg-opacity-10 rounded-lg`}
// 							style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
// 						>
// 							<p>{errorUsers}</p>
// 						</div>
// 					) : users.length === 0 ? (
// 						<div className="flex flex-col items-center justify-center h-full text-center">
// 							<FaInfoCircle
// 								className={`text-5xl mb-3 ${accentColors.lightGrayText}`}
// 							/>
// 							<p className={`text-lg ${accentColors.darkTextPrimary}`}>
// 								No active chats.
// 							</p>
// 							<p className={`text-sm ${accentColors.lightGrayText}`}>
// 								Users will appear here when they send a message.
// 							</p>
// 						</div>
// 					) : (
// 						<div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
// 							{users.map((user) => (
// 								<UserChatListItem
// 									key={user.userId}
// 									user={user}
// 									isSelected={user.userId === selectedUserId}
// 									onClick={() => setSelectedUserId(user.userId)}
// 								/>
// 							))}
// 						</div>
// 					)}
// 				</div>
// 				{/* Right Panel: Chat Window */}
// 				<div className="flex-1">
// 					<AdminChatWindow
// 						selectedUser={selectedUser}
// 						messages={messages}
// 						onSendMessage={handleSendMessage}
// 						loadingMessages={loadingMessages}
// 						errorMessages={errorMessages}
// 					/>
// 				</div>
// 			</div>

// 			{/* Custom Scrollbar CSS (for the user list) */}
// 			<style jsx="true">{`
// 				.custom-scrollbar::-webkit-scrollbar {
// 					width: 8px;
// 				}
// 				.custom-scrollbar::-webkit-scrollbar-track {
// 					background: ${accentColors.grayBg};
// 					border-radius: 10px;
// 				}
// 				.custom-scrollbar::-webkit-scrollbar-thumb {
// 					background: ${accentColors.blue};
// 					border-radius: 10px;
// 				}
// 				.custom-scrollbar::-webkit-scrollbar-thumb:hover {
// 					background: #555;
// 				}

// 				@keyframes fadeInDown {
// 					from {
// 						opacity: 0;
// 						transform: translateY(-20px);
// 					}
// 					to {
// 						opacity: 1;
// 						transform: translateY(0);
// 					}
// 				}
// 				@keyframes fadeInLeft {
// 					from {
// 						opacity: 0;
// 						transform: translateX(-20px);
// 					}
// 					to {
// 						opacity: 1;
// 						transform: translateX(0);
// 					}
// 				}
// 				@keyframes fadeInRight {
// 					from {
// 						opacity: 0;
// 						transform: translateX(20px);
// 					}
// 					to {
// 						opacity: 1;
// 						transform: translateX(0);
// 					}
// 				}
// 				.animate-fade-in-down {
// 					animation: fadeInDown 0.7s ease-out forwards;
// 				}
// 				.animate-fade-in-left {
// 					animation: fadeInLeft 0.7s ease-out forwards;
// 				}
// 				.animate-fade-in-right {
// 					animation: fadeInRight 0.7s ease-out forwards;
// 				}
// 			`}</style>
// 		</div>
// 	);
// };

// export default AdminChatPage;

import { FaTimes } from "react-icons/fa";

export const Modal = ({
	isOpen,
	onClose,
	title,
	children,
	showCloseButton = true,
}) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
			<div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md relative animate-slide-up">
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-xl font-bold text-gray-900 dark:text-white">
						{title}
					</h3>
					{showCloseButton && (
						<button
							onClick={onClose}
							className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
							aria-label="Close modal"
						>
							<FaTimes size={20} />
						</button>
					)}
				</div>
				<div className="text-gray-700 dark:text-gray-300 mb-4">{children}</div>
				<style jsx="true">{`
					@keyframes fadeIn {
						from {
							opacity: 0;
						}
						to {
							opacity: 1;
						}
					}
					@keyframes slideUp {
						from {
							transform: translateY(20px);
							opacity: 0;
						}
						to {
							transform: translateY(0);
							opacity: 1;
						}
					}
					.animate-fade-in {
						animation: fadeIn 0.3s ease-out forwards;
					}
					.animate-slide-up {
						animation: slideUp 0.3s ease-out forwards;
					}
				`}</style>
			</div>
		</div>
	);
};

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
	FaComments,
	FaSpinner,
	FaInfoCircle,
	FaEllipsisV,
	FaTrash,
} from "react-icons/fa";
import moment from "moment";
import * as chatApi from "../chat/chatApi";
import AdminChatWindow from "./adminChatWindow";
import UserChatListItem from "../chat/userChatListItems";
import { socket } from "../../../utils/socket";
import { getAuthToken, getAdminId } from "../../../utils/authStorage";
import { useAdminPublicId } from "../../api/dummyApi";

const AdminChatPage = () => {
	const accentColors = {
		blue: "text-[#3B82F6]",
		grayBg: "bg-gray-800",
		lightGrayText: "text-gray-300",
		darkBgPrimary: "bg-black",
		lightBgSecondary: "bg-white",
		darkTextPrimary: "text-white",
		lightTextSecondary: "text-black",
		red: "text-[#EF4444]",
	};

	const [users, setUsers] = useState([]);
	const [selectedUserId, setSelectedUserId] = useState(null);
	const [messages, setMessages] = useState([]);
	const [loadingUsers, setLoadingUsers] = useState(true);
	const [loadingMessages, setLoadingMessages] = useState(false);
	const [errorUsers, setErrorUsers] = useState("");
	const [errorMessages, setErrorMessages] = useState("");
	const [showDeleteOptionsForUserId, setShowDeleteOptionsForUserId] =
		useState(null);

	// NEW STATES FOR MODAL
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [userToDeleteId, setUserToDeleteId] = useState(null);
	const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
	const [infoModalTitle, setInfoModalTitle] = useState("");
	const [infoModalMessage, setInfoModalMessage] = useState("");

	const authToken = getAuthToken();
	const adminId = getAdminId();
	const { admin } = useAdminPublicId();

	const userNameMap = useMemo(() => {
		const map = {};
		users.forEach((user) => {
			map[user.userId] = { name: user.name, email: user.email };
		});
		if (admin?.id) {
			map[admin.id] = {
				name: admin.name || "Admin",
				email: admin.email || "admin@example.com",
			};
		}
		return map;
	}, [users, admin]);

	const fetchUsersWithLastMessage = useCallback(async () => {
		setLoadingUsers(true);
		setErrorUsers("");
		try {
			const response = await chatApi.getUsersWithLastMessage();
			if (response.success) {
				const newUsers = response.users.sort((a, b) => {
					if (a.hasNewMessages && !b.hasNewMessages) return -1;
					if (!a.hasNewMessages && b.hasNewMessages) return 1;
					return (
						moment(b.lastMessageTime).valueOf() -
						moment(a.lastMessageTime).valueOf()
					);
				});
				setUsers((prevUsers) => {
					if (JSON.stringify(prevUsers) === JSON.stringify(newUsers)) {
						return prevUsers;
					}
					return newUsers;
				});
				if (newUsers.length > 0 && selectedUserId === null) {
					setSelectedUserId(newUsers[0].userId);
				}
			} else {
				setErrorUsers(response.message || "Failed to fetch users.");
			}
		} catch (err) {
			const errorMsg =
				err.response?.data?.message ||
				err.message ||
				"An error occurred while fetching users.";
			setErrorUsers(errorMsg);
			console.error("Fetch users error:", err.response?.data || err);
		} finally {
			setLoadingUsers(false);
		}
	}, [selectedUserId]);

	const fetchMessagesForSelectedUser = useCallback(
		async (userId) => {
			setLoadingMessages(true);
			setErrorMessages("");
			try {
				const response = await chatApi.fetchAdminConversation(userId);
				if (response && Array.isArray(response.messages)) {
					const formattedMessages = response.messages.map((msg) => {
						const senderId = String(msg.sender._id);
						const senderInfo = userNameMap[senderId];

						return {
							...msg,
							_id: msg._id,
							isMyMessage: senderId === String(adminId),
							name: senderInfo?.name || msg.sender.name || "Unknown",
							email:
								senderInfo?.email ||
								msg.sender.email ||
								"unknown@example.ohana.com",
							createdAt: msg.createdAt,
						};
					});
					setMessages((prevMessages) => {
						if (
							JSON.stringify(prevMessages) === JSON.stringify(formattedMessages)
						) {
							return prevMessages;
						}
						return formattedMessages;
					});
				} else {
					setMessages([]);
					setErrorMessages(
						response?.error || "No messages found or failed to load."
					);
				}
			} catch (err) {
				console.error("Error message from fetchMessagesForSelectedUser", err);
				setErrorMessages("Failed to load messages.");
			} finally {
				setLoadingMessages(false);
			}
		},
		[adminId, userNameMap]
	);
	const handleReceiveMessage = useCallback(
		(message) => {
			console.log("New message received:", message);

			setMessages((prevMessages) => {
				// Check if the message is already in the state
				// This is crucial for messages you send that come back via socket
				const isAlreadyAdded = prevMessages.some(
					(msg) =>
						msg._id === message._id ||
						(message.clientId && msg.clientId === message.clientId)
				);

				// Only add if not already present
				if (!isAlreadyAdded) {
					const isRelevantToCurrentChat =
						(message.sender === selectedUserId &&
							String(message.receiver) === String(adminId)) ||
						(String(message.sender) === String(adminId) &&
							message.receiver === selectedUserId);

					if (isRelevantToCurrentChat) {
						const senderInfo = userNameMap[String(message.sender)];
						return [
							...prevMessages,
							{
								_id: message._id,
								sender: message.sender, // Use message.sender directly if it's the actual ID
								senderModel: message.senderModel,
								receiver: message.receiver,
								receiverModel: message.receiverModel,
								text: message.text,
								createdAt: message.createdAt,
								isMyMessage: String(message.sender) === String(adminId),
								name: senderInfo?.name || "Unknown",
								email: senderInfo?.email || "unknown@example.com",
								// Keep clientId if it exists for reconciliation
								clientId: message.clientId,
							},
						];
					}
				} else {
					// If the message is already added (e.g., your own sent message being confirmed)
					// You might want to update its _id if it was a temporary clientId
					return prevMessages.map((msg) =>
						message.clientId && msg.clientId === message.clientId && !msg._id
							? { ...msg, _id: message._id, createdAt: message.createdAt }
							: msg
					);
				}
				return prevMessages; // If not relevant or already added and not a temp update
			});

			// Also update the users list for new message indicators / last message text
			setUsers((prevUsers) => {
				const updatedUsers = prevUsers.map((user) => {
					const isMessageRelevantToUserInList =
						(user.userId === message.sender &&
							message.senderModel !== "Admin") ||
						(user.userId === message.receiver &&
							message.senderModel === "Admin");

					if (isMessageRelevantToUserInList) {
						return {
							...user,
							hasNewMessages: user.userId !== selectedUserId, // Mark as new only if not current chat
							lastMessage: message.text,
							lastMessageTime: message.createdAt,
						};
					}
					return user;
				});

				// Sort after updating
				return updatedUsers.sort((a, b) => {
					if (a.hasNewMessages && !b.hasNewMessages) return -1;
					if (!a.hasNewMessages && b.hasNewMessages) return 1;
					return (
						moment(b.lastMessageTime).valueOf() -
						moment(a.lastMessageTime).valueOf()
					);
				});
			});
		},
		[selectedUserId, userNameMap, adminId]
	);

	useEffect(() => {
		if (authToken && adminId && !socket.connected) {
			socket.connect();
			socket.emit("join", { userId: adminId, role: "Admin" });
			// console.log(`Socket joined room: Admin-${adminId}`);
		}
		socket.on("receiveMessage", handleReceiveMessage);
		return () => {
			socket.off("receiveMessage", handleReceiveMessage);
		};
	}, [authToken, adminId, handleReceiveMessage]);

	useEffect(() => {
		fetchUsersWithLastMessage();

		const interval = setInterval(() => {
			fetchUsersWithLastMessage();
		}, 10000);

		return () => clearInterval(interval);
	}, [fetchUsersWithLastMessage]);

	useEffect(() => {
		const loadMessages = async () => {
			if (!selectedUserId) return;

			setUsers((prevUsers) => {
				const userToUpdate = prevUsers.find(
					(user) => user.userId === selectedUserId
				);
				if (userToUpdate && userToUpdate.hasNewMessages) {
					return prevUsers.map((user) =>
						user.userId === selectedUserId
							? { ...user, hasNewMessages: false }
							: user
					);
				}
				return prevUsers;
			});

			await fetchMessagesForSelectedUser(selectedUserId);
		};

		loadMessages();
	}, [selectedUserId, fetchMessagesForSelectedUser]);

	const handleSendMessage = async (text) => {
		if (!selectedUserId || !text.trim()) return;

		const tempClientId = Date.now().toString();
		const newMessage = {
			_id: tempClientId,
			sender: adminId,
			senderModel: "Admin",
			receiver: selectedUserId,
			receiverModel: "User",
			text: text,
			createdAt: new Date().toISOString(),
			isMyMessage: true,
			name: admin?.name || "Admin",
			email: admin?.email || "admin@example.com",
			clientId: tempClientId,
		};
		setMessages((prev) => [...prev, newMessage]);

		try {
			const response = await chatApi.adminSendMessage(
				selectedUserId,
				text,
				tempClientId
			);
			if (response.success) {
				fetchUsersWithLastMessage();
			} else {
				setErrorMessages(response.message || "Failed to send message.");
				setMessages((prev) => prev.filter((msg) => msg._id !== tempClientId));
			}
		} catch (err) {
			setErrorMessages("An error occurred while sending message.");
			console.error("Send message error:", err);
			setMessages((prev) => prev.filter((msg) => msg._id !== tempClientId));
		}
	};

	const selectedUser = users.find((user) => user.userId === selectedUserId);

	// MODIFIED: handleDeleteChat to use a modal for confirmation
	const handleDeleteChat = async (userId) => {
		setUserToDeleteId(userId); // Store the ID of the user to be deleted
		setIsDeleteModalOpen(true); // Open the confirmation modal
	};

	// NEW: Function to confirm deletion from the modal
	const confirmDeleteChat = async () => {
		setIsDeleteModalOpen(false); // Close the confirmation modal
		if (!userToDeleteId) return;

		try {
			const response = await chatApi.deleteChat(userToDeleteId);
			if (response.success) {
				setInfoModalTitle("Success! 🎉");
				setInfoModalMessage(
					response.message || "Chat history deleted successfully."
				);
				setSelectedUserId(null);
				setUsers((prevUsers) =>
					prevUsers.filter((user) => user.userId !== userToDeleteId)
				);
				await fetchUsersWithLastMessage();
			} else {
				setInfoModalTitle("Error! 😞");
				setInfoModalMessage(response.message || "Failed to delete chat.");
			}
		} catch (error) {
			const errorMessage =
				error.response?.data?.message ||
				"An error occurred while deleting chat.";
			setInfoModalTitle("Error! 😞");
			setInfoModalMessage(errorMessage);
			console.error("Error deleting chat:", error);
		} finally {
			setIsInfoModalOpen(true); // Open the info modal to show result
			setShowDeleteOptionsForUserId(null); // Always close the options after attempt
			setUserToDeleteId(null); // Clear the stored user ID
		}
	};

	// NEW: Function to cancel deletion from the modal
	const cancelDeleteChat = () => {
		setIsDeleteModalOpen(false);
		setUserToDeleteId(null);
		setShowDeleteOptionsForUserId(null); // Close options menu
	};

	return (
		<div className={`p-4 md:p-8 ${accentColors.darkBgPrimary} min-h-full`}>
			{/* Page Header Section */}
			<div
				className={`${accentColors.lightBgSecondary} ${accentColors.lightTextSecondary} p-6 md:p-8 rounded-xl shadow-lg mb-8 animate-fade-in-down`}
			>
				<h2 className="text-3xl md:text-4xl font-extrabold mb-2">
					<FaComments className="inline-block mr-3" /> Admin Chat Support
				</h2>
				<p className={`text-lg md:text-xl ${accentColors.lightTextSecondary}`}>
					Communicate with users in real-time.
				</p>
			</div>

			{/* Main Chat Layout */}
			<div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-250px)]">
				{/* Left Panel: User List */}
				<div
					className={`${accentColors.grayBg} rounded-xl shadow-lg lg:w-1/3 p-4 flex flex-col overflow-hidden animate-fade-in-left`}
				>
					<h3
						className={`text-xl font-bold mb-4 ${accentColors.darkTextPrimary}`}
					>
						Conversations
					</h3>
					{loadingUsers ? (
						<div className="flex justify-center items-center h-full">
							<FaSpinner
								className={`animate-spin text-4xl ${accentColors.blue}`}
							/>
						</div>
					) : errorUsers ? (
						<div
							className={`text-center p-4 ${accentColors.red} bg-opacity-10 rounded-lg`}
							style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
						>
							<p>{errorUsers}</p>
						</div>
					) : users.length === 0 ? (
						<div className="flex flex-col items-center justify-center h-full text-center">
							<FaInfoCircle
								className={`text-5xl mb-3 ${accentColors.lightGrayText}`}
							/>
							<p className={`text-lg ${accentColors.darkTextPrimary}`}>
								No active chats.
							</p>
							<p className={`text-sm ${accentColors.lightGrayText}`}>
								Users will appear here when they send a message.
							</p>
						</div>
					) : (
						<div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
							{users.map((user) => (
								<div
									key={user.userId}
									className="relative flex items-center mb-2"
								>
									<UserChatListItem
										user={user}
										isSelected={user.userId === selectedUserId}
										onClick={() => {
											if (showDeleteOptionsForUserId !== user.userId) {
												setShowDeleteOptionsForUserId(null);
											}
											setSelectedUserId(user.userId);
										}}
									/>
									{/* Options/Delete Button Container */}
									<div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
										<button
											className="p-2 rounded-full hover:bg-gray-700 text-gray-400 focus:outline-none"
											onClick={(e) => {
												e.stopPropagation();
												setShowDeleteOptionsForUserId(
													showDeleteOptionsForUserId === user.userId
														? null
														: user.userId
												);
											}}
											title="Chat Options"
										>
											<FaEllipsisV />
										</button>
										{showDeleteOptionsForUserId === user.userId && (
											<button
												className="ml-2 p-2 rounded-md bg-red-600 hover:bg-red-700 text-white flex items-center text-sm focus:outline-none"
												onClick={(e) => {
													e.stopPropagation();
													handleDeleteChat(user.userId); // Call the new handler
												}}
												title="Delete Chat"
											>
												<FaTrash className="mr-1" /> Delete
											</button>
										)}
									</div>
								</div>
							))}
						</div>
					)}
				</div>
				{/* Right Panel: Chat Window */}
				<div className="flex-1">
					<AdminChatWindow
						selectedUser={selectedUser}
						messages={messages}
						onSendMessage={handleSendMessage}
						loadingMessages={loadingMessages}
						errorMessages={errorMessages}
					/>
				</div>
			</div>

			{/* Confirmation Modal for Delete Chat */}
			<Modal
				isOpen={isDeleteModalOpen}
				onClose={cancelDeleteChat}
				title="Confirm Deletion"
			>
				<p>
					Are you sure you want to delete all chat history with{" "}
					<span className="font-semibold text-red-500">
						{users.find((u) => u.userId === userToDeleteId)?.name ||
							"this user"}
					</span>
					? This action cannot be undone.
				</p>
				<div className="mt-6 flex justify-end gap-3">
					<button
						onClick={cancelDeleteChat}
						className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
					>
						Cancel
					</button>
					<button
						onClick={confirmDeleteChat}
						className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
					>
						Delete Chat
					</button>
				</div>
			</Modal>

			{/* Information Modal for Success/Error Messages */}
			<Modal
				isOpen={isInfoModalOpen}
				onClose={() => setIsInfoModalOpen(false)}
				title={infoModalTitle}
				showCloseButton={true}
			>
				<p>{infoModalMessage}</p>
				<div className="mt-6 flex justify-end">
					<button
						onClick={() => setIsInfoModalOpen(false)}
						className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
					>
						OK
					</button>
				</div>
			</Modal>

			<style jsx="true">{`
				.custom-scrollbar::-webkit-scrollbar {
					width: 8px;
				}
				.custom-scrollbar::-webkit-scrollbar-track {
					background: ${accentColors.grayBg};
					border-radius: 10px;
				}
				.custom-scrollbar::-webkit-scrollbar-thumb {
					background: ${accentColors.blue};
					border-radius: 10px;
				}
				.custom-scrollbar::-webkit-scrollbar-thumb:hover {
					background: #555;
				}

				@keyframes fadeInDown {
					from {
						opacity: 0;
						transform: translateY(-20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
				@keyframes fadeInLeft {
					from {
						opacity: 0;
						transform: translateX(-20px);
					}
					to {
						opacity: 1;
						transform: translateX(0);
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
				.animate-fade-in-down {
					animation: fadeInDown 0.7s ease-out forwards;
				}
				.animate-fade-in-left {
					animation: fadeInLeft 0.7s ease-out forwards;
				}
				.animate-fade-in-right {
					animation: fadeInRight 0.7s ease-out forwards;
				}
			`}</style>
		</div>
	);
};

export default AdminChatPage;
