// src/utils/axiosInstance.js
import axios from "axios";
import { getAuthToken, getRefreshToken, setAccessToken } from "./authStorage";

const BASE_URL =
	import.meta.env.VITE_BASE_URL || "http://localhost:7075/api_url";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Request Interceptor - attach token before each request
axiosInstance.interceptors.request.use(
	(config) => {
		const token = getAuthToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// Response Interceptor - refresh token on 401 errors
axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		// Prevent infinite loop
		if (
			error.response?.status === 401 &&
			!originalRequest._retry &&
			getRefreshToken()
		) {
			originalRequest._retry = true;
			try {
				// Call your refresh token endpoint
				const response = await axios.post(
					`${BASE_URL}/users/refresh-token`,
					{
						refreshToken: getRefreshToken(),
					},
					{
						headers: {
							deviceId: localStorage.getItem("deviceId") || "", // If required
						},
					}
				);

				const newAccessToken = response.data.accessToken;
				setAccessToken(newAccessToken);

				// Retry original request with new token
				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
				return axiosInstance(originalRequest);
			} catch (refreshError) {
				console.error("Token refresh failed:", refreshError);
				// Optional: logout user or redirect to login
			}
		}

		return Promise.reject(error);
	}
);

export default axiosInstance;
