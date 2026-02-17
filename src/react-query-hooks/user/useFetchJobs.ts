import { useQuery } from "@tanstack/react-query";
import { customerAPI } from "../../services/userApi";
import { JobPosting } from "../../entities/job.entity";

const fetchJobs = async (): Promise<JobPosting[]> => {
    const response = await customerAPI.get("/jobs");
    return response.data.map((job: any) => ({
        ...job,
        id: job._id,
        salaryRange: job.salary,
        type: job.jobType,
    }));
};

export default function useFetchJobs() {
    return useQuery({
        queryKey: ["jobs"],
        queryFn: fetchJobs,
    });
}
