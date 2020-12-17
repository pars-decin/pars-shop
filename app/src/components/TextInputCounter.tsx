import React, { ReactElement } from 'react';
import Img from './Img';

interface Props {
  handleValue: () => void;
  inc: number;
}

const TextInputCounter = ({ handleValue, inc }) => {
  return (
    <div className={`counter`}>
      <div onClick={handleValue(inc)} className={`counter--plus`}>
        <Img src={`/icons/textInputPlus.svg`} />
      </div>
      <div onClick={handleValue(inc * -1)} className={`counter--minus`}>
        <Img src={`/icons/textInputMinus.svg`} />
      </div>
    </div>
  );
};

export default TextInputCounter;
