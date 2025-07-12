import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthFormContainer from "./AuthFormContainer";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import { FaUserPlus, FaEnvelope, FaLock, FaPhoneAlt } from "react-icons/fa";
import { adminRegistration } from "./../../api/dummyApi";
import InputFieldPassword from "../ui/inputFieldPassword";

const Signup = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		phoneNumber: "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		setError(""); // ✅ clear error as user types
		setSuccess(""); // optionally clear success as well
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");
		setLoading(true); // Start loading

		if (
			!formData.name ||
			!formData.email ||
			!formData.password ||
			!formData.phoneNumber
		) {
			setError("All fields are required.");
			setLoading(false); // ✅ Fix: stop loading if validation fails
			return;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			setError("Please enter a valid email address.");
			setLoading(false); // ✅ Fix: stop loading if validation fails
			return;
		}

		const phoneRegex = /^\+?\d{10,15}$/;
		if (!phoneRegex.test(formData.phoneNumber)) {
			setError("Please enter a valid phone number.");
			setLoading(false); // ✅ Fix: stop loading if validation fails
			return;
		}

		try {
			const response = await adminRegistration(formData); // 🔧 FIXED

			if (response?.accessToken && response?.user) {
				setSuccess(response.message || "Signup successful! Please log in.");

				setFormData({ name: "", email: "", password: "", phoneNumber: "" });
				setTimeout(() => {
					navigate("/admin-verify-otp");
				}, 2000);
			} else {
				setError(response.message || "Signup failed. Please try again.");
			}
		} catch (err) {
			console.error(err);
			setError("Something went wrong. Please try again later.");
		} finally {
			setLoading(false); // Stop loading
		}
	};

	return (
		<AuthFormContainer title="Admin Signup">
			{error && (
				<div className="bg-[#EF4444] py-2 mb-4">
					<p className="text-white text-sm text-center">{error}</p>
				</div>
			)}
			{success && (
				<div className="bg-[#22C55E] py-2 mb-4">
					<p className="text-white text-sm text-center">{success}</p>
				</div>
			)}

			<form onSubmit={handleSubmit}>
				<InputField
					id="name"
					name="name"
					type="text"
					label="Full Name"
					placeholder="John Doe"
					value={formData.name}
					onChange={handleChange}
					required
					icon={<FaUserPlus />} // Example of adding an icon to the label or input area
				/>
				<InputField
					id="email"
					name="email"
					type="email"
					label="Email"
					placeholder="admin@example.com"
					value={formData.email}
					onChange={handleChange}
					required
					icon={<FaEnvelope />}
				/>

				<InputFieldPassword
					id="password"
					name="password"
					label="Password"
					placeholder="********"
					value={formData.password}
					onChange={handleChange}
					required
				/>

				<InputField
					id="phoneNumber"
					name="phoneNumber"
					type="tel"
					label="Phone Number"
					placeholder="+2348012345678"
					value={formData.phoneNumber}
					onChange={handleChange}
					required
					icon={<FaPhoneAlt />}
				/>
				<Button
					type="submit"
					className="w-full mt-4 bg-[#000000]"
					variant="primary"
					disabled={loading}
				>
					{loading ? "Signing....." : "Sign Up"}
				</Button>
			</form>
			<p className="text-center text-sm mt-4 text-textSecondary">
				Already have an account?{" "}
				<Link to="/admin-login" className="text-blue-600 hover:underline">
					Login here
				</Link>
			</p>
		</AuthFormContainer>
	);
};

export default Signup;
