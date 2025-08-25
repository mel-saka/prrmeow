import React from 'react';

export const Badge: React.FC<any> = ({ children, className = '', ...props }) => (
  <span {...props} className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${className}`}>
    {children}
  </span>
);

export default Badge;