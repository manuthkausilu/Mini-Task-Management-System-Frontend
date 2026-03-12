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
      const data = await taskService.getTasks({ page, size: 5 });
      setTasksData(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setTasksLoading(false);
    }
  }, []);

  // Fetch counts on mount
  useEffect(() => {
    fetchUsers(0);
    fetchTasks(0);
  }, [fetchUsers, fetchTasks]);

  // Tab and Page specific fetching
  useEffect(() => {
    if (activeTab === 'users' && usersPage !== 0) fetchUsers(usersPage);
    if (activeTab === 'tasks' && tasksPage !== 0) fetchTasks(tasksPage);
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
      <main className="min-h-screen bg-dot-pattern relative overflow-hidden">
        {/* Modern Background Decorators */}
        <div className="glow-overlay" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />

        {/* Navbar */}
        <nav className="glass sticky top-0 z-50 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <h1 className="text-xl font-black tracking-tight gradient-text">
              MINITASK
            </h1>
            <div className="flex items-center gap-6">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-xs font-bold text-white uppercase tracking-tighter">Administrator</span>
                <span className="text-[10px] text-zinc-500 font-medium">{user?.email}</span>
              </div>
              <button
                onClick={logout}
                className="group relative px-5 py-2 rounded-full bg-white text-black text-xs font-bold transition-all hover:scale-105 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10">Logout</span>
                <div className="absolute inset-0 bg-zinc-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 py-16 space-y-16 relative z-10 animate-in">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              System Online
            </div>
            <h2 className="text-6xl font-black text-white tracking-tighter">Control <span className="gradient-text">Center</span></h2>
            <p className="text-zinc-500 text-xl max-w-2xl font-medium leading-relaxed">Global system management and real-time activity monitoring.</p>
          </div>

          {/* Premium Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="glass-card p-8 rounded-[2rem] relative overflow-hidden card-glow-blue group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
                <span className="text-[10px] font-bold text-blue-400 bg-blue-500/5 px-2 py-1 rounded-lg">+12%</span>
              </div>
              <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Total Users</h3>
              <p className="text-4xl font-black text-white mt-2 tracking-tighter">{usersData?.totalElements || '0'}</p>
            </div>

            <div className="glass-card p-8 rounded-[2rem] relative overflow-hidden card-glow-purple group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-purple-500/10 rounded-2xl border border-purple-500/20">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                </div>
                <span className="text-[10px] font-bold text-purple-400 bg-purple-500/5 px-2 py-1 rounded-lg">Live</span>
              </div>
              <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Active Tasks</h3>
              <p className="text-4xl font-black text-white mt-2 tracking-tighter">{tasksData?.totalElements || '0'}</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-8 border-b border-white/5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('users')}
              className={`pb-4 text-xs font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === 'users' ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'
                }`}
            >
              User Registry
              {activeTab === 'users' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-t-full shadow-[0_0_20px_rgba(255,255,255,0.5)]" />}
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`pb-4 text-xs font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === 'tasks' ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'
                }`}
            >
              Task Monitoring
              {activeTab === 'tasks' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-t-full shadow-[0_0_20px_rgba(255,255,255,0.5)]" />}
            </button>
          </div>

          {/* User Management Content */}
          {activeTab === 'users' && (
            <div className="glass-card rounded-[2.5rem] overflow-hidden border border-white/5 animate-in">
              <div className="p-10 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-3xl font-black text-white tracking-tighter">User Registry</h3>
                  <p className="text-zinc-500 text-sm font-medium mt-1">Authorized personnel and access levels.</p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    disabled={usersPage === 0 || usersLoading}
                    onClick={() => setUsersPage(p => p - 1)}
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl disabled:opacity-20 border border-white/5 transition-all active:scale-95"
                  >
                    <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <div className="px-5 py-2.5 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-xs font-bold text-zinc-400 tabular-nums">Page {usersPage + 1} / {usersData?.totalPages || 1}</span>
                  </div>
                  <button
                    disabled={usersData?.last || usersLoading}
                    onClick={() => setUsersPage(p => p + 1)}
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl disabled:opacity-20 border border-white/5 transition-all active:scale-95"
                  >
                    <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-[10px] uppercase text-zinc-600 font-black tracking-[0.2em] bg-white/[0.01]">
                      <th className="px-10 py-6">Identity</th>
                      <th className="px-10 py-6">Nexus Address</th>
                      <th className="px-10 py-6">Protocol Authority</th>
                      <th className="px-10 py-6 text-right">Operations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.03] text-zinc-400">
                    {usersLoading ? (
                      [1, 2, 3].map(i => (
                        <tr key={i} className="animate-pulse">
                          <td colSpan={4} className="px-10 py-8"><div className="h-10 bg-white/5 rounded-2xl w-full"></div></td>
                        </tr>
                      ))
                    ) : usersData?.content.map((u) => (
                      <tr key={u.userId} className="group hover:bg-white/[0.02] transition-colors relative">
                        <td className="px-10 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-white/10 relative overflow-hidden group-hover:border-white/20 transition-all">
                              <span className="font-black text-blue-400 relative z-10">{u.firstName[0]}{u.lastName[0]}</span>
                              <div className="absolute inset-0 bg-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-white tracking-tight">{u.firstName} {u.lastName}</span>
                              <span className="text-[10px] text-zinc-600 uppercase font-black tracking-widest mt-0.5">UID: {u.userId.toString().padStart(4, '0')}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-10 py-6 text-sm font-medium">{u.email}</td>
                        <td className="px-10 py-6">
                          <div className="relative inline-block w-40">
                            <select
                              value={u.role}
                              disabled={actionLoading === u.userId || u.userId === user?.userId}
                              onChange={(e) => handleRoleChange(u.userId, e.target.value as UserRole)}
                              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer hover:bg-white/10"
                            >
                              <option value={UserRole.USER} className="bg-zinc-950">PERMITTED: USER</option>
                              <option value={UserRole.ADMIN} className="bg-zinc-950">PERMITTED: ADMIN</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                              <svg className="w-3 h-3 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                            </div>
                          </div>
                        </td>
                        <td className="px-10 py-6 text-right">
                          <button
                            onClick={() => handleDeleteUser(u.userId)}
                            disabled={actionLoading === u.userId || u.userId === user?.userId}
                            className="p-3 text-zinc-600 hover:text-red-400 bg-white/5 hover:bg-red-400/10 rounded-2xl border border-white/5 hover:border-red-400/20 transition-all disabled:opacity-0 active:scale-95"
                            title="Decommission User"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </td>
                      </tr>
                    )) || (
                      <tr>
                        <td colSpan={4} className="px-10 py-32 text-center">
                          <div className="flex flex-col items-center gap-4">
                            <div className="p-6 bg-white/5 rounded-full border border-dashed border-white/10">
                              <svg className="w-12 h-12 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                            </div>
                            <span className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Registry Empty</span>
                          </div>
                        </td>
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
