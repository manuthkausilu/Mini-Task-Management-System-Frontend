/**
 * Mini Task Management System - Types and Enums
 */

export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}

export enum TaskPriority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
}

export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    confirmPassword?: string;
}

export interface LoginRequest {
    email: string;
    password?: string;
}

export interface AuthResponse {
    token: string;
    type: string;
    userId: number;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
}

export interface TaskRequestDTO {
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string; // ISO 8601 format: yyyy-MM-dd'T'HH:mm:ss
}

export interface TaskResponseDTO {
    id: number;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserResponse {
    userId: number;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
}

export interface TaskQueryParams {
    page?: number;
    size?: number;
    sortBy?: 'dueDate' | 'priority';
    sortDirection?: 'asc' | 'desc';
    status?: TaskStatus;
    priority?: TaskPriority;
}

export interface PaginatedResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
    empty: boolean;
}

export interface ApiError {
    status: number;
    message: string;
    timestamp?: string;
    path: string;
}
