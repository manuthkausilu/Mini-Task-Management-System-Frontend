import React from 'react';
import { TaskStatus, TaskPriority } from '@/types';

interface BadgeProps {
  label: string;
  variant: 'status' | 'priority';
  value: TaskStatus | TaskPriority;
}

export const StatusBadge: React.FC<{ status: TaskStatus }> = ({ status }) => {
  const styles = {
    [TaskStatus.TODO]: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
    [TaskStatus.IN_PROGRESS]: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    [TaskStatus.DONE]: 'bg-green-500/10 text-green-400 border-green-500/20',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
      {status.replace('_', ' ')}
    </span>
  );
};

export const PriorityBadge: React.FC<{ priority: TaskPriority }> = ({ priority }) => {
  const styles = {
    [TaskPriority.LOW]: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
    [TaskPriority.MEDIUM]: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    [TaskPriority.HIGH]: 'bg-red-500/10 text-red-500 border-red-500/20',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[priority]}`}>
      {priority}
    </span>
  );
};
