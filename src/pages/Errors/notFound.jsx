const NotFound = () => {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gray-900">
			<h1 className="text-6xl font-bold text-gray-800">404</h1>
			<p className="text-2xl text-gray-600">Page Not Found</p>
			<p className="text-lg text-gray-500">
				It seems like the page you are looking for does not exist.
			</p>
			<p className="text-lg text-gray-500">
				Please check the URL and try again.
			</p>
			<a href="/" className="mt-8 text-lg text-blue-600 hover:text-blue-700">
				Go back to homepage
			</a>
		</div>
	);
};

export default NotFound;
