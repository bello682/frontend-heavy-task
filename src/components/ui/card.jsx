import React from "react";

const Card = ({ children, className = "", ...props }) => {
	return (
		<div
			className={`bg-gray-800 text-white rounded-lg shadow-lg ${className}`}
			{...props}
		>
			{children}
		</div>
	);
};

const CardHeader = ({ children, ...props }) => {
	return (
		<div className="p-4 border-b border-gray-600" {...props}>
			{children}
		</div>
	);
};

const CardTitle = ({ children, ...props }) => {
	return (
		<h3 className="text-xl font-semibold" {...props}>
			{children}
		</h3>
	);
};

const CardDescription = ({ children, ...props }) => {
	return (
		<p className="text-gray-300" {...props}>
			{children}
		</p>
	);
};

const CardContent = ({ children, ...props }) => {
	return (
		<div className="p-4" {...props}>
			{children}
		</div>
	);
};

export { Card, CardHeader, CardTitle, CardDescription, CardContent };
