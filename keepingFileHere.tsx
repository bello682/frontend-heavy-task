// import { Sidebar } from "lucide-react";
// import React, { useState } from "react";

// const SignUp: React.FC = () => {
// 	const [name, setName] = useState<string>(""); // State for user's name
// 	const [loading, setLoading] = useState<boolean>(false); // Loading state
// 	const [error, setError] = useState<string | null>(null); // Error message
// 	const [user, setUser] = useState<any | null>(null); // Registered user

// 	const handleSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault();
// 		setLoading(true);
// 		setError(null);

// 		try {
// 			const response = await fetch(
// 				"http://localhost:7075/api_url/users/task/register",

// 				{
// 					method: "POST",
// 					headers: {
// 						"Content-Type": "application/json",
// 					},
// 					body: JSON.stringify({ name }),
// 				}
// 			);

// 			if (!response.ok) {
// 				// If status is not in the 200-299 range
// 				throw new Error("Failed to register");
// 			}

// 			const data = await response.json();
// 			setUser(data);
// 		} catch (err) {
// 			console.error(err);
// 			setError("Failed to register. Please try again later.");
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	return (
// 		<div className="max-w-md mx-auto p-4">
// 			<h1 className="text-2xl font-bold mb-4">Sign Up</h1>

// 			{error && <div className="text-red-500 mb-4">{error}</div>}
// 			{user && (
// 				<div className="text-green-500 mb-4">
// 					Registered successfully! Welcome {user.name}.
// 				</div>
// 			)}

// 			<form onSubmit={handleSubmit}>
// 				<div className="mb-4">
// 					<label
// 						htmlFor="name"
// 						className="block text-sm font-medium text-gray-700"
// 					>
// 						Name
// 					</label>
// 					<input
// 						type="text"
// 						id="name"
// 						name="name"
// 						className="mt-1 p-2 w-full border border-gray-300 rounded-md"
// 						value={name}
// 						onChange={(e) => setName(e.target.value)}
// 						required
// 					/>
// 				</div>

// 				<button
// 					type="submit"
// 					className="w-full bg-blue-500 text-white p-2 rounded-md"
// 					disabled={loading}
// 				>
// 					{loading ? "Registering..." : "Register"}
// 				</button>
// 			</form>
// 		</div>
// 	);
// };

// export default SignUp;

// when ever i reload my deployment web on vercel i get page not found when i navigate and reload the page

// ================================== the reason for this page is ==================================

// This is a classic issue when deploying Single Page Applications (SPAs) like React apps built with Vite and using client-side routing (e.g., React Router) to platforms like Vercel.

// The Problem: Client-Side Routing vs. Server-Side Serving

// Here's why it works locally but breaks on Vercel:

// Local Development: When you run your Vite app locally (e.g., npm run dev), the Vite development server is smart. It acts as a fallback for all routes. If you navigate to /about and refresh, the development server knows to serve your index.html file, and your React Router then takes over to render the /about component.

// Vercel Production (Default Behavior): Vercel, by default, is designed to serve static files. When you navigate to a path like /about directly or refresh the page, Vercel's server looks for a physical file named about.html or a directory named about with an index.html inside it. Since your React app is a Single Page Application, there isn't a separate about.html file. All your routes are handled by JavaScript on the client side after the initial index.html is loaded.

// When Vercel can't find a corresponding static file for the URL, it returns a "404 Not Found" error.

// The Solution: Vercel Rewrite Rules

// To fix this, you need to tell Vercel to always serve your index.html file for any incoming request that doesn't correspond to an actual static file (like a CSS, JS, or image file). This allows your React Router to take control and handle the routing on the client side.

// You do this by creating a vercel.json file in the root of your project (the same directory where your package.json and index.html are located) and adding a rewrites rule.

// Steps to Fix:

// Create vercel.json: In the root of your project, create a file named vercel.json.

// Add Rewrite Rule: Add the following content to your vercel.json file:

// JSON

// {
//   "rewrites": [
//     {
//       "source": "/(.*)",
//       "destination": "/index.html"
//     }
//   ]
// }
// Explanation of the rewrites rule:

// "source": "/(.*)": This is a regular expression that matches all incoming requests.

// "destination": "/index.html": This tells Vercel to rewrite (or internally redirect) any request that matches the source to index.html.

// Redeploy to Vercel: After adding this file, commit your changes and redeploy your project on Vercel.

// Why this works:

// When a request comes in for, say, /products/123, Vercel will see the rewrites rule, redirect that request internally to /index.html. Your index.html (along with your bundled JavaScript) will then be served to the browser. Once the React application loads, React Router will read the URL (/products/123) and render the correct component for that route.

// This is a very common and straightforward fix for SPAs on Vercel and similar static hosting platforms.

// ======== solution is to =========
// create a vercel.json
// add  this in

// {
//   "rewrites": [
//     {
//       "source": "/(.*)",
//       "destination": "/index.html"
//     }
//   ]
// }
