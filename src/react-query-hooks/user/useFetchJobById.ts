import { useQuery } from "@tanstack/react-query";
import { customerAPI } from "../../services/userApi";
import { JobPosting } from "../../entities/job.entity";

const fetchJobById = async (id: string): Promise<JobPosting> => {
    const response = await customerAPI.get(`/jobs/${id}`);
    const job = response.data;
    return {
        ...job,
        id: job._id,
        salaryRange: job.salary,
        type: job.jobType,
    };
};

export default function useFetchJobById(id: string | undefined) {
    return useQuery({
        queryKey: ["job", id],
        queryFn: () => fetchJobById(id!),
        enabled: !!id,
    });
}
