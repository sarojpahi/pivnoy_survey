import React from "react";

interface LabelProps {
  value?: string;
  for?: string;
  children?: React.ReactNode;
  className?: string;
}

const Label: React.FC<LabelProps> = ({
  value,
  children,
  className = "block font-medium text-sm text-gray-700 mb-1",
}) => {
  return <label className={className}>{value || children}</label>;
};

export default Label;
