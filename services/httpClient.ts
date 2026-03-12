import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ApiError } from '../types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: Attach token if available
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log(`🚀 [API Request] ${config.method?.toUpperCase()} ${config.url}`, config.data || '');
        return config;
    },
    (error) => {
        console.error('❌ [API Request Error]', error);
        return Promise.reject(error);
    }
);

// Response Interceptor: Handle errors consistently
axiosInstance.interceptors.response.use(
    (response) => {
        console.log(`✅ [API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
        return response.data;
    },
    (error: AxiosError<ApiError>) => {
        const apiError: ApiError = {
            status: error.response?.status || 500,
            message: error.response?.data?.message || error.message || 'An unexpected error occurred',
            path: error.config?.url || '',
            timestamp: new Date().toISOString(),
        };
        console.error(`❌ [API Error] ${error.config?.method?.toUpperCase()} ${error.config?.url}`, apiError);
        return Promise.reject(apiError);
    }
);

export const httpClient = {
    async get<T>(path: string, options?: any): Promise<T> {
        return axiosInstance.get<any, T>(path, options);
    },

    async post<T>(path: string, body: any, options?: any): Promise<T> {
        return axiosInstance.post<any, T>(path, body, options);
    },

    async put<T>(path: string, body: any, options?: any): Promise<T> {
        return axiosInstance.put<any, T>(path, body, options);
    },

    async patch<T>(path: string, body?: any, options?: any): Promise<T> {
        return axiosInstance.patch<any, T>(path, body, options);
    },

    async delete(path: string, options?: any): Promise<void> {
        return axiosInstance.delete(path, options);
    },
};
