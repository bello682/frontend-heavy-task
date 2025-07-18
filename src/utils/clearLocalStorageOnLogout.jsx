export const clearAuth = () => {
	localStorage.removeItem("accessToken");
	localStorage.removeItem("refreshToken");
	localStorage.removeItem("userId");
	localStorage.removeItem("userEmail");
	localStorage.removeItem("userName");
	localStorage.removeItem("userRole");
	// DO NOT remove guestId
};
