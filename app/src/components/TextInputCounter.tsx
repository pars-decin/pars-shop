import React, { ReactElement } from 'react';
import Img from './Img';

interface Props {
  inc: (x) => void;
  dec: (x) => void;
}

function TextInputCounter({ dec, inc }: Props): ReactElement {
  return (
    <div className={`text-input__counter`}>
      <div
        className={`text-input__counter__item plus`}
        onClick={(type) => inc(type)}
      >
        <Img src={`/icons/textInputPlus.svg`} />
      </div>
      <div
        className={`text-input__counter__item minus`}
        onMouseDown={(type) => dec(type)}
      >
        <Img src={`/icons/textInputMinus.svg`} />
      </div>
    </div>
  );
}

export default TextInputCounter;
