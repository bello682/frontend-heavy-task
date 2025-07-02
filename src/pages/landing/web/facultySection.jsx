import React from "react";
import { motion as Motion } from "framer-motion";
import ceo1 from "../../../assets/images/ceo-1.png";
import ceo2 from "../../../assets/images/ceo-2.png";
import ceo3 from "../../../assets/images/ceo-3.png";

// Animation variants
const sectionVariants = {
	hidden: { opacity: 0, y: 50 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: "easeInOut" },
	},
};

const cardVariants = {
	hidden: { opacity: 0, scale: 0.9 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.4, ease: "easeInOut" },
	},
};

const facultyMembers = [
	{
		name: "Dr. Jane Smith",
		title: "Professor of Computer Science",
		researchInterests: "Artificial Intelligence, Machine Learning",
		imageUrl: ceo1,
	},
	{
		name: "Dr. David Johnson",
		title: "Associate Professor of Software Engineering",
		researchInterests: "Software Architecture, Distributed Systems",
		imageUrl: ceo2,
	},
	{
		name: "Dr. Sarah Williams",
		title: "Assistant Professor of Data Science",
		researchInterests: "Big Data, Data Mining",
		imageUrl: ceo3,
	},
];
const FacultySection = () => {
	return (
		<div>
			<section
				id="faculty"
				className="py-16 md:py-24 lg:py-32 px-6 md:px-10 lg:px-20 h-full "
			>
				<div className="container flex flex-col items-center mx-auto mt-5 ">
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center">
						Our Faculty
					</h2>
					<Motion.div
						variants={sectionVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
					>
						{facultyMembers.map((member, index) => (
							<Motion.div
								key={index}
								variants={cardVariants}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true, amount: 0.8 }} // Trigger animation when 80% of card is visible
								transition={{ delay: index * 0.2 }} // Staggered delay for each card
								className="bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center text-center border border-gray-700 hover:shadow-lg transition-shadow"
							>
								<img
									src={member.imageUrl}
									alt={member.name}
									className="rounded-full w-24 h-24 mb-4 border-4 border-blue-500/50"
								/>
								<h3 className="text-xl font-semibold">{member.name}</h3>
								<p className="text-gray-400">{member.title}</p>
								<p className="text-gray-300 mt-2">
									Research Interests: {member.researchInterests}
								</p>
							</Motion.div>
						))}
					</Motion.div>
				</div>
			</section>
		</div>
	);
};

export default FacultySection;
