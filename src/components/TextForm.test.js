import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextForm from './TextForm';

describe('TextForm Component', () => {
  const mockShowAlert = jest.fn();
  const heading = "Enter the text to analyze below";

  beforeEach(() => {
    mockShowAlert.mockClear();
    // Mock navigator.clipboard
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });
    // Mock document.getSelection
    document.getSelection = jest.fn(() => ({
      removeAllRanges: jest.fn(),
    }));
  });

  test('renders text form with correct heading', () => {
    render(<TextForm heading={heading} showAlert={mockShowAlert} />);
    expect(screen.getByText(heading)).toBeInTheDocument();
    // Buttons are disabled initially
    expect(screen.getByRole('button', { name: /Convert to UpperCase/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /Convert to LowerCase/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /Clear Text/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /Copy Text/i })).toBeDisabled();
  });

  test('enables buttons and updates text when typing', () => {
    render(<TextForm heading={heading} showAlert={mockShowAlert} />);
    const textarea = screen.getByRole('textbox');

    fireEvent.change(textarea, { target: { value: 'hello world' } });

    expect(textarea).toHaveValue('hello world');
    expect(screen.getByRole('button', { name: /Convert to UpperCase/i })).not.toBeDisabled();
  });

  test('converts text to uppercase and triggers alert', () => {
    render(<TextForm heading={heading} showAlert={mockShowAlert} />);
    const textarea = screen.getByRole('textbox');

    fireEvent.change(textarea, { target: { value: 'hello' } });
    const uppercaseBtn = screen.getByRole('button', { name: /Convert to UpperCase/i });
    fireEvent.click(uppercaseBtn);

    expect(textarea).toHaveValue('HELLO');
    expect(mockShowAlert).toHaveBeenCalledWith('Converted to Uppercase');
  });

  test('converts text to lowercase and triggers alert', () => {
    render(<TextForm heading={heading} showAlert={mockShowAlert} />);
    const textarea = screen.getByRole('textbox');

    fireEvent.change(textarea, { target: { value: 'WORLD' } });
    const lowercaseBtn = screen.getByRole('button', { name: /Convert to LowerCase/i });
    fireEvent.click(lowercaseBtn);

    expect(textarea).toHaveValue('world');
    expect(mockShowAlert).toHaveBeenCalledWith('Converted to Lowercase');
  });

  test('clears text and triggers alert', () => {
    render(<TextForm heading={heading} showAlert={mockShowAlert} />);
    const textarea = screen.getByRole('textbox');

    fireEvent.change(textarea, { target: { value: 'Some text to clear' } });
    const clearBtn = screen.getByRole('button', { name: /Clear Text/i });
    fireEvent.click(clearBtn);

    expect(textarea).toHaveValue('');
    expect(mockShowAlert).toHaveBeenCalledWith('Text Cleared');
  });

  test('copies text to clipboard and triggers alert', () => {
    render(<TextForm heading={heading} showAlert={mockShowAlert} />);
    const textarea = screen.getByRole('textbox');

    fireEvent.change(textarea, { target: { value: 'Copy this' } });
    const copyBtn = screen.getByRole('button', { name: /Copy Text/i });
    fireEvent.click(copyBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Copy this');
    expect(document.getSelection).toHaveBeenCalled();
    expect(mockShowAlert).toHaveBeenCalledWith('Text Copy to Clipboard');
  });

  test('displays correct word and character count', () => {
    render(<TextForm heading={heading} showAlert={mockShowAlert} />);
    const textarea = screen.getByRole('textbox');

    fireEvent.change(textarea, { target: { value: 'One two three' } });

    expect(screen.getByText(/3 Words and 13 Characters/)).toBeInTheDocument();
  });
});
