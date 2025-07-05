import { useState, useRef, useEffect } from "react";
import { Home, CheckCircle, XCircle } from "lucide-react"; // Using lucide-react for icons
import { motion as Motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

// Base URL for the API.
const BASE_URL =
	import.meta.env.VITE_BASE_URL || "http://localhost:7075/api_url/users/task";

// Component for the OTP Verification page
const UserVerificationPage = () => {
	const navigate = useNavigate();
	// State to hold each OTP digit
	const [otp, setOtp] = useState(["", "", "", "", "", ""]); // 6-digit OTP
	const otpInputRefs = useRef([]); // Ref to hold references to each input element

	// State variables for loading, error, and success messages
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);

	// Effect to focus on the first input when the component mounts
	useEffect(() => {
		if (otpInputRefs.current[0]) {
			otpInputRefs.current[0].focus();
		}
	}, []);

	// Handles input change for each OTP digit
	const handleChange = (element, index) => {
		// Only allow digits
		if (isNaN(element.value)) return;

		const newOtp = [...otp];
		newOtp[index] = element.value;
		setOtp(newOtp);

		// Focus next input if a digit is entered and it's not the last input
		if (element.value !== "" && index < otp.length - 1) {
			otpInputRefs.current[index + 1].focus();
		}
	};

	// Handles backspace key press
	const handleKeyDown = (element, index) => {
		// If backspace is pressed and current input is empty, move focus to previous input
		if (element.key === "Backspace" && otp[index] === "" && index > 0) {
			otpInputRefs.current[index - 1].focus();
		}
	};

	// Handles paste event for the entire OTP string
	const handlePaste = (e) => {
		e.preventDefault();
		const pasteData = e.clipboardData.getData("text").trim();
		if (pasteData.length === otp.length && /^\d+$/.test(pasteData)) {
			const newOtp = pasteData.split("");
			setOtp(newOtp);
			// Optionally focus the last input after pasting
			otpInputRefs.current[otp.length - 1].focus();
		} else {
			setError("Please paste a valid 6-digit OTP.");
			setTimeout(() => setError(null), 3000);
		}
	};

	const token = localStorage.getItem("accessToken");
	const deviceId = localStorage.getItem("deviceId");

	// Function to handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		setSuccessMessage(null);

		const fullOtp = otp.join(""); // Combine all digits into a single string

		if (fullOtp.length !== otp.length || isNaN(fullOtp)) {
			setError("Please enter a valid 6-digit OTP.");
			return;
		}

		setLoading(true);
		try {
			const response = await fetch(`${BASE_URL}/verifyUser-otp`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
					"x-device-id": deviceId,
				},
				body: JSON.stringify({
					otp: fullOtp,
					// You might need to send a user identifier (e.g., email or phone) here
					// For example: email: "user@example.com"
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(
					data.message || "OTP verification failed. Please try again."
				);
			}

			setSuccessMessage(data.message || "OTP verified successfully!");

			// In a real app, you would navigate to the next page (e.g., dashboard)
			setTimeout(() => {
				navigate("/login");
			}, 2000);
		} catch (err) {
			console.error("Verification error:", err);
			setError(err.message || "An unknown error occurred during verification.");
		} finally {
			setLoading(false);
		}
	};

	// Animation variants for Framer Motion, consistent with signup page
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
		<div>
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
			{/* Main container with vibrant animated background */}
			<div className="min-h-screen flex flex-col items-center justify-center  bg-transparent text-white p-4 relative overflow-hidden font-inter">
				{/* Background animation elements */}
				<div className="absolute inset-0 z-0">
					<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
					<div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
					<div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
				</div>

				{/* Main content area (form) */}
				<Motion.div
					className="w-full max-w-sm md:max-w-md lg:max-w-lg bg-transparent bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-20 shadow-2xl rounded-xl p-6 md:p-8 z-10 relative text-center"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<Motion.h1
						className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-md"
						variants={itemVariants}
					>
						Verify Your Account
					</Motion.h1>
					<Motion.p
						className="text-gray-200 mb-6 text-sm md:text-base"
						variants={itemVariants}
					>
						Please enter the 6-digit code sent to your email/phone number.
					</Motion.p>

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

					<form onSubmit={handleSubmit} className="space-y-6">
						{/* OTP Input Boxes */}
						<Motion.div
							className="flex justify-center gap-2 md:gap-3 mb-6"
							variants={itemVariants}
						>
							{otp.map((digit, index) => (
								<input
									key={index}
									type="text"
									maxLength="1"
									value={digit}
									onChange={(e) => handleChange(e.target, index)}
									onKeyDown={(e) => handleKeyDown(e, index)}
									onPaste={index === 0 ? handlePaste : null} // Only allow paste on the first input
									ref={(el) => (otpInputRefs.current[index] = el)}
									className="w-10 h-12 md:w-12 md:h-14 text-2xl md:text-3xl text-center bg-transparent bg-opacity-15 border border-white border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 shadow-inner"
									required
									aria-label={`OTP digit ${index + 1}`}
								/>
							))}
						</Motion.div>

						{/* Resend OTP Link (Optional) */}
						<Motion.div
							className="text-sm text-gray-300"
							variants={itemVariants}
						>
							Didn't receive the code?{" "}
							<Link
								to="/otp-resending" // In a real app, this would trigger a resend OTP function
								className="text-blue-300 hover:text-blue-100 font-semibold transition-colors duration-200"
								onClick={(e) => {
									e.preventDefault();
									navigate("/otp-resending");
								}}
							>
								Resend Code
							</Link>
						</Motion.div>

						{/* Submit Button */}
						<Motion.button
							type="submit"
							className="w-full py-3 mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
							disabled={loading}
							variants={itemVariants}
						>
							{loading ? "Verifying..." : "Verify Account"}
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

export default UserVerificationPage;
