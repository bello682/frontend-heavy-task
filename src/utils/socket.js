// src/utils/socket.js
import { io } from "socket.io-client";

// Replace with your backend Socket.IO server
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:7075";

// Connect once and export
export const socket = io(SOCKET_URL, {
	transports: ["websocket"],
	autoConnect: false, // We manually connect after setting auth
});
