import { httpClient } from './httpClient';
import {
    PaginatedResponse,
    TaskQueryParams,
    TaskRequestDTO,
    TaskResponseDTO
} from '../types';

export const taskService = {
    /**
     * Get all tasks with optional filters and pagination
     */
    async getTasks(params: TaskQueryParams = {}): Promise<PaginatedResponse<TaskResponseDTO>> {
        const queryParams = new URLSearchParams();

        if (params.page !== undefined) queryParams.append('page', params.page.toString());
        if (params.size !== undefined) queryParams.append('size', params.size.toString());
        if (params.sortBy) queryParams.append('sortBy', params.sortBy);
        if (params.sortDirection) queryParams.append('sortDirection', params.sortDirection);
        if (params.status) queryParams.append('status', params.status);
        if (params.priority) queryParams.append('priority', params.priority);

        const queryString = queryParams.toString();
        const path = `/tasks${queryString ? `?${queryString}` : ''}`;

        return httpClient.get<PaginatedResponse<TaskResponseDTO>>(path);
    },

    /**
     * Get a task by ID
     */
    async getTaskById(id: number): Promise<TaskResponseDTO> {
        return httpClient.get<TaskResponseDTO>(`/tasks/${id}`);
    },

    /**
     * Create a new task
     */
    async createTask(data: TaskRequestDTO): Promise<TaskResponseDTO> {
        return httpClient.post<TaskResponseDTO>('/tasks', data);
    },

    /**
     * Update an existing task
     */
    async updateTask(id: number, data: TaskRequestDTO): Promise<TaskResponseDTO> {
        return httpClient.put<TaskResponseDTO>(`/tasks/${id}`, data);
    },

    /**
     * Delete a task
     */
    async deleteTask(id: number): Promise<void> {
        return httpClient.delete(`/tasks/${id}`);
    },

    /**
     * Mark a task as completed
     */
    async markAsCompleted(id: number): Promise<TaskResponseDTO> {
        return httpClient.patch<TaskResponseDTO>(`/tasks/${id}/complete`);
    }
};
