import React, { ReactElement } from 'react';

import Badge from '../components/Badge';
import TextInputCounter from '../components/TextInputCounter';
import TextInputError from './TextInputError';

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
  withCounter?: boolean;
  errorMsg?: string;
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
  withCounter = false,
  errorMsg,
}) => {
  const [data, setData] = React.useState({
    value: intialValue,
    hasError: false,
  });

  const handleChange = (e) => {
    setData({
      value: e.target.value,
      hasError: false,
    });
  };

  const handleBlur = (e) => {
    setData({
      value: e.target.value,
      hasError: validate(e.target.value),
    });
  };

  const handleCounter = (type: 'inc' | 'dec') => {
    const increment = 10;
    setData(({ hasError, value }) => {
      const newValue =
        // prettier-ignore
        type === 'dec'
          ? (
            // @ts-ignore
            parseInt(value) - increment
          ) : (
            // @ts-ignore
            parseInt(value) + increment
          );
      return {
        hasError: validate(newValue),
        value: newValue <= 0 ? 0 : newValue,
      };
    });
  };

  return (
    <div className={`text-input ${data.hasError ? `error` : ``} ${className}`}>
      <label htmlFor={id}>
        {label}
        {isOptional && (
          <span className={`is-optional`}>{`\u00a0(${strings.optional})`}</span>
        )}
        {data.hasError && <TextInputError errorMsg={errorMsg} />}
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
        <>
          <input
            type='text'
            id={id}
            name={name}
            onChange={handleChange}
            required={!isOptional}
            onBlur={handleBlur}
            value={data.value}
          />
          {withCounter && (
            <TextInputCounter
              dec={() => handleCounter('dec')}
              inc={() => handleCounter('inc')}
            />
          )}
        </>
      )}
    </div>
  );
};

export default TextInput;
