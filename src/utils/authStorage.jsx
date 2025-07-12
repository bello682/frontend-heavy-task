// // auth.js
// // USER
export const getAuthToken = () => localStorage.getItem("accessToken");
export const getAuthRefreshToken = () => localStorage.getItem("refresToken");
export const getUserId = () => localStorage.getItem("userId");
export const getAdminId = () => localStorage.getItem("adminId");
export const getUserDevice = () => localStorage.getItem("deviceId");

export const getUserEmail = () => localStorage.getItem("userEmail");
export const getUserName = () => localStorage.getItem("userName");

// auth.js
export const getUserRole = () => {
	if (typeof window === "undefined") return "guest";
	try {
		const role = localStorage.getItem("userRole"); // Reads from "userRole"
		return role || "guest";
	} catch (err) {
		console.log("getUserRole Error Message", err);
		return "guest";
	}
};
