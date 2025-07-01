import React from "react";

const Input = ({
	label,
	type = "text",
	id,
	value,
	onChange,
	className = "",
	...props
}) => {
	return (
		<div className="mb-4">
			<label htmlFor={id} className="text-gray-300">
				{label}
			</label>
			<input
				type={type}
				id={id}
				value={value}
				onChange={onChange}
				className={`w-full p-3 mt-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
				{...props}
			/>
		</div>
	);
};

export { Input };
