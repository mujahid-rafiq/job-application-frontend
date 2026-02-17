import React, { useState } from 'react';
// import { JobPosting } from '../entities/job.entity';
import { EditIcon, TrashIcon, MapPinIcon, BriefcaseIcon, DollarSignIcon } from '../Common/SvgIcons';
import { JobPosting } from '../../entities/job.entity';

interface AdminJobCardProps {
    job: JobPosting;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const AdminJobCard: React.FC<AdminJobCardProps> = ({ job, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{job?.title}</h3>
                        {job?.isNew && (
                            <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                New
                            </span>
                        )}
                    </div>
                    <p className="text-gray-500 font-medium">{job?.company}</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => job?.id && onEdit(job?.id)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Job"
                    >
                        <EditIcon className="w-5 h-5" />
                    </button>
                    <button
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Job"
                        onClick={() => job?.id && onDelete(job?.id)}

                    >
                        <TrashIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-y-3 mb-6">
                <div className="flex items-center text-gray-600">
                    <MapPinIcon className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm">{job?.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                    <BriefcaseIcon className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm">{job?.jobType}</span>
                </div>
                <div className="flex items-center text-gray-600">
                    <DollarSignIcon className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm">{job?.salary}</span>
                </div>
                <div className="flex items-center text-gray-600">
                    <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded">
                        {job?.category}
                    </span>
                </div>
            </div>

            <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                {job?.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-2 ${job?.isActive ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {job?.isActive ? 'Active' : 'Inactive'}
                    </span>
                </div>
                {/* <button
                    onClick={() => job.id && onEdit(job.id)}
                    className="text-blue-600 text-sm font-semibold hover:text-blue-700 transition-colors"
                >
                    View Details →
                </button> */}
            </div>
        </div>
    );
};

export default AdminJobCard;
