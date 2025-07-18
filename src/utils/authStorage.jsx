// auth.js

export const getUserRole = () => localStorage.getItem("userRole");
export const getUserEmail = () => localStorage.getItem("userEmail");
export const getUserName = () => localStorage.getItem("userName");
export const getAdminId = () => localStorage.getItem("adminId");
export const getUserDevice = () => localStorage.getItem("deviceId");
export const getAuthRefreshToken = () => localStorage.getItem("refresToken");

// ✅ utils/authStorage.js
// export const getUserId = () => {
// 	try {
// 		const user = JSON.parse(localStorage.getItem("userId"));
// 		console.log("user id ", user);

// 		return user?.id || null;
// 	} catch (error) {
// 		console.log("userId Error from getUserId/authStorage: ", error);

// 		return null;
// 	}
// };

export const getUserId = () => {
	try {
		const userIdString = localStorage.getItem("userId");
		// console.log("Raw userId from localStorage:", userIdString); // Log the raw value for debugging

		// If it's a non-empty string, assume it's the ID directly
		if (typeof userIdString === "string" && userIdString.length > 0) {
			// Add a check to prevent parsing if it's clearly not an object
			if (userIdString.startsWith("{") && userIdString.endsWith("}")) {
				const parsedUser = JSON.parse(userIdString);
				return parsedUser?.id || null;
			} else {
				// It's a plain string ID
				return userIdString;
			}
		}
		return null;
	} catch (error) {
		console.error("userId Error from getUserId/authStorage: ", error);
		// If parsing fails, it means it's not valid JSON. Return null.
		return null;
	}
};
export const getAuthToken = () => {
	try {
		return localStorage.getItem("accessToken") || "";
	} catch (error) {
		console.log("accessToken Error from getAuthToken/authStorage: ", error);
		return "";
	}
};

export const getUserDetails = () => {
	try {
		return JSON.parse(localStorage.getItem("userId"));
	} catch (error) {
		console.log("userId Error from getUserDetails/authStorage: ", error);
		return null;
	}
};
