// src/components/auth/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthFormContainer from "./AuthFormContainer";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import { adminLogin } from "../../api/dummyApi";
import { FaEnvelope, FaLock } from "react-icons/fa";
import InputFieldPassword from "../ui/inputFieldPassword";

const Admin_Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);

	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");
		setLoading(true); // Start loading

		if (!formData.email || !formData.password) {
			setError("Email and password are required.");
			setLoading(false); // Stop loading
			return;
		}

		try {
			const response = await adminLogin(formData);

			if (response.success) {
				setSuccess("Login successful! Redirecting...");
				localStorage.setItem("accessToken", response.accessToken);
				localStorage.setItem("refreshToken", response.refreshToken);
				localStorage.setItem("adminId", response.admin?._id);
				localStorage.setItem("userRole", response.admin?.role);
				setTimeout(() => {
					navigate("/admin");
				}, 2000);
			} else {
				setError(response.message);
			}
		} catch (err) {
			console.log(err);

			setError("An unexpected error occurred. Please try again.");
		} finally {
			setLoading(false); // Stop loading
		}
	};

	return (
		<AuthFormContainer title="Admin Login">
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
					icon={<FaLock />}
				/>
				<Button
					type="submit"
					className="w-full mt-4"
					variant="primary"
					disabled={loading}
				>
					{loading ? "Logging in..." : "Log In"}
				</Button>
			</form>
			<div className="text-center text-sm mt-4 text-textSecondary">
				<Link
					to="/admin-forgot-password"
					className="text-blue-600 hover:underline"
				>
					Forgot Password?
				</Link>
			</div>
			<p className="text-center text-sm mt-2 text-textSecondary">
				Don't have an account?{" "}
				<Link to="/admin-signup" className="text-blue-600 hover:underline">
					Sign up
				</Link>
			</p>
		</AuthFormContainer>
	);
};

export default Admin_Login;
