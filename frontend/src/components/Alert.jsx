import { useEffect } from 'react';

const Alert = ({ type = 'info', message, onClose, autoClose = true }) => {
  useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  const styles = {
    success: 'bg-green-900/60 border-green-500 text-green-300',
    error:   'bg-red-900/60 border-red-500 text-red-300',
    info:    'bg-blue-900/60 border-blue-500 text-blue-300',
    warning: 'bg-yellow-900/60 border-yellow-500 text-yellow-300',
  };

  const icons = {
    success: '✅',
    error:   '❌',
    info:    'ℹ️',
    warning: '⚠️',
  };

  if (!message) return null;

  return (
    <div
      className={`flex items-start gap-3 border rounded-lg px-4 py-3 mb-4 ${styles[type]}`}
      role="alert"
    >
      <span className="text-lg flex-shrink-0">{icons[type]}</span>
      <p className="text-sm flex-1">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors ml-2 flex-shrink-0"
          aria-label="Close alert"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default Alert;
