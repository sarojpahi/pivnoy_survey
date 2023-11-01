import React from "react";

interface TextInputProps {
  disabled?: boolean;
  type: string;
  id: string;
  className?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  disabled,
  className = "",
  ...props
}) => {
  const inputClass = `border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ${
    disabled ? "bg-gray-200" : ""
  } ${className}`;

  return <input {...props} disabled={disabled} className={inputClass} />;
};

export default TextInput;
