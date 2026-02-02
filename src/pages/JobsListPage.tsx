import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { jobApiService } from "../api";
import type { Job } from "../entities";

const getErrorMessage = (err: any) =>
  err.response?.data?.message?.join?.(" ") ||
  err.response?.data?.message ||
  err.message ||
  "Failed to load.";

const formatDate = (s: string) =>
  new Date(s).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function JobsListPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    jobApiService
      .getAll()
      .then(setJobs)
      .catch((err) => {
        const msg = getErrorMessage(err);
        setError(msg);
        toast.error(msg);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-[200px] text-slate-600">Loading...</div>;
  if (error) return <div className="p-4 bg-red-100 border border-red-400 text-red-800 rounded-lg">{error}</div>;

  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold text-slate-800 mb-8">Job Applications</h1>

      {jobs.length === 0 ? (
        <p className="text-center text-slate-600 py-12">No applications yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 flex flex-col"
            >
              <h2 className="text-xl font-bold text-slate-800 mb-2">{job.fullName}</h2>
              <p className="text-slate-600 font-semibold mb-1">{job.position}</p>
              <p className="text-slate-600 text-sm mb-2">{job.email}</p>
              <p className="text-slate-600 text-sm mb-2">{job.phone}</p>
              {job.experience && <p className="text-slate-700 text-sm mb-2">Experience: {job.experience}</p>}
              {job.coverLetter && <p className="text-slate-600 text-sm mb-4 line-clamp-2">{job.coverLetter}</p>}
              <p className="text-slate-500 text-xs mt-auto">Applied: {formatDate(job.createdAt)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
