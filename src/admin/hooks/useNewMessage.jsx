// src/hooks/useNewMessage.js

import { useContext } from "react";
import { NewMessageContext } from "./NewMessageContextObject"; // Import from the dedicated context object file

export const useNewMessage = () => {
	const context = useContext(NewMessageContext);
	if (!context) {
		throw new Error("useNewMessage must be used within a NewMessageProvider");
	}
	return context;
};
