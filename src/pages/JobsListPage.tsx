import React, { useState } from 'react';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Part-time';
  salary: string;
  description: string;
}

const JobsListPage: React.FC = () => {
  const [jobs] = useState<Job[]>([
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'Tech Solutions Inc',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$80k - $120k',
      description: 'Looking for an experienced React developer with 3+ years of experience.'
    },
    {
      id: 2,
      title: 'Backend Developer',
      company: 'Digital Innovations',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$90k - $140k',
      description: 'Join our team to build scalable APIs using Node.js and Python.'
    },
    {
      id: 3,
      title: 'Full Stack Developer',
      company: 'Web Dynamics',
      location: 'Remote',
      type: 'Full-time',
      salary: '$85k - $130k',
      description: 'Develop end-to-end solutions using modern web technologies.'
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      company: 'Cloud Systems',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$95k - $145k',
      description: 'Manage and optimize cloud infrastructure on AWS and Azure.'
    },
    {
      id: 5,
      title: 'UI/UX Designer',
      company: 'Creative Studio',
      location: 'Los Angeles, CA',
      type: 'Contract',
      salary: '$60k - $100k',
      description: 'Design beautiful and intuitive user interfaces for web applications.'
    },
    {
      id: 6,
      title: 'Mobile Developer',
      company: 'App Ventures',
      location: 'Seattle, WA',
      type: 'Full-time',
      salary: '$85k - $125k',
      description: 'Build cross-platform mobile applications using React Native.'
    }
  ]);

  const getJobTypeBadgeColor = (type: string): string => {
    switch (type) {
      case 'Full-time':
        return 'bg-green-500';
      case 'Contract':
        return 'bg-amber-500';
      case 'Part-time':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold text-slate-800 mb-8">Available Job Listings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 flex flex-col"
          >
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-bold text-slate-800 flex-1">{job.title}</h2>
              <span className={`${getJobTypeBadgeColor(job.type)} text-white text-xs font-bold px-3 py-1 rounded-full ml-2`}>
                {job.type}
              </span>
            </div>

            <p className="text-slate-600 font-semibold mb-3">{job.company}</p>

            <div className="flex gap-4 mb-4 text-sm text-slate-700">
              <span className="flex items-center gap-1">📍 {job.location}</span>
              <span className="flex items-center gap-1">💰 {job.salary}</span>
            </div>

            <p className="text-slate-600 text-sm mb-6 flex-1">{job.description}</p>

            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors">
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobsListPage;