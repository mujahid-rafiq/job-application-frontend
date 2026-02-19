import { BaseAPIService } from "./baseApiService";

export class JobApi extends BaseAPIService {
  create = (data: any) => {
    return this.post("/jobs", data);
  };

  getAll = () => {
    return this.get("/jobs");
  };

  getById = (id: string) => {
    return this.get(`/jobs/${id}`);
  };

  update = (id: string, data: any) => {
    return this.patch(`/jobs/${id}`, data);
  };

  deleteJob = (id: string) => {
    return this.delete(`/jobs/${id}`);
  };

  apply = (data: any) => {
    return this.post("/jobs/apply", data);
  }
}

export const jobApi = new JobApi();
