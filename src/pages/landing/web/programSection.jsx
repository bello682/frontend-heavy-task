import React from "react";
import { Button } from "../../../components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../../components/ui/card";
import { motion as Motion } from "framer-motion";
import { BookOpen, GraduationCap } from "lucide-react";

// Animation variants
const sectionVariants = {
	hidden: { opacity: 0, y: 50 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: "easeInOut" },
	},
};

const ProgramSection = () => {
	return (
		<div>
			<section
				id="programs"
				className="bg-gray-800 py-16 md:py-24 lg:py-32 px-6 md:px-10 lg:px-20"
			>
				<div className="container mx-auto">
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center">
						Our Programs
					</h2>
					<Motion.div
						variants={sectionVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
					>
						<Card className="bg-gray-700 border-gray-600 hover:shadow-lg transition-shadow">
							<CardHeader>
								<GraduationCap className="h-8 w-8 text-blue-400 mb-2" />
								<CardTitle className="text-xl">
									Undergraduate Programs
								</CardTitle>
								<CardDescription className="text-gray-300">
									Bachelor of Science in Computer Science, Information
									Technology, and more.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Button
									variant="outline"
									className="text-blue-300 border-blue-500/30 hover:bg-blue-500/20"
								>
									Learn More
								</Button>
							</CardContent>
						</Card>

						<Card className="bg-gray-700 border-gray-600 hover:shadow-lg transition-shadow">
							<CardHeader>
								<GraduationCap className="h-8 w-8 text-blue-400 mb-2" />
								<CardTitle className="text-xl">Graduate Programs</CardTitle>
								<CardDescription className="text-gray-300">
									Master of Science and Doctor of Philosophy programs in various
									specializations.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Button
									variant="outline"
									className="text-blue-300 border-blue-500/30 hover:bg-blue-500/20"
								>
									Learn More
								</Button>
							</CardContent>
						</Card>

						<Card className="bg-gray-700 border-gray-600 hover:shadow-lg transition-shadow">
							<CardHeader>
								<BookOpen className="h-8 w-8 text-blue-400 mb-2" />
								<CardTitle className="text-xl">Online Courses</CardTitle>
								<CardDescription className="text-gray-300">
									Flexible online learning options for working professionals and
									lifelong learners.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Button
									variant="outline"
									className="text-blue-300 border-blue-500/30 hover:bg-blue-500/20"
								>
									Explore Courses
								</Button>
							</CardContent>
						</Card>
					</Motion.div>
				</div>
			</section>
		</div>
	);
};

export default ProgramSection;
