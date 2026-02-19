import { useQuery } from "@tanstack/react-query";
import { jobApi } from "../../services/jobApi";
import { JobPosting } from "../../entities/job.entity";

export default function useGetJobs() {
    return useQuery({
        queryKey: ["jobs"],
        queryFn: async (): Promise<JobPosting[]> => {
            const response = await jobApi.getAll();
            return response.data.map((job: any) => ({
                ...job,
                id: job._id,
                salaryRange: job.salary,
                type: job.jobType,
            }));
        },
    });
}
