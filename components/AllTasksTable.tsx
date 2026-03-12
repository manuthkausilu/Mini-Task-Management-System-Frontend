'use client';

import React from 'react';
import { TaskResponseDTO, TaskStatus, TaskPriority } from '@/types';
import { StatusBadge, PriorityBadge } from './Badges';
import { format } from 'date-fns';

interface AllTasksTableProps {
  tasks: TaskResponseDTO[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  last: boolean;
  onPageChange: (page: number) => void;
}

export default function AllTasksTable({
  tasks,
  loading,
  currentPage,
  totalPages,
  last,
  onPageChange
}: AllTasksTableProps) {
  return (
    <div className="glass-card rounded-[2.5rem] overflow-hidden border border-white/5 animate-in">
      <div className="p-10 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="text-3xl font-black text-white tracking-tighter">Task Monitoring</h3>
          <p className="text-zinc-500 text-sm font-medium mt-1">Real-time oversight of global operational tasks.</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            disabled={currentPage === 0 || loading}
            onClick={() => onPageChange(currentPage - 1)}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl disabled:opacity-20 border border-white/5 transition-all active:scale-95"
          >
            <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div className="px-5 py-2.5 bg-white/5 rounded-2xl border border-white/5">
            <span className="text-xs font-bold text-zinc-400 tabular-nums">Page {currentPage + 1} / {totalPages || 1}</span>
          </div>
          <button
            disabled={last || loading}
            onClick={() => onPageChange(currentPage + 1)}
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
              <th className="px-10 py-6">Operation Details</th>
              <th className="px-10 py-6">Status</th>
              <th className="px-10 py-6">Priority</th>
              <th className="px-10 py-6">Execution Date</th>
              <th className="px-10 py-6">Logged At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.03] text-zinc-400">
            {loading ? (
              [1, 2, 3, 4, 5].map(i => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={5} className="px-10 py-8"><div className="h-10 bg-white/5 rounded-2xl w-full"></div></td>
                </tr>
              ))
            ) : tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="px-10 py-6">
                    <div className="flex flex-col">
                      <span className="font-bold text-white tracking-tight">{task.title}</span>
                      <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mt-0.5 line-clamp-1">{task.description || 'No specialized description provided'}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <StatusBadge status={task.status} />
                  </td>
                  <td className="px-10 py-6">
                    <PriorityBadge priority={task.priority} />
                  </td>
                  <td className="px-10 py-6 text-xs font-bold text-zinc-400 tabular-nums uppercase">
                    {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-10 py-6 text-[10px] text-zinc-600 font-black tabular-nums tracking-widest uppercase">
                    {format(new Date(task.createdAt), 'MMM dd, HH:mm')}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-10 py-32 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-6 bg-white/5 rounded-full border border-dashed border-white/10">
                      <svg className="w-12 h-12 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                    </div>
                    <span className="text-zinc-500 font-bold uppercase tracking-widest text-xs">No Operational Tasks Found</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
