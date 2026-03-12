import { httpClient } from './httpClient';
import { AuthResponse, LoginRequest, RegisterRequest } from '../types';

export const authService = {
    /**
     * Register a new user
     */
    async register(data: RegisterRequest): Promise<AuthResponse> {
        return httpClient.post<AuthResponse>('/auth/register', data);
    },

    /**
     * Login a user
     */
    async login(data: LoginRequest): Promise<AuthResponse> {
        return httpClient.post<AuthResponse>('/auth/login', data);
    },

    /**
     * Logout user (client-side cleanup usually, but could call API if needed)
     */
    logout(): void {
        // Implementation depends on where the token is stored (localStorage, cookies, etc.)
        // For now, this is a placeholder.
    }
};
