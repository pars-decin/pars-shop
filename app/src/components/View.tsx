import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const View: React.FC<Props> = ({ children, className }) => {
  return <div className={`view ${className}`}>{children}</div>;
};

export default View;
