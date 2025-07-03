// src/components/Payment/PaymentSuccessCard.jsx

import React from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X } from "../../../../components/Icons/lucid-icons"; // Assuming CheckCircle and X are exported

const PaymentSuccessCard = ({
	isOpen,
	onClose,
	onViewReceipt,
	courseTitle,
}) => {
	const cardVariants = {
		hidden: { opacity: 0, scale: 0.8, y: -50 },
		visible: {
			opacity: 1,
			scale: 1,
			y: 0,
			transition: { type: "spring", damping: 20, stiffness: 300 },
		},
		exit: { opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.2 } },
	};

	const overlayVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { duration: 0.3 } },
		exit: { opacity: 0, transition: { duration: 0.2 } },
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<Motion.div
					className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-black bg-opacity-70 backdrop-blur-sm"
					variants={overlayVariants}
					initial="hidden"
					animate="visible"
					exit="exit"
					onClick={onClose} // Close on overlay click
				>
					<Motion.div
						className="bg-primary-white rounded-xl shadow-2xl w-full max-w-sm p-6 sm:p-8 text-center relative"
						variants={cardVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						onClick={(e) => e.stopPropagation()} // Prevent closing on card click
					>
						{/* Close Button */}
						<Motion.button
							onClick={onClose}
							className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
							whileTap={{ scale: 0.9 }}
							aria-label="Close success message"
						>
							<X size={20} className="text-gray-600" />
						</Motion.button>

						{/* Success Icon */}
						<Motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{
								delay: 0.3,
								type: "spring",
								damping: 15,
								stiffness: 200,
							}}
							className="w-20 h-20 bg-success-green rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
						>
							<CheckCircle size={48} className="text-primary-white" />
						</Motion.div>

						<h2 className="text-3xl font-bold text-success-green mb-3">
							Payment Successful!
						</h2>
						<p className="text-gray-700 text-lg mb-6">
							You have successfully purchased{" "}
							<span className="font-semibold">{courseTitle}</span>.
						</p>

						<div className="flex flex-col space-y-3">
							<Motion.button
								onClick={onViewReceipt}
								className="w-full py-3 bg-accent-blue text-primary-white font-semibold rounded-lg shadow-md
                                           hover:bg-blue-700 transition-colors"
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								View Receipt
							</Motion.button>
							<Motion.button
								onClick={onClose}
								className="w-full py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg
                                           hover:bg-gray-100 transition-colors"
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								Close
							</Motion.button>
						</div>
					</Motion.div>
				</Motion.div>
			)}
		</AnimatePresence>
	);
};

export default PaymentSuccessCard;
