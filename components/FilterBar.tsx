'use client';

import React from 'react';
import { TaskStatus, TaskPriority } from '@/types';

interface FilterBarProps {
  status: TaskStatus | '';
  priority: TaskPriority | '';
  onStatusChange: (status: TaskStatus | '') => void;
  onPriorityChange: (priority: TaskPriority | '') => void;
}

export default function FilterBar({ 
  status, 
  priority, 
  onStatusChange, 
  onPriorityChange 
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-4 items-center animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-1">Status</span>
        <div className="flex gap-1.5 p-1 rounded-2xl bg-white/5 border border-white/10">
          {(['', TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE] as const).map((s) => (
            <button
              key={s}
              onClick={() => onStatusChange(s)}
              className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all ${
                status === s 
                  ? 'bg-white text-black shadow-lg shadow-white/10' 
                  : 'text-zinc-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {s || 'All'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-1">Priority</span>
        <div className="flex gap-1.5 p-1 rounded-2xl bg-white/5 border border-white/10">
          {(['', TaskPriority.LOW, TaskPriority.MEDIUM, TaskPriority.HIGH] as const).map((p) => (
            <button
              key={p}
              onClick={() => onPriorityChange(p)}
              className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all ${
                priority === p 
                  ? 'bg-white text-black shadow-lg shadow-white/10' 
                  : 'text-zinc-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {p || 'All'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
