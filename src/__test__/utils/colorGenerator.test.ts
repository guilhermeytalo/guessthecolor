import { getRandomColor, shuffleArray } from '../../utils/colorGenerator';

describe('getRandomColor', () => {
  it('should return a valid hexadecimal color', () => {
    const color = getRandomColor();
    const colorRegex = /^#[0-9A-Fa-f]{6}$/i;

    expect(color).toMatch(colorRegex);
  });

  it('should return a different color each time it is called', () => {
    const color1 = getRandomColor();
    const color2 = getRandomColor();

    expect(color1).not.toBe(color2);
  });
});

describe('shuffleArray', () => {
  it('should shuffle the elements of the array', () => {
    // Create an array with known elements for testing
    const originalArray = ['A', 'B', 'C', 'D', 'E'];
    const shuffledArray = shuffleArray([...originalArray]);

    // Check if the shuffled array is not equal to the original array
    expect(shuffledArray).not.toEqual(originalArray);

    // Check if the shuffled array contains the same elements as the original array
    expect(shuffledArray.sort()).toEqual(originalArray.sort());
  });

  it('should not modify the original array', () => {
    const originalArray = ['X', 'Y', 'Z'];
    const copiedArray = [...originalArray];
    shuffleArray(copiedArray);

    expect(copiedArray).toEqual(originalArray);
  });

  it('should return an array of the same length', () => {
    const originalArray = ['1', '2', '3', '4', '5'];
    const shuffledArray = shuffleArray(originalArray);

    expect(shuffledArray.length).toEqual(originalArray.length);
  });
});
