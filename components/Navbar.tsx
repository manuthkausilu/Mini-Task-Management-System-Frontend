'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="glass fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-zinc-950/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <h1 className="text-xl font-black tracking-tight gradient-text">
          MINITASK
        </h1>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-xs font-bold text-white uppercase tracking-tighter">
              {user?.role === UserRole.ADMIN ? 'Administrator' : `${user?.firstName} ${user?.lastName}`}
            </span>
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
  );
}
