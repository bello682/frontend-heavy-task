import { useState } from "react";
import axios from "axios";

const BASE_URL =
	import.meta.env.VITE_BASE_URL ||
	"https://backend-heavy-task.onrender.com/api_url/users/task";

export const useDeleteUser = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [deleted, setDeleted] = useState(false);
	const [message____, setMessage____] = useState(false);

	const deleteUser = async () => {
		setMessage____();
		setLoading(true);
		setError(null);
		setDeleted(false);

		try {
			const token = localStorage.getItem("accessToken");

			const response = await axios.delete(`${BASE_URL}/deleteDepartment`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			setDeleted(true);
			setMessage____(response.data);
		} catch (err) {
			console.error("Delete error:", err);
			setError(err.response?.data?.message || err.message || "Unknown error");
		} finally {
			setLoading(false);
		}
	};

	return { deleteUser, loading, error, deleted, message____ };
};
