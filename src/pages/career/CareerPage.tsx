import React, { useState, useMemo } from 'react';
import CareerHeader from '../../components/Career/CareerHeader';
import JobFilter from '../../components/Career/JobFilter';
import JobSection from '../../components/Career/JobSection';
import { SearchIcon, FilterIcon, ChevronDownIcon } from '../../assets/SvgIcons';
import useGetJobs from '../../react-query-hooks/job/useGetJobs';
import ChatWindow from '../../components/chat/ChatWindow';
import { MessageCircle } from 'lucide-react';

const CareerPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isChatOpen, setIsChatOpen] = useState(false);
    const { data: jobs = [], isLoading } = useGetJobs();

    const categories = useMemo(() => {
        return Array.from(new Set(jobs.map(job => job.category)));
    }, [jobs]);

    const filteredJobs = useMemo(() => {
        return jobs.filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory ? job.category === selectedCategory : true;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory, jobs]);

    // Group jobs by category for display
    const jobsByCategory = useMemo(() => {
        const groups: Record<string, typeof jobs> = {};

        filteredJobs.forEach(job => {
            if (!groups[job.category]) {
                groups[job.category] = [];
            }
            groups[job.category].push(job);
        });

        return groups;
    }, [filteredJobs]);

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            <CareerHeader />

            <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-gray-500 font-medium mb-4">Join Us</h2>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-black">Current Openings</h1>
                    <p className="max-w-2xl mx-auto text-gray-600 leading-relaxed mb-8">
                        Discover Exciting Career opportunities at Code Upscale and join our talented and creative team.
                        Explore our current Openings below and find the perfect role to showcase your skills and passion for design.
                    </p>
                    <button
                        onClick={() => setIsChatOpen(true)}
                        className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 group"
                    >
                        <MessageCircle className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                        Chat with Admin
                    </button>
                </div>

                <div className="max-w-5xl mx-auto">
                    {/* Search and Filter Section */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-gray-100 pb-8 gap-4">
                        <div className="relative w-full md:w-96">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <SearchIcon className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search for anything"
                                className="pl-10 pr-4 py-2 w-full border-none focus:ring-0 text-gray-600 placeholder-gray-400 bg-transparent"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="relative w-full md:w-48">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FilterIcon className="w-5 h-5 text-gray-400" />
                            </div>
                            <select
                                className="pl-10 pr-8 py-2 w-full appearance-none bg-transparent border-none focus:ring-0 text-gray-700 font-medium cursor-pointer"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="">All Categories</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-400">
                                <ChevronDownIcon className="w-4 h-4" />
                            </div>
                        </div>
                    </div>

                    {/* Job Sections */}
                    {isLoading ? (
                        <div className="text-center py-20 text-gray-500">
                            Loading jobs...
                        </div>
                    ) : Object.keys(jobsByCategory).length > 0 ? (
                        Object.entries(jobsByCategory).map(([category, jobs]) => (
                            <JobSection key={category} title={category} jobs={jobs} />
                        ))
                    ) : (
                        <div className="text-center py-20 text-gray-500">
                            No jobs found matching your criteria.
                        </div>
                    )}
                </div>
            </div>
            <ChatWindow
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                role="User"
            />
        </div>
    );
};

export default CareerPage;
