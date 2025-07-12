const UpdateModal = ({ isOpen, onClose, onConfirm, children }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 px-4">
			<div className="bg-white text-black w-full max-w-xl max-h-[90vh] p-6 rounded-xl relative shadow-lg animate-fade-in scale-95 animate-scale-in overflow-y-auto">
				{/* Close Button */}
				<button
					onClick={onClose}
					className="sticky top-0 right-0 ml-auto text-2xl text-gray-600 hover:text-red-500 z-10 bg-white"
					aria-label="Close"
				>
					&times;
				</button>

				{/* Modal Heading */}
				<h2 className="text-2xl font-bold mb-4 mt-2">Edit Course</h2>

				{/* Form Children */}
				<div>{children}</div>

				{/* Footer Buttons */}
				<div className="flex justify-end mt-6 space-x-4">
					<Button variant="secondary" onClick={onClose}>
						Cancel
					</Button>
					<Button variant="success" onClick={onConfirm}>
						Update
					</Button>
				</div>
			</div>

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

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { getAuthToken } from "./../../../utils/authStorage";
import Button from "./../ui/Button";
import InputFieldEditable from "./../ui/InputFieldEditable";

const BASE_URL =
	import.meta.env.VITE_BASE_URL || "http://localhost:7075/api_url/users/task";

const UpdateCourse = () => {
	const [courses, setCourses] = useState([]);
	const [selectedCourse, setSelectedCourse] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [formData, setFormData] = useState({
		title: "",
		price: "",
		summary: "",
		description: "",
		duration: "",
		level: "",
		instructor: "",
		modules: [""],
		prerequisites: "",
		benefits: [""],
		isMostPurchased: false,
		isHotCourse: false,
		image: null,
	});

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const res = await axios.get(`${BASE_URL}/admin/courses`, {
					headers: { Authorization: `Bearer ${getAuthToken()}` },
				});
				setCourses(res.data.courses || []);
			} catch (error) {
				console.error("Failed to fetch courses", error);
			}
		};
		fetchCourses();
	}, []);

	const openModal = (course) => {
		setSelectedCourse(course);
		setFormData({
			title: course?.subDepartment?.title || "",
			price: course?.subDepartment?.price || "",
			summary: course?.subDepartment?.summary || "",
			description: course?.subDepartment?.description || "",
			duration: course?.subDepartment?.duration || "",
			level: course?.subDepartment?.level || "",
			instructor: course?.subDepartment?.instructor || "",
			modules: course?.subDepartment?.modules || [""],
			prerequisites: course?.subDepartment?.prerequisites || "",
			benefits: course?.subDepartment?.benefits || [""],
			isMostPurchased: course?.subDepartment?.isMostPurchased || false,
			isHotCourse: course?.subDepartment?.isHotCourse || false,
			image: null,
		});
		setIsModalOpen(true);
	};

	const handleFormChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleUpdate = async () => {
		try {
			const form = new FormData();
			Object.entries(formData).forEach(([key, val]) => {
				if (Array.isArray(val)) {
					val.forEach((item) => form.append(key, item));
				} else {
					form.append(key, val);
				}
			});
			const res = await axios.put(
				`${BASE_URL}/admin/courses/${selectedCourse._id}`,
				form,
				{
					headers: {
						Authorization: `Bearer ${getAuthToken()}`,
						"Content-Type": "multipart/form-data",
					},
				}
			);
			alert(res.data.message);
			setIsModalOpen(false);
		} catch (err) {
			console.error("Update failed", err);
			alert("Failed to update course");
		}
	};

	const handleArrayChange = (e, index, fieldName) => {
		const newArray = [...formData[fieldName]];
		newArray[index] = e.target.value;
		setFormData((prev) => ({ ...prev, [fieldName]: newArray }));
	};

	const addField = (fieldName) => {
		setFormData((prev) => ({
			...prev,
			[fieldName]: [...prev[fieldName], ""],
		}));
	};

	const removeField = (index, fieldName) => {
		const newArray = formData[fieldName].filter((_, i) => i !== index);
		setFormData((prev) => ({ ...prev, [fieldName]: newArray }));
	};

	return (
		<div className="p-6">
			<h2 className="text-3xl font-bold mb-6 text-center">Manage Courses</h2>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{courses.map((course) => (
					<div
						key={course._id}
						className="bg-gray-800 text-white p-4 rounded shadow-md hover:scale-[1.02] transition-transform"
					>
						<h3 className="text-xl font-bold mb-2">
							{course?.subDepartment?.title || "Untitled Course"}
						</h3>
						<p className="text-sm mb-2">
							Instructor: {course?.subDepartment?.instructor || "N/A"}
						</p>
						<p className="text-sm mb-2">
							Price: ${course?.subDepartment?.price || "0.00"}
						</p>
						<Button
							onClick={() => {
								openModal(course);
							}}
							variant="primary"
							className="w-full cursor-pointer"
						>
							<FaEdit className="mr-2" /> Edit
						</Button>
					</div>
				))}
			</div>

			{/* Update Modal */}
			<UpdateModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onConfirm={handleUpdate}
			>
				<div className="grid gap-4">
					<InputFieldEditable
						label="Title"
						name="title"
						value={formData.title}
						onChange={handleFormChange}
						required
					/>
					<InputFieldEditable
						label="Price"
						type="number"
						name="price"
						value={formData.price}
						onChange={handleFormChange}
						required
					/>
					<InputFieldEditable
						label="Instructor"
						name="instructor"
						value={formData.instructor}
						onChange={handleFormChange}
						required
					/>
					<InputFieldEditable
						label="Duration"
						name="duration"
						value={formData.duration}
						onChange={handleFormChange}
					/>
					<InputFieldEditable
						label="Level"
						name="level"
						value={formData.level}
						onChange={handleFormChange}
					/>
					<InputFieldEditable
						label="Prerequisites"
						name="prerequisites"
						value={formData.prerequisites}
						onChange={handleFormChange}
					/>

					<label className="block text-sm font-medium text-gray-700">
						Summary
					</label>
					<textarea
						name="summary"
						value={formData.summary}
						onChange={handleFormChange}
						className="w-full p-2 border rounded"
						placeholder="Course summary"
						rows={2}
					></textarea>

					<label className="block text-sm font-medium text-gray-700">
						Description
					</label>
					<textarea
						name="description"
						value={formData.description}
						onChange={handleFormChange}
						className="w-full p-2 border rounded"
						placeholder="Course description"
						rows={4}
					></textarea>

					{/* Modules */}
					<div>
						<label className="block font-medium text-sm text-gray-700 mb-1">
							Modules
						</label>
						{Array.isArray(formData.modules) &&
							formData.modules.map((module, index) => (
								<div key={index} className="flex items-center gap-2 mb-2">
									<InputFieldEditable
										name={`module-${index}`}
										value={module}
										onChange={(e) => handleArrayChange(e, index, "modules")}
										placeholder={`Module ${index + 1}`}
										required
									/>
									{formData.modules.length > 1 && (
										<Button
											type="button"
											variant="danger"
											onClick={() => removeField(index, "modules")}
											className="text-sm px-2"
										>
											Remove
										</Button>
									)}
								</div>
							))}

						<Button
							type="button"
							variant="primary"
							onClick={() => addField("modules")}
							className="mt-2"
						>
							Add Module
						</Button>
					</div>

					{/* Benefits */}
					<div>
						<label className="block font-medium text-sm text-gray-700 mb-1">
							Benefits
						</label>
						{Array.isArray(formData.benefits) &&
							formData.benefits.map((benefit, index) => (
								<div key={index} className="flex items-center gap-2 mb-2">
									<InputFieldEditable
										name={`benefit-${index}`}
										value={benefit}
										onChange={(e) => handleArrayChange(e, index, "benefits")}
										placeholder={`Benefit ${index + 1}`}
										required
									/>
									{formData.benefits.length > 1 && (
										<Button
											type="button"
											variant="danger"
											onClick={() => removeField(index, "benefits")}
											className="text-sm px-2"
										>
											Remove
										</Button>
									)}
								</div>
							))}

						<Button
							type="button"
							variant="primary"
							onClick={() => addField("benefits")}
							className="mt-2"
						>
							Add Benefit
						</Button>
					</div>

					{/* Image Upload */}
					<div>
						<label className="block font-medium text-sm text-gray-700">
							Course Image
						</label>
						<input
							type="file"
							name="image"
							accept="image/*"
							className="w-full"
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									image: e.target.files[0],
								}))
							}
						/>
					</div>

					{/* Checkboxes */}
					<div className="flex items-center gap-6 mt-4">
						<label className="flex items-center gap-2">
							<input
								type="checkbox"
								name="isMostPurchased"
								checked={formData.isMostPurchased}
								onChange={handleFormChange}
							/>
							<span>Most Purchased</span>
						</label>
						<label className="flex items-center gap-2">
							<input
								type="checkbox"
								name="isHotCourse"
								checked={formData.isHotCourse}
								onChange={handleFormChange}
							/>
							<span>Hot Course</span>
						</label>
					</div>
				</div>
			</UpdateModal>
		</div>
	);
};

export default UpdateCourse;
