import { useState, useCallback } from 'react';

interface AlertState {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: (() => void) | null;
  onCancel: (() => void) | null;
}

export const useAlert = () => {
  const [alertState, setAlertState] = useState<AlertState>({
    isOpen: false, title: '', message: '', onConfirm: null, onCancel: null,
  });

  const openAlert = useCallback((
    {
      title, message, onConfirm, onCancel,
    }: {
      title: string,
      message: string,
      onConfirm: () => void,
      onCancel: () => void
    },
  ) => {
    setAlertState({
      isOpen: true,
      title,
      message,
      onConfirm,
      onCancel,
    })
  }, []);

  const closeAlert = useCallback(() => {
    setAlertState({
      isOpen: false,
      title: '',
      message: '',
      onConfirm: null,
      onCancel: null,
    })
  }, []);

  return { ...alertState, openAlert, closeAlert };
};