// src/api/dummyApi.js (Example additions)
export const dummyApi = {
	// ... existing functions like getAllCourses, deleteCourse, deleteUser, etc.

	getAllUsers: () => {
		// Simulate fetching users
		return {
			success: true,
			users: [
				{
					id: "user1",
					name: "Alice Smith",
					email: "alice@example.com",
					phoneNumber: "111-222-3333",
					role: "user",
				},
				{
					id: "user2",
					name: "Bob Johnson",
					email: "bob@example.com",
					phoneNumber: "444-555-6666",
					role: "user",
				},
				{
					id: "user3",
					name: "Charlie Brown",
					email: "charlie@example.com",
					phoneNumber: null,
					role: "user",
				},
				{
					id: "user4",
					name: "Diana Prince",
					email: "diana@example.com",
					phoneNumber: "777-888-9999",
					role: "user",
				},
			],
		};
	},
	sendWarningMessage: (userId, message) => {
		console.log(`Sending WARNING to ${userId}: ${message}`);
		return { success: true, message: "Warning message sent." };
	},
	sendAlertMessage: (userId, message) => {
		console.log(`Sending ALERT to ${userId}: ${message}`);
		return { success: true, message: "Alert message sent." };
	},
	sendSuccessMessage: (userId, message) => {
		console.log(`Sending SUCCESS to ${userId}: ${message}`);
		return { success: true, message: "Success message sent." };
	},
	sendPromoMessage: (userId, message) => {
		console.log(`Sending PROMO to ${userId}: ${message}`);
		return { success: true, message: "Promotional message sent." };
	},
	deleteUser: (userId) => {
		console.log(`Deleting user: ${userId}`);
		// In a real app, you'd filter out the deleted user from a global state or re-fetch
		return { success: true, message: "User deleted." };
	},
};
