import { createContext, useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { useTheme } from './Theme';

interface ToastProps {
  toast: any;
}

const ToastContext = createContext<ToastProps>({} as any);

export const ToastProvider = ({ children }: any) => {
  const { theme } = useTheme();

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="toast-wrapper">
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            className: '',
            style: {
              background: theme === 'dark' ? '#333' : '#fff',
              color: theme === 'dark' ? '#fff' : '#333',
            },
            duration: 1000,
          }}
        />
      </div>
    </ToastContext.Provider>
  );
};

export function useToast() {
  const context = useContext(ToastContext);

  return context;
}
