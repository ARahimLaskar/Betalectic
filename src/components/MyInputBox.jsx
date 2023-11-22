import React from "react";

export const MyInputBox = ({
  onChange,
  type,
  value,
  placeholder,
  required,
}) => {
  return (
    <input
      className="text-normal box-border px-4 py-2 rounded-md border-2 border-solid border-gray-300 outline-none"
      onChange={onChange}
      type={type}
      value={value}
      placeholder={placeholder}
      required={required}
    />
  );
};
