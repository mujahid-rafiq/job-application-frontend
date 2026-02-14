import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../app-routes/constants';
import AdminJobCard from '../components/AdminJobCard';
import { JobPosting } from '../entities/job.entity';
import { PlusIcon, SearchIcon, FilterIcon } from '../components/SvgIcons';
import toast from 'react-hot-toast';

// Temporary mock data for design purposes
const MOCK_JOBS: JobPosting[] = [
    {
        id: '1',
        title: 'Senior MERN Stack Developer',
        company: 'Code Upscale',
        category: 'Engineering',
        location: 'Lahore, Pakistan',
        salary: 'Rs. 150,000 - 250,000',
        jobType: 'Full-time',
        isNew: true,
        isActive: true,
        description: 'We are looking for a Senior MERN Stack Developer to lead our web development projects. You will be responsible for defining architecture, mentoring junior developers, and delivering high-quality software solutions.',
    },
    {
        id: '2',
        title: 'UI/UX Designer',
        company: 'Code Upscale',
        category: 'Design',
        location: 'Remote',
        salary: 'Rs. 80,000 - 120,000',
        jobType: 'Part-time',
        isNew: false,
        isActive: true,
        description: 'Join our design team to create stunning user experiences. You will work closely with product managers and developers to translate requirements into beautiful and functional designs.',
    },
    {
        id: '3',
        title: 'Sales Executive',
        company: 'Code Upscale',
        category: 'Sales',
        location: 'Lahore, Pakistan',
        salary: 'Rs. 50,000 + Commission',
        jobType: 'Full-time',
        isNew: false,
        isActive: false,
        description: 'Drive growth by identifying new business opportunities and maintaining relationships with clients.',
    }
];

const AdminJobsPage: React.FC = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState<JobPosting[]>(MOCK_JOBS);
    const [searchTerm, setSearchTerm] = useState('');

    const handleEdit = (id: string) => {
        navigate(ROUTES.ADMIN_EDIT_JOB.replace(':id', id));
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            setJobs(prev => prev.filter(job => job.id !== id));
            toast.success('Job deleted successfully (UI only)');
        }
    };

    const handleAddNew = () => {
        navigate(ROUTES.ADMIN_CREATE_JOB);
    };

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Job Management</h1>
                    <p className="mt-1 text-gray-500">Create, edit, and manage your job postings</p>
                </div>
                <button
                    onClick={handleAddNew}
                    className="inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-sm transition-all duration-200 hover:shadow-md active:scale-95"
                >
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Post a New Job
                </button>
            </div>

            {/* Controls */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search jobs by title or company..."
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-gray-900 placeholder-gray-400 transition-all outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <select className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2.5 pl-4 pr-10 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none cursor-pointer transition-all">
                            <option>All Categories</option>
                            <option>Engineering</option>
                            <option>Design</option>
                            <option>Sales</option>
                            <option>Marketing</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                            <FilterIcon className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Jobs Grid */}
            {filteredJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredJobs.map(job => (
                        <AdminJobCard
                            key={job.id}
                            job={job}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <SearchIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">No jobs found</h3>
                    <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
                </div>
            )}
        </div>
    );
};

export default AdminJobsPage;
