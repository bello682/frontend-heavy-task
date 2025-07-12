// src/components/user-dashboard/UserSettings.jsx
import React, { useEffect, useState } from "react";
import InputFieldEditable from "./../../../admin/components/ui/InputFieldEditable";
import InputField from "./../../../admin/components/ui/InputField";
import Button from "./../../../admin/components/ui/Button";
import {
	FaUserCircle,
	FaLock,
	FaBell,
	FaShieldAlt,
	FaCog,
	FaSave,
	FaEnvelope,
	FaPhoneAlt,
	FaCheckCircle,
	FaTimesCircle,
	FaEye, // For privacy settings
	FaTrashAlt, // For delete account
	FaSpinner, // For loading states
} from "react-icons/fa";
import { useUserData } from "../../../components/api/userDatasApi";

const UserSettings = () => {
	const { user, Loading, error } = useUserData();
	// Define accent colors directly in the component
	const accentColors = {
		green: "text-[#22C55E]", // Success/Positive
		red: "text-[#EF4444]", // Error/Negative
		blue: "text-[#3B82F6]", // Info/Highlight
		orange: "text-[#F97316]", // Warning/Attention
		grayBg: "bg-gray-100", // Lighter gray for card backgrounds on primary white
		darkGrayText: "text-gray-700", // Darker gray for secondary text on light backgrounds
		darkBgPrimary: "bg-white", // Primary background (main page background)
		lightBgSecondary: "bg-black", // Secondary background (for contrast elements)
		darkTextPrimary: "text-black", // Primary text on light backgrounds
		lightTextSecondary: "text-white", // Secondary text on dark backgrounds
	};

	const [activeTab, setActiveTab] = useState("profile"); // State for active tab

	// Dummy states for user settings
	const [profileSettings, setProfileSettings] = useState({
		name: "USER",
		email: "alex.johnson@example.com",
		phoneNumber: "+1 (555) 123-4567",
	});

	useEffect(() => {
		if (user) {
			setProfileSettings((prev) => ({
				...prev,
				name: user?.name || "USER",
				email: user.email || "example@mail.com",
				phoneNumber: user.phoneNumber || "+1 (555) 123-4567",
			}));
		}
	}, [user]);

	if (error) {
		<>
			<div className="flex flex-wrap justify-center items-center m-auto">
				<p>Oops! Sorrry, {error}</p>
			</div>
		</>;
	}

	const [passwordSettings, setPasswordSettings] = useState({
		currentPassword: "",
		newPassword: "",
		confirmNewPassword: "",
	});

	const [notificationSettings, setNotificationSettings] = useState({
		emailUpdates: true,
		smsAlerts: false,
		courseCompletion: true,
		newAssignment: true,
		announcements: true,
	});

	const [privacySettings, setPrivacySettings] = useState({
		profileVisibility: "public", // 'public', 'private', 'friends'
		dataSharing: false,
		activityStatus: true, // Show online/offline status
	});

	const [accountSettings, setAccountSettings] = useState({
		deleteConfirmation: "", // For delete account input
	});

	const [message, setMessage] = useState({ text: "", type: "" }); // For success/error messages
	const [isLoading, setIsLoading] = useState(false); // For form submission isLoading

	// Nested MessageDisplay Component
	const MessageDisplay = ({ text, type }) => {
		if (!text) return null;
		const bgColor =
			type === "success" ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)";
		const textColor =
			type === "success" ? accentColors.green : accentColors.red;
		return (
			<div
				className={`p-3 mb-4 rounded-lg text-center font-semibold animate-fade-in-down`}
				style={{
					backgroundColor: bgColor,
					color: textColor.replace("text-", ""),
				}} // Set color directly
			>
				{text}
			</div>
		);
	};

	const handleProfileChange = (fieldName, newValue) => {
		setProfileSettings((prev) => ({ ...prev, [fieldName]: newValue }));
	};

	const handlePasswordChange = (e) => {
		const { name, value } = e.target;
		setPasswordSettings((prev) => ({ ...prev, [name]: value }));
	};

	const handleNotificationToggle = (setting) => {
		setNotificationSettings((prev) => ({ ...prev, [setting]: !prev[setting] }));
	};

	const handlePrivacyChange = (e) => {
		const { name, value, type, checked } = e.target;
		setPrivacySettings((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleAccountChange = (e) => {
		const { name, value } = e.target;
		setAccountSettings((prev) => ({ ...prev, [name]: value }));
	};

	const handleSave = async (settingsType) => {
		setMessage({ text: "", type: "" }); // Clear previous messages
		setIsLoading(true);

		try {
			let response;
			switch (settingsType) {
				case "profile":
					// Simulate API call to update profile
					response = await new Promise((resolve) =>
						setTimeout(() => {
							// In a real app, send profileSettings to backend
							console.log("Saving profile:", profileSettings);
							resolve({
								success: true,
								message: "Profile updated successfully!",
							});
						}, 800)
					);
					break;
				case "password":
					if (
						passwordSettings.newPassword !== passwordSettings.confirmNewPassword
					) {
						throw new Error("New passwords do not match!");
					}
					if (passwordSettings.newPassword.length < 6) {
						throw new Error("New password must be at least 6 characters long.");
					}
					// Simulate API call to change password
					response = await new Promise((resolve) =>
						setTimeout(() => {
							// In a real app, send currentPassword, newPassword to backend
							console.log("Changing password:", passwordSettings);
							resolve({
								success: true,
								message: "Password changed successfully!",
							});
						}, 800)
					);
					setPasswordSettings({
						currentPassword: "",
						newPassword: "",
						confirmNewPassword: "",
					}); // Clear fields
					break;
				case "notifications":
					// Simulate API call to update notifications
					response = await new Promise((resolve) =>
						setTimeout(() => {
							console.log("Saving notifications:", notificationSettings);
							resolve({
								success: true,
								message: "Notification settings updated!",
							});
						}, 800)
					);
					break;
				case "privacy":
					// Simulate API call to update privacy
					response = await new Promise((resolve) =>
						setTimeout(() => {
							console.log("Saving privacy:", privacySettings);
							resolve({ success: true, message: "Privacy settings updated!" });
						}, 800)
					);
					break;
				case "deleteAccount":
					if (accountSettings.deleteConfirmation !== "DELETE") {
						throw new Error("Please type 'DELETE' to confirm.");
					}
					// Simulate API call to delete account
					response = await new Promise((resolve) =>
						setTimeout(() => {
							console.log("Deleting account...");
							// In a real app, this would log out the user and delete their data
							resolve({
								success: true,
								message: "Account deleted successfully. Redirecting...",
							});
						}, 1500)
					);
					// Redirect or log out user after successful deletion
					break;
				default:
					throw new Error("Unknown settings type.");
			}

			if (response.success) {
				setMessage({ text: response.message, type: "success" });
			} else {
				setMessage({ text: response.message, type: "error" });
			}
		} catch (err) {
			setMessage({ text: err.message, type: "error" });
		} finally {
			setIsLoading(false);
		}
	};

	const ToggleSwitch = ({ label, isChecked, onToggle }) => (
		<div className="flex items-center justify-between py-2">
			<span className={`${accentColors.darkTextPrimary}`}>{label}</span>
			<label className="relative inline-flex items-center cursor-pointer">
				<input
					type="checkbox"
					value=""
					className="sr-only peer"
					checked={isChecked}
					onChange={onToggle}
				/>
				<div
					className={`w-11 h-6 ${
						isChecked ? "bg-[#3B82F6]" : "bg-gray-400"
					} rounded-full peer peer-focus:ring-2 peer-focus:ring-[#3B82F6] transition-all duration-300
                                 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                                 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}
				></div>
			</label>
		</div>
	);

	return (
		<div className={`p-4 md:p-8 ${accentColors.darkBgPrimary} min-h-full`}>
			{/* Page Header */}
			<div
				className={`${accentColors.lightBgSecondary} ${accentColors.lightTextSecondary} p-6 md:p-8 rounded-xl shadow-lg mb-8 animate-fade-in-down`}
			>
				<h2 className="text-3xl md:text-4xl font-extrabold mb-2">
					{profileSettings.name} Settings
				</h2>
				<p className={`text-lg md:text-xl ${accentColors.lightTextSecondary}`}>
					Manage your personal information, preferences, and account.
				</p>
			</div>

			<MessageDisplay text={message.text} type={message.type} />

			<div className="flex flex-col lg:flex-row gap-6">
				{/* Sidebar for Settings Navigation */}
				<div
					className={`${accentColors.grayBg} ${accentColors.darkTextPrimary} p-6 rounded-xl shadow-lg lg:w-1/4 animate-fade-in-left`}
				>
					<h3 className="text-xl font-bold mb-4">Categories</h3>
					<ul className="space-y-2">
						<li>
							<button
								onClick={() => setActiveTab("profile")}
								className={`w-full text-left py-2 px-4 rounded-lg flex items-center transition-colors duration-200
                                    ${
																			activeTab === "profile"
																				? `${accentColors.blue} bg-gray-200`
																				: "hover:bg-gray-200"
																		}`}
							>
								<FaUserCircle className="mr-3 text-lg" /> Profile
							</button>
						</li>
						<li>
							<button
								onClick={() => setActiveTab("password")}
								className={`w-full text-left py-2 px-4 rounded-lg flex items-center transition-colors duration-200
                                    ${
																			activeTab === "password"
																				? `${accentColors.blue} bg-gray-200`
																				: "hover:bg-gray-200"
																		}`}
							>
								<FaLock className="mr-3 text-lg" /> Password
							</button>
						</li>
						<li>
							<button
								onClick={() => setActiveTab("notifications")}
								className={`w-full text-left py-2 px-4 rounded-lg flex items-center transition-colors duration-200
                                    ${
																			activeTab === "notifications"
																				? `${accentColors.blue} bg-gray-200`
																				: "hover:bg-gray-200"
																		}`}
							>
								<FaBell className="mr-3 text-lg" /> Notifications
							</button>
						</li>
						<li>
							<button
								onClick={() => setActiveTab("privacy")}
								className={`w-full text-left py-2 px-4 rounded-lg flex items-center transition-colors duration-200
                                    ${
																			activeTab === "privacy"
																				? `${accentColors.blue} bg-gray-200`
																				: "hover:bg-gray-200"
																		}`}
							>
								<FaEye className="mr-3 text-lg" /> Privacy
							</button>
						</li>
						<li>
							<button
								onClick={() => setActiveTab("account")}
								className={`w-full text-left py-2 px-4 rounded-lg flex items-center transition-colors duration-200
                                    ${
																			activeTab === "account"
																				? `${accentColors.red} bg-gray-200`
																				: "hover:bg-gray-200"
																		}`}
							>
								<FaCog className="mr-3 text-lg" /> Account
							</button>
						</li>
					</ul>
				</div>

				{/* Settings Content Area */}
				<div
					className={`${accentColors.grayBg} ${accentColors.darkTextPrimary} p-6 rounded-xl shadow-lg flex-1 animate-fade-in-right`}
				>
					{activeTab === "profile" && (
						<div>
							<h3 className="text-2xl font-bold mb-4 flex items-center">
								<FaUserCircle className="mr-3" /> Profile Information
							</h3>
							<InputFieldEditable
								label="Full Name"
								value={profileSettings.name}
								onSave={(newValue) => handleProfileChange("name", newValue)}
								className="mb-4"
							/>
							<InputFieldEditable
								label="Email Address"
								value={profileSettings.email}
								onSave={(newValue) => handleProfileChange("email", newValue)}
								type="email"
								className="mb-4"
							/>
							<InputFieldEditable
								label="Phone Number"
								value={profileSettings.phoneNumber}
								onSave={(newValue) =>
									handleProfileChange("phoneNumber", newValue)
								}
								type="tel"
								className="mb-4"
							/>
							<Button
								onClick={() => handleSave("profile")}
								className="mt-4 flex items-center"
								variant="primary"
								disabled={isLoading}
							>
								{isLoading ? (
									<FaSpinner className="animate-spin mr-2" />
								) : (
									<FaSave className="mr-2" />
								)}{" "}
								Save Profile
							</Button>
						</div>
					)}

					{activeTab === "password" && (
						<div>
							<h3 className="text-2xl font-bold mb-4 flex items-center">
								<FaLock className="mr-3" /> Change Password
							</h3>
							<InputField
								label="Current Password"
								id="currentPassword"
								name="currentPassword"
								value={passwordSettings.currentPassword}
								onChange={handlePasswordChange}
								placeholder="********"
								type="password"
								className="mb-4"
							/>
							<InputField
								label="New Password"
								id="newPassword"
								name="newPassword"
								value={passwordSettings.newPassword}
								onChange={handlePasswordChange}
								placeholder="********"
								type="password"
								className="mb-4"
							/>
							<InputField
								label="Confirm New Password"
								id="confirmNewPassword"
								name="confirmNewPassword"
								value={passwordSettings.confirmNewPassword}
								onChange={handlePasswordChange}
								placeholder="********"
								type="password"
								className="mb-4"
							/>
							<Button
								onClick={() => handleSave("password")}
								className="mt-4 flex items-center"
								variant="primary"
								disabled={isLoading}
							>
								{isLoading ? (
									<FaSpinner className="animate-spin mr-2" />
								) : (
									<FaSave className="mr-2" />
								)}{" "}
								Change Password
							</Button>
						</div>
					)}

					{activeTab === "notifications" && (
						<div>
							<h3 className="text-2xl font-bold mb-4 flex items-center">
								<FaBell className="mr-3" /> Notification Preferences
							</h3>
							<ToggleSwitch
								label="Email Updates"
								isChecked={notificationSettings.emailUpdates}
								onToggle={() => handleNotificationToggle("emailUpdates")}
							/>
							<ToggleSwitch
								label="SMS Alerts"
								isChecked={notificationSettings.smsAlerts}
								onToggle={() => handleNotificationToggle("smsAlerts")}
							/>
							<ToggleSwitch
								label="Course Completion Notifications"
								isChecked={notificationSettings.courseCompletion}
								onToggle={() => handleNotificationToggle("courseCompletion")}
							/>
							<ToggleSwitch
								label="New Assignment Alerts"
								isChecked={notificationSettings.newAssignment}
								onToggle={() => handleNotificationToggle("newAssignment")}
							/>
							<ToggleSwitch
								label="University Announcements"
								isChecked={notificationSettings.announcements}
								onToggle={() => handleNotificationToggle("announcements")}
							/>
							<Button
								onClick={() => handleSave("notifications")}
								className="mt-4 flex items-center"
								variant="primary"
								disabled={isLoading}
							>
								{isLoading ? (
									<FaSpinner className="animate-spin mr-2" />
								) : (
									<FaSave className="mr-2" />
								)}{" "}
								Save Preferences
							</Button>
						</div>
					)}

					{activeTab === "privacy" && (
						<div>
							<h3 className="text-2xl font-bold mb-4 flex items-center">
								<FaEye className="mr-3" /> Privacy Settings
							</h3>
							<div className="mb-4">
								<label
									htmlFor="profileVisibility"
									className={`block text-sm font-bold mb-2 ${accentColors.darkTextPrimary}`}
								>
									Profile Visibility
								</label>
								<select
									id="profileVisibility"
									name="profileVisibility"
									value={privacySettings.profileVisibility}
									onChange={handlePrivacyChange}
									className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline
                                            bg-gray-200 text-black border-gray-300 focus:ring-2 focus:ring-gray-500"
								>
									<option value="public">Public (Visible to all)</option>
									<option value="private">Private (Visible only to me)</option>
									<option value="friends">
										Friends (Visible to connections)
									</option>
								</select>
							</div>
							<ToggleSwitch
								label="Share Anonymous Usage Data"
								isChecked={privacySettings.dataSharing}
								onToggle={() =>
									handlePrivacyChange({
										target: {
											name: "dataSharing",
											type: "checkbox",
											checked: !privacySettings.dataSharing,
										},
									})
								}
							/>
							<ToggleSwitch
								label="Show Online Activity Status"
								isChecked={privacySettings.activityStatus}
								onToggle={() =>
									handlePrivacyChange({
										target: {
											name: "activityStatus",
											type: "checkbox",
											checked: !privacySettings.activityStatus,
										},
									})
								}
							/>
							<Button
								onClick={() => handleSave("privacy")}
								className="mt-4 flex items-center"
								variant="primary"
								disabled={isLoading}
							>
								{isLoading ? (
									<FaSpinner className="animate-spin mr-2" />
								) : (
									<FaSave className="mr-2" />
								)}{" "}
								Save Privacy
							</Button>
						</div>
					)}

					{activeTab === "account" && (
						<div>
							<h3 className="text-2xl font-bold mb-4 flex items-center">
								<FaCog className="mr-3" /> Account Management
							</h3>
							<div
								className={`p-4 rounded-lg border ${accentColors.red} bg-opacity-10 mb-6`}
								style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
							>
								<h4 className={`text-xl font-bold mb-2 ${accentColors.red}`}>
									Delete Account
								</h4>
								<p className={`text-sm ${accentColors.darkGrayText} mb-3`}>
									Permanently delete your Innovation University account and all
									associated data. This action is irreversible.
								</p>
								<InputField
									label={`Type "DELETE" to confirm`}
									id="deleteConfirmation"
									name="deleteConfirmation"
									value={accountSettings.deleteConfirmation}
									onChange={handleAccountChange}
									placeholder="Type DELETE"
									className="mb-4"
								/>
								<Button
									onClick={() => handleSave("deleteAccount")}
									variant="danger"
									className="flex items-center"
									disabled={
										isLoading || accountSettings.deleteConfirmation !== "DELETE"
									}
								>
									{isLoading ? (
										<FaSpinner className="animate-spin mr-2" />
									) : (
										<FaTrashAlt className="mr-2" />
									)}{" "}
									Delete My Account
								</Button>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Custom Animations */}
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
				@keyframes fadeInLeft {
					from {
						opacity: 0;
						transform: translateX(-20px);
					}
					to {
						opacity: 1;
						transform: translateX(0);
					}
				}
				@keyframes fadeInRight {
					from {
						opacity: 0;
						transform: translateX(20px);
					}
					to {
						opacity: 1;
						transform: translateX(0);
					}
				}

				.animate-fade-in-down {
					animation: fadeInDown 0.7s ease-out forwards;
				}
				.animate-fade-in-left {
					animation: fadeInLeft 0.7s ease-out forwards;
				}
				.animate-fade-in-right {
					animation: fadeInRight 0.7s ease-out forwards;
				}
			`}</style>
		</div>
	);
};

export default UserSettings;
