// src/components/dashboard/Settings.jsx
import React, { useState } from "react";
import InputField from "../ui/InputField"; // Assuming you have this component
import Button from "../ui/Button"; // Assuming you have this component
import {
	FaUserCircle,
	FaShieldAlt,
	FaBell,
	FaCog,
	FaUniversity,
	FaUpload,
	FaSave,
	FaLock,
	FaEnvelope,
	FaPhoneAlt,
	FaLink,
	FaCheckCircle,
	FaTimesCircle,
} from "react-icons/fa";

const Settings = () => {
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

	const [activeTab, setActiveTab] = useState("general"); // State for active tab

	// Dummy states for settings (in a real app, these would come from an API)
	const [generalSettings, setGeneralSettings] = useState({
		universityName: "Innovation University Academy",
		logoUrl: "https://placehold.co/100x100/000000/FFFFFF?text=Logo",
		contactEmail: "info@innovationuni.edu",
		contactPhone: "+1234567890",
	});

	const [profileSettings, setProfileSettings] = useState({
		adminName: "Admin User",
		adminEmail: "admin@innovationuni.edu",
		adminPhone: "+1234567891",
		currentPassword: "",
		newPassword: "",
		confirmNewPassword: "",
	});

	const [securitySettings, setSecuritySettings] = useState({
		twoFactorAuth: true,
		sessionTimeout: 60, // minutes
	});

	const [notificationSettings, setNotificationSettings] = useState({
		emailNotifications: true,
		smsNotifications: false,
		newEnrollmentAlert: true,
		courseUpdateAlert: false,
	});

	const [integrationSettings, setIntegrationSettings] = useState({
		crmIntegration: false,
		paymentGatewayConnected: true,
		analyticsTool: "Google Analytics",
	});

	const [message, setMessage] = useState({ text: "", type: "" }); // For success/error messages

	const handleGeneralChange = (e) => {
		const { name, value } = e.target;
		setGeneralSettings((prev) => ({ ...prev, [name]: value }));
	};

	const handleProfileChange = (e) => {
		const { name, value } = e.target;
		setProfileSettings((prev) => ({ ...prev, [name]: value }));
	};

	const handleSecurityToggle = (setting) => {
		setSecuritySettings((prev) => ({ ...prev, [setting]: !prev[setting] }));
	};

	const handleNotificationToggle = (setting) => {
		setNotificationSettings((prev) => ({ ...prev, [setting]: !prev[setting] }));
	};

	const handleSave = (settingsType) => {
		setMessage({ text: "", type: "" }); // Clear previous messages
		// Simulate API call
		setTimeout(() => {
			if (settingsType === "profile" && profileSettings.newPassword) {
				if (
					profileSettings.newPassword !== profileSettings.confirmNewPassword
				) {
					setMessage({ text: "New passwords do not match!", type: "error" });
					return;
				}
				if (profileSettings.newPassword.length < 6) {
					setMessage({
						text: "New password must be at least 6 characters long.",
						type: "error",
					});
					return;
				}
				// In a real app, send currentPassword, newPassword to backend for verification
				setMessage({
					text: "Profile and password updated successfully!",
					type: "success",
				});
				setProfileSettings((prev) => ({
					...prev,
					currentPassword: "",
					newPassword: "",
					confirmNewPassword: "",
				}));
			} else {
				setMessage({
					text: `${settingsType} settings saved successfully!`,
					type: "success",
				});
			}
			console.log(
				`Saving ${settingsType} settings:`,
				{
					general: generalSettings,
					profile: profileSettings,
					security: securitySettings,
					notifications: notificationSettings,
					integrations: integrationSettings,
				}[settingsType]
			);
		}, 500);
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
						isChecked ? "bg-[#3B82F6]" : "bg-gray-600"
					} rounded-full peer peer-focus:ring-2 peer-focus:ring-[#3B82F6] transition-all duration-300
                                 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                                 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}
				></div>
			</label>
		</div>
	);

	return (
		<div className={`p-4 md:p-8 ${accentColors.darkBgPrimary} min-h-full`}>
			{/* Welcome Section */}
			<div
				className={`${accentColors.lightBgSecondary} ${accentColors.lightTextSecondary} p-6 md:p-8 rounded-xl shadow-lg mb-8 animate-fade-in-down`}
			>
				<h2 className="text-3xl md:text-4xl font-extrabold mb-2">
					Admin Settings
				</h2>
				<p className={`text-lg md:text-xl ${accentColors.lightTextSecondary}`}>
					Manage your university's configurations and personal preferences.
				</p>
			</div>

			{message.text && (
				<div
					className={`p-4 mb-6 rounded-lg text-center font-semibold animate-fade-in-down
                                ${
																	message.type === "success"
																		? `${accentColors.green} bg-opacity-10`
																		: `${accentColors.red} bg-opacity-10`
																}`}
					style={{
						backgroundColor:
							message.type === "success"
								? "rgba(34, 197, 94, 0.1)"
								: "rgba(239, 68, 68, 0.1)",
					}}
				>
					{message.text}
				</div>
			)}

			<div className="flex flex-col lg:flex-row gap-6">
				{/* Sidebar for Settings Navigation */}
				<div
					className={`${accentColors.grayBg} ${accentColors.darkTextPrimary} p-6 rounded-xl shadow-lg lg:w-1/4 animate-fade-in-left`}
				>
					<h3 className="text-xl font-bold mb-4">Categories</h3>
					<ul className="space-y-2">
						<li>
							<button
								onClick={() => setActiveTab("general")}
								className={`w-full text-left py-2 px-4 rounded-lg flex items-center transition-colors duration-200
                                    ${
																			activeTab === "general"
																				? `${accentColors.blue} bg-gray-700`
																				: "hover:bg-gray-700"
																		}`}
							>
								<FaUniversity className="mr-3 text-lg" /> General
							</button>
						</li>
						<li>
							<button
								onClick={() => setActiveTab("profile")}
								className={`w-full text-left py-2 px-4 rounded-lg flex items-center transition-colors duration-200
                                    ${
																			activeTab === "profile"
																				? `${accentColors.blue} bg-gray-700`
																				: "hover:bg-gray-700"
																		}`}
							>
								<FaUserCircle className="mr-3 text-lg" /> Profile
							</button>
						</li>
						<li>
							<button
								onClick={() => setActiveTab("security")}
								className={`w-full text-left py-2 px-4 rounded-lg flex items-center transition-colors duration-200
                                    ${
																			activeTab === "security"
																				? `${accentColors.blue} bg-gray-700`
																				: "hover:bg-gray-700"
																		}`}
							>
								<FaShieldAlt className="mr-3 text-lg" /> Security
							</button>
						</li>
						<li>
							<button
								onClick={() => setActiveTab("notifications")}
								className={`w-full text-left py-2 px-4 rounded-lg flex items-center transition-colors duration-200
                                    ${
																			activeTab === "notifications"
																				? `${accentColors.blue} bg-gray-700`
																				: "hover:bg-gray-700"
																		}`}
							>
								<FaBell className="mr-3 text-lg" /> Notifications
							</button>
						</li>
						<li>
							<button
								onClick={() => setActiveTab("integrations")}
								className={`w-full text-left py-2 px-4 rounded-lg flex items-center transition-colors duration-200
                                    ${
																			activeTab === "integrations"
																				? `${accentColors.blue} bg-gray-700`
																				: "hover:bg-gray-700"
																		}`}
							>
								<FaLink className="mr-3 text-lg" /> Integrations
							</button>
						</li>
					</ul>
				</div>

				{/* Settings Content Area */}
				<div
					className={`${accentColors.grayBg} ${accentColors.darkTextPrimary} p-6 rounded-xl shadow-lg flex-1 animate-fade-in-right`}
				>
					{activeTab === "general" && (
						<div>
							<h3 className="text-2xl font-bold mb-4 flex items-center">
								<FaUniversity className="mr-3" /> General Settings
							</h3>
							<InputField
								label="University Name"
								id="universityName"
								name="universityName"
								value={generalSettings.universityName}
								onChange={handleGeneralChange}
								placeholder="Innovation University Academy"
							/>
							<InputField
								label="Logo URL"
								id="logoUrl"
								name="logoUrl"
								value={generalSettings.logoUrl}
								onChange={handleGeneralChange}
								placeholder="https://youruniversity.com/logo.png"
								type="url"
							/>
							{generalSettings.logoUrl && (
								<div className="mb-4">
									<label className="block text-textPrimary text-sm font-bold mb-2">
										Current Logo Preview
									</label>
									<img
										src={generalSettings.logoUrl}
										alt="University Logo"
										className="w-24 h-24 object-contain rounded-lg border border-gray-700 p-2"
										onError={(e) =>
											(e.target.src =
												"https://placehold.co/100x100/000000/FFFFFF?text=Logo+Err")
										}
									/>
								</div>
							)}
							<InputField
								label="Contact Email"
								id="contactEmail"
								name="contactEmail"
								value={generalSettings.contactEmail}
								onChange={handleGeneralChange}
								placeholder="info@innovationuni.edu"
								type="email"
							/>
							<InputField
								label="Contact Phone"
								id="contactPhone"
								name="contactPhone"
								value={generalSettings.contactPhone}
								onChange={handleGeneralChange}
								placeholder="+1234567890"
								type="tel"
							/>
							<Button
								onClick={() => handleSave("general")}
								className="mt-4 flex items-center"
								variant="primary"
							>
								<FaSave className="mr-2" /> Save General Settings
							</Button>
						</div>
					)}

					{activeTab === "profile" && (
						<div>
							<h3 className="text-2xl font-bold mb-4 flex items-center">
								<FaUserCircle className="mr-3" /> Profile Settings
							</h3>
							<InputField
								label="Admin Name"
								id="adminName"
								name="adminName"
								value={profileSettings.adminName}
								onChange={handleProfileChange}
								placeholder="Your Name"
							/>
							<InputField
								label="Admin Email"
								id="adminEmail"
								name="adminEmail"
								value={profileSettings.adminEmail}
								onChange={handleProfileChange}
								placeholder="your.email@example.com"
								type="email"
							/>
							<InputField
								label="Admin Phone"
								id="adminPhone"
								name="adminPhone"
								value={profileSettings.adminPhone}
								onChange={handleProfileChange}
								placeholder="+1234567890"
								type="tel"
							/>
							<h4 className="text-xl font-semibold mt-6 mb-3">
								Change Password
							</h4>
							<InputField
								label="Current Password"
								id="currentPassword"
								name="currentPassword"
								value={profileSettings.currentPassword}
								onChange={handleProfileChange}
								placeholder="********"
								type="password"
							/>
							<InputField
								label="New Password"
								id="newPassword"
								name="newPassword"
								value={profileSettings.newPassword}
								onChange={handleProfileChange}
								placeholder="********"
								type="password"
							/>
							<InputField
								label="Confirm New Password"
								id="confirmNewPassword"
								name="confirmNewPassword"
								value={profileSettings.confirmNewPassword}
								onChange={handleProfileChange}
								placeholder="********"
								type="password"
							/>
							<Button
								onClick={() => handleSave("profile")}
								className="mt-4 flex items-center"
								variant="primary"
							>
								<FaSave className="mr-2" /> Save Profile
							</Button>
						</div>
					)}

					{activeTab === "security" && (
						<div>
							<h3 className="text-2xl font-bold mb-4 flex items-center">
								<FaShieldAlt className="mr-3" /> Security Settings
							</h3>
							<ToggleSwitch
								label="Two-Factor Authentication (2FA)"
								isChecked={securitySettings.twoFactorAuth}
								onToggle={() => handleSecurityToggle("twoFactorAuth")}
							/>
							<div className="mb-4">
								<label
									htmlFor="sessionTimeout"
									className="block text-textPrimary text-sm font-bold mb-2"
								>
									Session Timeout (minutes)
								</label>
								<input
									type="number"
									id="sessionTimeout"
									name="sessionTimeout"
									value={securitySettings.sessionTimeout}
									onChange={(e) =>
										setSecuritySettings((prev) => ({
											...prev,
											sessionTimeout: parseInt(e.target.value) || 0,
										}))
									}
									className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline
                                            bg-secondary text-textSecondary border-gray-300 focus:ring-2 focus:ring-gray-500"
								/>
							</div>
							<Button
								onClick={() => handleSave("security")}
								className="mt-4 flex items-center"
								variant="primary"
							>
								<FaSave className="mr-2" /> Save Security Settings
							</Button>
						</div>
					)}

					{activeTab === "notifications" && (
						<div>
							<h3 className="text-2xl font-bold mb-4 flex items-center">
								<FaBell className="mr-3" /> Notification Settings
							</h3>
							<ToggleSwitch
								label="Email Notifications"
								isChecked={notificationSettings.emailNotifications}
								onToggle={() => handleNotificationToggle("emailNotifications")}
							/>
							<ToggleSwitch
								label="SMS Notifications"
								isChecked={notificationSettings.smsNotifications}
								onToggle={() => handleNotificationToggle("smsNotifications")}
							/>
							<ToggleSwitch
								label="New Enrollment Alerts"
								isChecked={notificationSettings.newEnrollmentAlert}
								onToggle={() => handleNotificationToggle("newEnrollmentAlert")}
							/>
							<ToggleSwitch
								label="Course Update Alerts"
								isChecked={notificationSettings.courseUpdateAlert}
								onToggle={() => handleNotificationToggle("courseUpdateAlert")}
							/>
							<Button
								onClick={() => handleSave("notifications")}
								className="mt-4 flex items-center"
								variant="primary"
							>
								<FaSave className="mr-2" /> Save Notification Settings
							</Button>
						</div>
					)}

					{activeTab === "integrations" && (
						<div>
							<h3 className="text-2xl font-bold mb-4 flex items-center">
								<FaLink className="mr-3" /> Integrations
							</h3>
							<ToggleSwitch
								label="CRM Integration"
								isChecked={integrationSettings.crmIntegration}
								onToggle={() =>
									setIntegrationSettings((prev) => ({
										...prev,
										crmIntegration: !prev.crmIntegration,
									}))
								}
							/>
							<ToggleSwitch
								label="Payment Gateway Connected"
								isChecked={integrationSettings.paymentGatewayConnected}
								onToggle={() =>
									setIntegrationSettings((prev) => ({
										...prev,
										paymentGatewayConnected: !prev.paymentGatewayConnected,
									}))
								}
							/>
							<InputField
								label="Analytics Tool"
								id="analyticsTool"
								name="analyticsTool"
								value={integrationSettings.analyticsTool}
								onChange={(e) =>
									setIntegrationSettings((prev) => ({
										...prev,
										analyticsTool: e.target.value,
									}))
								}
								placeholder="e.g., Google Analytics, Mixpanel"
							/>
							<Button
								onClick={() => handleSave("integrations")}
								className="mt-4 flex items-center"
								variant="primary"
							>
								<FaSave className="mr-2" /> Save Integrations
							</Button>
						</div>
					)}
				</div>
			</div>

			{/* Custom Animations for Settings Page */}
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

export default Settings;
