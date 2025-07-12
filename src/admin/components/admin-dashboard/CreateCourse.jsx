// src/components/dashboard/CreateCourse.jsx
import React, { useState } from "react";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import { adminCreateCourse } from "./../../api/dummyApi";
import {
	FaPlus,
	FaMinus,
	FaBookOpen,
	FaImage,
	FaDollarSign,
	FaFileAlt,
	FaClock,
	FaChartBar,
	FaUserGraduate,
	FaCheckCircle,
} from "react-icons/fa";

const CreateCourse = () => {
	const [courseData, setCourseData] = useState({
		title: "",
		image: "",
		price: "",
		summary: "",
		description: "",
		duration: "",
		level: "",
		instructor: "",
		modules: [""], // Start with one empty module field
		prerequisites: "",
		benefits: [""], // Start with one empty benefit field
		isMostPurchased: false,
		isHotCourse: false,
	});

	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setCourseData({
			...courseData,
			[name]: type === "checkbox" ? checked : value,
		});
	};

	const handleArrayChange = (e, index, fieldName) => {
		const newArray = [...courseData[fieldName]];
		newArray[index] = e.target.value;
		setCourseData({ ...courseData, [fieldName]: newArray });
	};

	const addField = (fieldName) => {
		setCourseData({
			...courseData,
			[fieldName]: [...courseData[fieldName], ""], // Add an empty string for a new field
		});
	};

	const removeField = (index, fieldName) => {
		const newArray = courseData[fieldName].filter((_, i) => i !== index);
		setCourseData({ ...courseData, [fieldName]: newArray });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");
		setIsSubmitting(true);

		try {
			const formData = new FormData();

			// Append basic fields
			formData.append("title", courseData.title);
			formData.append("price", courseData.price);
			formData.append("summary", courseData.summary);
			formData.append("description", courseData.description);
			formData.append("duration", courseData.duration);
			formData.append("level", courseData.level);
			formData.append("instructor", courseData.instructor);
			formData.append("prerequisites", courseData.prerequisites);
			formData.append("isMostPurchased", courseData.isMostPurchased);
			formData.append("isHotCourse", courseData.isHotCourse);

			// Append image (single file upload)
			formData.append("image", courseData.image); // courseData.image should now be a File object

			// Append modules and benefits as individual array fields
			courseData.modules.forEach((mod) => formData.append("modules", mod));
			courseData.benefits.forEach((ben) => formData.append("benefits", ben));

			// Submit to backend via axios
			const response = await adminCreateCourse(formData);

			if (response.data.success) {
				setSuccess(response.data.message || "Course created successfully!");
				setCourseData({
					title: "",
					image: "",
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
				});
			} else {
				setError(response.data.message || "An error occurred.");
			}
		} catch (err) {
			console.error("Course creation failed:", err);
			setError(error || "Failed to create course. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="p-6 bg-secondary text-textSecondary rounded-lg shadow-md">
			<h2 className="text-3xl font-bold mb-6 text-center">Create New Course</h2>
			{error && (
				<div className="bg-[#EF4444] py-2 mb-4">
					<p className="text-white text-sm text-center">{error}</p>
				</div>
			)}
			{success && (
				<div className="bg-[#22C55E] py-2 mb-4">
					<p className="text-white text-sm text-center">{success}</p>
				</div>
			)}

			<form onSubmit={handleSubmit} className="space-y-6">
				{/* Basic Course Details */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<InputField
						label="Course Title"
						id="title"
						name="title"
						value={courseData.title}
						onChange={handleChange}
						placeholder="e.g., Introduction to AI & Machine Learning"
						required
						icon={<FaBookOpen />}
					/>
					<InputField
						label="Upload Image"
						id="image"
						name="image"
						type="file"
						onChange={(e) =>
							setCourseData({ ...courseData, image: e.target.files[0] })
						}
						accept="image/*"
						required
					/>

					<InputField
						label="Price"
						id="price"
						name="price"
						type="number"
						value={courseData.price}
						onChange={handleChange}
						placeholder="499.99"
						required
						step="0.01"
						icon={<FaDollarSign />}
					/>
					<InputField
						label="Duration"
						id="duration"
						name="duration"
						value={courseData.duration}
						onChange={handleChange}
						placeholder="e.g., 8 weeks"
						required
						icon={<FaClock />}
					/>
					<InputField
						label="Level"
						id="level"
						name="level"
						value={courseData.level}
						onChange={handleChange}
						placeholder="e.g., Beginner, Intermediate, Advanced"
						required
						icon={<FaChartBar />}
					/>
					<InputField
						label="Instructor"
						id="instructor"
						name="instructor"
						value={courseData.instructor}
						onChange={handleChange}
						placeholder="e.g., Dr. Anya Sharma"
						required
						icon={<FaUserGraduate />}
					/>
				</div>

				<div>
					<label
						htmlFor="summary"
						className="block text-textSecondary text-sm font-bold mb-2"
					>
						Summary <span className="text-accentRed">*</span>
					</label>
					<textarea
						id="summary"
						name="summary"
						value={courseData.summary}
						onChange={handleChange}
						placeholder="Short overview of the course..."
						required
						rows="3"
						className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-secondary text-textSecondary border-gray-300 focus:ring-2 focus:ring-gray-500"
					></textarea>
				</div>

				<div>
					<label
						htmlFor="description"
						className="block text-textSecondary text-sm font-bold mb-2"
					>
						Description <span className="text-accentRed">*</span>
					</label>
					<textarea
						id="description"
						name="description"
						value={courseData.description}
						onChange={handleChange}
						placeholder="Detailed description of what the course covers..."
						required
						rows="6"
						className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-secondary text-textSecondary border-gray-300 focus:ring-2 focus:ring-gray-500"
					></textarea>
				</div>

				<InputField
					label="Prerequisites"
					id="prerequisites"
					name="prerequisites"
					value={courseData.prerequisites}
					onChange={handleChange}
					placeholder="e.g., Basic programming knowledge (Python preferred)"
					icon={<FaCheckCircle />}
				/>

				{/* Dynamic Modules Field */}
				<div>
					<label className="block text-textSecondary text-sm font-bold mb-2">
						Modules
					</label>
					{courseData.modules.map((moduleItem, index) => (
						<div key={`module-${index}`} className="flex items-center mb-2">
							<InputField
								id={`module-${index}`}
								name={`module-${index}`}
								value={moduleItem}
								onChange={(e) => handleArrayChange(e, index, "modules")}
								placeholder={`Module ${index + 1} title`}
								className="flex-1 mr-2"
								required
							/>
							{courseData.modules.length > 1 && (
								<Button
									type="button"
									onClick={() => removeField(index, "modules")}
									variant="danger"
									className="p-2 text-sm"
								>
									<FaMinus />
								</Button>
							)}
						</div>
					))}
					<Button
						type="button"
						onClick={() => addField("modules")}
						variant="primary"
						className="mt-2 flex items-center"
					>
						<FaPlus className="mr-2" /> Add Module
					</Button>
				</div>

				{/* Dynamic Benefits Field */}
				<div>
					<label className="block text-textSecondary text-sm font-bold mb-2">
						Benefits
					</label>
					{courseData.benefits.map((benefitItem, index) => (
						<div key={`benefit-${index}`} className="flex items-center mb-2">
							<InputField
								id={`benefit-${index}`}
								name={`benefit-${index}`}
								value={benefitItem}
								onChange={(e) => handleArrayChange(e, index, "benefits")}
								placeholder={`Benefit ${index + 1}`}
								className="flex-1 mr-2"
								required
							/>
							{courseData.benefits.length > 1 && (
								<Button
									type="button"
									onClick={() => removeField(index, "benefits")}
									variant="danger"
									className="p-2 text-sm"
								>
									<FaMinus />
								</Button>
							)}
						</div>
					))}
					<Button
						type="button"
						onClick={() => addField("benefits")}
						variant="primary"
						className="mt-2 flex items-center"
					>
						<FaPlus className="mr-2" /> Add Benefit
					</Button>
				</div>

				{/* Checkboxes */}
				<div className="flex items-center mt-4 space-x-6">
					<label className="flex items-center cursor-pointer">
						<input
							type="checkbox"
							name="isMostPurchased"
							checked={courseData.isMostPurchased}
							onChange={handleChange}
							className="form-checkbox h-5 w-5 text-blue-600 bg-gray-700 border-gray-600 rounded"
						/>
						<span className="ml-2 text-textSecondary">Most Purchased</span>
					</label>
					<label className="flex items-center cursor-pointer">
						<input
							type="checkbox"
							name="isHotCourse"
							checked={courseData.isHotCourse}
							onChange={handleChange}
							className="form-checkbox h-5 w-5 text-red-600 bg-gray-700 border-gray-600 rounded"
						/>
						<span className="ml-2 text-textSecondary">Hot Course</span>
					</label>
				</div>

				<Button
					type="submit"
					className="w-full mt-6"
					variant="primary"
					disabled={isSubmitting}
				>
					{isSubmitting ? "Creating Course..." : "Create Course"}
				</Button>
			</form>
		</div>
	);
};

export default CreateCourse;
