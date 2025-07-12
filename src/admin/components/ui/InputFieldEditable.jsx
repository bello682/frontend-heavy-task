import React from "react";

const InputFieldEditable = ({
	label,
	name,
	value,
	onChange,
	type = "text",
	placeholder = "",
	required = false,
}) => {
	return (
		<div className="mb-3">
			{label && (
				<label
					htmlFor={name}
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					{label}
				</label>
			)}
			<input
				id={name}
				name={name}
				type={type}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				required={required}
				className="w-full p-2 border rounded text-black"
			/>
		</div>
	);
};

export default InputFieldEditable;
