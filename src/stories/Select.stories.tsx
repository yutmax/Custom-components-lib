import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Select, SelectItem } from '../index';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    value: {
      control: 'text',
    },
    open: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    className: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

const BasicRender = (args: any) => {
  const [value, setValue] = useState<string>('');

  return (
    <Select {...args} value={value} onChange={setValue}>
      <SelectItem value="option1" label="Option 1" />
      <SelectItem value="option2" label="Option 2" />
      <SelectItem value="option3" label="Option 3" />
      <SelectItem value="option4" label="Option 4" />
    </Select>
  );
};

export const Basic: Story = {
  render: BasicRender,
  args: {
    label: 'Select an option',
  },
};

const WithInitialValueRender = (args: any) => {
  const [value, setValue] = useState<string>('option2');

  return (
    <Select {...args} value={value} onChange={setValue}>
      <SelectItem value="option1" label="Option 1" />
      <SelectItem value="option2" label="Option 2" />
      <SelectItem value="option3" label="Option 3" />
      <SelectItem value="option4" label="Option 4" />
    </Select>
  );
};

export const WithInitialValue: Story = {
  render: WithInitialValueRender,
  args: {
    label: 'Select with initial value',
  },
};

export const OpenByDefault: Story = {
  args: {
    label: 'Select open by default',
    open: true,
    children: [
      <SelectItem key="1" value="option1" label="Option 1" />,
      <SelectItem key="2" value="option2" label="Option 2" />,
      <SelectItem key="3" value="option3" label="Option 3" />,
    ],
  },
};

export const withoutLabel: Story = {
  args: {
    children: [
      <SelectItem key="1" value="option1" label="Option 1" />,
      <SelectItem key="2" value="option2" label="Option 2" />,
      <SelectItem key="3" value="option3" label="Option 3" />,
    ],
  },
};
