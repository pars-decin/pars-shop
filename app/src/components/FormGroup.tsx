import React, { ReactElement } from 'react';

interface Props {
  children: Array<ReactElement> | ReactElement;
  header: string;
}

const FormGroup: React.FC<Props> = ({ children, header }) => {
  return (
    <div className={`form-group`}>
      <h2>{header}</h2>
      {children}
    </div>
  );
};

export default FormGroup;
