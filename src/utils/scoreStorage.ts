const localStorageKey = 'colorGame';
export const loadHighScore = (): number => {
  const data = localStorage.getItem(localStorageKey);
  if (data) {
    const parsedData: { highScore?: number } = JSON.parse(data);
    return parsedData.highScore || 0;
  }
  return 0;
};

export const saveHighScore = (highScore: number) => {
  const data = localStorage.getItem(localStorageKey);
  let savedData: { highScore?: number } = {};
  if (data) {
    savedData = JSON.parse(data);
  }
  if (highScore >= (savedData.highScore || 0)) {
    savedData.highScore = highScore;
    localStorage.setItem(localStorageKey, JSON.stringify(savedData));
    console.log('saved high score', highScore)
  }
};
