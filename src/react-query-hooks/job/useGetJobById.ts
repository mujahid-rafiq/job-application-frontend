import { useQuery } from "@tanstack/react-query";
import { jobApi } from "../../services/jobApi";
import { JobPosting } from "../../entities/job.entity";

export default function useGetJobById(id: string | undefined) {
    return useQuery({
        queryKey: ["job", id],
        queryFn: async (): Promise<JobPosting> => {
            const response = await jobApi.getById(id!);
            const job = response.data;
            return {
                ...job,
                id: job._id,
                salaryRange: job.salary,
                type: job.jobType,
            };
        },
        enabled: !!id,
    });
}
