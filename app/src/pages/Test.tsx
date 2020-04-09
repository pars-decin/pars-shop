import React, { ReactElement } from 'react';

import TextInput from '../components/NewTextInput';
import Badge from '../components/Badge';

interface Props {}

function Test({}: Props): ReactElement {
  return (
    <div>
      <TextInput
        id={'name'}
        handleChange={() => {}}
        label={<Badge type={`warn`}>fsdf</Badge>}
        name={`name`}
        value={`Jan`}
      >
        <Badge type={`info`}>fsdf</Badge>
      </TextInput>
    </div>
  );
}

export default Test;
