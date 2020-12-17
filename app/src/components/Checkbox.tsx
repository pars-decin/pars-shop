import React, { ReactElement } from 'react';

export interface Props {
  id: string;
  name: string;
  label: string | ReactElement;
  isRequired?: boolean;
}

function Checkbox({
  name,
  id,
  label,
  isRequired = false,
}: Props): ReactElement {
  return (
    <div className={`checkbox`}>
      <input type='checkbox' required={isRequired} name={name} id={id} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default Checkbox;
