import React from "react";

const FooterSection = () => {
	return (
		<div>
			<footer className="bg-gray-900 py-6 px-6 md:px-10 lg:px-20">
				<div className="container mx-auto text-center text-gray-400">
					&copy; {new Date().getFullYear()} Department of Innovation, Triffid
					University. All rights reserved.
				</div>
			</footer>
		</div>
	);
};

export default FooterSection;
