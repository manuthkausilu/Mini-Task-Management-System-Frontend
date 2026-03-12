import { httpClient } from './httpClient';
import {
    AuthResponse,
    PaginatedResponse,
    RegisterRequest,
    TaskResponseDTO,
    UserResponse,
    UserRole
} from '../types';

export const adminService = {
    /**
     * Register a new admin user (ADMIM only)
     */
    async registerAdmin(data: RegisterRequest): Promise<AuthResponse> {
        return httpClient.post<AuthResponse>('/admin/users/register', data);
    },

    /**
     * Get all users (ADMIN only)
     */
    async getAllUsers(page: number = 0, size: number = 10): Promise<PaginatedResponse<UserResponse>> {
        return httpClient.get<PaginatedResponse<UserResponse>>(`/admin/users?page=${page}&size=${size}`);
    },

    /**
     * Get user by ID (ADMIN only)
     */
    async getUserById(userId: number): Promise<UserResponse> {
        return httpClient.get<UserResponse>(`/admin/users/${userId}`);
    },

    /**
     * Change user role (ADMIN only)
     */
    async changeUserRole(userId: number, role: UserRole): Promise<UserResponse> {
        return httpClient.patch<UserResponse>(`/admin/users/${userId}/role?role=${role}`);
    },

    /**
     * Delete user (ADMIN only)
     */
    async deleteUser(userId: number): Promise<void> {
        return httpClient.delete(`/admin/users/${userId}`);
    },

    /**
     * Get current admin info
     */
    async getCurrentAdmin(): Promise<UserResponse> {
        return httpClient.get<UserResponse>('/admin/users/me');
    }
};
