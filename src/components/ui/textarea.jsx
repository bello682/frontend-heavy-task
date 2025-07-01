import React from "react";

const Textarea = ({
	label,
	id,
	value,
	onChange,
	rows = 4,
	className = "",
	...props
}) => {
	return (
		<div className="mb-4">
			<label htmlFor={id} className="text-gray-300">
				{label}
			</label>
			<textarea
				id={id}
				value={value}
				onChange={onChange}
				rows={rows}
				className={`w-full p-3 mt-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
				{...props}
			/>
		</div>
	);
};

export { Textarea };
