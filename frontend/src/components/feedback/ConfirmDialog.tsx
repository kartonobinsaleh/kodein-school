import { Modal, Button } from '@/components/ui';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'primary';
  isLoading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'primary',
  isLoading = false,
}: ConfirmDialogProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      actions={
        <div className="flex gap-3 w-full sm:w-auto">
          <Button 
            variant="default" 
            onClick={onClose} 
            className="flex-1 sm:flex-none border-gray-200 dark:border-dark-border"
          >
            {cancelText}
          </Button>
          <Button
            variant={variant}
            onClick={() => {
              onConfirm();
              // onClose(); // Usually handled by the parent after confirm
            }}
            disabled={isLoading}
            className="flex-1 sm:flex-none"
          >
            {isLoading ? 'Processing...' : confirmText}
          </Button>
        </div>
      }
    >
      <div className="flex flex-col items-center text-center sm:text-left sm:flex-row sm:items-start gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${
          variant === 'danger' ? 'bg-danger/10 text-danger' : 'bg-primary/10 text-primary'
        }`}>
          {variant === 'danger' ? '⚠️' : '❓'}
        </div>
        <div className="space-y-2">
          <p className="text-sm font-bold text-gray-600 dark:text-gray-300 leading-relaxed uppercase tracking-tight">
            {description}
          </p>
        </div>
      </div>
    </Modal>
  );
}
