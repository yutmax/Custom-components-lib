import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import Switch from './Switch';
import { SwitchProps } from './Switch';

export default {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    color: {
      options: ['primary', 'secondary', 'success'],
      control: { type: 'select' },
    },
    size: {
      options: ['small', 'medium'],
      control: { type: 'select' },
    },
    disabled: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
} as Meta<typeof Switch>;

const Template: StoryFn<SwitchProps> = (args) => <Switch {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Primary Switch',
  color: 'primary',
  defaultChecked: true,
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Secondary Switch',
  color: 'secondary',
  defaultChecked: true,
};

export const Success = Template.bind({});
Success.args = {
  label: 'Success Switch',
  color: 'success',
  defaultChecked: true,
};

export const Small = Template.bind({});
Small.args = {
  label: 'Success Switch',
  size: 'small',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled Switch',
  disabled: true,
};
