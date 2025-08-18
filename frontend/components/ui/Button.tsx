import type { ButtonProps } from 'index';
import React from 'react';

const Button = ({ variant }: ButtonProps) => {
  return (
    <div
      className={`btn ${variant === 'PRIMARY' ? 'btn-primary' : 'btn-secondary'}`}
    >
      Button
    </div>
  );
};

export default Button;
