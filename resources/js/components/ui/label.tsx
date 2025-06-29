import React from 'react';

export const Label = ({ className = '', children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
    <label className={`mb-1 block text-sm font-medium text-gray-700 ${className}`} {...props}>
      {children}
    </label>
  );
};
