import { BaseAPIService } from "./baseApiService";
import type { CreateJobRequest } from "../entities/job.entity";
import { Job } from "../data/mockJobs";

const JOBS = "/jobs";

export class JobApi extends BaseAPIService {
  create = async (data: CreateJobRequest): Promise<Job> => {
    const response = await this.post(`${JOBS}/apply`, data);
    return response.data;
  };

  getAll = async (): Promise<Job[]> => {
    const response = await this.get(JOBS);
    return response.data;
  };

  getById = async (id: number): Promise<Job | null> => {
    const response = await this.get(`${JOBS}/${id}`);
    return response.data;
  };

  deleteJob = async (id: number): Promise<any> => {
    return this.delete(`${JOBS}/${id}`);
  };
}

export const jobApiService = new JobApi();
