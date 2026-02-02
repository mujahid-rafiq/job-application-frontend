import { baseApi } from "../base-api";
import type { CreateJobRequest, Job } from "../../entities";

const JOBS = "/jobs";

export const jobApiService = {
  create: (data: CreateJobRequest) =>
    baseApi.post<Job>(`${JOBS}/apply`, data).then((res) => res.data),

  getAll: () => baseApi.get<Job[]>(JOBS).then((res) => res.data),

  getById: (id: number) =>
    baseApi.get<Job | null>(`${JOBS}/${id}`).then((res) => res.data),

  delete: (id: number) => baseApi.delete(`${JOBS}/${id}`),
};
