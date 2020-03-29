import React, { ReactElement } from 'react';

interface Props {
  children: Array<ReactElement>;
  className?: string;
}

function Form({ children, className = '' }: Props): ReactElement {
  return <form className={`form ${className}`}>{children}</form>;
}

export default Form;
