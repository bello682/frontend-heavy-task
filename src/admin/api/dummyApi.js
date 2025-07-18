// ADMIN

import { useEffect, useState } from "react";
import axios from "axios";
import { getAuthToken, getAdminId } from "../../utils/authStorage";

const BASE_URL =
	import.meta.env.VITE_BASE_URL || "http://localhost:7075/api_url/users/task";

// Admin Registration
export const adminRegistration = async (userData) => {
	try {
		const res = await axios.post(`${BASE_URL}/admin/register`, userData);
		localStorage.setItem("accessToken", res?.data?.accessToken);
		localStorage.setItem("refreshToken", res?.data?.refreshToken);
		localStorage.setItem("userId", res?.data?.user?.id);
		localStorage.setItem("userEmail", res?.data?.user?.email);
		localStorage.setItem("userRole", res?.data?.user?.role);
		console.log("Admin resgistration", res);

		return res.data; // expected: { success: true/false, message: "", ... }
	} catch (error) {
		console.error(
			"Admin Registration Error:",
			error.response?.data || error.message
		);
		return {
			success: false,
			message: error.response?.data?.message || "Registration failed",
		};
	}
};

export const adminVerifyOtp = async (otp) => {
	try {
		const token = getAuthToken();
		const adminId = getAdminId();

		const res = await axios.post(
			`${BASE_URL}/admin/verify-otp`,
			{ otp },
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"admin-id": adminId,
				},
			}
		);
		return res.data;
	} catch (error) {
		console.error(
			"adminVerifyOtp Error:",
			error.response?.data || error.message
		);
		return {
			success: false,
			message: error.response?.data?.message || "OTP verification failed",
		};
	}
};

export const adminResendOtp = async (email) => {
	try {
		const token = getAuthToken();
		const adminId = getAdminId();

		const res = await axios.post(
			`${BASE_URL}/admin/resend-otp`,
			{ email },
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"admin-id": adminId,
				},
			}
		);

		return res.data;
	} catch (error) {
		console.error(
			"adminResendOtp Error:",
			error.response?.data || error.message
		);
		return {
			success: false,
			message: error.response?.data?.message || "Failed to resend OTP.",
		};
	}
};

// ADMIN LOGIN
export const adminLogin = async (credentials) => {
	try {
		const res = await axios.post(`${BASE_URL}/admin/login`, credentials);
		return res.data;
	} catch (error) {
		console.error("adminLogin error:", error.response?.data || error.message);
		return {
			success: false,
			message:
				error.response?.data?.message || "Admin login failed. Try again later.",
		};
	}
};

export const adminForgotPassword = async (email) => {
	try {
		const res = await axios.post(
			`${BASE_URL}/admin/forgot-password`,
			{ email },
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		return res.data;
	} catch (error) {
		console.error(
			"Forgot password error:",
			error.response?.data || error.message
		);
		return {
			success: false,
			message:
				error.response?.data?.message ||
				"Failed to initiate password reset. Try again.",
		};
	}
};

// Admin Reset Password
export const adminResetPassword = async ({ token, newPassword }) => {
	try {
		const res = await axios.post(
			`${BASE_URL}/admin/reset-password/${token}`,
			{ newPassword },
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		return res.data;
	} catch (error) {
		console.error(
			"Reset password error:",
			error.response?.data || error.message
		);
		return {
			success: false,
			message:
				error.response?.data?.message ||
				"Failed to reset password. Please try again.",
		};
	}
};

export const adminCreateCourse = async (formData) => {
	const token = getAuthToken();
	const adminId = getAdminId();

	try {
		const response = await axios.post(`${BASE_URL}/admin/courses`, formData, {
			headers: {
				Authorization: `Bearer ${token}`,
				"admin-id": adminId,
			},
		});
		return response;
	} catch (error) {
		// Log error or format it for frontend
		console.error("adminCreateCourse error:", error);
		// You can choose to throw it again or return a custom object
		return {
			success: false,
			message: error.response?.data?.message || "Something went wrong",
		};

		// throw error;
	}
};

export const dummyApi = {
	// Fetch all courses
	getAllCourses: async () => {
		const token = getAuthToken();
		const adminId = getAdminId();

		try {
			const res = await axios.get(`${BASE_URL}/admin/courses`, {
				headers: {
					Authorization: `Bearer ${token}`,
					"admin-id": adminId,
				},
			});
			return res.data; // Should be { success: true, courses: [...] }
		} catch (error) {
			console.error("Fetch courses error:", error);
			return {
				success: false,
				message: error.response?.data?.message || "Internal server error",
			};
		}
	},

	// Delete course
	deleteCourse: async (courseId) => {
		const token = getAuthToken();
		const adminId = getAdminId();

		try {
			const res = await axios.delete(`${BASE_URL}/admin/courses/${courseId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
					"admin-id": adminId,
				},
			});
			return res.data; // Should be { success: true, message: "..." }
		} catch (error) {
			console.error("Delete course error:", error);
			return {
				success: false,
				message: error.response?.data?.message || "Internal server error",
			};
		}
	},

	// this getAllUser is used for the bulk message in the manage user by admin, Start
	getAllUsers: async () => {
		try {
			const token = getAuthToken(); // Or admin token if different

			const response = await axios.get(
				`${BASE_URL}/admin/getDepartments-by-admin`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			// Adjust based on your backend response shape
			return {
				success: true,
				users: response.data, // ⬅️ assumes `user` is an array
			};
		} catch (error) {
			console.error("getAllUsers error:", error);
			return {
				success: false,
				message: error.response?.data?.message || "Failed to fetch users",
			};
		}
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

	// this getAllUser is used for the bulk message in the manage user by admin, END
};

export const getAllUsers = async () => {
	try {
		const token = getAuthToken(); // Or admin token if different

		const response = await axios.get(
			`${BASE_URL}/admin/getDepartments-by-admin`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		// Adjust based on your backend response shape
		return {
			success: true,
			// users: response.data.data.users, // ⬅️ assumes `user` is an array
			users: response.data, // ⬅️ assumes `user` is an array
		};
	} catch (error) {
		console.error("getAllUsers error:", error);
		return {
			success: false,
			message: error.response?.data?.message || "Failed to fetch users",
		};
	}
};

export const deleteUser = async (userId) => {
	try {
		const token = getAuthToken();

		const response = await axios.delete(`${BASE_URL}/admin/user/${userId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return {
			success: true,
			message: response.data.message,
		};
	} catch (error) {
		console.error("Delete user API error:", error);
		return {
			success: false,
			message: error.response?.data?.message || "Failed to delete user",
		};
	}
};

export const useAdminData = () => {
	const [admin, setDdmin] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const token = getAuthToken();

		const fetchAdmin = async () => {
			try {
				const response = await axios.get(`${BASE_URL}/admin/getAdmin`, {
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				});
				setDdmin(response.data);
			} catch (err) {
				setError(err.response?.data?.message || err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchAdmin();
	}, []);

	return { admin, loading, error };
};

// src/admin/api/dummyApi.js (Modified to use Local Storage)

export const useAdminPublicId = () => {
	// Initialize state from local storage first
	const [adminData, setAdminData] = useState(() => {
		try {
			const storedAdmin = localStorage.getItem("publicAdminInfo");
			return storedAdmin ? JSON.parse(storedAdmin) : null;
		} catch (error) {
			console.error(
				"Failed to parse publicAdminInfo from local storage:",
				error
			);
			return null;
		}
	});

	const [loading, setLoading] = useState(!adminData); // If data already exists, not loading initially
	const [error, setError] = useState(null);

	useEffect(() => {
		// Only fetch if adminData is not already available
		if (adminData) {
			setLoading(false); // Already have data, so not loading
			return;
		}

		const fetchAdminPublicId = async () => {
			setLoading(true); // Start loading if fetching
			setError(null); // Clear previous errors
			try {
				const res = await axios.get(`${BASE_URL}/admin/public-admin-id`, {
					headers: { "Content-Type": "application/json" },
				});
				const fetchedAdmin = res.data.admin; // Expecting a single admin object now

				if (fetchedAdmin && fetchedAdmin.id) {
					setAdminData(fetchedAdmin);
					localStorage.setItem("publicAdminInfo", JSON.stringify(fetchedAdmin));
				} else {
					// Handle case where backend says success but returns no admin (e.g., admin: null)
					setError("No active chat admin configured.");
					setAdminData(null); // Ensure adminData is null if no admin found
				}
			} catch (err) {
				console.error("Error fetching public admin:", err);
				setError(
					err.response?.data?.message ||
						"Failed to retrieve public admin details."
				);
				setAdminData(null); // Ensure adminData is null on error
			} finally {
				setLoading(false);
			}
		};

		fetchAdminPublicId();
	}, [adminData]); // Re-run only if adminData changes (e.g., from null to data) or needs fetching

	return { admin: adminData, loading, error };
};
