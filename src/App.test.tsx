import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {

  // Tests that the component renders without crashing
  it('should render without crashing', () => {
    render(<App />);
  });

  // Tests that the title "Guess the Color!" is displayed
  it('should display the title "Guess the Color!"', () => {
    render(<App />);
    const title = screen.getByText(/Guess the Color!/i);
    expect(title).toBeInTheDocument();
  });
});
