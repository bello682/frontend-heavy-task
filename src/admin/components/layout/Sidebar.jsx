// src/components/layout/Sidebar.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
	FaTachometerAlt,
	FaCog,
	FaPlusSquare,
	FaTrashAlt,
	FaUsers,
	FaSignOutAlt,
	FaBookOpen,
	FaChartLine,
} from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { Home } from "lucide-react";
import { logoutAdmin } from "../../api/dummyApi";

// Array of sidebar links
const sidebarLinks = [
	{ name: "Dashboard", path: "/admin/dashboard", icon: FaTachometerAlt },
	{ name: "Create Course", path: "/admin/create-course", icon: FaPlusSquare },
	{ name: "Manage Courses", path: "/admin/manage-courses", icon: FaBookOpen },
	{ name: "Delete Course", path: "/admin/delete-course", icon: FaTrashAlt }, // Specific for delete
	{ name: "Manage Users", path: "/admin/manage-users", icon: FaUsers },
	{ name: "Delete User", path: "/admin/delete-user", icon: FaTrashAlt }, // Specific for delete
	{ name: "Analytics", path: "/admin/analytics", icon: FaChartLine },
	{ name: "Settings", path: "/admin/settings", icon: FaCog },
	{ name: "Message", path: "/admin/chat-us", icon: MdMessage },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
	const location = useLocation();
	const navigate = useNavigate();

	const handleLinkClick = () => {
		// Hide sidebar when a link is clicked
		if (isOpen) {
			toggleSidebar();
		}
	};

	return (
		<div
			className={`fixed top-0 left-0 h-[100vh] w-64 bg-gray-900 text-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
			${isOpen ? "translate-x-0" : "-translate-x-full"}
         lg:shadow-none lg:bg-[#000000] lg:text-current`}
		>
			<div className="p-6 flex items-center justify-between border-b border-gray-700">
				<a href="/" className="flex items-center gap-3">
					<div className="gradient_bg_colors p-2 rounded-full shadow-lg flex justify-start items-center">
						<Home className="text-white h-6 w-6 animate-pulse" />
					</div>
				</a>

				<div className="cursor-pointer" onClick={() => toggleSidebar()}>
					<MdKeyboardDoubleArrowLeft size={40} color="white" />
				</div>
			</div>
			<nav className="mt-8">
				<ul>
					{sidebarLinks.map((link) => (
						<li key={link.name}>
							<Link
								to={link.path}
								onClick={handleLinkClick}
								className={`flex items-center py-3 px-6 text-lg text-white hover:bg-gray-700 transition-colors duration-200
                  ${
										location.pathname === link.path
											? "bg-gray-700 font-bold"
											: ""
									}`}
							>
								<link.icon className="mr-3 text-xl" />
								{link.name}
							</Link>
						</li>
					))}
					<li className="mt-auto pt-4 border-t text-white border-gray-700">
						{" "}
						{/* Logout button at the bottom */}
						<button
							onClick={() => {
								localStorage.removeItem("accessToken");
								localStorage.removeItem("refreshToken");
								localStorage.removeItem("adminId");
								localStorage.removeItem("userRole"); // Ensure this is cleared for admin logout
								// localStorage.removeItem("isVerified");
								toggleSidebar(); // Hide sidebar on logout
								logoutAdmin(navigate);
							}}
							className="flex items-center w-full text-left py-3 px-6 text-lg text-accentRed hover:bg-gray-700 transition-colors duration-200"
						>
							<FaSignOutAlt className="mr-3 text-xl" />
							Logout
						</button>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Sidebar;
