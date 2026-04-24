import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Text Decorator/i);
  expect(titleElement).toBeInTheDocument();
});

test('alternates document title every 1500ms', () => {
  jest.useFakeTimers();
  render(<App />);

  // Initial title before any interval fires might not be updated yet
  // but let's test the interval changes

  // Advance by 1500ms
  jest.advanceTimersByTime(1500);
  expect(document.title).toBe('Amaizing');

  // Advance by another 1500ms
  jest.advanceTimersByTime(1500);
  expect(document.title).toBe('Text Decoder');

  // Advance by another 1500ms
  jest.advanceTimersByTime(1500);
  expect(document.title).toBe('Amaizing');

  jest.useRealTimers();
});
