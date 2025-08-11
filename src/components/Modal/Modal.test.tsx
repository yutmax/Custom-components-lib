import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from './Modal';

describe('Modal Component', () => {
  const mockOnClose = jest.fn();

  const TestModal = ({ open = true }: { open?: boolean }) => (
    <Modal open={open} onClose={mockOnClose}>
      <div data-testid="modal-content">Test Content</div>
    </Modal>
  );

  beforeEach(() => {
    const portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(portalRoot);
  });

  afterEach(() => {
    mockOnClose.mockClear();
    const portalRoot = document.getElementById('modal-root');
    if (portalRoot) {
      document.body.removeChild(portalRoot);
    }
  });

  it('renders nothing when open=false', () => {
    render(<TestModal open={false} />);
    expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument();
  });

  it('renders modal content when open=true', () => {
    render(<TestModal open={true} />);
    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
  });

  it('calls onClose when clicking backdrop', () => {
    render(<TestModal />);
    // Изменили поиск на поиск по классу modal
    fireEvent.click(screen.getByRole('dialog'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when clicking content', () => {
    render(<TestModal />);
    fireEvent.click(screen.getByTestId('modal-content'));
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('locks body scroll when open', () => {
    render(<TestModal open={true} />);
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('unlocks body scroll when closed', () => {
    const { rerender } = render(<TestModal open={true} />);
    rerender(<TestModal open={false} />);
    expect(document.body.style.overflow).toBe('');
  });

  it('has proper accessibility attributes', () => {
    render(<TestModal />);
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveAttribute('aria-modal', 'true');
  });
});
