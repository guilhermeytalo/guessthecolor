import { countDownTimer } from '../../utils/countDownTime';

// Mock the setInterval and clearInterval functions
jest.useFakeTimers();

describe('countDownTimer', () => {
  it('should start the countdown timer and call the callback with the remaining time', () => {
    const callback = jest.fn();
    countDownTimer(10, callback);

    setTimeout(() => {
      expect(callback).toHaveBeenCalledWith(10);
    }, 1000);
  });

  it('should decrement the remaining time by one every second', () => {
    const callback = jest.fn();
    countDownTimer(10, callback);

    // Wait for the timer to fire twice.
    setTimeout(() => {
      expect(callback).toHaveBeenCalledWith(9);
    }, 1000);

    setTimeout(() => {
      expect(callback).toHaveBeenCalledWith(8);
    }, 2000);
  });

  it('should stop the countdown timer when the remaining time is zero', () => {
    const callback = jest.fn();
    const timer = countDownTimer(10, callback);

    // Wait for the timer to fire and stop.
    setTimeout(() => {
      expect(callback).toHaveBeenCalledWith(0);
      expect(timer).toBeNull();
    }, 10000);
  });
});
