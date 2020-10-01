import React from 'react';
import View from './View';
import Img from './Img';

interface Props {}

const Loading = (props: Props) => {
  return (
    <View className={`loading-view`}>
      <div>
        <Img src={`/icons/spinner.svg`} />
        <span>Načítání obsahu</span>
      </div>
    </View>
  );
};

export default Loading;
