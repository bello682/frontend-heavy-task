// src/chatApi.js
import axios from "axios";
import {
	getAdminId,
	getAuthToken,
	getUserRole,
} from "../../../utils/authStorage";

const BASE_URL =
	import.meta.env.VITE_BASE_URL || "http://localhost:7075/api_url/users/task";

// Get headers with bearer token
const getAuthHeaders = () => ({
	headers: {
		Authorization: `Bearer ${getAuthToken()}`,
		"Content-Type": "application/json",
		role: getUserRole(),
	},
});

// ✅ 1. Fetch conversation messages with a user
export const fetchAdminConversation = async (userId) => {
	try {
		if (!userId) {
			// Return an object that matches the expected successful response structure
			return { messages: [] };
		}
		const res = await axios.get(
			`${BASE_URL}/chat/admin/history/${userId}`,
			getAuthHeaders()
		);

		// **CRUCIAL CHANGE HERE:** Return `res.data` directly
		return res.data; // This will be the { messages: [...] } object from the backend
	} catch (error) {
		console.error("❌ Failed to fetch admin messages:", error);
		// It's better to return an object with a messages array, matching success case structure
		return {
			messages: [],
			error:
				error.response?.data?.message ||
				error.message ||
				"Failed to load messages",
		};
	}
};

// ✅ 2. Send message to a user
export const adminSendMessage = async (receiverId, message) => {
	try {
		const senderId = getAdminId();
		if (!senderId || !receiverId || !message) return;

		const payload = {
			senderId,
			receiverId,
			text: message,
			role: "Admin",
		};
		const res = await axios.post(
			`${BASE_URL}/chat/send/admin`,
			payload,
			getAuthHeaders()
		);
		return res.data;
	} catch (error) {
		console.error("❌ Failed to send admin message:", error);
		throw error;
	}
};

// ✅ 3. Get unread count (admin perspective)
export const getUnreadCountForAdmin = async () => {
	try {
		const res = await axios.get(
			`${BASE_URL}/chat/unread-count`,
			getAuthHeaders()
		);
		return res.data.data;
	} catch (error) {
		console.error("❌ Failed to get unread count:", error);
		return 0;
	}
};

// ✅ 4. Get users with their last message
export const getUsersWithLastMessage = async () => {
	try {
		const res = await axios.get(
			`${BASE_URL}/chat/users-with-last-message`,
			getAuthHeaders()
		);

		return res.data;
	} catch (error) {
		console.error("❌ Failed to get users with last messages:", error);
		return [];
	}
};

// ✅ 5. Get all messages (if needed)
export const getAllMessages = async () => {
	return await axios.get(
		`${BASE_URL}/chat/admin/messages/all`,
		getAuthHeaders()
	);
};

export const deleteChat = async (userIdToDeleteChatWith) => {
	try {
		if (!userIdToDeleteChatWith) {
			throw new Error("User ID to delete chat with is required.");
		}

		const res = await axios.delete(
			`${BASE_URL}/chat/${userIdToDeleteChatWith}`, // Use the DELETE method and the correct route
			getAuthHeaders()
		);
		return res.data; // This will contain success, message, deleted counts
	} catch (error) {
		console.error(
			`❌ Failed to delete chat with user ${userIdToDeleteChatWith}:`,
			error
		);
		// Throw the error to be handled by the component that calls this function
		throw error;
	}
};
