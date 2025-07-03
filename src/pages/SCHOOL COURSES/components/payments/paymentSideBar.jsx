// src/components/Payment/PaymentSidebar.jsx

import React, { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
	X,
	CreditCard,
	Banknote,
	Landmark,
	CheckCircle,
	Info,
	AlertCircle,
} from "../../../../components/Icons/lucid-icons"; // Icons for payment methods and messages
import ReceiptModal from "./../modals & cards/paymentReceiptModal";
import PaymentSuccessCard from "./../modals & cards/paymentSuccessfullCard";

const PaymentSidebar = ({
	isOpen,
	onClose,
	course,
	onPaymentSuccess,
	onPaymentFailure,
}) => {
	const [selectedMethod, setSelectedMethod] = useState(null); // 'card', 'transfer', 'thirdparty'
	const [isProcessing, setIsProcessing] = useState(false);
	const [paymentMessage, setPaymentMessage] = useState({ type: "", text: "" });
	const [showPaymentSuccessModal, setShowPaymentSuccessModal] = useState(false);
	const [showReceiptModal, setShowReceiptModal] = useState(false);
	const [receiptDetails, setReceiptDetails] = useState(null); // To store receipt data

	// Variants for the sidebar sliding in/out
	const sidebarVariants = {
		hidden: { x: "100%" },
		visible: { x: 0 },
		exit: { x: "100%" },
	};

	// Variants for the overlay fading in/out
	const overlayVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
		exit: { opacity: 0 },
	};

	// Dummy payment processing function
	const processPayment = async () => {
		setIsProcessing(true);
		setPaymentMessage({ type: "", text: "" }); // Clear previous messages

		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 2000));

		const success = Math.random() > 0.3; // 70% chance of success for demo

		if (success) {
			setPaymentMessage({
				type: "success",
				text: "Payment successful! Generating receipt...",
			});
			// Simulate receipt data
			const dummyReceipt = {
				transactionId: `TXN-${Date.now()}-${Math.random()
					.toString(36)
					.substring(2, 8)
					.toUpperCase()}`,
				courseTitle: course.title,
				amountPaid: course.price,
				paymentMethod: selectedMethod,
				date: new Date().toLocaleString(),
				buyerName: "Demo User", // Replace with actual user name
				buyerEmail: "demo@example.com", // Replace with actual user email
			};
			setReceiptDetails(dummyReceipt);
			setShowPaymentSuccessModal(true); // Show success card
			onPaymentSuccess(); // Notify parent component
		} else {
			setPaymentMessage({
				type: "error",
				text: "Payment failed. Please try a different method or try again.",
			});
			onPaymentFailure(); // Notify parent component
		}
		setIsProcessing(false);
	};

	// Reset state when modal closes
	const handleCloseSidebar = () => {
		setSelectedMethod(null);
		setPaymentMessage({ type: "", text: "" });
		setIsProcessing(false);
		setShowPaymentSuccessModal(false);
		setShowReceiptModal(false);
		setReceiptDetails(null);
		onClose();
	};

	// Open receipt modal from success card
	const handleViewReceipt = () => {
		setShowPaymentSuccessModal(false);
		setShowReceiptModal(true);
	};

	if (!course) return null; // Don't render if no course data

	const formattedPrice = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(course.price);

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Overlay */}
					<Motion.div
						className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-40"
						variants={overlayVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						onClick={handleCloseSidebar} // Close sidebar when clicking overlay
					/>

					{/* Sidebar */}
					<Motion.div
						className={`fixed top-0 right-0 h-full bg-gray-800 text-primary-black shadow-2xl z-50
                                    flex flex-col transform transition-transform duration-300 ease-in-out
                                    w-full md:w-1/2 lg:w-1/1 xl:w-1/2`} // Responsive width
						variants={sidebarVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						transition={{ duration: 0.3, ease: "easeInOut" }}
					>
						{/* Header */}
						<div className="p-6 flex items-center justify-between border-b border-gray-light bg-gray-bg">
							<h2 className="text-2xl font-bold">Purchase: {course.title}</h2>
							<Motion.button
								onClick={handleCloseSidebar}
								className="p-2 rounded-full hover:bg-gray-200 transition-colors"
								whileTap={{ scale: 0.95 }}
								aria-label="Close payment sidebar"
							>
								<X size={24} />
							</Motion.button>
						</div>

						{/* Summary Details */}
						<div className="p-6 border-b border-gray-light">
							<p className="text-gray-700 text-lg mb-2">
								You are about to purchase:{" "}
								<span className="font-semibold">{course.title}</span>
							</p>
							<p className="text-2xl font-extrabold text-accent-blue">
								Total: {formattedPrice}
							</p>
						</div>

						{/* Payment Methods */}
						<div className="flex-1 p-6 space-y-4 overflow-y-auto">
							<h3 className="text-xl font-bold mb-4">Select Payment Method:</h3>

							{/* Card Payment */}
							<Motion.div
								className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                                            ${
																							selectedMethod === "card"
																								? "border-accent-blue bg-black shadow-md"
																								: "border-gray-light hover:border-gray-400"
																						}`}
								onClick={() => setSelectedMethod("card")}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<div className="flex items-center space-x-3">
									<CreditCard size={24} className="text-gray-700" />
									<span className="font-medium text-lg">Pay with Card</span>
								</div>
								{selectedMethod === "card" && (
									<Motion.form
										initial={{ opacity: 0, height: 0 }}
										animate={{ opacity: 1, height: "auto" }}
										exit={{ opacity: 0, height: 0 }}
										className="mt-4 space-y-3"
									>
										<input
											type="text"
											placeholder="Card Number"
											className="w-full p-2 border rounded-md focus:ring-accent-blue focus:border-accent-blue"
										/>
										<div className="flex space-x-2">
											<input
												type="text"
												placeholder="MM/YY"
												className="w-1/2 p-2 border rounded-md focus:ring-accent-blue focus:border-accent-blue"
											/>
											<input
												type="text"
												placeholder="CVV"
												className="w-1/2 p-2 border rounded-md focus:ring-accent-blue focus:border-accent-blue"
											/>
										</div>
										<input
											type="text"
											placeholder="Cardholder Name"
											className="w-full p-2 border rounded-md focus:ring-accent-blue focus:border-accent-blue"
										/>
									</Motion.form>
								)}
							</Motion.div>

							{/* Bank Transfer */}
							<Motion.div
								className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                                            ${
																							selectedMethod === "transfer"
																								? "border-accent-blue bg-blue-50 shadow-md"
																								: "border-gray-light hover:border-gray-400"
																						}`}
								onClick={() => setSelectedMethod("transfer")}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<div className="flex items-center space-x-3">
									<Banknote size={24} className="text-gray-700" />
									<span className="font-medium text-lg">Bank Transfer</span>
								</div>
								{selectedMethod === "transfer" && (
									<Motion.div
										initial={{ opacity: 0, height: 0 }}
										animate={{ opacity: 1, height: "auto" }}
										exit={{ opacity: 0, height: 0 }}
										className="mt-4 text-sm text-gray-700 space-y-2"
									>
										<p>Please transfer {formattedPrice} to:</p>
										<p>
											<span className="font-semibold">Bank Name:</span>{" "}
											Innovation Bank
										</p>
										<p>
											<span className="font-semibold">Account Name:</span>{" "}
											Innovation Academy Ltd.
										</p>
										<p>
											<span className="font-semibold">Account Number:</span>{" "}
											1234567890
										</p>
										<p className="text-xs text-error-red">
											*Your enrollment will be confirmed upon successful
											transfer verification.
										</p>
									</Motion.div>
								)}
							</Motion.div>

							{/* Third-Party Payment (e.g., PayPal, Stripe Checkout) */}
							<Motion.div
								className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                                            ${
																							selectedMethod === "thirdparty"
																								? "border-accent-blue bg-blue-50 shadow-md"
																								: "border-gray-light hover:border-gray-400"
																						}`}
								onClick={() => setSelectedMethod("thirdparty")}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<div className="flex items-center space-x-3">
									<Landmark size={24} className="text-gray-700" />
									<span className="font-medium text-lg">
										Pay with Third-Party
									</span>
								</div>
								{selectedMethod === "thirdparty" && (
									<Motion.div
										initial={{ opacity: 0, height: 0 }}
										animate={{ opacity: 1, height: "auto" }}
										exit={{ opacity: 0, height: 0 }}
										className="mt-4 text-sm text-gray-700"
									>
										<p>
											You will be redirected to a secure third-party payment
											gateway to complete your purchase.
										</p>
									</Motion.div>
								)}
							</Motion.div>
						</div>

						{/* Payment Message Area */}
						{paymentMessage.text && (
							<Motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								className={`mx-6 p-3 rounded-lg flex items-center space-x-2
                                            ${
																							paymentMessage.type === "success"
																								? "bg-green-900 text-success-green"
																								: "bg-red-900 text-error-red"
																						}`}
							>
								{paymentMessage.type === "success" ? (
									<CheckCircle size={20} />
								) : (
									<AlertCircle size={20} />
								)}
								<p className="text-sm">{paymentMessage.text}</p>
							</Motion.div>
						)}

						{/* Footer - Action Button */}
						<div className="p-6 border-t border-gray-light bg-gray-bg">
							<Motion.button
								onClick={processPayment}
								disabled={!selectedMethod || isProcessing}
								className={`w-full py-3 rounded-lg font-semibold shadow-md transition-colors duration-200
                                            ${
																							!selectedMethod || isProcessing
																								? "bg-gray-300 text-gray-500 cursor-not-allowed"
																								: "bg-accent-blue text-primary-white hover:bg-black"
																						}`}
								whileHover={{
									scale: !selectedMethod || isProcessing ? 1 : 1.02,
								}}
								whileTap={{ scale: !selectedMethod || isProcessing ? 1 : 0.98 }}
							>
								{isProcessing ? "Processing..." : `Pay ${formattedPrice}`}
							</Motion.button>
						</div>
					</Motion.div>

					{/* Payment Success Card Modal */}
					<PaymentSuccessCard
						isOpen={showPaymentSuccessModal}
						onClose={() => setShowPaymentSuccessModal(false)}
						onViewReceipt={handleViewReceipt}
						courseTitle={course.title}
					/>

					{/* Receipt Modal */}
					<ReceiptModal
						isOpen={showReceiptModal}
						onClose={() => setShowReceiptModal(false)}
						receiptDetails={receiptDetails}
					/>
				</>
			)}
		</AnimatePresence>
	);
};

export default PaymentSidebar;
