import React from "react";

export const MyButton = ({ type, onClick, value, disabled, style }) => {
  return (
    <button
      className="my-button"
      style={style}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {value}
    </button>
  );
};
