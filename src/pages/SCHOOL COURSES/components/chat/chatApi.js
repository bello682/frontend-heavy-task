// ✅ api/chatApi.js (all chat-related APIs centralized)
import axios from "axios";
import { getAuthToken, getUserId } from "./../../../../utils/authStorage";

const BASE_URL =
	import.meta.env.VITE_BASE_URL || "http://localhost:7075/api_url/users/task";

// Helper to set headers with token
const getHeaders = () => ({
	headers: {
		Authorization: `Bearer ${getAuthToken()}`,
		"Content-Type": "application/json",
	},
});

/**
 * Fetch chat history between the logged-in user and the selected admin
 * @param {string} adminId
 */
export const fetchMessages = async (adminId) => {
	const userId = getUserId();
	if (!userId || !adminId) return [];

	try {
		const res = await axios.get(
			`${BASE_URL}/chat/history/${adminId}?senderId=${userId}`,
			getHeaders()
		);
		return res.data.messages || [];
	} catch (err) {
		console.error("❌ Error fetching messages:", err);
		return [];
	}
};

/**
 * Send a message to a selected admin
 * @param {Object} payload - includes text, receiverId, name, email
 */
export const sendMessage = async (payload) => {
	try {
		const res = await axios.post(
			`${BASE_URL}/chat/send`,
			payload,
			getHeaders()
		);
		return res.data;
	} catch (err) {
		console.error("❌ Error sending message:", err);
		throw err;
	}
};

/**
 * Get unread count for this user
 */
export const getUnreadCount = async () => {
	try {
		const res = await axios.get(
			`${BASE_URL}/chat/user/unread-count`,
			getHeaders()
		);
		return res.data.unreadCount || 0;
	} catch (err) {
		console.error("❌ Error getting unread count:", err);
		return 0;
	}
};

// export const getUnreadMessageCount = async (userId) => {
// 	try {
// 		const response = await fetch(`${BASE_URL}/chat/unread-count/${userId}`, {
// 			headers: {
// 				"Content-Type": "application/json",
// 				// Include authorization token if required
// 				// 'Authorization': `Bearer ${getAuthToken()}`
// 			},
// 		});
// 		if (!response.ok) {
// 			const errorData = await response.json();
// 			throw new Error(
// 				errorData.message || "Failed to fetch unread message count."
// 			);
// 		}
// 		const data = await response.json();
// 		return data.count; // Assuming the API returns { count: number }
// 	} catch (error) {
// 		console.error("Error fetching unread message count:", error);
// 		throw error;
// 	}
// };

// export const markMessagesAsRead = async (userId, adminId) => {
// 	try {
// 		const response = await fetch(`${BASE_URL}/chat/mark-read`, {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 				// Include authorization token if required
// 				// 'Authorization': `Bearer ${getAuthToken()}`
// 			},
// 			body: JSON.stringify({ userId, adminId }),
// 		});
// 		if (!response.ok) {
// 			const errorData = await response.json();
// 			throw new Error(errorData.message || "Failed to mark messages as read.");
// 		}
// 		return { success: true };
// 	} catch (error) {
// 		console.error("Error marking messages as read:", error);
// 		throw error;
// 	}
// };
