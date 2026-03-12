'use client';

import React, { useEffect, useState, useCallback } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { UserRole, UserResponse, PaginatedResponse, TaskResponseDTO } from '@/types';
import { adminService } from '@/services/adminService';
import { taskService } from '@/services/taskService';
import AllTasksTable from '@/components/AllTasksTable';

export default function AdminDashboard() {
  const { user, logout } = useAuth();

  // Tabs State
  const [activeTab, setActiveTab] = useState<'users' | 'tasks'>('users');

  // Users State
  const [usersData, setUsersData] = useState<PaginatedResponse<UserResponse> | null>(null);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersPage, setUsersPage] = useState(0);

  // Tasks State
  const [tasksData, setTasksData] = useState<PaginatedResponse<TaskResponseDTO> | null>(null);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [tasksPage, setTasksPage] = useState(0);

  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const fetchUsers = useCallback(async (page: number) => {
    try {
      setUsersLoading(true);
      const data = await adminService.getAllUsers(page, 5);
      setUsersData(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setUsersLoading(false);
    }
  }, []);

  const fetchTasks = useCallback(async (page: number) => {
    try {
      setTasksLoading(true);
      const data = await taskService.getTasks({ page, size: 5 }, true);
      setTasksData(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setTasksLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'users') fetchUsers(usersPage);
    if (activeTab === 'tasks') fetchTasks(tasksPage);
  }, [activeTab, usersPage, tasksPage, fetchUsers, fetchTasks]);

  const handleRoleChange = async (userId: number, newRole: UserRole) => {
    try {
      setActionLoading(userId);
      await adminService.changeUserRole(userId, newRole);
      setUsersData(prev => prev ? ({
        ...prev,
        content: prev.content.map(u => u.userId === userId ? { ...u, role: newRole } : u)
      }) : null);
    } catch (error) {
      console.error('Failed to change role:', error);
      alert('Failed to update user role.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      setActionLoading(userId);
      await adminService.deleteUser(userId);
      fetchUsers(usersPage);
    } catch (error) {
      console.error('Failed to delete user:', error);
      alert('Failed to delete user.');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
      <main className="min-h-screen bg-dot-pattern">
        {/* Navbar */}
        <nav className="glass sticky top-0 z-20 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <h1 className="text-xl font-bold gradient-text">
              MiniTask <span className="text-xs font-normal text-zinc-500 px-2 py-1 bg-white/5 rounded border border-white/10 ml-2">ADMIN</span>
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-zinc-400">Admin: {user?.firstName}</span>
              <button
                onClick={logout}
                className="text-sm bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl transition-all border border-white/10 text-zinc-300"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 animate-in">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold text-white gradient-text">Admin Control Center</h2>
            <p className="text-zinc-400 text-lg">Manage system users and monitor global activity</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="glass-card p-6 rounded-2xl border border-white/5">
              <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Total Users</h3>
              <p className="text-3xl font-bold text-white mt-1">{usersData?.totalElements || '0'}</p>
            </div>
            <div className="glass-card p-6 rounded-2xl border border-white/5">
              <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Total Tasks</h3>
              <p className="text-3xl font-bold text-white mt-1">{tasksData?.totalElements || '0'}</p>
            </div>
            <div className="glass-card p-6 rounded-2xl border border-white/5">
              <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">System Load</h3>
              <p className="text-3xl font-bold text-white mt-1">14%</p>
            </div>
            <div className="glass-card p-6 rounded-2xl border border-white/5">
              <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Server Status</h3>
              <p className="text-3xl font-bold text-green-500 mt-1">Optimal</p>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex gap-4 border-b border-white/5 pb-1">
            <button
              onClick={() => setActiveTab('users')}
              className={`pb-4 px-2 text-sm font-semibold transition-all relative ${activeTab === 'users' ? 'text-white' : 'text-zinc-500 hover:text-zinc-400'
                }`}
            >
              User Management
              {activeTab === 'users' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full shadow-[0_0_10px_white]" />}
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`pb-4 px-2 text-sm font-semibold transition-all relative ${activeTab === 'tasks' ? 'text-white' : 'text-zinc-500 hover:text-zinc-400'
                }`}
            >
              Task Oversight
              {activeTab === 'tasks' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full shadow-[0_0_10px_white]" />}
            </button>
          </div>

          {/* User Management Content */}
          {activeTab === 'users' && (
            <div className="glass-card rounded-3xl overflow-hidden border border-white/5 animate-in">
              <div className="p-8 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">User Management</h3>
                <div className="flex gap-2">
                  <button
                    disabled={usersPage === 0 || usersLoading}
                    onClick={() => setUsersPage(p => p - 1)}
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg disabled:opacity-30 border border-white/10 transition-all"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <span className="flex items-center px-4 text-sm text-zinc-400">Page {usersPage + 1} of {usersData?.totalPages || 1}</span>
                  <button
                    disabled={usersData?.last || usersLoading}
                    onClick={() => setUsersPage(p => p + 1)}
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg disabled:opacity-30 border border-white/10 transition-all"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-xs uppercase text-zinc-500 font-semibold bg-white/[0.02]">
                      <th className="px-8 py-5">Full Name</th>
                      <th className="px-8 py-5">Email</th>
                      <th className="px-8 py-5">Role</th>
                      <th className="px-8 py-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-zinc-300">
                    {usersLoading ? (
                      [1, 2, 3].map(i => (
                        <tr key={i} className="animate-pulse">
                          <td colSpan={4} className="px-8 py-6"><div className="h-6 bg-white/5 rounded-lg w-full"></div></td>
                        </tr>
                      ))
                    ) : usersData?.content.map((u) => (
                      <tr key={u.userId} className="group hover:bg-white/[0.01] transition-colors">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-white/10 font-bold text-blue-400 mt-1">
                              {u.firstName[0]}{u.lastName[0]}
                            </div>
                            <span className="font-medium text-white">{u.firstName} {u.lastName}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-sm text-zinc-400">{u.email}</td>
                        <td className="px-8 py-5">
                          <select
                            value={u.role}
                            disabled={actionLoading === u.userId || u.userId === user?.userId}
                            onChange={(e) => handleRoleChange(u.userId, e.target.value as UserRole)}
                            className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/20 transition-all appearance-none cursor-pointer hover:bg-white/10"
                          >
                            <option value={UserRole.USER} className="bg-zinc-900">USER</option>
                            <option value={UserRole.ADMIN} className="bg-zinc-900">ADMIN</option>
                          </select>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <button
                            onClick={() => handleDeleteUser(u.userId)}
                            disabled={actionLoading === u.userId || u.userId === user?.userId}
                            className="p-2 text-zinc-500 hover:text-red-500 bg-white/5 hover:bg-red-500/10 rounded-xl border border-white/10 hover:border-red-500/20 transition-all disabled:opacity-0"
                            title="Delete User"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </td>
                      </tr>
                    )) || (
                      <tr>
                        <td colSpan={4} className="px-8 py-20 text-center text-zinc-500">No users found in the system.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Task Oversight Content */}
          {activeTab === 'tasks' && (
            <AllTasksTable
              tasks={tasksData?.content || []}
              loading={tasksLoading}
              currentPage={tasksPage}
              totalPages={tasksData?.totalPages || 1}
              last={tasksData?.last || false}
              onPageChange={setTasksPage}
            />
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}
