// src/components/ui/InputFieldPassword.jsx
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputFieldPassword = ({
	label,
	id,
	value,
	onChange,
	placeholder,
	required = false,
	className = "",
}) => {
	const [showPassword, setShowPassword] = useState(false);
	const toggleVisibility = () => setShowPassword((prev) => !prev);

	return (
		<div className="mb-4 relative">
			{label && (
				<label
					htmlFor={id}
					className="block text-textPrimary text-sm font-bold mb-2"
				>
					{label} {required && <span className="text-accentRed">*</span>}
				</label>
			)}
			<div className="relative">
				<input
					type={showPassword ? "text" : "password"}
					id={id}
					name={id}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					required={required}
					className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline
                    bg-secondary text-textSecondary border-gray-300 focus:ring-2 focus:ring-gray-500 ${className}`}
				/>
				<span
					className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
					onClick={toggleVisibility}
				>
					{showPassword ? <FaEyeSlash /> : <FaEye />}
				</span>
			</div>
		</div>
	);
};

export default InputFieldPassword;
