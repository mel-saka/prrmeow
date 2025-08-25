import React from 'react';

interface SheetProps {
  children: React.ReactNode;
  side?: 'left' | 'right' | 'top' | 'bottom';
  className?: string;
}

export const Sheet: React.FC<SheetProps> = ({ children, side = 'right', className = '' }) => {
  // Minimal sheet stub — not animated; provides structural elements used by the app
  return (
    <div className={`fixed inset-0 z-50 flex ${side === 'right' ? 'justify-end' : 'justify-start'} ${className}`}>
      <div className={`bg-white shadow-lg w-80 h-full`}>{children}</div>
    </div>
  );
};

export const SheetTrigger: React.FC<{ asChild?: boolean; children: React.ReactNode }> = ({ asChild, children }) => {
  return asChild ? <>{children}</> : <button>{children}</button>;
};

export const SheetContent: React.FC<{ children: React.ReactNode; className?: string; side?: string } & React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', side, ...props }) => {
  // side is accepted for compatibility with the original component API
  return <div {...props} className={className}>{children}</div>;
};

export const SheetHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="border-b pb-2 mb-4">{children}</div>;
};

export const SheetTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <h2 className="text-lg font-bold">{children}</h2>;
};

export default Sheet;