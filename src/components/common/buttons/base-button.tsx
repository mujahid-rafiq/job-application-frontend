import React, { type ReactNode } from "react";

interface ButtonProps {
  variant: string;
  onClick?: () => void;
  children: ReactNode;
  fullWidth?: boolean;
  type?: any,
  parentClass?: string;
  btnClass?: string;
  disabled?: boolean;
  loading?: boolean;
  icon?: any;
  title?: string;
}

const Button: React.FC<ButtonProps> = ({ variant, onClick, children, fullWidth, type, parentClass, btnClass, disabled, loading, icon, title }) => {


  const onButtonClick = () => {
    if (onClick) {
      onClick();
    }
  };

  let variantClasses = "";

  switch (variant) {
    case "primary":
      variantClasses = `bg-[#0A5185] hover:bg-[#13456a] transition text-white`;
      break;
    case "secondary":
      variantClasses = "bg-white border-[0.5px] border-[#0a528577] !text-[#0A5185] hover:bg-gray-50 ";
      break;
    case "danger":
      variantClasses = "bg-[#E40F00] hover:bg-[#c30c00] transition text-white";
      break;
    default:
      variantClasses = "bg-blue-500 hover:bg-blue-700 ";
  }

  return (
    <div className={`w-full my-2  ${disabled ? ' text-white opacity-80 ' : ''} ${parentClass}`}>
      <button
        onClick={onButtonClick}
        type={type}
        disabled={disabled}
        title={title}
        className={` w-full h-full  ${disabled ? '!bg-gray-300  !w-full' : ''} font-light	py-[10px] px-4 rounded-[8px] gap-2 flex items-center justify-center text-white ${btnClass}   ${variantClasses} ${fullWidth && 'w-full'}`}
      >

        {children}
        {disabled && loading && <div role="status">
          <svg aria-hidden="true" className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-300 fill-[#0A5185]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>}
        {icon && icon}

      </button>
    </div>

  );
};

export default Button;
