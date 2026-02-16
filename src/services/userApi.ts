import { BaseAPIService } from "./baseApiService";

export class UserApi extends BaseAPIService {
    login = (data: any) => {
        return this.post("/auth/login", data);
    };

    register = (userData: any) => {
        return this.post("/auth/register", userData);
    };

    verifyOtp = (data: { email: string; otp: string }) => {
        return this.post("/auth/verify-otp", data);
    };

    logout = () => {
        return this.post("/auth/logout", {});
    };
}

export const userApi = new UserApi();

// Alias for customerAPI as requested in snippets
export const customerAPI = userApi;
