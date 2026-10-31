import { createContext, useContext, useEffect, useState } from 'react';
import Toast from './components/Toast.jsx';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  function mostrarToast(mensagem, tipo = 'info') {
    setToast({ mensagem, tipo });
  }

  return (
    <ToastContext.Provider value={mostrarToast}>
      {children}
      {toast && (
        <Toast mensagem={toast.mensagem} tipo={toast.tipo} onFechar={() => setToast(null)} />
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}