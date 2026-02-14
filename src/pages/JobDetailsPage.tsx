import React, { useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { mockJobs } from '../data/mockJobs';
import CareerHeader from '../components/Career/CareerHeader';

const JobDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const job = useMemo(() => {
        return mockJobs.find(j => j.id === id);
    }, [id]);

    if (!job) {
        return (
            <div className="min-h-screen bg-white">
                <CareerHeader />
                <div className="max-w-3xl mx-auto px-4 py-20 text-center">
                    <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
                    <button
                        onClick={() => navigate('/career')}
                        className="text-blue-600 hover:underline"
                    >
                        Back to Careers
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            <CareerHeader />

            <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <nav className="mb-8">
                    <Link to="/career" className="text-gray-500 hover:text-blue-600 text-sm font-medium flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                        Back to Career
                    </Link>
                </nav>

                <div className="bg-white rounded-2xl border border-gray-100 p-8 md:p-12 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-blue-600 font-semibold tracking-wider text-sm uppercase">{job.category}</span>
                                {job.isNew && (
                                    <span className="bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded font-medium">New</span>
                                )}
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-black mb-4">{job.title}</h1>
                            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-gray-500 font-medium">
                                <div className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>
                                    {job.location}
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    {job.type}
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    {job.salaryRange}
                                </div>
                            </div>
                        </div>
                        <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200">
                            Apply Now
                        </button>
                    </div>

                    <div className="prose prose-blue max-w-none">
                        <section className="mb-8">
                            <h2 className="text-xl font-bold text-black mb-4 border-b border-gray-100 pb-2">About the Role</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {job.description} This is a placeholder for a more detailed job description.
                                We are looking for talented individuals to join our growing team at Code Upscale.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-bold text-black mb-4 border-b border-gray-100 pb-2">Key Responsibilities</h2>
                            <ul className="list-disc pl-5 text-gray-600 space-y-2 text-lg">
                                <li>Collaborate with cross-functional teams to define, design, and ship new features.</li>
                                <li>Work on bug fixing and improving application performance.</li>
                                <li>Continuously discover, evaluate, and implement new technologies to maximize development efficiency.</li>
                                <li>Ensure the technical feasibility of UI/UX designs.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-black mb-4 border-b border-gray-100 pb-2">Requirements</h2>
                            <ul className="list-disc pl-5 text-gray-600 space-y-2 text-lg">
                                <li>Proven experience in the relevant field.</li>
                                <li>Strong problem-solving skills and attention to detail.</li>
                                <li>Excellent communication and teamwork skills.</li>
                                <li>Degree in Computer Science or a related field (plus).</li>
                            </ul>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default JobDetailsPage;
