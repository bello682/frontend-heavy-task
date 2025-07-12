// src/components/auth/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
// import {  useNavigate } from "react-router-dom";
import AuthFormContainer from "./AuthFormContainer";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import { FaEnvelope } from "react-icons/fa";
import { adminForgotPassword } from "./../../api/dummyApi";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const [success, setSuccess] = useState("");
	// const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");

		if (!email) {
			setError("Please enter your email address.");
			return;
		}

		try {
			setLoading(true); // start loading

			const response = await adminForgotPassword(email);

			if (response.success) {
				setSuccess(
					response.message ||
						"If an account exists, a password reset link has been sent to your email."
				);
				// setTimeout(() => {
				// 	navigate("/verify-otp", { state: { email } });
				// }, 2000);
			} else {
				setError(
					response.message ||
						"If an account exists, a password reset link has been sent to your email."
				);
			}
		} catch (err) {
			console.error("Forgot password error:", err);
			setError("An error occurred. Please try again.");
		} finally {
			setLoading(false); // stop loading
		}
	};

	return (
		<AuthFormContainer title="Forgot Password">
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
			<p className="text-center text-sm mb-4 text-textSecondary">
				Enter your email address to receive a verification code.
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
				<Button
					type="submit"
					className="w-full mt-4"
					variant="primary"
					disabled={loading}
				>
					{loading ? "Sending..." : "Send Verification Code"}
				</Button>
			</form>
			<p className="text-center text-sm mt-4 text-textSecondary">
				Remember your password?{" "}
				<Link to="/admin-login" className="text-blue-600 hover:underline">
					Log In
				</Link>
			</p>
		</AuthFormContainer>
	);
};

export default ForgotPassword;
