import React from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react"; // Assuming you have lucide-react installed and configured

// --- Modal Component ---
const Modal = ({
	isOpen, // Boolean: Controls visibility of the modal
	onClose, // Function: Callback when the modal should close (e.g., clicking No, overlay, or close icon)
	onConfirm, // Function: Callback for the 'Yes' button action
	title, // String: Title for the modal header
	children, // ReactNode: Content for the modal body
	confirmText = "Yes", // String: Text for the confirm button
	cancelText = "No", // String: Text for the cancel button
	showCloseButton = true, // Boolean: Whether to show the 'X' close button in the header
	className = "", // Additional custom classes for the modal card
}) => {
	// Variants for the overlay animation (fade in/out)
	const overlayVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { duration: 0.3 } },
		exit: { opacity: 0, transition: { duration: 0.2 } },
	};

	// Variants for the modal card animation (scale and fade in/out)
	const modalVariants = {
		hidden: { y: "-100vh", opacity: 0, scale: 0.5 }, // Starts off-screen top, invisible, scaled down
		visible: {
			y: "0", // Slides to center
			opacity: 1,
			scale: 1, // Scales up to normal size
			transition: {
				duration: 0.4,
				type: "spring", // Spring animation for a bouncy feel
				damping: 25,
				stiffness: 500,
			},
		},
		exit: {
			y: "100vh", // Slides off-screen bottom
			opacity: 0,
			scale: 0.5,
			transition: { duration: 0.3 },
		},
	};

	// Handle confirm action and close
	const handleConfirm = () => {
		if (onConfirm) {
			onConfirm();
		}
		onClose();
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<Motion.div
					className="fixed inset-0 z-50  flex items-center justify-center p-4 sm:p-6 bg-black bg-opacity-70 backdrop-blur-sm" // Overlay styling
					variants={overlayVariants}
					initial="hidden"
					animate="visible"
					exit="exit"
					onClick={onClose} // Close modal when clicking on overlay
				>
					<Motion.div
						className={`bg-white rounded-xl shadow-2xl px-4 mx-2 w-[100%]  my-9  lg:w-[70%] overflow-hidden
                                    transform transition-all duration-300 ease-in-out ${className}`} // Modal card styling
						variants={modalVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
					>
						{/* Modal Header */}
						<div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 bg-gray-50 ">
							<h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
								{title}
							</h2>
							{showCloseButton && (
								<Motion.button
									onClick={onClose}
									className="p-2 rounded-full hover:bg-gray-200 transition-colors"
									whileTap={{ scale: 0.9 }}
									aria-label="Close modal"
								>
									<X size={20} className="text-gray-600" />
								</Motion.button>
							)}
						</div>

						{/* Modal Body (Content) */}
						<div className="p-4 sm:p-5 text-gray-700 max-h-[70vh] overflow-y-auto">
							{children}
						</div>

						{/* Modal Footer (Buttons) */}
						<div className="flex justify-end p-4 sm:p-5 border-t border-gray-200 bg-gray-50 space-x-3">
							<Motion.button
								onClick={onClose}
								className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium
                                           hover:bg-gray-100 transition-colors"
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								{cancelText}
							</Motion.button>
							<Motion.button
								onClick={handleConfirm}
								className="px-5 py-2 rounded-lg bg-red-600 text-white font-medium
                                           hover:bg-red-950 transition-colors shadow-md"
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								{confirmText}
							</Motion.button>
						</div>
					</Motion.div>
				</Motion.div>
			)}
		</AnimatePresence>
	);
};

export default Modal;
