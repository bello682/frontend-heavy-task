import { useState } from "react";
import { Home, Eye, EyeOff, XCircle, CheckCircle } from "lucide-react"; // Using lucide-react for icons
import { Link, useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import "../../../src/App.css";

// Base URL for the Login API
const BASE_URL =
	import.meta.env.VITE_BASE_URL || "http://localhost:7075/api_url/users/task";

// Component for the Login page
const LoginPage = () => {
	const navigate = useNavigate();
	// State variables for form inputs
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	// State variables for loading, error, and success messages
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null); // For login success

	// Function to validate form inputs
	const validateInputs = () => {
		if (!email.trim()) {
			return "Email/Username cannot be empty.";
		}
		if (password.length < 6) {
			// Assuming minimum password length for validation
			return "Password must be at least 6 characters.";
		}
		return null; // No validation errors
	};

	// Function to handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent default form submission behavior
		setError(null); // Clear previous errors
		setSuccessMessage(null); // Clear previous success messages

		const validationError = validateInputs();
		if (validationError) {
			setError(validationError); // Set validation error if any
			return;
		}

		setLoading(true); // Set loading state to true
		try {
			// Using fetch API for network request
			const response = await fetch(`${BASE_URL}/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					// If your API requires authorization or device ID, add them here
					// For example:
					// 'Authorization': `Bearer ${token}`,
					// 'x-device-id': deviceId,
				},
				body: JSON.stringify({
					email: email.toLowerCase(), // Assuming email as identifier
					password,
				}),
			});

			const data = await response.json(); // Parse response JSON

			if (!response.ok) {
				// If response is not OK (e.g., 4xx or 5xx status)
				throw new Error(
					data.message || "Login failed. Please check your credentials."
				);
			}

			localStorage.setItem("accessToken", data?.accessToken);
			localStorage.setItem("refreshToken", data?.refreshToken);
			localStorage.setItem("deviceId", data?.deviceId);
			localStorage.setItem("userId", data?.user?.id);
			localStorage.setItem("userEmail", data?.user?.email);
			localStorage.setItem("userRole", data?.user?.role);
			localStorage.setItem(
				"isVerified",
				data?.userData_Spread?._doc?.isVerified
			);
			setSuccessMessage(data.message || "Login successful! Redirecting...");
			setTimeout(() => {
				navigate("/dashboard");
			}, 2000);
		} catch (err) {
			// console.error("Login error:", err);
			setError(err.message || "An unknown error occurred during login.");
		} finally {
			setLoading(false); // Reset loading state
		}
	};

	// Animation variants for Framer Motion, consistent with previous pages
	const containerVariants = {
		hidden: { opacity: 0, scale: 0.95 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				delayChildren: 0.3,
				staggerChildren: 0.1,
				duration: 0.5,
				ease: "easeOut",
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.4,
				ease: "easeOut",
			},
		},
	};

	return (
		<div className="">
			{/* Logo and Title - positioned at top-left, responsive */}
			<div className=" fixed top-9 left-10 z-100 ">
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
						<h1 className="hidden lg:block  text-2xl font-extrabold text-transparent bg-clip-text text_gradient bg_clip_text animate-fade-in">
							Department of Innovation
						</h1>
					</a>
				</Motion.div>
			</div>
			{/* // Main container with vibrant animated background */}
			<div className="min-h-screen flex flex-col items-center justify-center text-white p-4 relative overflow-hidden font-inter">
				{/* Background animation elements */}
				<div className="absolute inset-0 z-0">
					<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
					<div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
					<div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
				</div>

				{/* Main content area (form) */}
				<Motion.div
					className="w-full max-w-sm md:max-w-md lg:max-w-lg bg-transparent bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-20 shadow-2xl rounded-xl p-6 md:p-8 z-10 relative"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<Motion.h1
						className="text-3xl md:text-4xl font-bold mb-6 text-center text-white drop-shadow-md"
						variants={itemVariants}
					>
						Welcome Back!
					</Motion.h1>

					{/* Error and Success Messages */}
					{error && (
						<Motion.div
							className="bg-red-500 bg-opacity-20 text-red-300 p-3 rounded-md mb-4 text-sm flex items-center justify-center gap-2"
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
						>
							<XCircle size={18} /> {error}
						</Motion.div>
					)}
					{successMessage && (
						<Motion.div
							className="bg-green-500 bg-opacity-20 text-green-300 p-3 rounded-md mb-4 text-sm flex items-center justify-center gap-2"
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
						>
							<CheckCircle size={18} /> {successMessage}
						</Motion.div>
					)}

					<form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
						{/* Email/Username Input */}
						<Motion.div variants={itemVariants}>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-200 mb-1"
							>
								Email
							</label>
							<input
								type="text"
								id="email"
								name="email"
								className="w-full p-3 bg-transparent bg-opacity-15 border border-white border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								aria-label="Email"
								placeholder="your@example.com"
							/>
						</Motion.div>

						{/* Password Input */}
						<Motion.div className="relative" variants={itemVariants}>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-200 mb-1"
							>
								Password
							</label>
							<input
								type={showPassword ? "text" : "password"}
								id="password"
								name="password"
								className="w-full p-3 bg-transparent bg-opacity-15 border border-white border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 pr-10"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								aria-label="Password"
								placeholder="Enter your password"
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute top-12 right-3 -translate-y-1/2 text-gray-300 hover:text-white focus:outline-none transition-colors duration-200"
								tabIndex={-1} // Prevents button from being tabbed to
								aria-label={showPassword ? "Hide password" : "Show password"}
							>
								{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
							</button>
						</Motion.div>

						{/* Forgot Password Link */}
						<Motion.div
							className="flex justify-end text-sm"
							variants={itemVariants}
						>
							<Link
								to="/forgot-password" // Link to a hypothetical forgot password page
								className="text-blue-300 hover:text-blue-100 font-semibold transition-colors duration-200"
							>
								Forgot Password?
							</Link>
						</Motion.div>

						{/* Login Button */}
						<Motion.button
							type="submit"
							className="w-full py-3 mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
							disabled={loading}
							variants={itemVariants}
						>
							{loading ? "Logging in..." : "Login"}
						</Motion.button>

						{/* Sign Up Link */}
						<Motion.div
							className="flex justify-center items-center pt-2 text-sm text-gray-300"
							variants={itemVariants}
						>
							Don't have an account?{" "}
							<Link
								to="/signup" // Link to the sign-up page
								className="text-blue-300 hover:text-blue-100 font-semibold ml-1 cursor-pointer transition-colors duration-200"
							>
								Sign Up
							</Link>
						</Motion.div>
					</form>
				</Motion.div>

				{/* Custom CSS for animations and font */}
				<style>{`
					@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap");

					.font-inter {
						font-family: "Inter", sans-serif;
					}

					/* Custom gradient for text and background elements */
					.gradient_bg_colors {
						background: linear-gradient(to right, #8b5cf6, #6366f1);
					}

					.text_gradient {
						background: linear-gradient(to right, #fbcfe8, #d8b4fe, #93c5fd);
						-webkit-background-clip: text;
						-webkit-text-fill-color: transparent;
					}

					/* Blob animation for background elements */
					@keyframes blob {
						0% {
							transform: translate(0px, 0px) scale(1);
						}
						33% {
							transform: translate(30px, -50px) scale(1.1);
						}
						66% {
							transform: translate(-20px, 20px) scale(0.9);
						}
						100% {
							transform: translate(0px, 0px) scale(1);
						}
					}

					.animate-blob {
						animation: blob 7s infinite cubic-bezier(0.6, 0.01, 0.4, 1);
					}

					.animation-delay-2000 {
						animation-delay: 2s;
					}

					.animation-delay-4000 {
						animation-delay: 4s;
					}

					/* Fade-in animation for title */
					@keyframes fade-in {
						from {
							opacity: 0;
							transform: translateY(10px);
						}
						to {
							opacity: 1;
							transform: translateY(0);
						}
					}

					.animate-fade-in {
						animation: fade-in 1s ease-out forwards;
					}
				`}</style>
			</div>
		</div>
	);
};

export default LoginPage;
