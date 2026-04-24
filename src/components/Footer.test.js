import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer Component', () => {
  it('renders without crashing', () => {
    render(<Footer />);

    // Check if the current year is displayed
    const currentYear = new Date().getFullYear();
    const yearElement = screen.getByText(new RegExp(currentYear.toString()));
    expect(yearElement).toBeInTheDocument();

    // Check if the "Made with" text is displayed
    const madeWithElement = screen.getByText(/Made with/i);
    expect(madeWithElement).toBeInTheDocument();

    // Check if the author is displayed
    const authorElement = screen.getByText(/lunatic\.exe/i);
    expect(authorElement).toBeInTheDocument();
  });
});
