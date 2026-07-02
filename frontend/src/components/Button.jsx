import React from "react";

const Button = ({
  children,
  onClick,
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
      px-6
      py-3
      rounded-xl
      bg-gradient-to-r
      from-purple-600
      to-pink-500
      text-white
      font-semibold
      transition-all
      duration-300
      hover:scale-105
      hover:shadow-lg
      hover:shadow-purple-500/40
      active:scale-95
      ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;