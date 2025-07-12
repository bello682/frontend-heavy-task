// src/api/chatApi.js
import axios from "axios";
import { getAuthToken } from "../../../../utils/authStorage";
import { getUserId } from "../../../../utils/authStorage";
import { getUserEmail, getUserName } from "../../../../utils/authStorage";

// Properly access VITE env variable
const BASE_URL =
	import.meta.env.VITE_BASE_URL || "http://localhost:7075/api_url/users/task";

// ✅ Send a chat message (from user or guest)
export const sendMessage = async (receiverId, text) => {
	const token = getAuthToken();
	const userId = getUserId();
	const userName = getUserName();
	const userEmail = getUserEmail();

	const payload = {
		receiverId,
		text,
	};

	// If not logged in, attach guest metadata
	if (!token || !userId) {
		payload.name = userName || "Guest User";
		payload.email = userEmail || "guest@example.com";
	} else {
		payload.senderId = userId; // Optional, your backend uses req.user if token exists
	}

	const headers = {};
	if (token) headers.Authorization = `Bearer ${token}`;

	try {
		const response = await axios.post(`${BASE_URL}/chat/send`, payload, {
			headers,
		});
		return response.data;
	} catch (err) {
		console.error("Send message failed:", err.response?.data || err.message);
		throw err;
	}
};

// Get all messages between the user and a given receiver (e.g., Admin)
export const getMessages = async (receiverId) => {
	const token = getAuthToken();
	// const userId = getUserId(); // Only used if your backend filters by both

	return await axios.get(`${BASE_URL}/chat/history/${receiverId}`, {
		headers: { Authorization: `Bearer ${token}` },
	});
};
