import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Button, Modal } from '../index';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
    },
    onClose: {
      action: 'closed',
    },
    className: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

const ModalWithState = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Button onClick={() => setIsOpen(true)}>Open the modal window</Button>
      <Modal {...args} open={isOpen} onClose={() => setIsOpen(false)}>
        <h2 style={{ marginTop: 0 }}>An example of a modal window</h2>
        <p>This is the contents of the modal window.</p>
        <Button onClick={() => setIsOpen(false)}>Close</Button>
      </Modal>
    </div>
  );
};

export const Basic: Story = {
  render: (args) => <ModalWithState {...args} />,
  args: {
    open: false,
  },
};
