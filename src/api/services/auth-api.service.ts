import { baseApi } from "../base-api";
import { AuthResponse, User } from "../../entities/user.entity";

export const authApiService = {
    login: async (credentials: any): Promise<AuthResponse> => {
        const response = await baseApi.post<AuthResponse>("/auth/login", credentials);
        return response.data;
    },

    register: async (userData: any): Promise<{ message: string; email: string }> => {
        const response = await baseApi.post("/auth/register", userData);
        return response.data;
    },

    verifyOtp: async (data: { email: string; otp: string }): Promise<{ message: string }> => {
        const response = await baseApi.post("/auth/verify-otp", data);
        return response.data;
    },
};
