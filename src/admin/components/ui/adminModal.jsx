// src/components/ui/Modal.jsx
import React from "react";
import Button from "./Button"; // Assuming your Button component is here
import { FaTimes } from "react-icons/fa";

const Modal = ({
	isOpen,
	onClose,
	title,
	children,
	onConfirm,
	confirmText = "Confirm",
	cancelText = "Cancel",
	confirmVariant = "danger",
}) => {
	// Define accent colors directly in the component
	const accentColors = {
		grayBg: "bg-gray-800", // Darker gray for modal background
		lightBgSecondary: "bg-white", // Modal content background
		darkTextPrimary: "text-white", // Text on dark backgrounds
		lightTextSecondary: "text-black", // Text on light backgrounds
		red: "text-[#EF4444]", // Red for close button
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-70 animate-fade-in">
			<div
				className={`${accentColors.lightBgSecondary} ${accentColors.lightTextSecondary} rounded-xl shadow-2xl w-full max-w-md p-6 relative transform scale-95 animate-scale-in`}
			>
				<button
					onClick={onClose}
					className={`absolute top-3 right-3 text-2xl ${accentColors.lightTextSecondary} hover:${accentColors.red} transition-colors duration-200`}
					aria-label="Close modal"
				>
					<FaTimes />
				</button>
				<h3 className="text-2xl font-bold mb-4 pr-10">{title}</h3>
				<div className="mb-6 text-base">{children}</div>
				<div className="flex justify-end space-x-3">
					<Button onClick={onClose} variant="secondary">
						{cancelText}
					</Button>
					<Button onClick={onConfirm} variant={confirmVariant}>
						{confirmText}
					</Button>
				</div>
			</div>

			{/* Custom Animations for Modal */}
			<style jsx="true">{`
				@keyframes fadeIn {
					from {
						opacity: 0;
					}
					to {
						opacity: 1;
					}
				}
				@keyframes scaleIn {
					from {
						transform: scale(0.95);
						opacity: 0;
					}
					to {
						transform: scale(1);
						opacity: 1;
					}
				}
				.animate-fade-in {
					animation: fadeIn 0.3s ease-out forwards;
				}
				.animate-scale-in {
					animation: scaleIn 0.3s ease-out forwards;
				}
			`}</style>
		</div>
	);
};

export default Modal;
