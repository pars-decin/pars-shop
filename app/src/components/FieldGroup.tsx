import React, { ReactElement } from 'react';

interface Props {}

const FieldGroup: React.FC<{
  children: ReactElement | Array<ReactElement>;
  className?: string;
}> = ({ children, className }) => {
  return <div className={`field-group ${className}`}>{children}</div>;
};

export default FieldGroup;
