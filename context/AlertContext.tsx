'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import CustomAlert, { AlertType } from '@/components/CustomAlert';

interface AlertContextType {
  showAlert: (title: string, message: string, type?: AlertType) => void;
  showConfirm: (title: string, message: string, onConfirm: () => void, type?: AlertType) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alertState, setAlertState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: AlertType;
    isConfirm: boolean;
    onConfirm?: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
    isConfirm: false,
  });

  const showAlert = useCallback((title: string, message: string, type: AlertType = 'info') => {
    setAlertState({
      isOpen: true,
      title,
      message,
      type,
      isConfirm: false,
    });
  }, []);

  const showConfirm = useCallback((title: string, message: string, onConfirm: () => void, type: AlertType = 'warning') => {
    setAlertState({
      isOpen: true,
      title,
      message,
      type,
      isConfirm: true,
      onConfirm,
    });
  }, []);

  const closeAlert = () => {
    setAlertState(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <AlertContext.Provider value={{ showAlert, showConfirm }}>
      {children}
      <CustomAlert
        isOpen={alertState.isOpen}
        onClose={closeAlert}
        onConfirm={alertState.onConfirm}
        title={alertState.title}
        message={alertState.message}
        type={alertState.type}
        isConfirm={alertState.isConfirm}
      />
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
}
