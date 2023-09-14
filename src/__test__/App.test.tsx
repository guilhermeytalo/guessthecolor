import { fireEvent, render, screen, } from '@testing-library/react';
import App from '../App';
import * as colorGeneratorModule from '../utils/colorGenerator';

// Mock the utils/countdownTime module
jest.mock('../utils/countdownTime', () => ({
  countDownTimer: jest.fn(),
}));

// Mock the utils/colorGenerator module
jest.mock('../utils/colorGenerator', () => ({
  getRandomColor: jest.fn(),
  shuffleArray: jest.fn(),
}));

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it('should render without crashing', () => {
    render(<App />);
  });

  // Starts a new game when "Start" button is clicked
  it('should start a new game when "Start" button is clicked', () => {
    const mockGetRandomColor = jest.spyOn(
      colorGeneratorModule,
      'getRandomColor'
    );
    mockGetRandomColor.mockReturnValueOnce('MockedColor');

    const mockShuffleArray = jest.fn((array) => {
      const shuffledArray = ['MockedColor', 'Option2', 'Option3'];
      return shuffledArray;
    });

    jest
      .spyOn(colorGeneratorModule, 'shuffleArray')
      .mockImplementation(mockShuffleArray);

    render(<App />);
    const startNewGameButton = screen.getByText('Start');

    fireEvent.click(startNewGameButton);

    expect(mockGetRandomColor).toHaveBeenCalledTimes(3);
    expect(startNewGameButton).not.toBeInTheDocument();

    mockGetRandomColor.mockRestore();
    mockShuffleArray.mockRestore();
  });

  // Displays color options when game is started
  it('should display color options when game is started', () => {
    const mockGetRandomColor = jest.spyOn(
      colorGeneratorModule,
      'getRandomColor'
    );
    mockGetRandomColor.mockReturnValueOnce('MockedColor');

    const mockShuffleArray = jest.fn((array) => {
      const shuffledArray = ['MockedColor', 'Option2', 'Option3'];
      return shuffledArray;
    });

    jest
      .spyOn(colorGeneratorModule, 'shuffleArray')
      .mockImplementation(mockShuffleArray);

    render(<App />);
    const startNewGameButton = screen.getByText('Start');

    fireEvent.click(startNewGameButton);

    const colorOptionsElement = screen.getByText('Option2');
    expect(colorOptionsElement).toBeInTheDocument();

    mockGetRandomColor.mockRestore();
    mockShuffleArray.mockRestore();
  });

  // Restarts game when "Restart" button is clicked
  it('should restart game when "Restart" button is clicked', () => {
    const mockGetRandomColor = jest.spyOn(
      colorGeneratorModule,
      'getRandomColor'
    );
    mockGetRandomColor.mockReturnValueOnce('MockedColor');
  
    const mockShuffleArray = jest.fn((array) => {
      const shuffledArray = ['MockedColor', 'Option2', 'Option3'];
      return shuffledArray;
    });
  
    jest
      .spyOn(colorGeneratorModule, 'shuffleArray')
      .mockImplementation(mockShuffleArray);
  
    render(<App />);
    const startNewGameButton = screen.getByText('Start');
    fireEvent.click(startNewGameButton);
  
    const restartGameButton = screen.getByText('Restart');
    fireEvent.click(restartGameButton);
  
    expect(mockGetRandomColor).toHaveBeenCalled();
    expect(startNewGameButton).not.toBeInTheDocument();
  
    mockGetRandomColor.mockRestore();
    mockShuffleArray.mockRestore();
  });

  // Ends game when timer reaches 0
  // it('should countdown from 5 to 0 and update the remaining time', async () => {
  //   jest.useFakeTimers(); // Enable fake timers

  //   const mockGetRandomColor = jest.spyOn(
  //     colorGeneratorModule,
  //     'getRandomColor'
  //   );
  //   mockGetRandomColor.mockReturnValueOnce('MockedColor');

  //   const mockShuffleArray = jest.fn((array) => {
  //     const shuffledArray = ['MockedColor', 'Option2', 'Option3'];
  //     return shuffledArray;
  //   });

  //   jest
  //     .spyOn(colorGeneratorModule, 'shuffleArray')
  //     .mockImplementation(mockShuffleArray);

  //   render(<App />);
  //   const startNewGameButton = screen.getByText('Start');

  //   fireEvent.click(startNewGameButton);

  //   const remainingTimeElement = screen.getByText('5'); // Get the element displaying remaining time

  //   // Advance the timers to trigger the countdown
  //   jest.advanceTimersByTime(1000); // 1 second

  //   // Use waitFor to wait for the UI to update
  //   await waitFor(() => {
  //     expect(remainingTimeElement).toHaveTextContent('4'); // Assert that the content updates
  //   });

  //   jest.advanceTimersByTime(1000); // 2 seconds

  //   await waitFor(() => {
  //     expect(remainingTimeElement).toHaveTextContent('3');
  //   });

  //   // Continue with the rest of your timer advancements and assertions...

  //   // Ensure the timer stops
  //   expect(setInterval).toHaveBeenCalledTimes(1);
  //   expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  // });
});
