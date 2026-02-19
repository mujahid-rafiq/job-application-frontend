import React from 'react';
import { JobPosting } from '../../entities/job.entity';
import JobCard from './JobCard';
import { ChevronDownIcon } from '../../assets/SvgIcons';

interface JobSectionProps {
    title: string;
    jobs: JobPosting[];
}

const JobSection: React.FC<JobSectionProps> = ({ title, jobs }) => {
    if (jobs.length === 0) return null;

    return (
        <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                <button className="text-gray-400 hover:text-gray-600 transition-colors rounded-full border border-gray-300 p-1">
                    <ChevronDownIcon className="w-5 h-5" />
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {jobs?.map((job) => (
                    <JobCard key={job?.id} job={job as any} />
                ))}
            </div>
        </div>
    );
};

export default JobSection;
