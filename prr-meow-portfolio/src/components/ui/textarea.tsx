import React from 'react';

export const Textarea: React.FC<any> = ({ className = '', ...props }) => (
  <textarea {...props} className={className} />
);

export default Textarea;