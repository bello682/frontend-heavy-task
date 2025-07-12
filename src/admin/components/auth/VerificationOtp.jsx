// src/components/auth/VerificationOtp.jsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthFormContainer from "./AuthFormContainer";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import { adminVerifyOtp } from "../../api/dummyApi";
import { FaShieldAlt } from "react-icons/fa";

const VerificationOtp = () => {
	const [otp, setOtp] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const navigate = useNavigate();
	const location = useLocation();
	const email = location.state?.email || ""; // Get email from navigation state

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");
		setLoading(true); // Start loading

		if (!otp) {
			setError("Please enter the OTP.");
			setLoading(false); // Stop loading
			return;
		}

		try {
			const response = await adminVerifyOtp(otp); // ✅ Use real API

			if (response.success) {
				setSuccess(response.message || "OTP verified! Redirecting...");
				setOtp("");
				setTimeout(() => {
					navigate("/admin-login");
				}, 2000);
			} else {
				setError(response.message);
			}
		} catch (err) {
			console.error(err);
			setError("An error occurred during OTP verification.");
		} finally {
			setLoading(false); // Stop loading
		}
	};

	return (
		<AuthFormContainer title="Verify OTP">
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
				Please enter the 6-digit code sent to{" "}
				<span className="font-semibold">{email || "your email"}</span>.
			</p>
			<form onSubmit={handleSubmit}>
				<InputField
					id="otp"
					name="otp"
					type="text"
					label="OTP Code"
					placeholder="______"
					value={otp}
					onChange={(e) => setOtp(e.target.value)}
					required
					className="text-center tracking-widest text-lg"
					maxLength="6"
					icon={<FaShieldAlt />}
				/>
				<Button
					type="submit"
					className="w-full mt-4"
					variant="primary"
					disabled={loading}
				>
					{loading ? "verifing...." : "Verify OTP"}
				</Button>
			</form>
			<p className="text-center text-sm mt-4 text-textSecondary">
				Didn't receive the code?{" "}
				<Link
					to="/resend-otp"
					state={{ email }}
					className="text-blue-600 hover:underline"
				>
					Resend OTP
				</Link>
			</p>
		</AuthFormContainer>
	);
};

export default VerificationOtp;
