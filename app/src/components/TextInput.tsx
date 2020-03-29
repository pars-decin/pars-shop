import React, { ReactElement } from 'react';

import Badge from '../components/Badge';

import strings from '../../helpers/strings';

export interface Props {
  label: ReactElement | string;
  id: string;
  name: string;
  badgeMessage?: string;
  isOptional?: boolean;
  multiline?: boolean;
  className?: string;
  validate?: (value: string) => boolean;
  intialValue?: string | number;
}

const TextInput: React.FC<Props> = ({
  label,
  id,
  name,
  multiline = false,
  badgeMessage = '',
  isOptional = false,
  validate = () => false,
  className = '',
  intialValue = '',
}) => {
  const [data, setData] = React.useState({
    value: intialValue,
    hasError: false,
  });

  const handleChange = e => {
    setData({
      value: e.target.value,
      hasError: false,
    });
  };

  const handleBlur = e => {
    setData({
      value: e.target.value,
      hasError: validate(e.target.value),
    });
  };

  return (
    <div className={`text-input ${data.hasError ? `error` : ``} ${className}`}>
      <label htmlFor={id}>
        {label}
        {isOptional && (
          <span
            className={`text-input__is-optional`}
          >{`\u00a0(${strings.optional})`}</span>
        )}
        {badgeMessage.length !== 0 && (
          <Badge type={'info'}>{badgeMessage}</Badge>
        )}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          required={!isOptional}
          onChange={handleChange}
          onBlur={handleBlur}
          value={data.value}
        />
      ) : (
        <input
          type='text'
          id={id}
          name={name}
          onChange={handleChange}
          required={!isOptional}
          onBlur={handleBlur}
          value={data.value}
        />
      )}
    </div>
  );
};

export default TextInput;
