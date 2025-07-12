// src/components/dashboard/AdminDeleteUserPage.jsx
import React, { useState, useEffect } from "react";
import { deleteUser, getAllUsers } from "../../api/dummyApi"; // Assuming your dummyApi is here
import Modal from "../ui/adminModal"; // Import the reusable Modal component
import { FaTrashAlt, FaInfoCircle } from "react-icons/fa";
import UserListItem from "./../../constant/userListItem";

const AdminDeleteUserPage = () => {
	// Define accent colors directly in the component
	const accentColors = {
		green: "text-[#22C55E]", // Success/Positive
		red: "text-[#EF4444]", // Error/Negative
		blue: "text-[#3B82F6]", // Info/Highlight
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
	const [success, setSuccess] = useState("");

	// State for modal visibility and the user currently selected for deletion
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [userToDelete, setUserToDelete] = useState(null); // { id: '...', name: '...' }

	// Function to fetch users
	const fetchUsers = async () => {
		setLoading(true);
		setError("");
		try {
			const response = await getAllUsers(); // Call your dummy API to get users
			if (response.success) {
				setUsers(response.users.data.users);
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

	// Effect hook to fetch users when the component mounts
	useEffect(() => {
		fetchUsers();
	}, []); // Empty dependency array ensures this runs only once on mount

	// Handler for when a user clicks the delete button on a specific user item
	const handleDeleteClick = (userId, userName) => {
		setUserToDelete({ id: userId, name: userName }); // Store the user details
		setIsModalOpen(true); // Open the confirmation modal
	};

	// Handler for confirming deletion within the modal
	const handleConfirmDelete = async () => {
		if (!userToDelete) return; // Ensure a user is selected for deletion

		setIsModalOpen(false); // Close the modal immediately
		setLoading(true); // Show loading state
		setSuccess(""); // Clear previous success message
		setError(""); // Clear previous error message

		try {
			const response = await deleteUser(userToDelete.id); // ✅
			// Call dummy API to delete user
			if (response.success) {
				setSuccess(`User '${userToDelete.name}' deleted successfully!`);
				setUserToDelete(null); // Clear the user to delete state
				fetchUsers(); // Re-fetch the list of users to update the UI
			} else {
				setError(
					response.message || `Failed to delete user '${userToDelete.name}'.`
				);
			}
		} catch (err) {
			setError(`An error occurred while deleting user '${userToDelete.name}'.`);
			console.error("Delete user error:", err);
		} finally {
			setLoading(false); // Hide loading state
		}
	};

	// Handler for canceling deletion in the modal
	const handleCancelDelete = () => {
		setIsModalOpen(false); // Close the modal
		setUserToDelete(null); // Clear the user to delete state
	};

	return (
		<div className={`p-4 md:p-8 ${accentColors.darkBgPrimary} min-h-full`}>
			{/* Page Header Section */}
			<div
				className={`${accentColors.lightBgSecondary} ${accentColors.lightTextSecondary} p-6 md:p-8 rounded-xl shadow-lg mb-8 animate-fade-in-down`}
			>
				<h2 className="text-3xl md:text-4xl font-extrabold mb-2">
					Delete Users
				</h2>
				<p className={`text-lg md:text-xl ${accentColors.lightTextSecondary}`}>
					Manage and remove user accounts from the university system.
				</p>
			</div>

			{/* Loading, Error, Success Messages */}
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
					<p className="text-xl font-semibold">No users available to delete.</p>
					<p className={`${accentColors.lightGrayText} mt-2`}>
						New users will appear here after registration.
					</p>
				</div>
			)}

			{/* User List Display (Table-like grid) */}
			<div className="grid grid-cols-1 gap-4">
				{/* Map through the users and render a UserListItem for each */}
				{users.map((user) => (
					<UserListItem
						key={user._id}
						user={{ ...user, id: user._id }} // normalize ID
						onDeleteClick={handleDeleteClick}
					/>
				))}
			</div>

			{/* Delete Confirmation Modal */}
			{isModalOpen && userToDelete && (
				<Modal
					isOpen={isModalOpen}
					onClose={handleCancelDelete}
					title="Confirm User Deletion"
					onConfirm={handleConfirmDelete}
					confirmText="Delete User"
					cancelText="Don't Delete"
					confirmVariant="danger" // Use the danger variant for the delete button
				>
					<p className={`${accentColors.lightTextSecondary} text-center`}>
						Are you sure you want to delete the user: <br />
						<span className={`font-bold text-lg ${accentColors.red}`}>
							"{userToDelete.name}"
						</span>
						?
						<br /> This action cannot be undone.
					</p>
				</Modal>
			)}

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

export default AdminDeleteUserPage;
