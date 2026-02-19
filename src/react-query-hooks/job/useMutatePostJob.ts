import { useMutation } from "@tanstack/react-query";
import { jobApi } from "../../services/jobApi";
import { CreateJobDto } from "../../dto/job-posting.dto";

export default function useMutatePostJob() {
    return useMutation({
        mutationFn: async (jobInfo: CreateJobDto) => {
            if (jobInfo.id) {
                const response = await jobApi.update(jobInfo.id, jobInfo);
                return response.data;
            }
            const response = await jobApi.create(jobInfo);
            return response.data;
        },
    });
}
