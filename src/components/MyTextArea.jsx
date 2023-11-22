import React from "react";

export const MyTextArea = ({ onChange, rows, cols, value, required }) => {
  return (
    <textarea
      className="text-normal px-4 py-2 rounded-md border-2 border-solid border-gray-300 outline-none"
      onChange={onChange}
      rows={rows}
      cols={cols}
      value={value}
      required={required}
    ></textarea>
  );
};
