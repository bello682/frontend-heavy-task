// import { Sidebar } from "lucide-react";
// import React, { useState } from "react";

// const SignUp: React.FC = () => {
// 	const [name, setName] = useState<string>(""); // State for user's name
// 	const [loading, setLoading] = useState<boolean>(false); // Loading state
// 	const [error, setError] = useState<string | null>(null); // Error message
// 	const [user, setUser] = useState<any | null>(null); // Registered user

// 	const handleSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault();
// 		setLoading(true);
// 		setError(null);

// 		try {
// 			const response = await fetch(
// 				"http://localhost:7075/api_url/users/task/register",

// 				{
// 					method: "POST",
// 					headers: {
// 						"Content-Type": "application/json",
// 					},
// 					body: JSON.stringify({ name }),
// 				}
// 			);

// 			if (!response.ok) {
// 				// If status is not in the 200-299 range
// 				throw new Error("Failed to register");
// 			}

// 			const data = await response.json();
// 			setUser(data);
// 		} catch (err) {
// 			console.error(err);
// 			setError("Failed to register. Please try again later.");
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	return (
// 		<div className="max-w-md mx-auto p-4">
// 			<h1 className="text-2xl font-bold mb-4">Sign Up</h1>

// 			{error && <div className="text-red-500 mb-4">{error}</div>}
// 			{user && (
// 				<div className="text-green-500 mb-4">
// 					Registered successfully! Welcome {user.name}.
// 				</div>
// 			)}

// 			<form onSubmit={handleSubmit}>
// 				<div className="mb-4">
// 					<label
// 						htmlFor="name"
// 						className="block text-sm font-medium text-gray-700"
// 					>
// 						Name
// 					</label>
// 					<input
// 						type="text"
// 						id="name"
// 						name="name"
// 						className="mt-1 p-2 w-full border border-gray-300 rounded-md"
// 						value={name}
// 						onChange={(e) => setName(e.target.value)}
// 						required
// 					/>
// 				</div>

// 				<button
// 					type="submit"
// 					className="w-full bg-blue-500 text-white p-2 rounded-md"
// 					disabled={loading}
// 				>
// 					{loading ? "Registering..." : "Register"}
// 				</button>
// 			</form>
// 		</div>
// 	);
// };

// export default SignUp;










