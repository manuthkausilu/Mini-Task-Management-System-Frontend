'use client';

import React from 'react';

export type AlertType = 'info' | 'success' | 'warning' | 'danger';

interface CustomAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  message: string;
  type?: AlertType;
  isConfirm?: boolean;
}

export default function CustomAlert({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = 'info',
  isConfirm = false
}: CustomAlertProps) {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'success': return { icon: 'check-circle', color: 'text-emerald-400', glow: 'card-glow-emerald' };
      case 'warning': return { icon: 'exclamation-circle', color: 'text-amber-400', glow: 'card-glow-amber' };
      case 'danger': return { icon: 'exclamation-triangle', color: 'text-red-400', glow: 'card-glow-red' };
      default: return { icon: 'info-circle', color: 'text-blue-400', glow: 'card-glow-blue' };
    }
  };

  const { color, glow } = getTypeStyles();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in"
        onClick={onClose}
      />
      
      {/* Alert Content */}
      <div className={`z-10 w-full max-w-md glass-card rounded-[2.5rem] overflow-hidden animate-in zoom-in shadow-2xl border border-white/10 ${glow}`}>
        <div className="p-8 text-center space-y-6">
          <div className={`mx-auto w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center ${color}`}>
             {type === 'danger' && <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
             {type === 'success' && <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
             {type === 'warning' && <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
             {type === 'info' && <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white tracking-tighter">{title}</h2>
            <p className="text-zinc-500 font-medium leading-relaxed">{message}</p>
          </div>

          <div className="flex gap-4 pt-4">
            {isConfirm ? (
              <>
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-zinc-400 font-bold hover:bg-white/10 hover:text-white transition-all active:scale-95"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onConfirm?.();
                    onClose();
                  }}
                  className={`flex-1 px-6 py-4 rounded-2xl font-bold transition-all active:scale-95 text-black shadow-xl ${type === 'danger' ? 'bg-red-500 hover:bg-red-400' : 'bg-white hover:bg-zinc-200'}`}
                >
                  Confirm
                </button>
              </>
            ) : (
              <button
                onClick={onClose}
                className="w-full px-6 py-4 rounded-2xl bg-white text-black font-bold hover:bg-zinc-200 transition-all active:scale-95 shadow-xl"
              >
                Dismiss
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
