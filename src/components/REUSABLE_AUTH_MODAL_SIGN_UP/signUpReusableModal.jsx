import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion as Motion } from "framer-motion";

const BASE_URL =
	import.meta.env.VITE_BASE_URL || "http://localhost:7075/api_url/users/task";

const SignUpModalBody = ({ onRegisterSuccess, switchToLogin }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [user, setUser] = useState(null);
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);

	const validateInputs = () => {
		if (name.trim().length < 2) return "Name must be at least 2 characters.";
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
			return "Please enter a valid email address.";
		if (!/^\+?\d{10,15}$/.test(phoneNumber))
			return "Phone number must be 10 to 15 digits and can include a '+' prefix.";
		if (password.length < 6) return "Password must be at least 6 characters.";
		return null;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		setUser(null);
		setShowSuccessMessage(false);

		const validationError = validateInputs();
		if (validationError) {
			setError(validationError);
			return;
		}

		setLoading(true);
		try {
			const response = await fetch(`${BASE_URL}/register`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: name.toLowerCase(),
					email: email.toLowerCase(),
					phoneNumber,
					password,
				}),
			});

			const data = await response.json();
			localStorage.setItem("accessToken", data?.token);
			localStorage.setItem("deviceId", data?.deviceId);

			if (!response.ok) throw new Error(data.message || "Registration failed.");

			setUser(data);
			setShowSuccessMessage(true);

			setTimeout(() => {
				onRegisterSuccess();
			}, 1500);
		} catch (err) {
			setError(err.message || "An unknown error occurred during registration.");
		} finally {
			setLoading(false);
		}
	};

	//     if (response.ok) {
	//   setUser(data);
	//   setShowSuccessMessage(true);

	//   setTimeout(() => {
	//     onSuccess(); // 👈 This will switch to OTP
	//   }, 1500);
	// }

	return (
		<Motion.div
			className="w-full max-w-md text-white font-inter"
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.4 }}
		>
			<h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>

			{error && (
				<div className="bg-red-600 text-white p-3 rounded mb-4 text-sm text-center">
					{error}
				</div>
			)}

			{showSuccessMessage && user && (
				<div className="bg-green-600 text-white p-3 rounded mb-4 text-sm text-center">
					{user?.message}
				</div>
			)}

			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label htmlFor="name" className="text-sm">
						Name
					</label>
					<input
						type="text"
						id="name"
						className="w-full p-2 border rounded bg-black text-white"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div>

				<div>
					<label htmlFor="email" className="text-sm">
						Email
					</label>
					<input
						type="email"
						id="email"
						className="w-full p-2 border rounded bg-black text-white"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>

				<div>
					<label htmlFor="phoneNumber" className="text-sm">
						Phone Number
					</label>
					<input
						type="tel"
						id="phoneNumber"
						className="w-full p-2 border rounded bg-black text-white"
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
						required
					/>
				</div>

				<div className="relative">
					<label htmlFor="password" className="text-sm">
						Password
					</label>
					<input
						type={showPassword ? "text" : "password"}
						id="password"
						className="w-full p-2 pr-10 border rounded bg-black text-white"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<button
						type="button"
						onClick={() => setShowPassword(!showPassword)}
						className="absolute right-3 top-8 text-white"
					>
						{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
					</button>
				</div>

				<div className="text-center text-sm">
					Already have an account?{" "}
					<button type="button" onClick={switchToLogin} className="underline">
						Login
					</button>
				</div>

				<button
					type="submit"
					className="w-full bg-white text-black font-bold p-2 rounded mt-4 hover:bg-opacity-80"
					disabled={loading}
				>
					{loading ? "Registering..." : "Register"}
				</button>
			</form>
		</Motion.div>
	);
};

export default SignUpModalBody;
