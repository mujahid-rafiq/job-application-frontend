import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { ROUTES } from '../app-routes/constants';
import { JobPosting, jobPostingValidationSchema } from '../entities/job.entity';
import BaseInput from '../components/form/base-input';
import BaseTextArea from '../components/form/base-text-area';
import BaseSelect from '../components/form/base-select';
import Button from '../components/form/buttons/base-button';

const initialValues: JobPosting = {
    title: '',
    company: 'Code Upscale',
    category: '',
    location: '',
    salary: '',
    jobType: 'Full-time',
    isNew: true,
    isActive: true,
    description: '',
};

const AdminJobFormPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    const formik = useFormik<JobPosting>({
        initialValues,
        validationSchema: jobPostingValidationSchema,
        onSubmit: async (values) => {
            // API integration will happen later
            console.log('Form values:', values);
            toast.success(isEditMode ? 'Job updated successfully (UI only)' : 'Job posted successfully (UI only)');
            navigate(ROUTES.ADMIN_JOBS);
        },
    });

    useEffect(() => {
        if (isEditMode) {
            // In a real app, you'd fetch the job details here
            // For now, we'll just mock it if id exists
            toast.success('Mocking data for edit mode');
            formik.setValues({
                id,
                title: 'Senior MERN Stack Developer',
                company: 'Code Upscale',
                category: 'Engineering',
                location: 'Lahore, Pakistan',
                salary: 'Rs. 150,000 - 250,000',
                jobType: 'Full-time',
                isNew: true,
                isActive: true,
                description: 'We are looking for a Senior MERN Stack Developer to lead our web development projects...',
            });
        }
    }, [id, isEditMode]);

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <div className="mb-8">
                <button
                    onClick={() => navigate(ROUTES.ADMIN_JOBS)}
                    className="text-gray-500 hover:text-gray-700 font-medium flex items-center mb-4 transition-colors"
                >
                    ← Back to Jobs
                </button>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    {isEditMode ? 'Edit Job Posting' : 'Create New Job Posting'}
                </h1>
                <p className="mt-1 text-gray-500">
                    {isEditMode ? 'Update the details of your job opening.' : 'Fill out the form below to post a new career opportunity.'}
                </p>
            </div>

            <form onSubmit={formik.handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <BaseInput
                        formik={formik}
                        name="title"
                        label="Job Title"
                        placeholder="e.g. Senior Software Engineer"
                        required
                    />
                    <BaseInput
                        formik={formik}
                        name="company"
                        label="Company"
                        placeholder="Company name"
                        disabled
                        required
                    />
                    <BaseSelect
                        formik={formik}
                        name="category"
                        label="Category"
                        options={[
                            { label: 'Select Category', value: '' },
                            { label: 'Engineering', value: 'Engineering' },
                            { label: 'Design', value: 'Design' },
                            { label: 'Sales', value: 'Sales' },
                            { label: 'Marketing', value: 'Marketing' },
                            { label: 'Human Resources', value: 'HR' },
                        ]}
                        required
                    />
                    <BaseSelect
                        formik={formik}
                        name="jobType"
                        label="Job Type"
                        options={[
                            { label: 'Full-time', value: 'Full-time' },
                            { label: 'Part-time', value: 'Part-time' },
                            { label: 'Contract', value: 'Contract' },
                            { label: 'Internship', value: 'Internship' },
                            { label: 'Remote', value: 'Remote' },
                        ]}
                        required
                    />
                    <BaseInput
                        formik={formik}
                        name="location"
                        label="Location"
                        placeholder="e.g. Lahore, Pakistan or Remote"
                        required
                    />
                    <BaseInput
                        formik={formik}
                        name="salary"
                        label="Salary Range"
                        placeholder="e.g. Rs. 100k - 150k"
                        required
                    />
                </div>

                <BaseTextArea
                    formik={formik}
                    name="description"
                    label="Job Description"
                    placeholder="Describe the role, responsibilities, and requirements..."
                    rows={8}
                    required
                />

                <div className="flex flex-col sm:flex-row gap-6 pt-4 border-t border-gray-50">
                    <div className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            id="isNew"
                            name="isNew"
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                            checked={formik.values.isNew}
                            onChange={formik.handleChange}
                        />
                        <label htmlFor="isNew" className="text-gray-700 font-medium cursor-pointer select-none">
                            Mark as "New"
                        </label>
                    </div>
                    <div className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            id="isActive"
                            name="isActive"
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                            checked={formik.values.isActive}
                            onChange={formik.handleChange}
                        />
                        <label htmlFor="isActive" className="text-gray-700 font-medium cursor-pointer select-none">
                            Active (Visible to job seekers)
                        </label>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-50">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => navigate(ROUTES.ADMIN_JOBS)}
                        btnClass="px-8"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        btnClass="px-10"
                    >
                        {isEditMode ? 'Update Posting' : 'Publish Job'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AdminJobFormPage;
