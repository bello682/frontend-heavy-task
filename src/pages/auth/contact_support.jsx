import { useState, useRef, useEffect } from "react";
import {
	Home,
	Mail,
	MessageSquare,
	Phone,
	HelpCircle,
	Send,
	Clock,
	MapPin,
	CheckCircle,
	XCircle,
} from "lucide-react"; // Icons for contact details and form
import { motion as Motion } from "framer-motion";

// Base URL for the Contact Support API
const API_BASE_URL =
	import.meta.env.VITE_BASE_URL || "http://localhost:7075/api_url/users/task";

// Component for the Contact Support page
const Contact_Support_Page = () => {
	// State for form inputs
	const [email, setEmail] = useState("");
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");
	// State for the Support Reference ID (individual boxes)
	const [supportRefId, setSupportRefId] = useState(["", "", "", "", "", ""]); // 6-digit reference
	const supportRefInputRefs = useRef([]); // Ref to hold references to each input element

	// State variables for loading, error, and success messages
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);

	// Effect to focus on the first support reference input when the component mounts
	useEffect(() => {
		if (supportRefInputRefs.current[0]) {
			supportRefInputRefs.current[0].focus();
		}
	}, []);

	// Handles input change for each Support Reference ID digit
	const handleRefIdChange = (element, index) => {
		if (isNaN(element.value)) return; // Only allow digits

		const newRefId = [...supportRefId];
		newRefId[index] = element.value;
		setSupportRefId(newRefId);

		// Focus next input if a digit is entered and it's not the last input
		if (element.value !== "" && index < supportRefId.length - 1) {
			supportRefInputRefs.current[index + 1].focus();
		}
	};

	// Handles backspace key press for Support Reference ID inputs
	const handleRefIdKeyDown = (element, index) => {
		if (
			element.key === "Backspace" &&
			supportRefId[index] === "" &&
			index > 0
		) {
			supportRefInputRefs.current[index - 1].focus();
		}
	};

	// Handles paste event for the entire Support Reference ID string
	const handleRefIdPaste = (e) => {
		e.preventDefault();
		const pasteData = e.clipboardData.getData("text").trim();
		if (pasteData.length === supportRefId.length && /^\d+$/.test(pasteData)) {
			const newRefId = pasteData.split("");
			setSupportRefId(newRefId);
			supportRefInputRefs.current[supportRefId.length - 1].focus(); // Focus last input after pasting
		} else {
			setError("Please paste a valid 6-digit reference code.");
			setTimeout(() => setError(null), 3000);
		}
	};

	// Function to validate form inputs
	const validateInputs = () => {
		if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return "Please enter a valid email address.";
		}
		if (!subject.trim()) {
			return "Subject cannot be empty.";
		}
		if (message.trim().length < 10) {
			return "Message must be at least 10 characters long.";
		}
		// Support Reference ID is optional, so no validation here unless required.
		return null;
	};

	// Function to handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		setSuccessMessage(null);

		const validationError = validateInputs();
		if (validationError) {
			setError(validationError);
			return;
		}

		setLoading(true);
		try {
			const fullSupportRefId = supportRefId.join(""); // Combine digits if present

			const response = await fetch(`${API_BASE_URL}/contact-support`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email.toLowerCase(),
					subject,
					message,
					supportReferenceId: fullSupportRefId || null, // Send null if empty
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(
					data.message || "Failed to send message. Please try again."
				);
			}

			setSuccessMessage(
				data.message ||
					"Your message has been sent successfully! We will get back to you shortly."
			);
			// Clear form fields after successful submission
			setEmail("");
			setSubject("");
			setMessage("");
			setSupportRefId(["", "", "", "", "", ""]);
		} catch (err) {
			console.error("Contact support error:", err);
			setError(err.message || "An error occurred while sending your message.");
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
			<div className="">
				<div className="min-h-screen flex flex-col items-center justify-center text-white p-4 relative overflow-hidden font-inter mt-24">
					{/* Background animation elements */}
					<div className="absolute inset-0 z-0">
						<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
						<div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
						<div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
					</div>

					{/* Main content area (contact form card) */}
					<Motion.div
						className="w-full max-w-md md:max-w-3xl lg:max-w-5xl bg-transparent bg-opacity-10 backdrop-filter backdrop-blur-lg border border-transparent border-opacity-20 shadow-2xl rounded-xl p-6 md:p-8 z-10 relative text-center"
						variants={containerVariants}
						initial="hidden"
						animate="visible"
					>
						<Motion.div variants={itemVariants} className="mb-4">
							<HelpCircle className="w-16 h-16 md:w-20 md:h-20 text-blue-400 mx-auto drop-shadow-lg" />
						</Motion.div>

						<Motion.h1
							className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-md"
							variants={itemVariants}
						>
							Contact Support
						</Motion.h1>
						<Motion.p
							className="text-gray-200 mb-6 text-sm md:text-base leading-relaxed"
							variants={itemVariants}
						>
							Have questions or need assistance? Fill out the form below, or use
							our alternative contact methods.
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

						<form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
							{/* Email Input */}
							<Motion.div variants={itemVariants}>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-200 mb-1 text-left"
								>
									Your Email
								</label>
								<input
									type="email"
									id="email"
									name="email"
									className="w-full p-3 bg-transparent bg-opacity-15 border border-white border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									aria-label="Your Email"
									placeholder="your@example.com"
								/>
							</Motion.div>

							{/* Subject Input */}
							<Motion.div variants={itemVariants}>
								<label
									htmlFor="subject"
									className="block text-sm font-medium text-gray-200 mb-1 text-left"
								>
									Subject
								</label>
								<input
									type="text"
									id="subject"
									name="subject"
									className="w-full p-3 bg-transparent bg-opacity-15 border border-white border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
									value={subject}
									onChange={(e) => setSubject(e.target.value)}
									required
									aria-label="Subject"
									placeholder="e.g., Login Issue, Account Query"
								/>
							</Motion.div>

							{/* Support Reference ID (individual boxes) */}
							<Motion.div variants={itemVariants}>
								<label
									htmlFor="supportRefId"
									className="block text-sm font-medium text-gray-200 mb-1 text-left"
								>
									Support Reference ID (Optional, 6 digits)
								</label>
								<div className="flex justify-center gap-2 md:gap-3">
									{supportRefId.map((digit, index) => (
										<input
											key={index}
											type="text"
											maxLength="1"
											value={digit}
											onChange={(e) => handleRefIdChange(e.target, index)}
											onKeyDown={(e) => handleRefIdKeyDown(e, index)}
											onPaste={index === 0 ? handleRefIdPaste : null}
											ref={(el) => (supportRefInputRefs.current[index] = el)}
											className="w-9 h-11 md:w-10 md:h-12 text-xl md:text-2xl text-center bg-transparent bg-opacity-15 border border-white border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 shadow-inner"
											aria-label={`Support Reference ID digit ${index + 1}`}
										/>
									))}
								</div>
							</Motion.div>

							{/* Message Textarea */}
							<Motion.div variants={itemVariants}>
								<label
									htmlFor="message"
									className="block text-sm font-medium text-gray-200 mb-1 text-left"
								>
									Your Message
								</label>
								<textarea
									id="message"
									name="message"
									rows="5"
									className="w-full p-3 bg-transparent bg-opacity-15 border border-white border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 resize-y"
									value={message}
									onChange={(e) => setMessage(e.target.value)}
									required
									aria-label="Your Message"
									placeholder="Describe your issue or question in detail..."
								></textarea>
							</Motion.div>

							{/* Send Message Button */}
							<Motion.button
								type="submit"
								className="w-full py-3 mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
								disabled={loading}
								variants={itemVariants}
							>
								{loading ? (
									<>
										<svg
											className="animate-spin h-5 w-5 text-white"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
										>
											<circle
												className="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="4"
											></circle>
											<path
												className="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											></path>
										</svg>
										Sending...
									</>
								) : (
									<>
										<Send size={20} /> Send Message
									</>
								)}
							</Motion.button>
						</form>

						{/* Additional Contact Information */}
						<Motion.div
							className="mt-8 pt-6 border-t border-white border-opacity-20 text-left"
							variants={itemVariants}
						>
							<h2 className="text-xl font-semibold text-white mb-4">
								Other Ways to Reach Us
							</h2>
							<ul className="space-y-3 text-gray-200 text-sm md:text-base">
								<li className="flex items-center gap-3">
									<Phone size={20} className="text-blue-300" />
									<div>
										<span className="font-medium">Phone Support:</span> +1 (234)
										567-8900
										<p className="text-xs text-gray-400">
											(Available Monday - Friday, 9 AM - 5 PM WAT)
										</p>
									</div>
								</li>
								<li className="flex items-center gap-3">
									<Mail size={20} className="text-blue-300" />
									<div>
										<span className="font-medium">Direct Email:</span>{" "}
										support@innovationuni.edu
									</div>
								</li>
								<li className="flex items-center gap-3">
									<MessageSquare size={20} className="text-blue-300" />
									<div>
										<span className="font-medium">Live Chat:</span> Visit our{" "}
										<a
											href="/faq"
											className="text-blue-300 hover:text-blue-100 font-semibold"
										>
											FAQ page
										</a>{" "}
										for instant answers.
									</div>
								</li>
							</ul>
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
		</div>
	);
};

export default Contact_Support_Page;
