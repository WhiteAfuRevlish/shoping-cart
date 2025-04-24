import React from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog"

interface AlertProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

const Alert: React.FC<AlertProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Ok',
  cancelText = 'Cancel',
}) => {

  return (
    <AlertDialog open={true}>
      <AlertDialogContent>
        <h3 className="font-semibold text-lg">{title}</h3>
        <AlertDialogDescription>
          {message}
        </AlertDialogDescription>
        <div className="mt-4 flex justify-end space-x-2">
          {onCancel && <AlertDialogCancel>{cancelText}</AlertDialogCancel>}
          <AlertDialogAction onClick={onConfirm} variant="destructive">{confirmText}</AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { Alert };
