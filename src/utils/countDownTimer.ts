export const countDownTimer = (
  initialSeconds: number,
  callback: (remainingTime: number) => void
) => {
  let seconds = initialSeconds;

  const time = setInterval(() => {
    seconds = seconds - 1;
    callback(seconds);
    if (seconds === 0) {
      clearInterval(time);
    }
  }, 1000);

  return time;
};
