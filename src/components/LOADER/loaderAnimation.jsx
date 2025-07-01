import React from "react";
import { motion as Motion } from "framer-motion";

// --- Loader Component ---
const Loader = ({
	type = "spinner", // 'spinner' or 'dots' or 'circle-pulse'
	size = "medium", // 'small', 'medium', 'large', or a custom Tailwind size like 'w-16 h-16'
	color = "text-blue-500", // Tailwind color class, e.g., 'text-blue-500', 'text-purple-600'
	loadingText = "", // Optional text to display below the loader
	className = "", // Additional custom classes for the main loader container
}) => {
	// Determine size classes based on 'size' prop
	let sizeClasses = "";
	let dotSizeClasses = "";
	let spinnerBorder = "border-4";

	if (size === "small") {
		sizeClasses = "w-8 h-8";
		dotSizeClasses = "w-2 h-2";
		spinnerBorder = "border-2";
	} else if (size === "medium") {
		sizeClasses = "w-12 h-12";
		dotSizeClasses = "w-3 h-3";
		spinnerBorder = "border-4";
	} else if (size === "large") {
		sizeClasses = "w-16 h-16";
		dotSizeClasses = "w-4 h-4";
		spinnerBorder = "border-6"; // Tailwind doesn't have border-6, will default to border-4 unless custom config
	} else {
		// Allow custom Tailwind size classes
		sizeClasses = size;
		// Adjust dot size proportionally for custom sizes, or set a default
		if (size.includes("w-")) {
			const widthValue = parseInt(size.match(/w-(\d+)/)?.[1] || 0);
			dotSizeClasses = `w-${Math.max(
				2,
				Math.round(widthValue / 4)
			)} h-${Math.max(2, Math.round(widthValue / 4))}`;
			spinnerBorder = `border-${Math.max(2, Math.round(widthValue / 10))}`;
		} else {
			dotSizeClasses = "w-3 h-3"; // Fallback for non-standard size prop
		}
	}

	// Framer Motion variants for animations
	const spinnerVariants = {
		animate: {
			rotate: 360,
			transition: {
				loop: Infinity,
				ease: "linear",
				duration: 1,
			},
		},
	};

	const dotVariants = {
		start: { y: "0%" },
		end: {
			y: "100%",
			transition: {
				repeat: Infinity,
				repeatType: "reverse",
				ease: "easeInOut",
				duration: 0.6,
			},
		},
	};

	const dotContainerVariants = {
		start: {
			transition: {
				staggerChildren: 0.1,
			},
		},
		end: {
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const circlePulseVariants = {
		animate: {
			scale: [1, 1.2, 1], // Scale up and down
			opacity: [0.8, 0.4, 0.8], // Fade out and in
			transition: {
				repeat: Infinity,
				ease: "easeInOut",
				duration: 1.5,
			},
		},
	};

	const renderLoader = () => {
		switch (type) {
			case "spinner":
				return (
					<Motion.div
						className={`${sizeClasses} ${color} border-current border-solid rounded-full ${spinnerBorder} border-t-transparent`}
						variants={spinnerVariants}
						initial="animate"
						animate="animate"
					/>
				);
			case "dots":
				return (
					<Motion.div
						className="flex justify-center items-center space-x-1"
						variants={dotContainerVariants}
						initial="start"
						animate="end"
					>
						{[...Array(3)].map((_, i) => (
							<Motion.span
								key={i}
								className={`${dotSizeClasses} ${color} rounded-full`}
								variants={dotVariants}
								style={{ y: "0%" }} // Ensure initial position is correct
								transition={{ ...dotVariants.end.transition, delay: i * 0.1 }}
							/>
						))}
					</Motion.div>
				);
			case "circle-pulse":
				return (
					<Motion.div
						className={`${sizeClasses} ${color} bg-current rounded-full`}
						variants={circlePulseVariants}
						initial="animate"
						animate="animate"
					/>
				);
			default:
				return (
					<Motion.div
						className={`${sizeClasses} ${color} border-current border-solid rounded-full border-4 border-t-transparent`}
						variants={spinnerVariants}
						initial="animate"
						animate="animate"
					/>
				);
		}
	};

	return (
		<div className={`flex flex-col items-center justify-center ${className}`}>
			{renderLoader()}
			{loadingText && (
				<p
					className={`mt-3 text-sm font-medium ${color.replace(
						"text-",
						"text-"
					)}`}
				>
					{loadingText}
				</p>
			)}
		</div>
	);
};

export default Loader;
