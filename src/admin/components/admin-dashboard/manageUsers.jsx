// src/components/dashboard/ManageUsers.jsx
import React, { useState, useEffect } from "react";
import ManageUserListItemAction from "./../../constant/manageUserlistItemsAction";
// import { dummyApi } from "./../../api/dummyFakeApi";
import { dummyApi } from "../../api/dummyApi";
import InputField from "../ui/InputField"; // Assuming your InputField component is here
import Button from "../ui/Button"; // Assuming your Button component is here
import {
	FaUserCog,
	FaInfoCircle,
	FaExclamationTriangle,
	FaCheckCircle,
	FaGift,
	FaTimes,
	FaEnvelope,
	FaPhoneAlt,
	FaUserCircle,
	FaTrashAlt,
	FaSpinner,
	FaBullhorn, // Added FaBullhorn for bulk message
} from "react-icons/fa";

const ManageUsers = () => {
	// Define accent colors directly in the component
	const accentColors = {
		green: "text-[#22C55E]", // Success/Positive
		red: "text-[#EF4444]", // Error/Negative
		blue: "text-[#3B82F6]", // Info/Highlight
		orange: "text-[#F97316]", // Warning/Attention
		purple: "text-[#8B5CF6]", // Another accent color
		grayBg: "bg-gray-800", // Darker gray for card backgrounds on primary black
		lightGrayText: "text-gray-300", // Lighter gray for secondary text on dark backgrounds
		darkBgPrimary: "bg-black", // Primary background
		lightBgSecondary: "bg-white", // Secondary background
		darkTextPrimary: "text-white", // Primary text on dark backgrounds
		lightTextSecondary: "text-black", // Secondary text on light backgrounds
	};

	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	// const [success, setSuccess] = useState("");
	const [success] = useState("");

	// State for modal
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null); // The user object for the modal (null for bulk)
	const [actionType, setActionType] = useState(""); // e.g., 'sendWarning', 'sendAlert', 'deleteUser', 'sendBulkMessage'
	const [messageContent, setMessageContent] = useState(""); // For message input in modal
	const [modalLoading, setModalLoading] = useState(false);
	const [modalError, setModalError] = useState("");
	const [modalSuccess, setModalSuccess] = useState("");

	// Function to fetch users
	const fetchUsers = async () => {
		setLoading(true);
		setError("");
		try {
			const response = await dummyApi.getAllUsers(); // Assuming this API exists

			if (response.success) {
				setUsers(response.users);
			} else {
				setError(response.message || "Failed to fetch users.");
			}
		} catch (err) {
			setError("An error occurred while fetching users.");
			console.error("Fetch users error:", err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	// Handle action click from ManageUserListItemAction or new bulk message button
	const handleActionClick = (user, type) => {
		setSelectedUser(user); // Will be null for bulk messages
		setActionType(type);
		setMessageContent(""); // Clear previous message content
		setModalError("");
		setModalSuccess("");
		setIsModalOpen(true);
	};

	// Handle modal close
	const handleModalClose = () => {
		setIsModalOpen(false);
		setSelectedUser(null);
		setActionType("");
		setMessageContent("");
		setModalError("");
		setModalSuccess("");
	};

	// Handle form submission inside the modal
	const handleModalSubmit = async () => {
		setModalLoading(true);
		setModalError("");
		setModalSuccess("");

		try {
			let response;
			switch (actionType) {
				case "sendWarning":
					response = await dummyApi.sendWarningMessage(
						selectedUser.id,
						messageContent
					);
					break;
				case "sendAlert":
					response = await dummyApi.sendAlertMessage(
						selectedUser.id,
						messageContent
					);
					break;
				case "sendSuccess":
					response = await dummyApi.sendSuccessMessage(
						selectedUser.id,
						messageContent
					);
					break;
				case "sendPromo":
					response = await dummyApi.sendPromoMessage(
						selectedUser.id,
						messageContent
					);
					break;
				case "deleteUser":
					response = await dummyApi.deleteUser(selectedUser.id); // Reusing delete from prev request
					break;
				case "sendBulkMessage":
					response = await dummyApi.sendBulkMessage(messageContent); // New bulk message API call
					break;
				default:
					throw new Error("Unknown action type.");
			}

			if (response.success) {
				setModalSuccess(
					`${
						actionType === "deleteUser" ? "User deleted" : "Message sent"
					} successfully!`
				);
				if (actionType === "deleteUser") {
					fetchUsers(); // Re-fetch users if one was deleted
				}
				setTimeout(handleModalClose, 1500); // Close modal after success
			} else {
				setModalError(response.message || "Action failed.");
			}
		} catch (err) {
			setModalError(err.message || "An unexpected error occurred.");
			console.error("Modal action error:", err);
		} finally {
			setModalLoading(false);
		}
	};

	// Helper for modal title and icon
	const getModalTitleAndIcon = () => {
		switch (actionType) {
			case "sendWarning":
				return {
					title: `Send Warning to ${selectedUser?.name}`,
					icon: <FaExclamationTriangle className={accentColors.red} />,
				};
			case "sendAlert":
				return {
					title: `Send Alert to ${selectedUser?.name}`,
					icon: <FaInfoCircle className={accentColors.blue} />,
				};
			case "sendSuccess":
				return {
					title: `Send Success Message to ${selectedUser?.name}`,
					icon: <FaCheckCircle className={accentColors.green} />,
				};
			case "sendPromo":
				return {
					title: `Send Promo to ${selectedUser?.name}`,
					icon: <FaGift className={accentColors.orange} />,
				};
			case "deleteUser":
				return {
					title: `Delete User: ${selectedUser?.name}`,
					icon: <FaTrashAlt className={accentColors.red} />,
				};
			case "sendBulkMessage":
				return {
					title: "Send Bulk Message to All Users",
					icon: <FaBullhorn className={accentColors.purple} />,
				}; // New bulk message title
			default:
				return { title: "User Action", icon: <FaUserCog /> };
		}
	};

	const { title: modalTitle, icon: modalIcon } = getModalTitleAndIcon();

	// Nested Modal Component (defined directly within ManageUsers as requested)
	const UserActionModal = ({
		isOpen,
		onClose,
		user,
		actionType,
		onConfirm,
		messageContent,
		setMessageContent,
		loading,
		// error,
		// success,
	}) => {
		if (!isOpen) return null; // Modal can open even if no specific user is selected (for bulk)

		const isMessageAction = [
			"sendWarning",
			"sendAlert",
			"sendSuccess",
			"sendPromo",
			"sendBulkMessage",
		].includes(actionType); // Include bulk message
		const confirmButtonText =
			actionType === "deleteUser" ? "Confirm Delete" : "Send Message";
		const confirmButtonVariant =
			actionType === "deleteUser" ? "danger" : "primary";

		return (
			<div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-70 animate-fade-in">
				<div
					className={`${accentColors.lightBgSecondary} ${accentColors.lightTextSecondary} rounded-xl shadow-2xl w-full max-w-md p-6 relative transform scale-95 animate-scale-in`}
				>
					<button
						onClick={onClose}
						className={`absolute top-3 right-3 text-2xl ${accentColors.lightTextSecondary} hover:${accentColors.red} transition-colors duration-200`}
						aria-label="Close modal"
					>
						<FaTimes />
					</button>
					<h3 className="text-2xl font-bold mb-4 pr-10 flex items-center">
						{modalIcon} <span className="ml-3">{modalTitle}</span>
					</h3>

					{modalError && (
						<div
							className={`p-3 mb-4 rounded-lg ${accentColors.red} bg-opacity-10 text-center text-sm`}
							style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
						>
							{modalError}
						</div>
					)}
					{modalSuccess && (
						<div
							className={`p-3 mb-4 rounded-lg ${accentColors.green} bg-opacity-10 text-center text-sm`}
							style={{ backgroundColor: "rgba(34, 197, 94, 0.1)" }}
						>
							{modalSuccess}
						</div>
					)}

					{actionType === "deleteUser" ? (
						<p className="mb-6 text-base text-center">
							Are you sure you want to permanently delete user{" "}
							<span className="font-bold">"{user?.name}"</span>? This action
							cannot be undone.
						</p>
					) : (
						<div className="mb-6">
							<label
								htmlFor="messageContent"
								className={`block text-sm font-bold mb-2 ${accentColors.lightTextSecondary}`}
							>
								Message {user ? `for ${user.name}` : "to all users"}:
							</label>
							<textarea
								id="messageContent"
								value={messageContent}
								onChange={(e) => setMessageContent(e.target.value)}
								placeholder={`Enter your ${actionType
									.replace("send", "")
									.toLowerCase()} message here...`}
								rows="4"
								className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline
                                           bg-gray-200 text-black border-gray-300 focus:ring-2 focus:ring-gray-500"
							></textarea>
						</div>
					)}

					<div className="flex justify-end space-x-3">
						<Button onClick={onClose} variant="secondary" disabled={loading}>
							Cancel
						</Button>
						<Button
							onClick={onConfirm}
							variant={confirmButtonVariant}
							disabled={loading || (isMessageAction && !messageContent.trim())}
						>
							{loading ? (
								<FaSpinner className="animate-spin mr-2" />
							) : (
								confirmButtonText
							)}
						</Button>
					</div>
				</div>

				{/* Custom Animations for Modal */}
				<style jsx="true">{`
					@keyframes fadeIn {
						from {
							opacity: 0;
						}
						to {
							opacity: 1;
						}
					}
					@keyframes scaleIn {
						from {
							transform: scale(0.95);
							opacity: 0;
						}
						to {
							transform: scale(1);
							opacity: 1;
						}
					}
					.animate-fade-in {
						animation: fadeIn 0.3s ease-out forwards;
					}
					.animate-scale-in {
						animation: scaleIn 0.3s ease-out forwards;
					}
				`}</style>
			</div>
		);
	};

	return (
		<div className={`p-4 md:p-8 ${accentColors.darkBgPrimary} min-h-full`}>
			{/* Page Header Section */}
			<div
				className={`${accentColors.lightBgSecondary} ${accentColors.lightTextSecondary} p-6 md:p-8 rounded-xl shadow-lg mb-8 animate-fade-in-down`}
			>
				<h2 className="text-3xl md:text-4xl font-extrabold mb-2">
					Manage Users
				</h2>
				<p className={`text-lg md:text-xl ${accentColors.lightTextSecondary}`}>
					Perform actions on user accounts and send direct messages.
				</p>
				{/* New Bulk Message Button */}
				<div className="mt-6 text-center">
					<Button
						onClick={() => handleActionClick(null, "sendBulkMessage")} // Pass null for user for bulk action
						variant="primary"
						className="flex items-center justify-center mx-auto px-6 py-3 text-lg"
					>
						<FaBullhorn className="mr-3" /> Send Bulk Message to All Users
					</Button>
				</div>
			</div>

			{/* Loading, Error, Success Messages for the page */}
			{loading && (
				<p className={`text-center text-lg ${accentColors.lightGrayText} mb-4`}>
					Loading users...
				</p>
			)}
			{error && (
				<p className={`text-center text-lg ${accentColors.red} mb-4`}>
					{error}
				</p>
			)}
			{success && (
				<p className={`text-center text-lg ${accentColors.green} mb-4`}>
					{success}
				</p>
			)}

			{/* Message when no users are available */}
			{users.length === 0 && !loading && !error && (
				<div
					className={`text-center p-8 ${accentColors.grayBg} ${accentColors.darkTextPrimary} rounded-lg shadow-md`}
				>
					<FaInfoCircle
						className={`text-5xl mb-4 ${accentColors.blue} mx-auto`}
					/>
					<p className="text-xl font-semibold">No users found.</p>
					<p className={`${accentColors.lightGrayText} mt-2`}>
						New users will appear here after registration.
					</p>
				</div>
			)}

			{/* User List Display */}
			<div className="grid grid-cols-1 gap-4">
				{users?.data?.users?.map((user) => (
					<ManageUserListItemAction
						key={user.id}
						user={user}
						onActionClick={handleActionClick} // Pass the new action handler
					/>
				))}
			</div>

			{/* User Action Modal */}
			<UserActionModal
				isOpen={isModalOpen}
				onClose={handleModalClose}
				user={selectedUser}
				actionType={actionType}
				onConfirm={handleModalSubmit}
				messageContent={messageContent}
				setMessageContent={setMessageContent}
				loading={modalLoading}
				error={modalError}
				success={modalSuccess}
			/>

			{/* Custom Animations for the page */}
			<style jsx="true">{`
				@keyframes fadeInDown {
					from {
						opacity: 0;
						transform: translateY(-20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
				.animate-fade-in-down {
					animation: fadeInDown 0.7s ease-out forwards;
				}
			`}</style>
		</div>
	);
};

export default ManageUsers;
