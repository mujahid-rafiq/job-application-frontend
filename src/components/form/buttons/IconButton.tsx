import React from 'react';

interface IconButtonProps {
  icon: React.ReactNode;
  variant?: 'default' | 'danger';
  showBadge?: boolean;
  onClick?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = 'default',
  onClick,
}) => {
  const baseStyle = 'p-3 rounded-2xl hover:shadow-md cursor-pointer ';

  const variants = {
    default: 'bg-white border border-blue-100',
    danger: 'bg-red-50 border border-red-200',
  };

  return (
    <div onClick={onClick} className={`${baseStyle} ${variants[variant]}`}>
      {icon}
      
    </div>
  );
};

export default IconButton;
