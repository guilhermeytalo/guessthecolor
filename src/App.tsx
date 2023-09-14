import { useEffect, useState } from 'react';
import './App.css';
import { countDownTimer } from './utils/countdownTime';
import { getRandomColor } from './utils/colorGenerator';
import {
  ColorContainer,
  ColorSelectionContainer,
  ScoreBoard,
} from './components';

const timer = 5;
let timerInterval: NodeJS.Timeout | null = null;
function App() {
  const [startGame, setStartGame] = useState<boolean>(true);
  const [remainingTime, setRemainingTime] = useState<number>(timer);
  const [targetColor, setTargetColor] = useState<string | null>(null);
  const [colorOptions, setColorOptions] = useState<string[]>([]);

  const startNewGame = () => {
    setStartGame(false);
    setRemainingTime(timer);

    const newTargetColor: string = getRandomColor();

    setTargetColor(newTargetColor);

    const options: string[] = [
      newTargetColor,
      getRandomColor(),
      getRandomColor(),
    ];

    const shuffledOptions: string[] = shuffleArray(options);

    const correctColorIndex: number = shuffledOptions.indexOf(newTargetColor);
    console.log('Correct Color Index:', correctColorIndex);

    setColorOptions(shuffledOptions);

    if (timerInterval) {
      clearInterval(timerInterval);
    }
    timerInterval = countDownTimer(timer, (s) => setRemainingTime(s));
  };

  const shuffleArray = (array: string[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const handleTimerEnd = () => {
    setStartGame(true);
    setRemainingTime(timer);
  };

  const handleRestartGame = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
    }

    setStartGame(false);
    setRemainingTime(timer);
    const newTargetColor: string = getRandomColor();
    setTargetColor(newTargetColor);

    const options: string[] = [
      newTargetColor,
      getRandomColor(),
      getRandomColor(),
    ];

    const shuffledOptions: string[] = shuffleArray(options);

    const correctColorIndex = shuffledOptions.indexOf(newTargetColor);
    console.log('Correct Color Index:', correctColorIndex);

    timerInterval = countDownTimer(timer, (s) => {
      setRemainingTime(s);
      if (s === 0) {
        handleTimerEnd();
      }
    });

    setColorOptions(shuffledOptions);
  };

  const handleOptionClick = (selectedColor: string) => {
    if (!startGame) {
      if (selectedColor === targetColor) {
      } else {
      }
    }
  };

  useEffect(() => {
    if (remainingTime === 0) {
      handleTimerEnd();
    }
  }, [startGame, remainingTime]);

  return (
    <div className="App">
      <h1>Guess the Color!</h1>
      <ScoreBoard
        startGame={startGame}
        remainingTime={remainingTime}
        onRestart={handleRestartGame}
      />
      <ColorContainer
        targetColor={targetColor}
        startGame={startGame}
        onStartNewGame={startNewGame}
      />
      <ColorSelectionContainer
        colorOptions={colorOptions}
        startGame={startGame}
        onOptionClick={handleOptionClick}
      />
    </div>
  );
}

export default App;
