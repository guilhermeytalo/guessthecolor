import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';

jest.mock('../utils/colorGenerator'); // Mock the colorGenerator module
jest.mock('../utils/countdownTime'); // Mock the countdownTime module

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it('should render without crashing', () => {
    render(<App />);
  });

  // Starts new game and sets target color and options
  it('should start new game and set target color and options', () => {
    // Mock getRandomColor function
    const mockGetRandomColor = jest.fn().mockReturnValue('#FFFFFF');
    jest.mock('../utils/colorGenerator', () => ({
      getRandomColor: mockGetRandomColor,
    }));

    // Mock shuffleArray function
    const mockShuffleArray = jest
      .fn()
      .mockReturnValue(['#FFFFFF', '#000000', '#FF0000']);
    jest.mock('../utils/colorGenerator', () => ({
      shuffleArray: mockShuffleArray,
    }));

    // Mock countDownTimer function
    const mockCountDownTimer = jest.fn();
    jest.mock('../utils/countdownTime', () => ({
      countDownTimer: mockCountDownTimer,
    }));

    // Render the component
    render(<App />);

    // Simulate starting a new game
    fireEvent.click(screen.getByText('Start'));

    // Assertions
    expect(mockGetRandomColor).toHaveBeenCalledTimes(1);
    expect(mockShuffleArray).toHaveBeenCalledTimes(1);
    expect(mockCountDownTimer).toHaveBeenCalledTimes(1);
    expect(mockCountDownTimer).toHaveBeenCalledWith(5, expect.any(Function));
  });

  // // Shuffles color options
  // it('should shuffle color options', () => {
  //   // Mock getRandomColor function
  //   const mockGetRandomColor = jest.fn().mockReturnValue('#FFFFFF');
  //   jest.mock('../utils/colorGenerator', () => ({
  //     getRandomColor: mockGetRandomColor,
  //   }));

  //   // Mock shuffleArray function
  //   const mockShuffleArray = jest
  //     .fn()
  //     .mockReturnValue(['#FFFFFF', '#000000', '#FF0000']);
  //   jest.mock('../utils/colorGenerator', () => ({
  //     shuffleArray: mockShuffleArray,
  //   }));

  //   // Render the component
  //   render(<App />);

  //   // Simulate starting a new game
  //   fireEvent.click(screen.getByText('Start'));

  //   // Assertions
  //   expect(mockShuffleArray).toHaveBeenCalledTimes(1);
  // });

  // // Timer interval is cleared when starting new game or restarting game
  // it('should clear timer interval when starting new game or restarting game', () => {
  //   // Mock clearInterval function
  //   const mockClearInterval = jest.fn();
  //   global.clearInterval = mockClearInterval;

  //   // Render the component
  //   render(<App />);

  //   // Simulate starting a new game
  //   fireEvent.click(screen.getByText('Start'));

  //   // Assertions
  //   expect(mockClearInterval).toHaveBeenCalledTimes(1);

  //   // Simulate restarting the game
  //   fireEvent.click(screen.getByText('Restart'));

  //   // Assertions
  //   expect(mockClearInterval).toHaveBeenCalledTimes(2);
  // });

  // // Remaining time is set to timer when starting new game or restarting game
  // it('should set remaining time to timer when starting new game or restarting game', () => {
  //   // Render the component
  //   render(<App />);

  //   // Simulate starting a new game
  //   fireEvent.click(screen.getByText('Start'));

  //   // Assertions
  //   expect(screen.getByText('5')).toBeInTheDocument();

  //   // Simulate restarting the game
  //   fireEvent.click(screen.getByText('Restart'));

  //   // Assertions
  //   expect(screen.getByText('5')).toBeInTheDocument();
  // });
});
