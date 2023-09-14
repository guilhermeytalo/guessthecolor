import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from '../App';
import * as countdownTimeModule from '../utils/countdownTime';
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

  // Starts new game and sets target color and options
  it('starts a new game when "Start" button is clicked', async () => {
    // Mock getRandomColor function
    const mockGetRandomColor = jest.spyOn(
      colorGeneratorModule,
      'getRandomColor'
    );
    mockGetRandomColor.mockReturnValueOnce('MockedColor');

    // Custom implementation for shuffleArray
    const mockShuffleArray = jest.fn((array) => {
      // Manually shuffle the array (you can use a shuffle algorithm of your choice)
      const shuffledArray = ['MockedColor', 'Option2', 'Option3'];
      console.log('Shuffled Array inside function:', shuffledArray);
      return shuffledArray;
    });

    // Set up the mock before rendering the component
    jest
      .spyOn(colorGeneratorModule, 'shuffleArray')
      .mockImplementation(mockShuffleArray);

    // Mock countDownTimer function
    const mockCountDownTimer = jest.spyOn(
      countdownTimeModule,
      'countDownTimer'
    );

    // Render the component
    render(<App />);
    const startNewGameButton = screen.getByText('Start');

    fireEvent.click(startNewGameButton);

    // Assertions to check the game state
    expect(mockGetRandomColor).toHaveBeenCalledTimes(3);
    expect(mockShuffleArray).toHaveBeenCalledWith([
      'MockedColor',
      'Option2',
      'Option3',
    ]);

    // Check if the color options are displayed correctly
    const colorOptionsElement = screen.getByText('Option2');
    expect(colorOptionsElement).toBeInTheDocument();

    // Restore the original functions to avoid side effects on other tests
    mockGetRandomColor.mockRestore();
    mockShuffleArray.mockRestore();
    mockCountDownTimer.mockRestore();
  });
});
