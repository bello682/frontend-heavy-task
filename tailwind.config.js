// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				inter: ["Inter", "sans-serif"], // Define Inter font
			},
			colors: {
				// Define your custom black and white palette, and accent colors
				"primary-black": "#1a1a1a",
				"primary-white": "#ffffff",
				"accent-blue": "#3b82f6", // Example accent blue
				"accent-purple": "#8b5cf6", // Example accent purple
				"error-red": "#ef4444", // For error messages
				"success-green": "#22c55e", // For success messages
				"gray-bg": "#f9fafb", // A very light gray for backgrounds
				"gray-text": "#374151", // Dark gray for main text
				"gray-light": "#e5e7eb", // Light gray for borders/dividers

				// NEW COLORS FOR ADMIN PAGE
				primary: "#000000", // Black for primary elements
				secondary: "#FFFFFF", // White for secondary elements
				textPrimary: "#FFFFFF", // White text on black background
				textSecondary: "#000000", // Black text on white background
				accentRed: "#EF4444", // Red for errors/warnings
				accentGreen: "#22C55E", // Green for success
			},
		},
	},
	plugins: [],
};
