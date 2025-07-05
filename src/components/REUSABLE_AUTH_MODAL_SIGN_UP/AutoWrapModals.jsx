// AuthModalWrapper.jsx
import { useState } from "react";
import Modal_For_Auth from "./modalForAuthOpen";
import OtpVerificationModalBody from "./verificationReusableModal";
import SignUpModalBody from "./signUpReusableModal";
import SuccessModalRegistration from "./successModalForSignUp";

const AuthModalWrapper = ({ isOpen, onClose, onFullSuccess }) => {
	const [step, setStep] = useState("signup"); // "signup" | "otp" | "success"

	const handleSignupSuccess = () => {
		setStep("otp");
	};

	const handleOtpSuccess = () => {
		setStep("success"); // ✅ show success modal instead of closing immediately
		// setTimeout(() => {
		// 	onClose();
		// 	setStep("signup");
		// }, 3000); // auto-close after 3 seconds
	};

	const handleContinue = () => {
		onFullSuccess?.(); // 👈 close HalfScreenDropdown from parent
		onClose(); // ✅ close modal
		setStep("signup"); // reset for next time
	};

	return (
		<Modal_For_Auth isOpen={isOpen} onClose={onClose}>
			{step === "signup" && (
				<SignUpModalBody onRegisterSuccess={handleSignupSuccess} />
			)}

			{step === "otp" && (
				<OtpVerificationModalBody onVerificationSuccess={handleOtpSuccess} />
			)}

			{step === "success" && (
				<SuccessModalRegistration
					onContinue={handleContinue}
					onBackHome={handleContinue}
				/>
			)}
		</Modal_For_Auth>
	);
};

export default AuthModalWrapper;
