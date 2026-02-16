import axios, { type AxiosRequestConfig, type AxiosInstance } from 'axios';
// import { store } from '../redux/store';
import { logout } from '../redux/slices/authSlice';
import { ROUTES } from '../app-routes/constants';
import { store } from '../redux/store';

// Request Interceptor
const requestHandler = (request: any) => {
    const token = localStorage.getItem('token');
    if (token) {
        request.headers['Authorization'] = `Bearer ${token}`;
    }
    if (request.data instanceof FormData) {
        delete request.headers['Content-Type'];
    }
    return request;
};

// Response Success Interceptor
const successResponseHandler = (response: any) => {
    return response;
};

// Response Error Interceptor
const errorResponseHandler = async (error: any) => {
    // If the error is 401
    if (error.response?.status === 401) {
        // Clear auth data and redirect to login
        store.dispatch(logout());
        window.location.href = ROUTES.LOGIN;
        return Promise.reject(error);
    }

    return Promise.reject(error);
};

export const getAxiosInstance = (config: AxiosRequestConfig = {}): AxiosInstance => {
    const baseURL = (process.env.REACT_APP_API_URL ||
        (import.meta as any).env?.VITE_REACT_APP_BASE_API_URL ||
        'http://localhost:3000');

    const instance = axios.create({
        baseURL,
        ...config,
        headers: {
            'Content-Type': 'application/json',
            ...(config.headers || {}),
        },
    });

    // Attach interceptors
    instance.interceptors.request.use(requestHandler);
    instance.interceptors.response.use(successResponseHandler, errorResponseHandler);

    return instance;
};
