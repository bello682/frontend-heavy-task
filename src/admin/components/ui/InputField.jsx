// src/components/ui/InputField.jsx
import React from "react";

const InputField = ({
	label,
	id,
	type = "text",
	value,
	onChange,
	placeholder,
	required = false,
	className = "",
}) => {
	return (
		<div className="mb-4">
			{label && (
				<label
					htmlFor={id}
					className="block text-textPrimary text-sm font-bold mb-2"
				>
					{label} {required && <span className="text-accentRed">*</span>}
				</label>
			)}
			<input
				type={type}
				id={id}
				name={id}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				required={required}
				className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline
                    bg-secondary text-textSecondary border-gray-300 focus:ring-2 focus:ring-gray-500 ${className}`}
			/>
		</div>
	);
};

export default InputField;
