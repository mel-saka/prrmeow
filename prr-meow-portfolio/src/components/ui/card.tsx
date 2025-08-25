import React from 'react';

export const Card: React.FC<any> = ({ children, className = '', ...props }) => (
  <div {...props} className={`rounded-lg shadow-md bg-white ${className}`}>
    {children}
  </div>
);

export const CardContent: React.FC<any> = ({ children, className = '', ...props }) => (
  <div {...props} className={className}>
    {children}
  </div>
);

export default Card;