import { render } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  // Tests that the component renders without crashing
  it('should render without crashing', () => {
    render(<App />);
  });
});
