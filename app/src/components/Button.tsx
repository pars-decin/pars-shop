import React from 'react';

interface Props {
  children: React.ReactText;
  handleClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  className?: string;
}

const Button: React.FC<Props> = ({
  children,
  handleClick = () => null,
  className,
}) => {
  return (
    <button onClick={handleClick} className={`btn ${className}`}>
      {children}
    </button>
  );
};

export default Button;
