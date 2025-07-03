// src/App.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import MainCourseLayout from "./course_main_layout";
import CourseHomePage from "./courseHomePage";
import CourseDetailPage from "./courseDetailPage";

function CoursesAllExport() {
	return (
		<>
			<MainCourseLayout>
				<Routes>
					<Route index element={<CourseHomePage />} />
					{/* <Route path="/course/:id" element={<CourseDetailPage />} /> */}
					{/* Add other routes here as needed */}
				</Routes>
			</MainCourseLayout>
		</>
	);
}

export default CoursesAllExport;
