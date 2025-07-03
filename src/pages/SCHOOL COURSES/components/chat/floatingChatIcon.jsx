// src/components/Chat/FloatingChatIcon.jsx

import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import { MessageSquare } from "../../../../components/Icons/lucid-icons"; // Assuming MessageSquare is exported
import ChatModal from "./chatModal";

const FloatingChatIcon = () => {
	const [isChatModalOpen, setIsChatModalOpen] = useState(false);

	// Initial position for the draggable icon
	const [position, setPosition] = useState({ x: 0, y: 0 });

	// Function to open the chat modal
	const openChatModal = () => {
		setIsChatModalOpen(true);
	};

	// Function to close the chat modal
	const closeChatModal = () => {
		setIsChatModalOpen(false);
	};

	return (
		<>
			<Motion.div
				className="fixed bottom-6 right-6 z-40 cursor-grab active:cursor-grabbing"
				drag // Makes the component draggable
				dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} // Constrain drag to parent (viewport)
				dragElastic={0.2} // Adds a slight elastic effect when dragging near constraints
				onDragEnd={(_, info) => {
					// Update position state after drag ends
					setPosition({ x: info.point.x, y: info.point.y });
				}}
				initial={{ opacity: 0, scale: 0 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5, delay: 1 }} // Appear after 1 second
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				onClick={openChatModal} // Open modal on click
				style={{
					// Apply initial position for consistent placement
					x: position.x,
					y: position.y,
				}}
			>
				<div className="bg-accent-blue text-primary-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200">
					<MessageSquare size={32} /> {/* Chat icon */}
				</div>
			</Motion.div>

			{/* Chat Modal */}
			<ChatModal isOpen={isChatModalOpen} onClose={closeChatModal} />
		</>
	);
};

export default FloatingChatIcon;
