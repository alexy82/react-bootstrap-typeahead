/* eslint-disable sort-keys,import/no-extraneous-dependencies */

import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';

import Hint, { HintProps } from './Hint';
import { HintProvider, noop } from '../../tests/helpers';

export default {
  title: 'Components/Hint',
  component: Hint,
} as Meta;

const Template: Story<HintProps> = (args) => {
  const [inputNode, setInputNode] = useState<HTMLInputElement | null>(null);

  return (
    <HintProvider hintText="california" inputNode={inputNode}>
      <Hint {...args}>
        <input
          className="form-control form-control-lg"
          onChange={noop}
          ref={setInputNode}
          value="cal"
        />
      </Hint>
    </HintProvider>
  );
};

export const Default = Template.bind({});
Default.args = {};
