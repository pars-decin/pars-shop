import React, { ReactElement } from 'react';

interface TextInputTypes {
  id: string;
  name: string;
  label: ReactElement | string;
  value: string;
  handleChange: () => void;
  error?: {
    hasError: boolean;
    msg: string;
  };
  isRequired?: boolean;
  children?: ReactElement;
}

function NewTextInput({
  id,
  label,
  name,
  value,
  handleChange,
  error = { hasError: false, msg: '' },
  isRequired = false,
  children,
}: TextInputTypes) {
  return (
    <div className={`input-text ${error.hasError ? `error` : ``}`}>
      <label htmlFor={id}>{label}</label>
      <input
        type='text'
        id={id}
        name={name}
        required={isRequired}
        value={value}
        onChange={handleChange}
      />
      {error.hasError && (
        <span className={`input-text__error`}>{error.msg}</span>
      )}
      {children}
    </div>
  );
}

export default NewTextInput;
