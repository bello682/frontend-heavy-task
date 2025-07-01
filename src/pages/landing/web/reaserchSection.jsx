import React from "react";
import research1 from "../../../assets/images/datascience.png";
import research2 from "../../../assets/images/Artificial_1.png";
import research3 from "../../../assets/images/cybersecurity.png";
import { motion as Motion } from "framer-motion";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../../../components/ui/card";

// Animation variants
const sectionVariants = {
	hidden: { opacity: 0, y: 50 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: "easeInOut" },
	},
};

// Dummy data for research areas
const researchAreas = [
	{
		title: "Artificial Intelligence",
		description:
			"Exploring the frontiers of AI, from machine learning to natural language processing.",
		imageUrl: research2,
	},
	{
		title: "Cybersecurity",
		description:
			"Protecting digital systems and data from cyber threats and attacks.",
		imageUrl: research3,
	},
	{
		title: "Data Science",
		description:
			"Unlocking insights from data through statistical analysis, machine learning, and visualization.",
		imageUrl: research1,
	},
];
const ReasearchSection = () => {
	return (
		<div>
			<section
				id="research"
				className="bg-gray-800 py-16 md:py-24 lg:py-32 px-6 md:px-10 lg:px-20"
			>
				<div className="container mx-auto">
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center mt-7">
						Research Highlights
					</h2>
					<Motion.div
						variants={sectionVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="grid md:grid-cols-1 lg:grid-cols-2 gap-8"
					>
						{researchAreas.map((area, index) => (
							<Card
								key={index}
								className="bg-gray-700 border-gray-600 hover:shadow-lg transition-shadow"
							>
								<CardHeader>
									<CardTitle className="text-2xl">{area.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<img
										src={area.imageUrl}
										alt={area.title}
										className="rounded-lg mb-4 w-[40%] flex justify-center items-center m-auto py-6"
									/>
									<p className="text-gray-300">{area.description}</p>
								</CardContent>
							</Card>
						))}
					</Motion.div>
				</div>
			</section>
		</div>
	);
};

export default ReasearchSection;
