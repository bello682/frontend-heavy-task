// Modal.jsx
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const Modal_For_Auth = ({ isOpen, onClose, children }) => {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
		return () => (document.body.style.overflow = "auto");
	}, [isOpen]);

	if (!isOpen) return null;

	return createPortal(
		<div className="fixed inset-0 z-200 flex items-center justify-center bg-black bg-opacity-80">
			<div className="bg-black rounded-lg p-6 max-w-lg w-full relative text-white shadow-2xl">
				<button
					className="absolute top-3 right-3 text-white hover:text-gray-300 cursor-pointer"
					onClick={onClose}
				>
					<X size={20} />
				</button>
				{children}
			</div>
		</div>,
		document.getElementById("modal-root")
	);
};

export default Modal_For_Auth;
