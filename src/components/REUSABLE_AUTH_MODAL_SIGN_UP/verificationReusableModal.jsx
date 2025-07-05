import { useState, useRef, useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { motion as Motion } from "framer-motion";

const BASE_URL =
	import.meta.env.VITE_BASE_URL || "http://localhost:7075/api_url/users/task";

const OtpVerificationModalBody = ({ onVerificationSuccess }) => {
	const [otp, setOtp] = useState(["", "", "", "", "", ""]);
	const otpInputRefs = useRef([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);

	useEffect(() => {
		if (otpInputRefs.current[0]) {
			otpInputRefs.current[0].focus();
		}
	}, []);

	const handleChange = (element, index) => {
		if (isNaN(element.value)) return;
		const newOtp = [...otp];
		newOtp[index] = element.value;
		setOtp(newOtp);
		if (element.value !== "" && index < otp.length - 1) {
			otpInputRefs.current[index + 1].focus();
		}
	};

	const handleKeyDown = (element, index) => {
		if (element.key === "Backspace" && otp[index] === "" && index > 0) {
			otpInputRefs.current[index - 1].focus();
		}
	};

	const handlePaste = (e) => {
		e.preventDefault();
		const pasteData = e.clipboardData.getData("text").trim();
		if (pasteData.length === otp.length && /^\d+$/.test(pasteData)) {
			const newOtp = pasteData.split("");
			setOtp(newOtp);
			otpInputRefs.current[otp.length - 1].focus();
		} else {
			setError("Please paste a valid 6-digit OTP.");
			setTimeout(() => setError(null), 3000);
		}
	};

	const token = localStorage.getItem("accessToken");
	const deviceId = localStorage.getItem("deviceId");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		setSuccessMessage(null);

		const fullOtp = otp.join("");
		if (fullOtp.length !== otp.length || isNaN(fullOtp)) {
			setError("Please enter a valid 6-digit OTP.");
			return;
		}

		setLoading(true);
		try {
			const response = await fetch(`${BASE_URL}/verifyUser-otp`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
					"x-device-id": deviceId,
				},
				body: JSON.stringify({ otp: fullOtp }),
			});

			const data = await response.json();
			if (!response.ok) throw new Error(data.message || "Verification failed.");
			localStorage.setItem("userId", data?.user?._id);

			setSuccessMessage(data.message || "OTP verified successfully!");
			setTimeout(() => onVerificationSuccess(), 1500);
		} catch (err) {
			setError(err.message || "An unknown error occurred.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Motion.div
			className="w-full max-w-md text-white font-inter"
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.4 }}
		>
			<h2 className="text-3xl font-bold mb-4 text-center">
				Verify Your Account
			</h2>
			<p className="text-sm text-center mb-4">
				Please enter the 6-digit code sent to your email or phone number.
			</p>

			{error && (
				<div className="bg-red-600 text-white p-3 rounded mb-4 text-sm flex items-center justify-center gap-2">
					<XCircle size={18} /> {error}
				</div>
			)}

			{successMessage && (
				<div className="bg-green-600 text-white p-3 rounded mb-4 text-sm flex items-center justify-center gap-2">
					<CheckCircle size={18} /> {successMessage}
				</div>
			)}

			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="flex justify-center gap-2 mb-4">
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
							className="w-10 h-12 text-xl text-center border rounded bg-black text-white"
							required
						/>
					))}
				</div>

				<button
					type="submit"
					className="w-full bg-white text-black font-bold p-2 rounded hover:bg-opacity-80"
					disabled={loading}
				>
					{loading ? "Verifying..." : "Verify Account"}
				</button>
			</form>
		</Motion.div>
	);
};

export default OtpVerificationModalBody;
