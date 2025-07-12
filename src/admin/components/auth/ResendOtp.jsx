// src/components/auth/ResendOtp.jsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthFormContainer from "./AuthFormContainer";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import { FaEnvelope } from "react-icons/fa";
import { adminResendOtp } from "./../../api/dummyApi";

const ResendOtp = () => {
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const navigate = useNavigate();
	const location = useLocation();
	const initialEmail = location.state?.email || ""; // Pre-fill if email was passed

	useState(() => {
		if (initialEmail) {
			setEmail(initialEmail);
		}
	}, [initialEmail]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");

		try {
			const response = await adminResendOtp(); // No email required for headers-based approach

			if (response.success) {
				setSuccess("A new OTP has been sent to your email.");
				setTimeout(() => {
					navigate("/admin-verify-otp");
				}, 2000);
			} else {
				setError(response.message || "Failed to resend OTP.");
			}
		} catch (err) {
			console.error("Resend OTP Error:", err);
			setError("An error occurred while resending the OTP.");
		}
	};

	return (
		<AuthFormContainer title="Resend OTP">
			{error && (
				<p className="text-accentRed text-sm mb-4 text-center">{error}</p>
			)}
			{success && (
				<p className="text-accentGreen text-sm mb-4 text-center">{success}</p>
			)}
			<p className="text-center text-sm mb-4 text-textSecondary">
				Enter your email address to receive a new verification code.
			</p>
			<form onSubmit={handleSubmit}>
				<InputField
					id="email"
					name="email"
					type="email"
					label="Email"
					placeholder="admin@example.com"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					icon={<FaEnvelope />}
				/>
				<Button type="submit" className="w-full mt-4" variant="primary">
					Resend OTP
				</Button>
			</form>
			<p className="text-center text-sm mt-4 text-textSecondary">
				<Link to="/login" className="text-blue-600 hover:underline">
					Back to Login
				</Link>
			</p>
		</AuthFormContainer>
	);
};

export default ResendOtp;
