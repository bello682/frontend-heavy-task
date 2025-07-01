import React from "react";

const Label = ({ children, htmlFor, className = "", ...props }) => {
	return (
		<label
			htmlFor={htmlFor}
			className={`text-gray-300 ${className}`}
			{...props}
		>
			{children}
		</label>
	);
};

export { Label };
