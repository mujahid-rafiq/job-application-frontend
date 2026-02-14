export interface Job {
  id: string;
  title: string;
  isNew?: boolean;
  description: string;
  location: string;
  type: string;
  salaryRange: string;
  category: string;
}

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Sales Associate",
    isNew: true,
    description: "Join our vibrant sales team to create exceptional customer experiences. As a Sales Associate, you'll...",
    location: "Lahore, Pakistan",
    type: "Full-time",
    salaryRange: "Rs. 50,000 - Rs. 80,000",
    category: "Sales",
  },
  {
    id: "2",
    title: "Sales Manager",
    description: "Lead a dynamic sales team to drive revenue growth and client satisfaction. As a Sales Manager at Cod...",
    location: "Lahore, Pakistan",
    type: "Full-time",
    salaryRange: "Rs. 90,000 - Rs. 120,000",
    category: "Sales",
  },
  {
    id: "3",
    title: "Sales Representative",
    description: "Assist customers in finding the right products and services to meet their needs. Join our growing sa...",
    location: "Lahore, Pakistan",
    type: "Full-time",
    salaryRange: "Rs. 35,000 - Rs. 55,000",
    category: "Sales",
  },
  {
    id: "4",
    title: "Sales Operations Specialist",
    description: "Optimize sales processes and enhance efficiency through data analysis and reporting. As a Sales Oper...",
    location: "Lahore, Pakistan",
    type: "Full-time",
    salaryRange: "Rs. 60,000 - Rs. 90,000",
    category: "Sales",
  },
  {
    id: "5",
    title: "Senior Mern Stack Developer",
    description: "Become a key member of our dynamic development team and help build outstanding web applications. As ...",
    location: "Lahore, Pakistan",
    type: "Full-time",
    salaryRange: "Rs. 80,000 - Rs. 100,000",
    category: "Engineering",
  },
  {
    id: "6",
    title: "Junior Php Developer",
    description: "Assist a vibrant development team to enhance software solutions and improve user experience. This ro...",
    location: "Lahore, Pakistan",
    type: "Full-time",
    salaryRange: "Rs. 40,000 - Rs. 60,000",
    category: "Engineering",
  },
  {
    id: "7",
    title: "Senior Software Engineer",
    description: "Lead software development projects and mentor junior developers in best practices. As a Senior Softw...",
    location: "Lahore, Pakistan",
    type: "Full-time",
    salaryRange: "Rs. 180,000 - Rs. 250,000",
    category: "Engineering",
  },
  {
    id: "8",
    title: "Frontend Developer",
    description: "Create beautiful and responsive user interfaces using modern web technologies. Join our frontend tea...",
    location: "Lahore, Pakistan",
    type: "Full-time",
    salaryRange: "Rs. 70,000 - Rs. 95,000",
    category: "Engineering",
  },
    {
    id: "9",
    title: "Backend Developer",
    description: "Create beautiful and responsive user interfaces using modern web technologies. Join our frontend tea...",
    location: "Lahore, Pakistan",
    type: "Full-time",
    salaryRange: "Rs. 70,000 - Rs. 95,000",
    category: "Full Stack",
  },
];
