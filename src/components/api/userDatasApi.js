import { useEffect, useState } from "react";
import axios from "axios";
// import {getUserId} from "../../utils/authStorage"
import { getAuthToken } from "../../utils/authStorage";

const BASE_URL =
	import.meta.env.VITE_BASE_URL || "http://localhost:7075/api_url/users/task";

export const useUserData = () => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const token = getAuthToken();
		// const userId = getUserId()

		const fetchUser = async () => {
			try {
				const response = await axios.get(`${BASE_URL}/getDepartments`, {
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				});
				setUser(response.data.data.user);
			} catch (err) {
				setError(err.response?.data?.message || err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchUser();
	}, []);

	return { user, loading, error };
};
