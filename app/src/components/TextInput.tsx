import React, { ReactElement } from 'react';

import Badge from '../components/Badge';
import { useField } from 'formik';

export interface Props {
  required?: boolean;
  multiline?: boolean;
  name: string;
  label: string;
  hint?: string;
  value: string;
}

function TextInput({
  required = true,
  multiline = false,
  hint,
  label,
  ...props
}: Props) {
  const [field, meta] = useField(props.name);
  const hasError = meta.error && meta.touched;

  return (
    <div className={`text-input ${hasError ? `error` : ``}`}>
      <label htmlFor={props.name}>
        <span className={`text-input__label`}>{label}</span>
        {!!hint && <Badge type={`info`}>{hint}</Badge>}
        {hasError && (
          <div className={`text-input__error-msg`}>{meta.error}</div>
        )}
      </label>
      {multiline ? (
        <textarea required={required} {...props} />
      ) : (
        <input required={required} {...props} />
      )}
    </div>
  );
}

export default TextInput;
