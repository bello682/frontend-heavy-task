// src/components/Layout/MainLayout.jsx

import React from "react";
// import FloatingChatIcon from "./components/chat/floatingChatIcon";

const MainCourseLayout = ({ children }) => {
	return (
		<div className="min-h-screen bg-primary-white text-primary-black font-inter relative">
			{/* Main content of the page */}
			{children}

			{/* Floating Chat Icon (will be implemented in a later step) */}
			{/* <FloatingChatIcon /> */}
		</div>
	);
};

export default MainCourseLayout;
