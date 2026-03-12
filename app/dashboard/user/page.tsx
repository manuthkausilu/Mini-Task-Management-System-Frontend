'use client';

import React, { useEffect, useState, useCallback } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { UserRole, TaskResponseDTO, TaskRequestDTO, TaskStatus } from '@/types';
import { taskService } from '@/services/taskService';
import TaskCard from '@/components/TaskCard';
import TaskModal from '@/components/TaskModal';
import TaskForm from '@/components/TaskForm';

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState<TaskResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskResponseDTO | undefined>(undefined);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await taskService.getTasks();
      setTasks(response.content || []);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateTask = () => {
    setEditingTask(undefined);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: TaskResponseDTO) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = async (id: number) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    try {
      await taskService.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleToggleComplete = async (task: TaskResponseDTO) => {
    try {
      const newStatus = task.status === TaskStatus.DONE ? TaskStatus.IN_PROGRESS : TaskStatus.DONE;

      // If the API supports partial patch for status, we use markAsCompleted or updateTask
      // According to taskService, we have markAsCompleted(id) for Patch /tasks/{id}/complete

      let updatedTask;
      if (newStatus === TaskStatus.DONE) {
        updatedTask = await taskService.markAsCompleted(task.id);
      } else {
        // Generic update for other status changes
        updatedTask = await taskService.updateTask(task.id, {
          title: task.title,
          description: task.description,
          status: TaskStatus.IN_PROGRESS,
          priority: task.priority,
          dueDate: task.dueDate
        });
      }

      setTasks((prev) => prev.map((t) => (t.id === task.id ? updatedTask : t)));
    } catch (error) {
      console.error('Failed to toggle task status:', error);
    }
  };

  const handleFormSubmit = async (data: TaskRequestDTO) => {
    try {
      setActionLoading(true);
      if (editingTask) {
        const updatedTask = await taskService.updateTask(editingTask.id, data);
        setTasks((prev) => prev.map((t) => (t.id === editingTask.id ? updatedTask : t)));
      } else {
        const newTask = await taskService.createTask(data);
        setTasks((prev) => [newTask, ...prev]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save task:', error);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <ProtectedRoute allowedRoles={[UserRole.USER]}>
      <main className="min-h-screen bg-dot-pattern">
        {/* Navbar */}
        <nav className="glass sticky top-0 z-20 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <h1 className="text-xl font-bold gradient-text">MiniTask</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-zinc-400 font-medium">
                {user?.firstName} {user?.lastName}
              </span>
              <button
                onClick={logout}
                className="text-sm bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl transition-all border border-white/10 text-zinc-300"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 animate-in text-white">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold gradient-text leading-tight">Your Dashboard</h2>
              <p className="text-zinc-400 text-lg">You have {tasks.length} active tasks to manage.</p>
            </div>
            <button
              onClick={handleCreateTask}
              className="px-8 py-3 bg-white text-black font-semibold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              Add New Task
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass-card h-64 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : tasks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onToggleComplete={handleToggleComplete}
                />
              ))}
            </div>
          ) : (
            <div className="glass-card p-20 rounded-3xl text-center space-y-6">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
                <svg className="w-10 h-10 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold">No tasks found</h3>
                <p className="text-zinc-400">Get started by creating your first task.</p>
              </div>
              <button
                onClick={handleCreateTask}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/10 text-white"
              >
                Create Task
              </button>
            </div>
          )}
        </div>

        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingTask ? 'Edit Task' : 'Create New Task'}
        >
          <TaskForm
            initialData={editingTask}
            onSubmit={handleFormSubmit}
            onCancel={() => setIsModalOpen(false)}
            loading={actionLoading}
          />
        </TaskModal>
      </main>
    </ProtectedRoute>
  );
}
