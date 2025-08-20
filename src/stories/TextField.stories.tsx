import type { Meta, StoryObj } from '@storybook/react';

import { TextField } from '../index';

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  args: {
    label: 'Text Field',
    placeholder: 'Enter text here...',
    inputSize: 'medium',
    fullWidth: false,
    error: false,
    disabled: false,
  },
  argTypes: {
    inputSize: {
      control: { type: 'select' },
      options: ['small', 'medium'],
    },
    fullWidth: { control: 'boolean' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {},
};

export const ErrorState: Story = {
  args: {
    error: 'some error',
    label: 'Field with error',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled Field',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    label: 'Full Width Field',
  },
};

export const WithoutLabel: Story = {
  args: {
    label: undefined,
    placeholder: 'Field without label',
  },
};
