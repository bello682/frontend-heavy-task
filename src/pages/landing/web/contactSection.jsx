import React from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { motion as Motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

// Animation variants
const sectionVariants = {
	hidden: { opacity: 0, y: 50 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: "easeInOut" },
	},
};

const ContactSection = () => {
	return (
		<div>
			<section
				id="contact"
				className="bg-gray-800 py-16 md:py-24 lg:py-32 px-6 md:px-10 lg:px-20"
			>
				<div className="container mx-auto">
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center">
						Contact Us
					</h2>
					<Motion.div
						variants={sectionVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="grid md:grid-cols-2 gap-8 "
					>
						<div className="w-full bg-transparent p-6 rounded-2xl shadow-lg max-w-xl mx-auto text-gray-100">
							<h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
								📍 Contact Us
							</h2>

							<div className="mb-6">
								<div className="flex items-start gap-3 mb-4">
									<MapPin className="h-6 w-6 text-blue-500 mt-1" />
									<div>
										<h3 className="font-semibold text-white">
											Department of Innovation
										</h3>
										<p className="text-gray-300">
											Triffid University 123 Main Street Anytown, CA 12345
										</p>
									</div>
								</div>

								<div className="flex items-center gap-3 mb-4">
									<Phone className="h-5 w-5 text-blue-400" />
									<p className="text-gray-300">+1 555-123-4567</p>
								</div>

								<div className="flex items-center gap-3">
									<Mail className="h-5 w-5 text-blue-400" />
									<p className="text-gray-300">info@innovation.edu</p>
								</div>
							</div>
						</div>
						<div>
							<form className="space-y-4">
								<div>
									{/* <Label htmlFor="name" className="text-gray-200 ">
										Name
									</Label> */}
									<Input
										id="name"
										type="text"
										placeholder="Your Name"
										label="Name"
										className="bg-gray-700 border-gray-600 text-white w-full p-3 rounded "
									/>
								</div>
								<div>
									{/* <Label htmlFor="email" className="text-gray-200 ">
										Email
									</Label> */}
									<Input
										id="email"
										type="email"
										placeholder="Email"
										label="Your Email"
										className="bg-gray-700 border-gray-600 text-white  w-full p-3 rounded "
									/>
								</div>
								<div>
									{/* <Label htmlFor="message" className="text-gray-200 ">
										Message
									</Label> */}
									<Textarea
										id="message"
										placeholder="Your Message"
										label="Message"
										className="bg-gray-700 border-gray-600 text-white  w-full p-3 rounded "
										rows={4}
									/>
								</div>
								<Button
									type="submit"
									className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none hover:from-blue-600 hover:to-purple-600"
								>
									Send Message
								</Button>
							</form>
						</div>
					</Motion.div>
				</div>
			</section>
		</div>
	);
};

export default ContactSection;
