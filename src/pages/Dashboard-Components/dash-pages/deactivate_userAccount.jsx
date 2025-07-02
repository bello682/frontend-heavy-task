import React, { useEffect, useState } from "react";
import Loader from "./../../../components/LOADER/loaderAnimation";
import { useDeleteUser } from "./../../../components/api/deactivateUserApi";
import Modal from "../../../components/MODAL_POPUP/modal1";
import AccountDeletionTerms from "./../../../components/ui/deletingUser_terms_condition";
import { useNavigate } from "react-router-dom";
import { useUserData } from "./../../../components/api/userDatasApi";
import { getGreeting } from "./../../../components/timeGreetings";

const Deactivate_User_Account = () => {
	const { deleteUser, loading, error, deleted } = useDeleteUser();
	const { user } = useUserData();

	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (deleted) {
			const timer = setTimeout(() => {
				navigate("/signup");
			}, 3000);
			return () => clearTimeout(timer); // Clean up
		}
	}, [deleted, navigate]);

	const handleDelete = () => {
		deleteUser();
		setIsOpen(false);
	};

	const firstName = user?.name?.split(" ")[0];
	const capitalized = firstName?.charAt(0).toUpperCase() + firstName?.slice(1);

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">
				{`${getGreeting()}, ${
					capitalized || "User"
				}! To deactivate your account please use the button below.`}
			</h1>

			{error && <p className="text-red-500 mb-3">{error}</p>}
			{deleted && (
				<p className="text-green-500 mb-3">
					Account deleted successfully. Goodbye!
				</p>
			)}

			{loading ? (
				<Loader loadingText="Deleting account......" className="" />
			) : (
				<>
					<button
						onClick={() => setIsOpen(true)}
						className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
					>
						Delete Account
					</button>

					<Modal
						isOpen={isOpen}
						onConfirm={handleDelete}
						onClose={() => setIsOpen(false)}
						title="Are you sure you want to delete your account?"
						confirmText="Yes, Delete My Account"
						cancelText="Cancel"
						showCloseButton
					>
						<AccountDeletionTerms />
					</Modal>
				</>
			)}
		</div>
	);
};

export default Deactivate_User_Account;
