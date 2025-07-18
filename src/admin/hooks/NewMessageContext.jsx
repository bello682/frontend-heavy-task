// src/context/NewMessageContext.jsx
import React, { useState, useCallback, useEffect } from "react";
import { socket } from "../utils/socket"; // Assuming socket is initialized here
import { getAdminId } from "../../utils/authStorage";
import { NewMessageContext } from "../hooks/NewMessageContextObject";

export const NewMessageProvider = ({ children }) => {
	const [newMessageCount, setNewMessageCount] = useState(0);
	const adminId = getAdminId();

	useEffect(() => {
		if (!adminId) return;

		// Ensure socket is connected and joined
		if (!socket.connected) {
			socket.connect();
		}
		socket.emit("join", { userId: adminId, role: "Admin" });
		console.log(`Socket joined room: Admin-${adminId} from NewMessageProvider`);

		// Listen for an event from the server that signals new messages for this admin
		socket.on("newMessageForAdmin", (data) => {
			// Check if the message is truly new and for this admin
			if (
				String(data.receiverId) === String(adminId) &&
				data.senderModel !== "Admin"
			) {
				setNewMessageCount((prevCount) => prevCount + 1);
			}
		});

		return () => {
			socket.off("newMessageForAdmin");
			// Consider disconnecting if this is the only place socket is used for admin
			// socket.disconnect(); // This might be too aggressive if other parts use the socket
		};
	}, [adminId]);

	// This function will be called by AdminChatPage to mark messages as read
	const markMessagesAsRead = useCallback(() => {
		setNewMessageCount(0); // Reset count when admin views chat
	}, []);

	return (
		<NewMessageContext.Provider
			value={{ newMessageCount, setNewMessageCount, markMessagesAsRead }}
		>
			{children}
		</NewMessageContext.Provider>
	);
};
