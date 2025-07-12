// src/components/ui/Button.jsx
import React from "react";

const Button = ({
	children,
	onClick,
	type = "button",
	className = "",
	variant = "primary",
	disabled = false,
}) => {
	const baseStyles =
		"font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out";
	let variantStyles = "";

	switch (variant) {
		case "primary":
			variantStyles = "bg-white text-black hover:bg-gray-200";
			break;
		case "secondary":
			variantStyles = "bg-gray-700 text-white hover:bg-gray-800";
			break;
		case "danger":
			variantStyles = "bg-accentRed text-white hover:bg-red-700";
			break;
		case "outline":
			variantStyles =
				"bg-transparent border border-white text-white hover:bg-white hover:text-black";
			break;
		default:
			variantStyles = "bg-white text-black hover:bg-gray-200";
	}

	const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={`${baseStyles} ${variantStyles} ${disabledStyles} ${className}`}
		>
			{children}
		</button>
	);
};

export default Button;
