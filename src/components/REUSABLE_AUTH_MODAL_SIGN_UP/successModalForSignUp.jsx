// SuccessModalRegistration.jsx
import { motion as Motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const SuccessModalRegistration = ({ onContinue, onBackHome }) => {
	return (
		<Motion.div
			initial={{ scale: 0.8, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			transition={{ duration: 0.4, ease: "easeOut" }}
			className="text-white text-center font-inter space-y-6"
		>
			<div className="flex justify-center">
				<Motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1.1 }}
					transition={{ type: "spring", stiffness: 300 }}
					className="text-green-500"
				>
					<CheckCircle size={64} />
				</Motion.div>
			</div>

			<h2 className="text-2xl font-bold">Registration Successful!</h2>
			<p className="text-sm text-gray-300">
				Your account has been successfully created. You can now proceed.
			</p>

			<div className="flex flex-col sm:flex-row justify-center gap-4">
				<button
					onClick={onBackHome}
					className="w-full sm:w-auto px-6 py-2 bg-white text-black rounded hover:bg-opacity-90"
				>
					Back to Home
				</button>

				<button
					onClick={onContinue}
					className="w-full sm:w-auto px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
				>
					Continue
				</button>
			</div>
		</Motion.div>
	);
};

export default SuccessModalRegistration;
