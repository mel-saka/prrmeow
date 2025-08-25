import React from 'react';

export const Dialog: React.FC<any> = ({ open, children, onOpenChange }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {children}
    </div>
  );
};

export const DialogContent: React.FC<any> = ({ children, className = '', ...props }) => (
  <div {...props} className={`bg-white rounded-lg p-4 shadow-lg ${className}`}>
    {children}
  </div>
);

export const DialogHeader: React.FC<any> = ({ children }) => <div className="dialog-header">{children}</div>;
export const DialogTitle: React.FC<any> = ({ children }) => <h2 className="dialog-title">{children}</h2>;

export default Dialog;