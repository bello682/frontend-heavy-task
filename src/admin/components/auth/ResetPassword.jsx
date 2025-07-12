// src/components/auth/ResetPassword.jsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthFormContainer from "./AuthFormContainer";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import { useParams } from "react-router-dom";
import { adminResetPassword } from "../../api/dummyApi";
import { FaLock } from "react-icons/fa";
import InputFieldPassword from "./../ui/inputFieldPassword";

const ResetPassword = () => {
	const [newPassword, setNewPassword] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { token } = useParams(); // ✅ get token from URL
	const location = useLocation();
	const email = location.state?.email || ""; // Get email from navigation state

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");

		if (!token) {
			setError("Reset token is missing. Please check your email link.");
			return;
		}

		if (!newPassword) {
			setError("New password fields required.");
			return;
		}
		if (newPassword.length < 6) {
			setError("Password must be at least 6 characters long.");
			return;
		}

		try {
			setLoading(true);
			const response = await adminResetPassword({
				token,
				newPassword: newPassword,
			});
			if (response.success) {
				setSuccess("Password reset successfully! Redirecting to login...");
				setTimeout(() => navigate("/admin-login"), 1500);
			} else {
				setError(response.message);
			}
		} catch (err) {
			console.log(err);
			setError("An error occurred during password reset.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<AuthFormContainer title="Reset Password">
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
				Set your new password for{" "}
				<span className="font-semibold">{email || "your account"}</span>.
			</p>
			<form onSubmit={handleSubmit}>
				<InputFieldPassword
					id="newPassword"
					name="newPassword"
					label="New Password"
					placeholder="********"
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
					required
					icon={<FaLock />}
				/>

				<Button
					type="submit"
					className="w-full mt-4"
					variant="primary"
					disabled={loading}
				>
					{loading ? "Resetting..." : "Reset Password"}
				</Button>
			</form>
			<p className="text-center text-sm mt-4 text-textSecondary">
				<Link to="/admin-login" className="text-blue-600 hover:underline">
					Back to Login
				</Link>
			</p>
		</AuthFormContainer>
	);
};

export default ResetPassword;
