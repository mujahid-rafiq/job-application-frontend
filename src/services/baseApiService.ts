import type { AxiosInstance } from "axios";
import { getAxiosInstance } from "../axios/axiosInstance";

export interface RequestConfig {
  headers?: Record<string, string>;
}

export class BaseAPIService {
  axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = getAxiosInstance();
  }

  get = async (url: string, params?: any): Promise<any> => {
    return this.axiosInstance.get(url, { params });
  };

  post = async (url: string, data: any, config?: RequestConfig): Promise<any> => {
    return this.axiosInstance.post(url, data, config);
  };

  put = async (url: string, data: any): Promise<any> => {
    return this.axiosInstance.put(url, data);
  };

  patch = async (url: string, data: any): Promise<any> => {
    return this.axiosInstance.patch(url, data);
  };

  delete = async (url: string): Promise<any> => {
    return this.axiosInstance.delete(url);
  };
}

export const baseAPIService = new BaseAPIService();
