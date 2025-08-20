import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../index';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['text', 'contained', 'outlined'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    onClick: {
      action: 'clicked',
    },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Contained: Story = {
  args: {
    children: 'Contained Button',
    variant: 'contained',
    size: 'medium',
  },
};
export const Outlined: Story = {
  args: {
    children: 'Outlined Button',
    variant: 'outlined',
    size: 'medium',
  },
};
export const Text: Story = {
  args: {
    children: 'Text Button',
    variant: 'text',
    size: 'medium',
  },
};
