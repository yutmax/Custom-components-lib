import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { Checkbox, CheckboxProps } from '../index';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'success'],
      },
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'select' },
    },
    labelPlacement: {
      options: ['start', 'end', 'top', 'bottom'],
      control: { type: 'select' },
    },
    disabled: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
} as Meta<typeof Checkbox>;

const Template: StoryFn<CheckboxProps> = (args) => <Checkbox {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Primary Checkbox',
  color: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Secondary Checkbox',
  color: 'secondary',
};

export const Success = Template.bind({});
Success.args = {
  label: 'Success Checkbox',
  color: 'success',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled Checkbox',
  disabled: true,
};

export const Small = Template.bind({});
Small.args = {
  label: 'Small Checkbox',
  size: 'small',
};

export const Large = Template.bind({});
Large.args = {
  label: 'Large Checkbox',
  size: 'large',
};

export const WithoutLabel = Template.bind({});
WithoutLabel.args = {};

export const Controlled: StoryFn<CheckboxProps> = (args) => {
  const [checked, setChecked] = React.useState(false);
  return <Checkbox {...args} checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
};
Controlled.args = {
  label: 'Controlled Checkbox',
};
