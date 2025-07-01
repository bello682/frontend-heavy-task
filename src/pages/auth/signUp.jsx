import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [user, setUser] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			const response = await axios.post(
				"http://localhost:7075/api_url/users/task/register",
				{ name },
				{ headers: { "Content-Type": "application/json" } }
			);
			setUser(response.data);
			// Wait 2 seconds before navigating to delay and see that account was created with the success message
			setTimeout(() => {
				navigate("/login");
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
		<div className="w-full h-screen flex justify-center items-center bg-gray-900 text-white">
			<div className="w-full max-w-sm bg-white text-black shadow-md rounded-lg p-6">
				<h1 className="text-2xl font-bold mb-4">Sign Up</h1>

				{error && <div className="text-red-500 mb-4">{error}</div>}
				{user && (
					<div className="text-green-500 mb-4">
						{user?.message} {user?.data?.createDepartment?.name}.
					</div>
				)}

				<form onSubmit={handleSubmit}>
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
							to="/login"
							className="flex justify-center items-center gap-1"
						>
							Already have an Account?
							<p className="text-blue-700 cursor-pointer">Login</p>
						</Link>
					</div>

					<button
						type="submit"
						className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none hover:from-blue-600 hover:to-purple-600 cursor-pointer p-2 rounded-md"
						disabled={loading}
					>
						{loading ? "Registering..." : "Register"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
