import { useEffect, useState } from 'react';
import './App.css';
import {
  ColorContainer,
  ColorSelectionContainer,
  ScoreBoard,
} from './components';
import { getRandomColor, shuffleArray } from './utils/colorGenerator';

import { loadHighScore, saveHighScore } from './utils/scoreStorage';
import { countDownTimer } from './utils/countDownTime';

const timer = 30;
const timeToSelectColor = 5;
let timerInterval: NodeJS.Timeout | null = null;
let timerToSelectColorInterval: NodeJS.Timeout | null = null;

function App() {
  const [startGame, setStartGame] = useState<boolean>(true);
  const [remainingTime, setRemainingTime] = useState<number>(timer);
  const [reaminingTimeToSelectColor, setRemainingTimeToSelectColor] =
    useState<number>(timeToSelectColor);
  const [targetColor, setTargetColor] = useState<string>('');
  const [colorOptions, setColorOptions] = useState<string[]>([]);
  const [continueAfterCorrect, setContinueAfterCorrect] =
    useState<boolean>(false);
  const [highScore, setHighScore] = useState<number>(loadHighScore());
  const [score, setScore] = useState<number>(0);

  const startNewGame = () => {
    setStartGame(false);
    setRemainingTime(timer);
    setRemainingTimeToSelectColor(timeToSelectColor);

    const newTargetColor: string = getRandomColor();
    setTargetColor(newTargetColor);

    const options: string[] = [
      newTargetColor,
      getRandomColor(),
      getRandomColor(),
    ];

    const shuffledOptions: string[] = shuffleArray(options);
    setColorOptions(shuffledOptions);

    if (timerInterval) {
      clearInterval(timerInterval);
    }

    startGameTimer();
    startColorSelectionTimer();
  };

  const startGameTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    timerInterval = countDownTimer(timer, (s) => {
      setRemainingTime(s);
      if (s === 0) {
        handleTimerEnd();
      }
    });
  };

  const startColorSelectionTimer = () => {
    if (timerToSelectColorInterval) {
      clearInterval(timerToSelectColorInterval);
    }
    timerToSelectColorInterval = countDownTimer(timeToSelectColor, (s) => {
      setRemainingTimeToSelectColor(s);
      if (s === 0) {
        handleTimerEnd();
      }
    });
  };

  const handleTimerEnd = () => {
    setStartGame(true);
    setRemainingTime(timer);

    if (!startGame) {
      const newTargetColor: string = getRandomColor();
      setTargetColor(newTargetColor);

      const options: string[] = [
        newTargetColor,
        getRandomColor(),
        getRandomColor(),
      ];

      const shuffledOptions: string[] = shuffleArray(options);

      setColorOptions(shuffledOptions);

      setRemainingTimeToSelectColor(timeToSelectColor);
      startColorSelectionTimer();
    }

    setHighScore(score);
    saveHighScore(score);
  };

  const handleRestartGame = () => {
    if (continueAfterCorrect === true) {
      setContinueAfterCorrect(false);
      return;
    }

    setStartGame(false);
    setRemainingTime(timer);
    setRemainingTimeToSelectColor(timeToSelectColor);

    const newTargetColor: string = getRandomColor();
    setTargetColor(newTargetColor);

    const options: string[] = [
      newTargetColor,
      getRandomColor(),
      getRandomColor(),
    ];

    const shuffledOptions: string[] = shuffleArray(options);
    setColorOptions(shuffledOptions);

    setRemainingTimeToSelectColor(timeToSelectColor);

    startColorSelectionTimer();
  };

  useEffect(() => {
    if (remainingTime === 0) {
      handleTimerEnd();
    }
    if (reaminingTimeToSelectColor === 0) {
      handleTimerEnd();
    }
  }, [startGame, remainingTime, reaminingTimeToSelectColor, handleTimerEnd]);

  const handleOptionClick = (color: string) => {
    if (startGame) return;

    if (color === targetColor) {
      setScore(score + 1);
      setContinueAfterCorrect(true);
    } else if (color !== targetColor) {
      setScore(score - 1);
      setContinueAfterCorrect(true);
    } else {
      setScore(score - 2);
      setContinueAfterCorrect(true);
    }

    setRemainingTimeToSelectColor(timeToSelectColor);
    handleRestartGame();
  };

  return (
    <div className="App">
      <h1>Guess the Color!</h1>
      <ScoreBoard
        startGame={startGame}
        remainingTime={remainingTime}
        score={score}
        highScore={highScore}
        onRestart={handleRestartGame}
      />
      <div>
        <p>{reaminingTimeToSelectColor}</p>
      </div>
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
