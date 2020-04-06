import React, { ReactElement } from 'react';

interface Props {
  errorMsg: string;
}

function TextInputError({ errorMsg }: Props): ReactElement {
  return <span className={`text-input__error`}>{errorMsg}</span>;
}

export default TextInputError;
