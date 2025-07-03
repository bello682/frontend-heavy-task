// src/components/Payment/ReceiptModal.jsx

import React from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
	X,
	QrCode,
	Calendar,
	DollarSign,
	CreditCard,
	User,
	BookOpen,
} from "../../../../components/Icons/lucid-icons"; // Import necessary icons
// import QRCode from "qrcode.react"; // No curly braces for default exports
// import QRCodeReact from "qrcode.react";

const ReceiptModal = ({ isOpen, onClose, receiptDetails }) => {
	const modalVariants = {
		hidden: { opacity: 0, scale: 0.8 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: { type: "spring", damping: 25, stiffness: 500 },
		},
		exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
	};

	const overlayVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { duration: 0.3 } },
		exit: { opacity: 0, transition: { duration: 0.2 } },
	};

	if (!receiptDetails) return null; // Don't render if no receipt data

	// const qrCodeValue = JSON.stringify({
	// 	transactionId: receiptDetails.transactionId,
	// 	course: receiptDetails.courseTitle,
	// 	amount: receiptDetails.amountPaid,
	// 	date: receiptDetails.date,
	// });

	return (
		<AnimatePresence>
			{isOpen && (
				<Motion.div
					className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 bg-black bg-opacity-70 backdrop-blur-sm"
					variants={overlayVariants}
					initial="hidden"
					animate="visible"
					exit="exit"
					onClick={onClose} // Close on overlay click
				>
					<Motion.div
						className="bg-primary-white rounded-xl shadow-2xl w-full max-w-md p-6 sm:p-8 text-primary-black relative"
						variants={modalVariants}
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
							aria-label="Close receipt"
						>
							<X size={20} className="text-gray-600" />
						</Motion.button>

						<h2 className="text-2xl sm:text-3xl font-bold text-center text-accent-blue mb-6">
							Payment Receipt
						</h2>

						{/* Receipt Details */}
						<div className="space-y-4 mb-6">
							<div className="flex items-center space-x-3">
								<QrCode size={24} className="text-gray-600" />
								<p className="text-lg">
									<span className="font-semibold">Transaction ID:</span>{" "}
									{receiptDetails.transactionId}
								</p>
							</div>
							<div className="flex items-center space-x-3">
								<BookOpen size={24} className="text-gray-600" />
								<p className="text-lg">
									<span className="font-semibold">Course:</span>{" "}
									{receiptDetails.courseTitle}
								</p>
							</div>
							<div className="flex items-center space-x-3">
								<DollarSign size={24} className="text-gray-600" />
								<p className="text-lg">
									<span className="font-semibold">Amount Paid:</span>{" "}
									{new Intl.NumberFormat("en-US", {
										style: "currency",
										currency: "USD",
									}).format(receiptDetails.amountPaid)}
								</p>
							</div>
							<div className="flex items-center space-x-3">
								<CreditCard size={24} className="text-gray-600" />
								<p className="text-lg">
									<span className="font-semibold">Payment Method:</span>{" "}
									{receiptDetails.paymentMethod}
								</p>
							</div>
							<div className="flex items-center space-x-3">
								<Calendar size={24} className="text-gray-600" />
								<p className="text-lg">
									<span className="font-semibold">Date:</span>{" "}
									{receiptDetails.date}
								</p>
							</div>
							{receiptDetails.buyerName && (
								<div className="flex items-center space-x-3">
									<User size={24} className="text-gray-600" />
									<p className="text-lg">
										<span className="font-semibold">Buyer:</span>{" "}
										{receiptDetails.buyerName}
									</p>
								</div>
							)}
							{receiptDetails.buyerEmail && (
								<div className="flex items-center space-x-3">
									<User size={24} className="text-gray-600" />{" "}
									{/* Reusing User icon for email as well */}
									<p className="text-lg">
										<span className="font-semibold">Email:</span>{" "}
										{receiptDetails.buyerEmail}
									</p>
								</div>
							)}
						</div>

						{/* QR Code for Verification */}
						<div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg shadow-inner">
							<h3 className="text-xl font-semibold mb-3">
								Scan for Verification
							</h3>
							{/* <QRCodeReact
								value={qrCodeValue}
								size={180}
								level="H"
								renderAs="svg"
								className="rounded-md"
							/> */}
							<p className="text-xs text-gray-500 mt-3 text-center">
								Use a QR scanner to verify payment details.
							</p>
						</div>

						{/* Footer Button */}
						<div className="mt-6 text-center">
							<Motion.button
								onClick={onClose}
								className="px-6 py-3 bg-primary-black text-primary-white font-semibold rounded-lg shadow-md
                                           hover:bg-gray-800 transition-colors"
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								Done
							</Motion.button>
						</div>
					</Motion.div>
				</Motion.div>
			)}
		</AnimatePresence>
	);
};

export default ReceiptModal;
