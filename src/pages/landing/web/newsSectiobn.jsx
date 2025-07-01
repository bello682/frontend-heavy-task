import React from "react";
import grant1 from "../../../assets/images/grant.png";
import award1 from "../../../assets/images/award.png";
import { motion as Motion } from "framer-motion";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../../components/ui/card.jsx";

// Animation variants
const sectionVariants = {
	hidden: { opacity: 0, y: 50 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: "easeInOut" },
	},
};

// Dummy data for news
const newsItems = [
	{
		title: "Department Announces New Research Grant",
		date: "2024-07-28",
		content:
			"The department has been awarded a $1 million grant to fund research in artificial intelligence.",
		imageUrl: grant1,
	},
	{
		title: "Faculty Member Wins Prestigious Award",
		date: "2024-07-25",
		content:
			"Professor Jane Smith has received the ACM Distinguished Scientist Award.",
		imageUrl: award1,
	},
];

const NewsSection = () => {
	return (
		<div>
			<section
				id="news"
				className="py-16 md:py-24 lg:py-32 px-6 md:px-10 lg:px-20"
			>
				<div className="container mx-auto">
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center mt-7">
						Latest News
					</h2>
					<Motion.div
						variants={sectionVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="grid md:grid-cols-1 lg:grid-cols-2 gap-8"
					>
						{newsItems.map((item, index) => (
							<Card
								key={index}
								className="bg-gray-800 border-gray-600 hover:shadow-lg transition-shadow"
							>
								<CardHeader>
									<CardTitle className="text-2xl">{item.title}</CardTitle>
									<CardDescription className="text-gray-400">
										{item.date}
									</CardDescription>
								</CardHeader>
								<CardContent>
									<img
										src={item.imageUrl}
										alt={item.title}
										className="rounded-lg mb-4 w-[50%] flex items-center justify-center m-auto"
									/>
									<p className="text-gray-300">{item.content}</p>
								</CardContent>
							</Card>
						))}
					</Motion.div>
				</div>
			</section>
		</div>
	);
};

export default NewsSection;
