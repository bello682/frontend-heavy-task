// import { useState } from "react";
// import axios from "axios";
// import { Eye, EyeOff } from "../../components/Icons/lucid-icons";
// import { Link, useNavigate } from "react-router-dom";
// import { motion as Motion } from "framer-motion";
// import { Home } from "lucide-react";
// import "../../../src/App.css";

// const BASE_URL =
// 	// import.meta.env.VITE_BASE_URL ||
// 	"http://localhost:7075/api_url/users/task";

// const SignUp = () => {
// 	const navigate = useNavigate();
// 	const [name, setName] = useState("");
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [showPassword, setShowPassword] = useState(false);
// 	const [phoneNumber, setPhoneNumber] = useState("");

// 	const [loading, setLoading] = useState(false);
// 	const [error, setError] = useState(null);
// 	const [user, setUser] = useState(null);

// 	const validateInputs = () => {
// 		if (name.trim().length < 2) {
// 			return "Name must be at least 2 characters.";
// 		}
// 		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
// 			return "Please enter a valid email address.";
// 		}
// 		if (!/^\d{10,15}$/.test(phoneNumber)) {
// 			return "Phone number must be 10 to 15 digits.";
// 		}
// 		if (password.length < 6) {
// 			return "Password must be at least 6 characters.";
// 		}
// 		return null;
// 	};

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		setError(null);

// 		const validationError = validateInputs();
// 		if (validationError) {
// 			setError(validationError);
// 			return;
// 		}

// 		setLoading(true);
// 		try {
// 			const response = await axios.post(
// 				`${BASE_URL}/register`,
// 				{
// 					name: name.toLowerCase(),
// 					email: email.toLowerCase(),
// 					phoneNumber,
// 					password,
// 				},
// 				{ headers: { "Content-Type": "application/json" } }
// 			);

// 			setUser(response.data);
// 			setTimeout(() => navigate("/login"), 2000);
// 		} catch (err) {
// 			console.error(err);
// 			if (err.response?.data?.message) {
// 				setError(err.response.data.message);
// 			} else {
// 				setError(err.message || "An unknown error occurred.");
// 			}
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	return (
// 		<div className=" bg-gray-900">
// 			{/* Logo and Title */}

// 			<div className=" fixed top-9 left-10 ">
// 				<Motion.div
// 					className="flex items-center gap-3 "
// 					initial={{ opacity: 0, x: -30 }}
// 					animate={{ opacity: 1, x: 0 }}
// 					transition={{ duration: 0.8 }}
// 				>
// 					<a href="/" className="flex items-center gap-3">
// 						<div className="gradient_bg_colors p-2 rounded-full shadow-lg">
// 							<Home className="text-white h-6 w-6 animate-pulse" />
// 						</div>
// 						<h1 className="hidden lg:block  text-2xl font-extrabold text-transparent bg-clip-text text_gradient bg_clip_text animate-fade-in">
// 							Department of Innovation
// 						</h1>
// 					</a>
// 				</Motion.div>
// 			</div>
// 			<div className="w-full h-screen flex justify-center items-center text-white">
// 				<div className="w-full max-w-sm bg-white text-black shadow-md rounded-lg p-6">
// 					<h1 className="text-2xl font-bold mb-4">Sign Up</h1>

// 					{error && <div className="text-red-500 mb-4">{error}</div>}
// 					{user && (
// 						<div className="text-green-500 mb-4">
// 							{user?.message} {user?.data?.createDepartment?.name}.
// 						</div>
// 					)}

// 					<form onSubmit={handleSubmit}>
// 						<div className="mb-4">
// 							<label
// 								htmlFor="name"
// 								className="block text-sm font-medium text-gray-700"
// 							>
// 								Name
// 							</label>
// 							<input
// 								type="text"
// 								id="name"
// 								name="name"
// 								className="mt-1 p-2 w-full border border-gray-300 rounded-md"
// 								value={name}
// 								onChange={(e) => setName(e.target.value)}
// 								required
// 							/>
// 						</div>

// 						<div className="mb-4">
// 							<label
// 								htmlFor="email"
// 								className="block text-sm font-medium text-gray-700"
// 							>
// 								Email
// 							</label>
// 							<input
// 								type="email"
// 								id="email"
// 								name="email"
// 								className="mt-1 p-2 w-full border border-gray-300 rounded-md"
// 								value={email}
// 								onChange={(e) => setEmail(e.target.value)}
// 								required
// 							/>
// 						</div>

// 						<div className="mb-4">
// 							<label
// 								htmlFor="phoneNumber"
// 								className="block text-sm font-medium text-gray-700"
// 							>
// 								Phone Number
// 							</label>
// 							<input
// 								type="tel"
// 								id="phoneNumber"
// 								name="phoneNumber"
// 								className="mt-1 p-2 w-full border border-gray-300 rounded-md"
// 								value={phoneNumber}
// 								onChange={(e) => setPhoneNumber(e.target.value)}
// 								required
// 							/>
// 						</div>

// 						<div className="mb-4 relative">
// 							<label
// 								htmlFor="password"
// 								className="block text-sm font-medium text-gray-700"
// 							>
// 								Password
// 							</label>
// 							<input
// 								type={showPassword ? "text" : "password"}
// 								id="password"
// 								name="password"
// 								className="mt-1 p-2 w-full border border-gray-300 rounded-md pr-10"
// 								value={password}
// 								onChange={(e) => setPassword(e.target.value)}
// 								required
// 							/>
// 							<button
// 								type="button"
// 								onClick={() => setShowPassword(!showPassword)}
// 								className="absolute top-9 right-3 text-gray-500 focus:outline-none"
// 								tabIndex={-1}
// 							>
// 								{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
// 							</button>
// 						</div>

// 						<div className="flex justify-center items-center pb-1.5">
// 							<Link
// 								to="/login"
// 								className="flex justify-center items-center gap-1"
// 							>
// 								Already have an Account?
// 								<p className="text-blue-700 cursor-pointer">Login</p>
// 							</Link>
// 						</div>

// 						<button
// 							type="submit"
// 							className="w-full gradient_bg_colors text-white border-none hover:from-blue-600 hover:to-purple-600 cursor-pointer p-2 rounded-md"
// 							disabled={loading}
// 						>
// 							{loading ? "Registering..." : "Register"}
// 						</button>
// 					</form>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default SignUp;

import { useState } from "react";
import { Home, Eye, EyeOff } from "lucide-react";
import { motion as Motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

// Base URL for the API. In a real application, this would be configured via environment variables.
const BASE_URL =
	import.meta.env.VITE_BASE_URL || "http://localhost:7075/api_url/users/task";

// Component for the Sign Up page
const SignUp = () => {
	// State variables for form inputs
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState("");
	const navigate = useNavigate();

	// State variables for loading, error, and user data
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [user, setUser] = useState(null);
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);

	// Function to validate form inputs
	const validateInputs = () => {
		if (name.trim().length < 2) {
			return "Name must be at least 2 characters.";
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return "Please enter a valid email address.";
		}
		// Regex for phone number: 10 to 15 digits, optional leading '+'
		if (!/^\+?\d{10,15}$/.test(phoneNumber)) {
			return "Phone number must be 10 to 15 digits and can include a '+' prefix.";
		}
		if (password.length < 6) {
			return "Password must be at least 6 characters.";
		}
		return null; // No validation errors
	};

	// Function to handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent default form submission behavior
		setError(null); // Clear previous errors
		setUser(null); // Clear previous user messages
		setShowSuccessMessage(false); // Hide success message

		const validationError = validateInputs();
		if (validationError) {
			setError(validationError); // Set validation error if any
			return;
		}

		setLoading(true); // Set loading state to true
		try {
			// Using fetch API for network request
			const response = await fetch(`${BASE_URL}/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: name.toLowerCase(),
					email: email.toLowerCase(),
					phoneNumber,
					password,
				}),
			});

			const data = await response.json(); // Parse response JSON

			localStorage.setItem("accessToken", data?.token);
			localStorage.setItem("deviceId", data?.deviceId);

			if (!response.ok) {
				// If response is not OK (e.g., 4xx or 5xx status)
				throw new Error(
					data.message || "Failed to register. Please try again."
				);
			}

			setUser(data); // Set user data from response
			setShowSuccessMessage(true); // Show success message
			// Simulate navigation after a delay
			setTimeout(() => {
				navigate("/otp-verification");
			}, 2000);
		} catch (err) {
			console.error("Registration error:", err);
			setError(err.message || "An unknown error occurred during registration.");
		} finally {
			setLoading(false); // Reset loading state
		}
	};

	// Animation variants for Framer Motion
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
			<div className=" fixed top-9 left-10 z-10 ">
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
			{/* // Main container with a vibrant, animated background */}
			<div className="min-h-screen flex flex-col items-center justify-center  pt-32 text-white p-4 relative font-inter">
				{/* Background animation elements */}
				<div className="absolute inset-0 z-0">
					<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
					<div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
					<div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
				</div>

				{/* Main content area (form) */}
				<Motion.div
					className="w-full max-w-sm md:max-w-md lg:max-w-lg bg-transparent bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-20 shadow-2xl rounded-xl p-6 md:p-8 z-10 relative  "
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<Motion.h1
						className="text-3xl md:text-4xl font-bold mb-6 text-center text-white drop-shadow-md"
						variants={itemVariants}
					>
						Create Account
					</Motion.h1>

					{/* Error and Success Messages */}
					{error && (
						<Motion.div
							className="bg-red-500 bg-opacity-20 text-red-300 p-3 rounded-md mb-4 text-sm text-center"
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
						>
							{error}
						</Motion.div>
					)}
					{showSuccessMessage && user && (
						<Motion.div
							className="bg-green-500 bg-opacity-20 text-green-300 p-3 rounded-md mb-4 text-sm text-center"
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
						>
							{user?.message} {user?.data?.createDepartment?.name}. Redirecting
							to login...
						</Motion.div>
					)}

					<form onSubmit={handleSubmit} className="space-y-4 md:space-y-5 ">
						{/* Name Input */}
						<Motion.div variants={itemVariants}>
							<label
								htmlFor="name"
								className="block text-sm font-medium text-gray-200 mb-1"
							>
								Name
							</label>
							<input
								type="text"
								id="name"
								name="name"
								className="w-full p-3 bg-transparent bg-opacity-15 border border-white border-opacity-30 rounded-lg text-white placeholder-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
								aria-label="Name"
							/>
						</Motion.div>

						{/* Email Input */}
						<Motion.div variants={itemVariants}>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-200 mb-1"
							>
								Email
							</label>
							<input
								type="email"
								id="email"
								name="email"
								className="w-full p-3 bg-transparent bg-opacity-15 border border-white border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								aria-label="Email"
							/>
						</Motion.div>

						{/* Phone Number Input */}
						<Motion.div variants={itemVariants}>
							<label
								htmlFor="phoneNumber"
								className="block text-sm font-medium text-gray-200 mb-1"
							>
								Phone Number
							</label>
							<input
								type="tel"
								id="phoneNumber"
								name="phoneNumber"
								className="w-full p-3 bg-transparent bg-opacity-15 border border-white border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
								value={phoneNumber}
								onChange={(e) => setPhoneNumber(e.target.value)}
								required
								aria-label="Phone Number"
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

						{/* Login Link */}
						<Motion.div
							className="flex justify-center items-center pt-2 text-sm"
							variants={itemVariants}
						>
							Already have an Account?{" "}
							<a
								href="/login" // Using <a> tag for navigation in this self-contained example
								className="text-blue-300 hover:text-blue-100 font-semibold ml-1 cursor-pointer transition-colors duration-200"
							>
								Login
							</a>
						</Motion.div>

						{/* Submit Button */}
						<Motion.button
							type="submit"
							className="w-full py-3 mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
							disabled={loading}
							variants={itemVariants}
						>
							{loading ? "Registering..." : "Register"}
						</Motion.button>
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

export default SignUp;
