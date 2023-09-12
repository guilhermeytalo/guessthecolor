import {render, screen} from '@testing-library/react';
import App from './App';

describe('App', () => {
    it("Should have hello world", () => {
        render(<App/>);
        const message = screen.queryByText(/hello world/i);

        expect(message).toBeDefined();
    })
});