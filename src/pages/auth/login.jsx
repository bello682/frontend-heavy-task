import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { Home } from "lucide-react";
import "../../../src/App.css";

const LoginPage = () => {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [user, setUser] = useState(null);

	const BASE_URL =
		import.meta.env.VITE_BASE_URL ||
		"https://backend-heavy-task.onrender.com/api_url/users/task";

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			const response = await axios.post(
				`${BASE_URL}/login`,
				{ name: name.toLowerCase() }, // ✅ Ensure name is lowercase
				{ headers: { "Content-Type": "application/json" } }
			);
			localStorage.setItem("departmentToken", response.data.token);
			localStorage.setItem(
				"departmentUserId",
				response?.data?.data?.createDepartment?._id
			);
			setUser(response.data);
			// Wait 2 seconds before navigating to delay and see that account was created with the success message
			setTimeout(() => {
				navigate("/dashboard");
			}, 2000);
		} catch (err) {
			console.error(err);

			// ✅ Check for backend error message
			if (err.response && err.response.data && err.response.data.message) {
				setError(err.response.data.message);
			} else if (err.message) {
				// Fallback: Axios or network error
				setError(err.message);
			} else {
				setError("An unknown error occurred.");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className=" bg-gray-900">
			{/* Logo and Title */}

			<div className=" fixed top-9 left-10 ">
				<Motion.div
					className="flex items-center gap-3 "
					initial={{ opacity: 0, x: -30 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8 }}
				>
					<a href="/" className="flex items-center gap-3">
						<div className="gradient_bg_colors p-2 rounded-full shadow-lg">
							<Home className="text-white h-6 w-6 animate-pulse" />
						</div>
						<h1 className="hidden lg:block text-2xl font-extrabold text-transparent bg-clip-text text_gradient bg_clip_text animate-fade-in">
							Department of Innovation
						</h1>
					</a>
				</Motion.div>
			</div>
			<div className="w-full h-screen flex justify-center items-center  bg-gray-900 text-white">
				<div className="w-full max-w-sm bg-white text-black shadow-md rounded-lg p-6">
					<h1 className="text-2xl font-bold mb-4">Welcome Back</h1>

					{error && <div className="text-red-500 mb-4">{error}</div>}
					{user && (
						<div className="text-green-500 mb-4">
							{/* Registered successfully! Welcome {user.name}. */}
							{user?.message} {user?.data?.createDepartment?.name}.
						</div>
					)}

					<form onSubmit={handleSubmit} className="flex flex-col gap-2">
						<div className="mb-4">
							<label
								htmlFor="name"
								className="block text-sm font-medium text-gray-700"
							>
								Name
							</label>
							<input
								type="text"
								id="name"
								name="name"
								className="mt-1 p-2 w-full border border-gray-300 rounded-md"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</div>

						<div className="flex justify-center items-center pb-1.5">
							<Link
								to="/signup"
								className="flex justify-center items-center gap-1"
							>
								Already have an Account?
								<p className="text-blue-700 cursor-pointer">Sign-Up</p>
							</Link>
						</div>

						<button
							type="submit"
							className="w-full gradient_bg_colors text-white border-none hover:from-blue-600 hover:to-purple-600 p-2 rounded-md"
							disabled={loading}
						>
							{loading ? "Logging..." : "Login"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
