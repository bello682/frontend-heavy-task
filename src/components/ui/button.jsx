import React from "react";

const Button = ({
	variant = "outline",
	size = "sm",
	children,
	className = "",
	...props
}) => {
	const baseStyle = "px-4 py-2 rounded focus:outline-none ";
	const variants = {
		outline: "border border-gray-500 text-gray-500 hover:bg-gray-700",
		primary: "bg-blue-500 text-white hover:bg-blue-600",
		secondary: "bg-gray-700 text-white hover:bg-gray-600",
	};
	const sizes = {
		sm: "text-sm py-2 px-3",
		lg: "text-lg py-3 px-6",
	};
	const variantStyle = variants[variant] || variants.outline;
	const sizeStyle = sizes[size] || sizes.sm;

	return (
		<button
			className={`${baseStyle} ${variantStyle} ${sizeStyle} ${className}`}
			{...props}
		>
			{children}
		</button>
	);
};

export { Button };
