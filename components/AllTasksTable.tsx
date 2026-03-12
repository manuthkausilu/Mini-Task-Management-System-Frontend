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
    <div className="glass-card rounded-3xl overflow-hidden border border-white/5 animate-in">
      <div className="p-8 border-b border-white/5 flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white">Global Task Oversight</h3>
        <div className="flex gap-2">
           <button 
            disabled={currentPage === 0 || loading}
            onClick={() => onPageChange(currentPage - 1)}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg disabled:opacity-30 border border-white/10 transition-all"
           >
             <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
           </button>
           <span className="flex items-center px-4 text-sm text-zinc-400">Page {currentPage + 1} of {totalPages || 1}</span>
           <button 
            disabled={last || loading}
            onClick={() => onPageChange(currentPage + 1)}
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
              <th className="px-8 py-5">Task Title</th>
              <th className="px-8 py-5">Status</th>
              <th className="px-8 py-5">Priority</th>
              <th className="px-8 py-5">Due Date</th>
              <th className="px-8 py-5">Created At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-zinc-300">
            {loading ? (
              [1, 2, 3, 4, 5].map(i => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={5} className="px-8 py-6"><div className="h-6 bg-white/5 rounded-lg w-full"></div></td>
                </tr>
              ))
            ) : tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task.id} className="group hover:bg-white/[0.01] transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="font-medium text-white">{task.title}</span>
                      <span className="text-xs text-zinc-500 line-clamp-1">{task.description || 'No description'}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <StatusBadge status={task.status} />
                  </td>
                  <td className="px-8 py-5">
                    <PriorityBadge priority={task.priority} />
                  </td>
                  <td className="px-8 py-5 text-sm text-zinc-400">
                    {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-8 py-5 text-sm text-zinc-500">
                    {format(new Date(task.createdAt), 'MMM dd, HH:mm')}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-8 py-20 text-center text-zinc-500">No tasks found in the system.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
