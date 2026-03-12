import React from 'react';
import { TaskResponseDTO } from '@/types';
import { StatusBadge, PriorityBadge } from './Badges';
import { format } from 'date-fns';

interface TaskCardProps {
  task: TaskResponseDTO;
  onEdit: (task: TaskResponseDTO) => void;
  onDelete: (id: number) => void;
  onToggleComplete: (task: TaskResponseDTO) => void;
}

export default function TaskCard({ task, onEdit, onDelete, onToggleComplete }: TaskCardProps) {
  return (
    <div className="glass-card p-6 rounded-2xl space-y-4 group animate-in">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1 flex-1">
          <h3 className={`text-lg font-semibold text-white transition-all ${task.status === 'DONE' ? 'line-through text-zinc-500' : ''}`}>
            {task.title}
          </h3>
          <p className="text-sm text-zinc-400 line-clamp-2">
            {task.description || 'No description provided.'}
          </p>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onEdit(task)}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors"
            title="Edit Task"
          >
            <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5M16.243 3.757a2.828 2.828 0 114 4L7.5 20.5 3 21l.5-4.5L16.243 3.757z" /></svg>
          </button>
          <button 
            onClick={() => onDelete(task.id)}
            className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg border border-red-500/20 transition-colors"
            title="Delete Task"
          >
            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center justify-between pt-2 border-t border-white/5">
        <div className="flex gap-2 items-center">
          <StatusBadge status={task.status} />
          <PriorityBadge priority={task.priority} />
        </div>
        <div className="text-xs text-zinc-500 flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          {format(new Date(task.dueDate), 'MMM dd, yyyy')}
        </div>
      </div>

      <button
        onClick={() => onToggleComplete(task)}
        className={`w-full py-2 rounded-xl text-sm font-medium transition-all ${
          task.status === 'DONE' 
            ? 'bg-zinc-500/10 text-zinc-400 hover:bg-zinc-500/20 border border-zinc-500/20' 
            : 'bg-green-500/10 text-green-500 hover:bg-green-500/20 border border-green-500/20'
        }`}
      >
        {task.status === 'DONE' ? 'Mark as Incomplete' : 'Mark as Completed'}
      </button>
    </div>
  );
}
