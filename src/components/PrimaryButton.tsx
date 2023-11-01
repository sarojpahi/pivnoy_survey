import React from "react";

interface ButtonProps {
  type?: "submit" | "button" | "reset";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  type = "submit",
  className = "",
  children,
  onClick,
}) => {
  const combinedClass = `inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${className}`;

  return (
    <button type={type} className={combinedClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
