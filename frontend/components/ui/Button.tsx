import type { ButtonProps } from 'index';
import React from 'react';

const Button = ({
  variant,
  text,
  type,
  customStyles,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`btn ${variant === 'PRIMARY' ? 'btn-primary' : 'btn-secondary'} ${customStyles}`}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
