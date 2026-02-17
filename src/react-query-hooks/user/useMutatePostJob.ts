import { useMutation } from "@tanstack/react-query";
import { customerAPI } from "../../services/userApi";
import { CreateJobDto } from "../../dto/job-posting.dto";

const postJob = async (jobInfo: CreateJobDto) => {
    if (jobInfo.id) {
        const response = await customerAPI.patch(`/jobs/${jobInfo.id}`, jobInfo);
        return response.data;
    }
    const response = await customerAPI.post("/jobs", jobInfo);
    return response.data;
};

export default function useMutationPostJobs() {
    return useMutation({
        mutationFn: (jobInfo: CreateJobDto) => postJob(jobInfo),
    });
}
