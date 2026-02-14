import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Job } from '../../data/mockJobs';

interface JobCardProps {
    job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/job/${job.id}`)}
            className="bg-white p-6 rounded-lg border border-gray-100 hover:shadow-lg transition-shadow group cursor-pointer h-full flex flex-col justify-between"
        >
            <div>
                <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {job.title}
                    </h3>
                    {job.isNew && (
                        <span className="bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded font-medium ml-2">
                            New
                        </span>
                    )}
                </div>

                <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {job.description}
                </p>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                <div className="flex items-center gap-1">
                    <span className="w-0.5 h-3 bg-gray-300 mx-1"></span>
                    {job.location}
                </div>
                <div className="flex items-center gap-1">
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    {job.type}
                </div>
                <div className="ml-auto text-gray-900 font-semibold">
                    {job.salaryRange}
                </div>
            </div>
        </div>
    );
};

export default JobCard;
