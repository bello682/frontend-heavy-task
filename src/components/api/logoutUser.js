// utils/logoutUser.js
const BASE_URL =
	import.meta.env.VITE_BASE_URL || "http://localhost:7075/api_url/users/task";

export const logoutUser = async (navigate) => {
	try {
		const token = localStorage.getItem("accessToken");
		const deviceId = localStorage.getItem("deviceId");

		await fetch(`${BASE_URL}/logout`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
				"x-device-id": deviceId,
			},
		});

		// localStorage.removeItem("accessToken");
		// localStorage.removeItem("isVerified");

		navigate("/login");
	} catch (err) {
		console.error("Logout failed:", err);
	}
};
