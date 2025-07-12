// src/components/auth/AuthFormContainer.jsx
import React from "react";

const AuthFormContainer = ({ title, children }) => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-primary p-4">
			<div className="bg-secondary text-textSecondary p-8 rounded-lg shadow-lg w-full max-w-md">
				<h2 className="text-3xl font-bold text-center mb-6">{title}</h2>
				{children}
			</div>
		</div>
	);
};

export default AuthFormContainer;
