import { useState, useRef, useEffect } from "react";
import {
	Home,
	ShieldAlert,
	AlertTriangle,
	Lock,
	Settings,
	Mail,
	Phone,
	CheckCircle,
	XCircle,
} from "lucide-react"; // Icons for security and details
import { motion as Motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";

// Base URL for potential API calls (e.g., to initiate security actions after OTP)
const API_BASE_URL = "http://localhost:7075/api_url/users/task";

// Component for the Security Action page
const Scam_Security_alert_Page = () => {
	// State to hold each OTP digit for identity verification
	const [otp, setOtp] = useState(["", "", "", "", "", ""]); // 6-digit OTP
	const otpInputRefs = useRef([]); // Ref to hold references to each input element
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const userId = queryParams.get("id");

	console.log(userId);

	// State variables for loading, error, and success messages
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);
	const [otpVerified, setOtpVerified] = useState(false); // State to track OTP verification

	// Effect to focus on the first OTP input when the component mounts
	useEffect(() => {
		if (otpInputRefs.current[0]) {
			otpInputRefs.current[0].focus();
		}
	}, []);

	// Handles input change for each OTP digit
	const handleChange = (element, index) => {
		if (isNaN(element.value)) return; // Only allow digits

		const newOtp = [...otp];
		newOtp[index] = element.value;
		setOtp(newOtp);

		// Focus next input if a digit is entered and it's not the last input
		if (element.value !== "" && index < otp.length - 1) {
			otpInputRefs.current[index + 1].focus();
		}
	};

	// Handles backspace key press for OTP inputs
	const handleKeyDown = (element, index) => {
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
			otpInputRefs.current[otp.length - 1].focus(); // Focus last input after pasting
		} else {
			setError("Please paste a valid 6-digit code.");
			setTimeout(() => setError(null), 3000);
		}
	};

	// Function to handle OTP verification submission
	const handleVerifyOtp = async (e) => {
		e.preventDefault(); // Prevent default form submission
		setError(null);
		setSuccessMessage(null);

		const fullOtp = otp.join("");

		if (fullOtp.length !== otp.length || isNaN(fullOtp)) {
			setError("Please enter the complete 6-digit code.");
			return;
		}

		setLoading(true);
		const token = localStorage.getItem("accessToken");
		try {
			// Simulate API call to verify the OTP for security action
			// This API endpoint would be specific to confirming identity for security actions.
			const response = await fetch(
				`${API_BASE_URL}/verify-security-action-otp`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`, // User token if already logged in
					},
					body: JSON.stringify({
						otp: fullOtp,
						// You might need to send a user identifier (e.g., email) here
					}),
				}
			);

			const data = await response.json();

			if (!response.ok) {
				throw new Error(
					data.message || "Code verification failed. Please try again."
				);
			}

			setSuccessMessage(
				"Identity verified. You can now proceed with security actions."
			);
			setOtpVerified(true); // Mark OTP as verified
			// No direct navigation here, as the user needs to read instructions
		} catch (err) {
			console.error("OTP verification error:", err);
			setError(err.message || "An error occurred during code verification.");
		} finally {
			setLoading(false);
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

			{/* // Main container with vibrant animated background */}
			<div className="min-h-screen flex flex-col items-center justify-center  text-white p-4 relative overflow-hidden font-inter">
				{/* Background animation elements */}
				<div className="absolute inset-0 z-0">
					<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
					<div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
					<div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
				</div>

				{/* Main content area (alert card) */}
				<Motion.div
					className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-transparent bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-20 shadow-2xl rounded-xl p-6 md:p-8 z-10 relative text-center"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<Motion.div variants={itemVariants} className="mb-4">
						<AlertTriangle className="w-16 h-16 md:w-20 md:h-20 text-red-400 mx-auto drop-shadow-lg" />
					</Motion.div>

					<Motion.h1
						className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-md"
						variants={itemVariants}
					>
						Account Security Alert
					</Motion.h1>
					<Motion.p
						className="text-gray-200 mb-6 text-sm md:text-base leading-relaxed"
						variants={itemVariants}
					>
						We've detected unusual activity on your account. To protect your
						information, please follow the steps below to secure your account.
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

					{/* OTP Verification Section (if not yet verified) */}
					{!otpVerified ? (
						<Motion.div variants={itemVariants}>
							<h2 className="text-xl font-semibold text-white mb-4">
								Step 1: Verify Your Identity
							</h2>
							<p className="text-gray-300 mb-4 text-sm">
								A security code has been sent to your registered email or phone
								number. Please enter it below to proceed.
							</p>
							<form onSubmit={handleVerifyOtp} className="space-y-6">
								<div className="flex justify-center gap-2 md:gap-3 mb-6">
									{otp.map((digit, index) => (
										<input
											key={index}
											type="text"
											maxLength="1"
											value={digit}
											onChange={(e) => handleChange(e.target, index)}
											onKeyDown={(e) => handleKeyDown(e, index)}
											onPaste={index === 0 ? handlePaste : null}
											ref={(el) => (otpInputRefs.current[index] = el)}
											className="w-10 h-12 md:w-12 md:h-14 text-2xl md:text-3xl text-center bg-transparent bg-opacity-15 border border-white border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 shadow-inner"
											required
											aria-label={`Security code digit ${index + 1}`}
										/>
									))}
								</div>
								<button
									type="submit"
									className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
									disabled={loading}
								>
									{loading ? "Verifying..." : "Verify Code"}
								</button>
							</form>
						</Motion.div>
					) : (
						// Security Action Steps (shown after OTP is verified)
						<Motion.div
							variants={itemVariants}
							initial="hidden"
							animate="visible"
						>
							<h2 className="text-xl font-semibold text-white mb-4">
								Step 2: Take Action
							</h2>
							<ul className="text-left space-y-4 text-gray-200 text-sm md:text-base">
								<li className="flex items-start gap-3">
									<Lock
										size={20}
										className="text-blue-300 flex-shrink-0 mt-1"
									/>
									<div>
										<span className="font-medium">
											Change Your Password Immediately:
										</span>{" "}
										This is the most crucial step. Use a strong, unique
										password.
										<a
											href="/reset-password"
											className="text-blue-300 hover:text-blue-100 ml-1 font-semibold"
										>
											Reset Password
										</a>
									</div>
								</li>
								<li className="flex items-start gap-3">
									<Settings
										size={20}
										className="text-blue-300 flex-shrink-0 mt-1"
									/>
									<div>
										<span className="font-medium">Review Recent Activity:</span>{" "}
										Check your login history and any recent changes in your
										account settings.
										<a
											href="/account-activity"
											className="text-blue-300 hover:text-blue-100 ml-1 font-semibold"
										>
											View Activity
										</a>
									</div>
								</li>
								<li className="flex items-start gap-3">
									<ShieldAlert
										size={20}
										className="text-blue-300 flex-shrink-0 mt-1"
									/>
									<div>
										<span className="font-medium">
											Enable Two-Factor Authentication (2FA):
										</span>{" "}
										If you haven't already, enable 2FA for an extra layer of
										security.
										<a
											href="/security-settings"
											className="text-blue-300 hover:text-blue-100 ml-1 font-semibold"
										>
											Enable 2FA
										</a>
									</div>
								</li>
								<li className="flex items-start gap-3">
									<Mail
										size={20}
										className="text-blue-300 flex-shrink-0 mt-1"
									/>
									<div>
										<span className="font-medium">Check Your Email:</span> Look
										for any other suspicious emails related to your account.
									</div>
								</li>
							</ul>
							<button
								type="button"
								onClick={() =>
									console.log("Redirecting to dashboard or closing alert")
								}
								className="w-full py-3 mt-8 bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold rounded-lg shadow-lg hover:from-green-700 hover:to-teal-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
							>
								I Understand, Proceed to Dashboard
							</button>
						</Motion.div>
					)}

					{/* Contact Support Link */}
					<Motion.div
						className="mt-6 text-sm text-gray-300"
						variants={itemVariants}
					>
						If you need immediate assistance or suspect a major breach, please{" "}
						<Link
							to="/contact-support" // Link to your support page
							className="text-blue-300 hover:text-blue-100 font-semibold ml-1 cursor-pointer transition-colors duration-200"
						>
							Contact Support
						</Link>
						.
					</Motion.div>
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

export default Scam_Security_alert_Page;
