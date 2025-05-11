import React from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000
}) => {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    warning: <AlertCircle className="w-5 h-5 text-yellow-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />
  };

  const styles = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    warning: 'bg-yellow-50 border-yellow-200',
    info: 'bg-blue-50 border-blue-200'
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <Toaster
        position="top-right"
        toastOptions={{
          duration,
          style: {
            background: '#1A1A2E',
            color: '#EDEDED',
            border: '1px solid #2A2A3E',
            padding: '1rem',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }
        }}
      />
      {toast.custom((t) => (
        <div
          className={`flex items-center gap-2 p-4 rounded-lg border ${styles[type]}`}
          style={{
            opacity: t.visible ? 1 : 0,
            transform: t.visible ? 'translateY(0)' : 'translateY(-1rem)',
            transition: 'all 0.2s ease-in-out'
          }}
        >
          {icons[type]}
          <p className="text-sm font-medium">{message}</p>
        </div>
      ))}
    </div>
  );
};

export const showToast = (props: ToastProps) => {
  const { message, type, duration } = props;
  toast.custom((t) => (
    <Toast
      message={message}
      type={type}
      duration={duration}
    />
  ));
};

export default Toast; 