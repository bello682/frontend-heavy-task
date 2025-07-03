// src/data/dummyData.js

// Helper to generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 11);

export const courses = [
	{
		id: generateId(),
		title: "Introduction to AI & Machine Learning",
		image: "https://placehold.co/400x250/E0E7FF/3B82F6?text=AI+ML",
		price: 499.99,
		summary:
			"Learn the fundamentals of Artificial Intelligence and Machine Learning. Covers basic algorithms, data processing, and ethical considerations.",
		description:
			"Dive deep into the world of AI and Machine Learning. This comprehensive course covers supervised and unsupervised learning, neural networks, deep learning basics, and practical applications using Python. You'll work on real-world datasets and build your first AI models. Ideal for beginners and those looking to understand the core concepts.",
		duration: "8 weeks",
		level: "Beginner",
		instructor: "Dr. Anya Sharma",
		modules: [
			"Module 1: Foundations of AI",
			"Module 2: Supervised Learning",
			"Module 3: Unsupervised Learning",
			"Module 4: Neural Networks & Deep Learning",
			"Module 5: Natural Language Processing Basics",
			"Module 6: Computer Vision Fundamentals",
			"Module 7: Ethical AI & Future Trends",
			"Module 8: Project Work & Deployment",
		],
		prerequisites: "Basic programming knowledge (Python preferred)",
		benefits: [
			"Understand core AI/ML concepts",
			"Build practical ML models",
			"Prepare for advanced AI studies",
			"Gain industry-relevant skills",
		],
		isMostPurchased: true,
		isHotCourse: false,
	},
	{
		id: generateId(),
		title: "Advanced Web Development with React & Node.js",
		image: "https://placehold.co/400x250/D1FAE5/10B981?text=Web+Dev",
		price: 699.99,
		summary:
			"Master full-stack web development. Build dynamic applications using React for frontend and Node.js with Express for backend.",
		description:
			"This advanced course takes you from intermediate to expert in full-stack web development. You'll learn to build robust APIs with Node.js and Express, manage databases with MongoDB, and create powerful, interactive user interfaces with React. Topics include authentication, real-time applications, and deployment strategies.",
		duration: "12 weeks",
		level: "Intermediate",
		instructor: "Prof. David Lee",
		modules: [
			"Module 1: React Deep Dive",
			"Module 2: State Management (Redux/Context)",
			"Module 3: Node.js & Express APIs",
			"Module 4: MongoDB Integration",
			"Module 5: User Authentication (JWT)",
			"Module 6: Real-time with WebSockets",
			"Module 7: Testing & Debugging",
			"Module 8: Deployment & CI/CD",
		],
		prerequisites: "Familiarity with JavaScript, HTML, CSS, and basic React.",
		benefits: [
			"Become a full-stack developer",
			"Build scalable web applications",
			"Learn industry best practices",
			"Create impressive portfolios",
		],
		isMostPurchased: true,
		isHotCourse: true,
	},
	{
		id: generateId(),
		title: "Cybersecurity Fundamentals",
		image: "https://placehold.co/400x250/FFE4E6/EF4444?text=Cybersecurity",
		price: 349.99,
		summary:
			"Explore the basics of cybersecurity, network security, and common threats. Protect digital assets effectively.",
		description:
			"An essential course for anyone looking to understand digital security. Covers network security, cryptography, common cyber threats like phishing and malware, and best practices for protecting personal and organizational data. Includes hands-on exercises for practical understanding.",
		duration: "6 weeks",
		level: "Beginner",
		instructor: "Ms. Sarah Chen",
		modules: [
			"Module 1: Introduction to Cybersecurity",
			"Module 2: Network Security Principles",
			"Module 3: Cryptography Basics",
			"Module 4: Malware & Viruses",
			"Module 5: Web Application Security",
			"Module 6: Incident Response",
		],
		prerequisites: "Basic computer literacy.",
		benefits: [
			"Understand cyber threats",
			"Implement basic security measures",
			"Protect personal data",
			"Foundation for cybersecurity career",
		],
		isMostPurchased: false,
		isHotCourse: true,
	},
	{
		id: generateId(),
		title: "Data Science with Python",
		image: "https://placehold.co/400x250/DBEAFE/2563EB?text=Data+Science",
		price: 599.99,
		summary:
			"Learn data analysis, visualization, and machine learning using Python. Transform raw data into actionable insights.",
		description:
			"Master the art of data science using Python. This course covers data manipulation with Pandas, numerical computing with NumPy, data visualization with Matplotlib and Seaborn, and an introduction to machine learning models. Perfect for aspiring data analysts and scientists.",
		duration: "10 weeks",
		level: "Intermediate",
		instructor: "Dr. Emily White",
		modules: [
			"Module 1: Python for Data Science",
			"Module 2: Data Cleaning & Preprocessing",
			"Module 3: Exploratory Data Analysis",
			"Module 4: Data Visualization",
			"Module 5: Statistical Inference",
			"Module 6: Introduction to Machine Learning",
			"Module 7: Project: Predictive Modeling",
		],
		prerequisites: "Basic Python programming.",
		benefits: [
			"Analyze and interpret data",
			"Create compelling visualizations",
			"Apply machine learning techniques",
			"Enhance decision-making skills",
		],
		isMostPurchased: true,
		isHotCourse: false,
	},
	{
		id: generateId(),
		title: "UI/UX Design Masterclass",
		image: "https://placehold.co/400x250/FEE2E2/EF4444?text=UI+UX",
		price: 449.99,
		summary:
			"Design intuitive and beautiful user interfaces and experiences. Learn design principles, wireframing, and prototyping.",
		description:
			"Become a professional UI/UX designer. This masterclass covers user research, information architecture, wireframing, prototyping, usability testing, and visual design principles. You'll use industry-standard tools like Figma and build a strong portfolio.",
		duration: "9 weeks",
		level: "Beginner",
		instructor: "Mr. Kevin Brown",
		modules: [
			"Module 1: Introduction to UI/UX",
			"Module 2: User Research & Persona Creation",
			"Module 3: Information Architecture",
			"Module 4: Wireframing & Prototyping",
			"Module 5: Usability Testing",
			"Module 6: Visual Design & Typography",
			"Module 7: Design Systems",
			"Module 8: Portfolio Project",
		],
		prerequisites: "No prior design experience needed.",
		benefits: [
			"Design user-friendly interfaces",
			"Create engaging user experiences",
			"Build a professional design portfolio",
			"Understand design thinking process",
		],
		isMostPurchased: false,
		isHotCourse: true,
	},
	{
		id: generateId(),
		title: "Cloud Computing with AWS",
		image: "https://placehold.co/400x250/F0F9FF/0EA5E9?text=AWS",
		price: 749.99,
		summary:
			"Learn to deploy, manage, and scale applications on Amazon Web Services (AWS).",
		description:
			"This course provides hands-on experience with core AWS services including EC2, S3, Lambda, VPC, and RDS. Learn best practices for cloud architecture, security, and cost optimization. Prepare for AWS certification exams.",
		duration: "10 weeks",
		level: "Intermediate",
		instructor: "Ms. Olivia Green",
		modules: [
			"Module 1: AWS Fundamentals",
			"Module 2: EC2 & Compute Services",
			"Module 3: S3 & Storage Services",
			"Module 4: Networking (VPC)",
			"Module 5: Databases (RDS, DynamoDB)",
			"Module 6: Serverless (Lambda)",
			"Module 7: Security & IAM",
			"Module 8: Monitoring & Cost Optimization",
		],
		prerequisites: "Basic networking and Linux command line knowledge.",
		benefits: [
			"Deploy apps on AWS",
			"Understand cloud architecture",
			"Prepare for AWS certifications",
			"Gain in-demand cloud skills",
		],
		isMostPurchased: true,
		isHotCourse: false,
	},
	{
		id: generateId(),
		title: "Mobile App Development with React Native",
		image: "https://placehold.co/400x250/ECFDF5/059669?text=React+Native",
		price: 649.99,
		summary:
			"Build cross-platform mobile applications for iOS and Android using React Native.",
		description:
			"Learn to develop native mobile apps with a single JavaScript codebase. This course covers UI components, navigation, state management, API integration, and deployment to app stores. Build real-world mobile projects.",
		duration: "11 weeks",
		level: "Intermediate",
		instructor: "Mr. Daniel Kim",
		modules: [
			"Module 1: React Native Basics",
			"Module 2: UI & Layouts",
			"Module 3: Navigation",
			"Module 4: State Management",
			"Module 5: API Integration",
			"Module 6: Device Features (Camera, GPS)",
			"Module 7: Debugging & Testing",
			"Module 8: Deployment to App Stores",
		],
		prerequisites: "Strong knowledge of React.js.",
		benefits: [
			"Develop cross-platform apps",
			"Faster development cycles",
			"Access native device features",
			"Publish apps to app stores",
		],
		isMostPurchased: false,
		isHotCourse: true,
	},
	{
		id: generateId(),
		title: "Blockchain & Decentralized Applications (DApps)",
		image: "https://placehold.co/400x250/F3E8FF/A855F7?text=Blockchain",
		price: 799.99,
		summary:
			"Understand blockchain technology and build your first decentralized applications.",
		description:
			"Explore the core concepts of blockchain, cryptocurrencies, smart contracts, and decentralized applications (DApps). Learn to develop on platforms like Ethereum and interact with blockchain networks. Ideal for developers interested in Web3.",
		duration: "10 weeks",
		level: "Advanced",
		instructor: "Dr. Michael Zhang",
		modules: [
			"Module 1: Blockchain Fundamentals",
			"Module 2: Cryptocurrencies & Wallets",
			"Module 3: Smart Contracts (Solidity)",
			"Module 4: Ethereum Development",
			"Module 5: Building DApps with Web3.js",
			"Module 6: Decentralized Finance (DeFi)",
			"Module 7: NFTs & Metaverse Basics",
			"Module 8: Security & Best Practices",
		],
		prerequisites:
			"Familiarity with JavaScript and basic programming concepts.",
		benefits: [
			"Understand blockchain deeply",
			"Develop smart contracts & DApps",
			"Explore Web3 technologies",
			"Position for future tech trends",
		],
		isMostPurchased: false,
		isHotCourse: true,
	},
];

export const getCourseById = (id) => courses.find((course) => course.id === id);

export const getRelatedCourses = (currentCourseId, count = 3) => {
	const filteredCourses = courses.filter(
		(course) => course.id !== currentCourseId
	);
	// Shuffle and pick 'count' courses
	return filteredCourses.sort(() => 0.5 - Math.random()).slice(0, count);
};

export const getMostPurchasedCourses = (count = 5) => {
	return courses.filter((course) => course.isMostPurchased).slice(0, count);
};

export const getHotCourses = (count = 5) => {
	return courses.filter((course) => course.isHotCourse).slice(0, count);
};
