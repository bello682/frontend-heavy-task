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

// when ever i reload my deployment web on vercel i get page not found when i navigate and reload the page

// ================================== the reason for this page is ==================================

// This is a classic issue when deploying Single Page Applications (SPAs) like React apps built with Vite and using client-side routing (e.g., React Router) to platforms like Vercel.

// The Problem: Client-Side Routing vs. Server-Side Serving

// Here's why it works locally but breaks on Vercel:

// Local Development: When you run your Vite app locally (e.g., npm run dev), the Vite development server is smart. It acts as a fallback for all routes. If you navigate to /about and refresh, the development server knows to serve your index.html file, and your React Router then takes over to render the /about component.

// Vercel Production (Default Behavior): Vercel, by default, is designed to serve static files. When you navigate to a path like /about directly or refresh the page, Vercel's server looks for a physical file named about.html or a directory named about with an index.html inside it. Since your React app is a Single Page Application, there isn't a separate about.html file. All your routes are handled by JavaScript on the client side after the initial index.html is loaded.

// When Vercel can't find a corresponding static file for the URL, it returns a "404 Not Found" error.

// The Solution: Vercel Rewrite Rules

// To fix this, you need to tell Vercel to always serve your index.html file for any incoming request that doesn't correspond to an actual static file (like a CSS, JS, or image file). This allows your React Router to take control and handle the routing on the client side.

// You do this by creating a vercel.json file in the root of your project (the same directory where your package.json and index.html are located) and adding a rewrites rule.

// Steps to Fix:

// Create vercel.json: In the root of your project, create a file named vercel.json.

// Add Rewrite Rule: Add the following content to your vercel.json file:

// JSON

// {
//   "rewrites": [
//     {
//       "source": "/(.*)",
//       "destination": "/index.html"
//     }
//   ]
// }
// Explanation of the rewrites rule:

// "source": "/(.*)": This is a regular expression that matches all incoming requests.

// "destination": "/index.html": This tells Vercel to rewrite (or internally redirect) any request that matches the source to index.html.

// Redeploy to Vercel: After adding this file, commit your changes and redeploy your project on Vercel.

// Why this works:

// When a request comes in for, say, /products/123, Vercel will see the rewrites rule, redirect that request internally to /index.html. Your index.html (along with your bundled JavaScript) will then be served to the browser. Once the React application loads, React Router will read the URL (/products/123) and render the correct component for that route.

// This is a very common and straightforward fix for SPAs on Vercel and similar static hosting platforms.

// ======== solution is to =========
// create a vercel.json
// add  this in

// {
//   "rewrites": [
//     {
//       "source": "/(.*)",
//       "destination": "/index.html"
//     }
//   ]
// }

// ====================================================================================================================================================

// convert this signUp page and UserVerification page into a reusable modal pop up  conponent where i can use,

// 1, both will be navigating inside the same modal
// 2, the modal will be swapping but will be able to swap to the verification side in the same modal only if the registration is successful
// 3, dont change the designs just change the color only and the colors that will be used for all both text and background is black and white, red for red background and white for error text
// 4, dont change the logics they re working already
// 5,remove the logo's
// 6, make it beautiful and responsive
// 7, pass props for all neccessary, including mutable link part if i want to change the part to navigate to where ever i use the reuseable modal
// 8, generate a seperate reusable modal for successful signUp with animations also and make it have two buttons for links to back to home (which will nag=vigate back to home ) then the second button will be continu then this will set the modal for registration and the modal for successful registration to false

// import { useState } from "react";
// import { Home, Eye, EyeOff } from "lucide-react";
// import { motion as Motion } from "framer-motion";
// import { Link, useNavigate } from "react-router-dom";

// // Base URL for the API. In a real application, this would be configured via environment variables.
// const BASE_URL =
//     import.meta.env.VITE_BASE_URL || "http://localhost:7075/api_url/users/task";

// // Component for the Sign Up page
// const SignUp = () => {
//     // State variables for form inputs
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [showPassword, setShowPassword] = useState(false);
//     const [phoneNumber, setPhoneNumber] = useState("");
//     const navigate = useNavigate();

//     // State variables for loading, error, and user data
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [user, setUser] = useState(null);
//     const [showSuccessMessage, setShowSuccessMessage] = useState(false);

//     // Function to validate form inputs
//     const validateInputs = () => {
//         if (name.trim().length < 2) {
//             return "Name must be at least 2 characters.";
//         }
//         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//             return "Please enter a valid email address.";
//         }
//         // Regex for phone number: 10 to 15 digits, optional leading '+'
//         if (!/^\+?\d{10,15}$/.test(phoneNumber)) {
//             return "Phone number must be 10 to 15 digits and can include a '+' prefix.";
//         }
//         if (password.length < 6) {
//             return "Password must be at least 6 characters.";
//         }
//         return null; // No validation errors
//     };

//     // Function to handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault(); // Prevent default form submission behavior
//         setError(null); // Clear previous errors
//         setUser(null); // Clear previous user messages
//         setShowSuccessMessage(false); // Hide success message

//         const validationError = validateInputs();
//         if (validationError) {
//             setError(validationError); // Set validation error if any
//             return;
//         }

//         setLoading(true); // Set loading state to true
//         try {
//             // Using fetch API for network request
//             const response = await fetch(`${BASE_URL}/register`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     name: name.toLowerCase(),
//                     email: email.toLowerCase(),
//                     phoneNumber,
//                     password,
//                 }),
//             });

//             const data = await response.json(); // Parse response JSON

//             localStorage.setItem("accessToken", data?.token);
//             localStorage.setItem("deviceId", data?.deviceId);

//             if (!response.ok) {
//                 // If response is not OK (e.g., 4xx or 5xx status)
//                 throw new Error(
//                     data.message || "Failed to register. Please try again."
//                 );
//             }

//             setUser(data); // Set user data from response
//             setShowSuccessMessage(true); // Show success message
//             // Simulate navigation after a delay
//             setTimeout(() => {
//                 navigate("/otp-verification");
//             }, 2000);
//         } catch (err) {
//             // console.error("Registration error:", err);
//             setError(err.message || "An unknown error occurred during registration.");
//         } finally {
//             setLoading(false); // Reset loading state
//         }
//     };

//     // Animation variants for Framer Motion
//     const containerVariants = {
//         hidden: { opacity: 0, scale: 0.95 },
//         visible: {
//             opacity: 1,
//             scale: 1,
//             transition: {
//                 delayChildren: 0.3,
//                 staggerChildren: 0.1,
//                 duration: 0.5,
//                 ease: "easeOut",
//             },
//         },
//     };

//     const itemVariants = {
//         hidden: { y: 20, opacity: 0 },
//         visible: {
//             y: 0,
//             opacity: 1,
//             transition: {
//                 duration: 0.4,
//                 ease: "easeOut",
//             },
//         },
//     };

//     return (
//         <div className="">
//             {/* Logo and Title - positioned at top-left, responsive */}
//             <div className=" fixed top-9 left-10 z-100 ">
//                 <Motion.div
//                     className="flex items-center gap-3 "
//                     initial={{ opacity: 0, x: -30 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.8 }}
//                 >
//                     <a href="/" className="flex items-center gap-3">
//                         <div className="gradient_bg_colors p-2 rounded-full shadow-lg">
//                             <Home className="text-white h-6 w-6 animate-pulse" />
//                         </div>
//                         <h1 className="hidden lg:block  text-2xl font-extrabold text-transparent bg-clip-text text_gradient bg_clip_text animate-fade-in">
//                             Department of Innovation
//                         </h1>
//                     </a>
//                 </Motion.div>
//             </div>
//             {/* // Main container with a vibrant, animated background */}
//             <div className="min-h-screen flex flex-col items-center justify-center  pt-32 text-white p-4 relative font-inter">
//                 {/* Background animation elements */}
//                 <div className="absolute inset-0 z-0">
//                     <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
//                     <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
//                     <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
//                 </div>

//                 {/* Main content area (form) */}
//                 <Motion.div
//                     className="w-full max-w-sm md:max-w-md lg:max-w-lg bg-transparent bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-20 shadow-2xl rounded-xl p-6 md:p-8 z-10 relative  "
//                     variants={containerVariants}
//                     initial="hidden"
//                     animate="visible"
//                 >
//                     <Motion.h1
//                         className="text-3xl md:text-4xl font-bold mb-6 text-center text-white drop-shadow-md"
//                         variants={itemVariants}
//                     >
//                         Create Account
//                     </Motion.h1>

//                     {/* Error and Success Messages */}
//                     {error && (
//                         <Motion.div
//                             className="bg-red-500 bg-opacity-20 text-red-300 p-3 rounded-md mb-4 text-sm text-center"
//                             initial={{ opacity: 0, y: -10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.3 }}
//                         >
//                             {error}
//                         </Motion.div>
//                     )}
//                     {showSuccessMessage && user && (
//                         <Motion.div
//                             className="bg-green-500 bg-opacity-20 text-green-300 p-3 rounded-md mb-4 text-sm text-center"
//                             initial={{ opacity: 0, y: -10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.3 }}
//                         >
//                             {user?.message} {user?.data?.createDepartment?.name}. Redirecting
//                             to login...
//                         </Motion.div>
//                     )}

//                     <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5 ">
//                         {/* Name Input */}
//                         <Motion.div variants={itemVariants}>
//                             <label
//                                 htmlFor="name"
//                                 className="block text-sm font-medium text-gray-200 mb-1"
//                             >
//                                 Name
//                             </label>
//                             <input
//                                 type="text"
//                                 id="name"
//                                 name="name"
//                                 className="w-full p-3 bg-transparent bg-opacity-15 border border-white border-opacity-30 rounded-lg text-white placeholder-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
//                                 value={name}
//                                 onChange={(e) => setName(e.target.value)}
//                                 required
//                                 aria-label="Name"
//                             />
//                         </Motion.div>

//                         {/* Email Input */}
//                         <Motion.div variants={itemVariants}>
//                             <label
//                                 htmlFor="email"
//                                 className="block text-sm font-medium text-gray-200 mb-1"
//                             >
//                                 Email
//                             </label>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 name="email"
//                                 className="w-full p-3 bg-transparent bg-opacity-15 border border-white border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 required
//                                 aria-label="Email"
//                             />
//                         </Motion.div>

//                         {/* Phone Number Input */}
//                         <Motion.div variants={itemVariants}>
//                             <label
//                                 htmlFor="phoneNumber"
//                                 className="block text-sm font-medium text-gray-200 mb-1"
//                             >
//                                 Phone Number
//                             </label>
//                             <input
//                                 type="tel"
//                                 id="phoneNumber"
//                                 name="phoneNumber"
//                                 className="w-full p-3 bg-transparent bg-opacity-15 border border-white border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
//                                 value={phoneNumber}
//                                 onChange={(e) => setPhoneNumber(e.target.value)}
//                                 required
//                                 aria-label="Phone Number"
//                             />
//                         </Motion.div>

//                         {/* Password Input */}
//                         <Motion.div className="relative" variants={itemVariants}>
//                             <label
//                                 htmlFor="password"
//                                 className="block text-sm font-medium text-gray-200 mb-1"
//                             >
//                                 Password
//                             </label>
//                             <input
//                                 type={showPassword ? "text" : "password"}
//                                 id="password"
//                                 name="password"
//                                 className="w-full p-3 bg-transparent bg-opacity-15 border border-white border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 pr-10"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 required
//                                 aria-label="Password"
//                             />
//                             <button
//                                 type="button"
//                                 onClick={() => setShowPassword(!showPassword)}
//                                 className="absolute top-12 right-3 -translate-y-1/2 text-gray-300 hover:text-white focus:outline-none transition-colors duration-200"
//                                 tabIndex={-1} // Prevents button from being tabbed to
//                                 aria-label={showPassword ? "Hide password" : "Show password"}
//                             >
//                                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                             </button>
//                         </Motion.div>

//                         {/* Login Link */}
//                         <Motion.div
//                             className="flex justify-center items-center pt-2 text-sm"
//                             variants={itemVariants}
//                         >
//                             Already have an Account?{" "}
//                             <a
//                                 href="/login" // Using <a> tag for navigation in this self-contained example
//                                 className="text-blue-300 hover:text-blue-100 font-semibold ml-1 cursor-pointer transition-colors duration-200"
//                             >
//                                 Login
//                             </a>
//                         </Motion.div>

//                         {/* Submit Button */}
//                         <Motion.button
//                             type="submit"
//                             className="w-full py-3 mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
//                             disabled={loading}
//                             variants={itemVariants}
//                         >
//                             {loading ? "Registering..." : "Register"}
//                         </Motion.button>
//                     </form>
//                 </Motion.div>

//                 {/* Custom CSS for animations and font */}
//                 <style>{`
//                     @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap");

//                     .font-inter {
//                         font-family: "Inter", sans-serif;
//                     }

//                     /* Custom gradient for text and background elements */
//                     .gradient_bg_colors {
//                         background: linear-gradient(to right, #8b5cf6, #6366f1);
//                     }

//                     .text_gradient {
//                         background: linear-gradient(to right, #fbcfe8, #d8b4fe, #93c5fd);
//                         -webkit-background-clip: text;
//                         -webkit-text-fill-color: transparent;
//                     }

//                     /* Blob animation for background elements */
//                     @keyframes blob {
//                         0% {
//                             transform: translate(0px, 0px) scale(1);
//                         }
//                         33% {
//                             transform: translate(30px, -50px) scale(1.1);
//                         }
//                         66% {
//                             transform: translate(-20px, 20px) scale(0.9);
//                         }
//                         100% {
//                             transform: translate(0px, 0px) scale(1);
//                         }
//                     }

//                     .animate-blob {
//                         animation: blob 7s infinite cubic-bezier(0.6, 0.01, 0.4, 1);
//                     }

//                     .animation-delay-2000 {
//                         animation-delay: 2s;
//                     }

//                     .animation-delay-4000 {
//                         animation-delay: 4s;
//                     }

//                     /* Fade-in animation for title */
//                     @keyframes fade-in {
//                         from {
//                             opacity: 0;
//                             transform: translateY(10px);
//                         }
//                         to {
//                             opacity: 1;
//                             transform: translateY(0);
//                         }
//                     }

//                     .animate-fade-in {
//                         animation: fade-in 1s ease-out forwards;
//                     }
//                 `}</style>
//             </div>
//         </div>
//     );
// };

// export default SignUp;

// import { useState, useRef, useEffect } from "react";
// import { Home, CheckCircle, XCircle } from "lucide-react"; // Using lucide-react for icons
// import { motion as Motion } from "framer-motion";
// import { Link, useNavigate } from "react-router-dom";

// // Base URL for the API.
// const BASE_URL =
//     import.meta.env.VITE_BASE_URL || "http://localhost:7075/api_url/users/task";

// // Component for the OTP Verification page
// const UserVerificationPage = () => {
//     const navigate = useNavigate();
//     // State to hold each OTP digit
//     const [otp, setOtp] = useState(["", "", "", "", "", ""]); // 6-digit OTP
//     const otpInputRefs = useRef([]); // Ref to hold references to each input element

//     // State variables for loading, error, and success messages
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [successMessage, setSuccessMessage] = useState(null);

//     // Effect to focus on the first input when the component mounts
//     useEffect(() => {
//         if (otpInputRefs.current[0]) {
//             otpInputRefs.current[0].focus();
//         }
//     }, []);

//     // Handles input change for each OTP digit
//     const handleChange = (element, index) => {
//         // Only allow digits
//         if (isNaN(element.value)) return;

//         const newOtp = [...otp];
//         newOtp[index] = element.value;
//         setOtp(newOtp);

//         // Focus next input if a digit is entered and it's not the last input
//         if (element.value !== "" && index < otp.length - 1) {
//             otpInputRefs.current[index + 1].focus();
//         }
//     };

//     // Handles backspace key press
//     const handleKeyDown = (element, index) => {
//         // If backspace is pressed and current input is empty, move focus to previous input
//         if (element.key === "Backspace" && otp[index] === "" && index > 0) {
//             otpInputRefs.current[index - 1].focus();
//         }
//     };

//     // Handles paste event for the entire OTP string
//     const handlePaste = (e) => {
//         e.preventDefault();
//         const pasteData = e.clipboardData.getData("text").trim();
//         if (pasteData.length === otp.length && /^\d+$/.test(pasteData)) {
//             const newOtp = pasteData.split("");
//             setOtp(newOtp);
//             // Optionally focus the last input after pasting
//             otpInputRefs.current[otp.length - 1].focus();
//         } else {
//             setError("Please paste a valid 6-digit OTP.");
//             setTimeout(() => setError(null), 3000);
//         }
//     };

//     const token = localStorage.getItem("accessToken");
//     const deviceId = localStorage.getItem("deviceId");

//     // Function to handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError(null);
//         setSuccessMessage(null);

//         const fullOtp = otp.join(""); // Combine all digits into a single string

//         if (fullOtp.length !== otp.length || isNaN(fullOtp)) {
//             setError("Please enter a valid 6-digit OTP.");
//             return;
//         }

//         setLoading(true);
//         try {
//             const response = await fetch(`${BASE_URL}/verifyUser-otp`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`,
//                     "x-device-id": deviceId,
//                 },
//                 body: JSON.stringify({
//                     otp: fullOtp,
//                     // You might need to send a user identifier (e.g., email or phone) here
//                     // For example: email: "user@example.com"
//                 }),
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(
//                     data.message || "OTP verification failed. Please try again."
//                 );
//             }

//             setSuccessMessage(data.message || "OTP verified successfully!");

//             // In a real app, you would navigate to the next page (e.g., dashboard)
//             setTimeout(() => {
//                 navigate("/login");
//             }, 2000);
//         } catch (err) {
//             console.error("Verification error:", err);
//             setError(err.message || "An unknown error occurred during verification.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Animation variants for Framer Motion, consistent with signup page
//     const containerVariants = {
//         hidden: { opacity: 0, scale: 0.95 },
//         visible: {
//             opacity: 1,
//             scale: 1,
//             transition: {
//                 delayChildren: 0.3,
//                 staggerChildren: 0.1,
//                 duration: 0.5,
//                 ease: "easeOut",
//             },
//         },
//     };

//     const itemVariants = {
//         hidden: { y: 20, opacity: 0 },
//         visible: {
//             y: 0,
//             opacity: 1,
//             transition: {
//                 duration: 0.4,
//                 ease: "easeOut",
//             },
//         },
//     };

//     return (
//         <div>
//             {/* Logo and Title - positioned at top-left, responsive */}
//             <div className=" fixed top-9 left-10 z-100 ">
//                 <Motion.div
//                     className="flex items-center gap-3 "
//                     initial={{ opacity: 0, x: -30 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.8 }}
//                 >
//                     <a href="/" className="flex items-center gap-3">
//                         <div className="gradient_bg_colors p-2 rounded-full shadow-lg">
//                             <Home className="text-white h-6 w-6 animate-pulse" />
//                         </div>
//                         <h1 className="hidden lg:block  text-2xl font-extrabold text-transparent bg-clip-text text_gradient bg_clip_text animate-fade-in">
//                             Department of Innovation
//                         </h1>
//                     </a>
//                 </Motion.div>
//             </div>
//             {/* Main container with vibrant animated background */}
//             <div className="min-h-screen flex flex-col items-center justify-center  bg-transparent text-white p-4 relative overflow-hidden font-inter">
//                 {/* Background animation elements */}
//                 <div className="absolute inset-0 z-0">
//                     <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
//                     <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
//                     <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
//                 </div>

//                 {/* Main content area (form) */}
//                 <Motion.div
//                     className="w-full max-w-sm md:max-w-md lg:max-w-lg bg-transparent bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-20 shadow-2xl rounded-xl p-6 md:p-8 z-10 relative text-center"
//                     variants={containerVariants}
//                     initial="hidden"
//                     animate="visible"
//                 >
//                     <Motion.h1
//                         className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-md"
//                         variants={itemVariants}
//                     >
//                         Verify Your Account
//                     </Motion.h1>
//                     <Motion.p
//                         className="text-gray-200 mb-6 text-sm md:text-base"
//                         variants={itemVariants}
//                     >
//                         Please enter the 6-digit code sent to your email/phone number.
//                     </Motion.p>

//                     {/* Error and Success Messages */}
//                     {error && (
//                         <Motion.div
//                             className="bg-red-500 bg-opacity-20 text-red-300 p-3 rounded-md mb-4 text-sm flex items-center justify-center gap-2"
//                             initial={{ opacity: 0, y: -10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.3 }}
//                         >
//                             <XCircle size={18} /> {error}
//                         </Motion.div>
//                     )}
//                     {successMessage && (
//                         <Motion.div
//                             className="bg-green-500 bg-opacity-20 text-green-300 p-3 rounded-md mb-4 text-sm flex items-center justify-center gap-2"
//                             initial={{ opacity: 0, y: -10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.3 }}
//                         >
//                             <CheckCircle size={18} /> {successMessage}
//                         </Motion.div>
//                     )}

//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         {/* OTP Input Boxes */}
//                         <Motion.div
//                             className="flex justify-center gap-2 md:gap-3 mb-6"
//                             variants={itemVariants}
//                         >
//                             {otp.map((digit, index) => (
//                                 <input
//                                     key={index}
//                                     type="text"
//                                     maxLength="1"
//                                     value={digit}
//                                     onChange={(e) => handleChange(e.target, index)}
//                                     onKeyDown={(e) => handleKeyDown(e, index)}
//                                     onPaste={index === 0 ? handlePaste : null} // Only allow paste on the first input
//                                     ref={(el) => (otpInputRefs.current[index] = el)}
//                                     className="w-10 h-12 md:w-12 md:h-14 text-2xl md:text-3xl text-center bg-transparent bg-opacity-15 border border-white border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 shadow-inner"
//                                     required
//                                     aria-label={`OTP digit ${index + 1}`}
//                                 />
//                             ))}
//                         </Motion.div>

//                         {/* Resend OTP Link (Optional) */}
//                         <Motion.div
//                             className="text-sm text-gray-300"
//                             variants={itemVariants}
//                         >
//                             Didn't receive the code?{" "}
//                             <Link
//                                 to="/otp-resending" // In a real app, this would trigger a resend OTP function
//                                 className="text-blue-300 hover:text-blue-100 font-semibold transition-colors duration-200"
//                                 onClick={(e) => {
//                                     e.preventDefault();
//                                     navigate("/otp-resending");
//                                 }}
//                             >
//                                 Resend Code
//                             </Link>
//                         </Motion.div>

//                         {/* Submit Button */}
//                         <Motion.button
//                             type="submit"
//                             className="w-full py-3 mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
//                             disabled={loading}
//                             variants={itemVariants}
//                         >
//                             {loading ? "Verifying..." : "Verify Account"}
//                         </Motion.button>
//                     </form>
//                 </Motion.div>

//                 {/* Custom CSS for animations and font */}
//                 <style>{`
//                     @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap");

//                     .font-inter {
//                         font-family: "Inter", sans-serif;
//                     }

//                     /* Custom gradient for text and background elements */
//                     .gradient_bg_colors {
//                         background: linear-gradient(to right, #8b5cf6, #6366f1);
//                     }

//                     .text_gradient {
//                         background: linear-gradient(to right, #fbcfe8, #d8b4fe, #93c5fd);
//                         -webkit-background-clip: text;
//                         -webkit-text-fill-color: transparent;
//                     }

//                     /* Blob animation for background elements */
//                     @keyframes blob {
//                         0% {
//                             transform: translate(0px, 0px) scale(1);
//                         }
//                         33% {
//                             transform: translate(30px, -50px) scale(1.1);
//                         }
//                         66% {
//                             transform: translate(-20px, 20px) scale(0.9);
//                         }
//                         100% {
//                             transform: translate(0px, 0px) scale(1);
//                         }
//                     }

//                     .animate-blob {
//                         animation: blob 7s infinite cubic-bezier(0.6, 0.01, 0.4, 1);
//                     }

//                     .animation-delay-2000 {
//                         animation-delay: 2s;
//                     }

//                     .animation-delay-4000 {
//                         animation-delay: 4s;
//                     }

//                     /* Fade-in animation for title */
//                     @keyframes fade-in {
//                         from {
//                             opacity: 0;
//                             transform: translateY(10px);
//                         }
//                         to {
//                             opacity: 1;
//                             transform: translateY(0);
//                         }
//                     }

//                     .animate-fade-in {
//                         animation: fade-in 1s ease-out forwards;
//                     }
//                 `}</style>
//             </div>
//         </div>
//     );
// };

// export default UserVerificationPage;

// localStorage.removeItem("accessToken");
// localStorage.removeItem("refreshToken");
// localStorage.removeItem("userId");
// localStorage.removeItem("userEmail");
// localStorage.removeItem("userRole"); // ✅ make sure to remove this too
