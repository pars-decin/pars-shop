import React from 'react';

interface Props {
  children: string;
  handleClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  className?: string;
  type?: 'submit' | 'button';
}

const Button: React.FC<Props> = ({
  children,
  handleClick = () => null,
  className,
  type = `button`,
}) => {
  return (
    <button onClick={handleClick} className={`btn ${className}`} type={type}>
      {children.toUpperCase()}
    </button>
  );
};

export default Button;
