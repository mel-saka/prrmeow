import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  asChild?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ asChild, children, className = '', variant = 'default', size = 'md', ...props }) => {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as any, { ...props, className: `${className} ${(children as any).props.className || ''}` });
  }

  const base = 'inline-flex items-center justify-center rounded-md';
  const sizes: Record<string, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-5 py-3 text-lg',
    icon: 'p-2',
  };
  const variants: Record<string, string> = {
    default: 'bg-pink-500 text-white hover:bg-pink-600',
    outline: 'border border-pink-300 text-pink-600 bg-white',
    ghost: 'bg-transparent text-pink-600',
    link: 'bg-transparent underline text-pink-600',
    icon: 'bg-transparent',
  };

  const cls = `${base} ${sizes[size] || sizes.md} ${variants[variant] || variants.default} ${className}`.trim();

  return (
    <button {...props} className={cls}>
      {children}
    </button>
  );
};

export default Button;