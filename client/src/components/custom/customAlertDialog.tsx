import { useState } from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';

interface CustomAlertDialogProps {
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  triggerLabel: string; // Label for the button that triggers the dialog
}

const CustomAlertDialog: React.FC<CustomAlertDialogProps> = ({
  title,
  description,
  confirmText,
  cancelText,
  onConfirm,
  triggerLabel,
}) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button>{triggerLabel}</button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="actions">
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>{confirmText}</AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomAlertDialog;
