// src/components/layout/Navbar.jsx
import { Bell } from "lucide-react";
import React from "react";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { logoutAdmin } from "../../api/dummyApi";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
	const navigate = useNavigate();
	return (
		<>
			{/*fixed*/}
			<nav className="h-screen bg-secondary text-textSecondary p-4 shadow-md flex flex-col items-center justify-between ">
				<button
					onClick={toggleSidebar}
					className="text-black text-2xl focus:outline-none p-2 rounded-full hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
				>
					<FaBars />
				</button>
				{/* <h1 className="text-xl font-bold">Innovation University Academy</h1> */}

				{/* Logout button moved here to be always accessible */}
				<button
					onClick={() => {
						localStorage.removeItem("accessToken");
						localStorage.removeItem("refreshToken");
						localStorage.removeItem("adminId");
						localStorage.removeItem("userRole"); // Ensure this is cleared for admin logout
						logoutAdmin(navigate); // Redirect to admin login
					}}
					className="relative flex items-center justify-center text-accentRed hover:text-red-700 transition-colors duration-200 p-2 rounded-full hover:bg-gray-200 group"
				>
					<FaSignOutAlt className="mr-1 " />{" "}
					<span className="hidden lg:inline-block absolute bottom-full mt-2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
						Logout
					</span>
				</button>
			</nav>
		</>
	);
};

export default Navbar;
