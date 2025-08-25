import React from 'react';

export const Input: React.FC<any> = ({ className = '', ...props }) => (
  <input {...props} className={className} />
);

export default Input;