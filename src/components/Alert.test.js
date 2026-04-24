import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Alert from './Alert';

describe('Alert Component', () => {
  test('renders alert type and message when props.alert is provided', () => {
    const alertData = { type: 'Success', message: ': Operation completed successfully.' };
    const { container } = render(<Alert alert={alertData} />);

    const strongElement = screen.getByText('Success');
    expect(strongElement).toBeInTheDocument();

    const messageElement = screen.getByText(/: Operation completed successfully\./);
    expect(messageElement).toBeInTheDocument();

    expect(container.querySelector('.alert-container')).toBeInTheDocument();
  });

  test('does not render when props.alert is null', () => {
    const { container } = render(<Alert alert={null} />);

    expect(container.firstChild).toBeNull();
  });
});
