import { useEffect, useState } from 'react';
import './App.css';
import { getRandomColor, shuffleArray } from './utils/colorGenerator';
import {
  ColorContainer,
  ColorSelectionContainer,
  ScoreBoard,
} from './components';
import { countDownTimer } from './utils/countDownTime';


const timer = 30;
const timeToSelectColor = 5;
let timerInterval: NodeJS.Timeout | null = null;
let timerToSelectColorInterval: NodeJS.Timeout | null = null;

function App() {
  const [startGame, setStartGame] = useState<boolean>(true);
  const [remainingTime, setRemainingTime] = useState<number>(timer);
  const [reaminingTimeToSelectColor, setRemainingTimeToSelectColor] = useState<number>(timeToSelectColor);
  const [targetColor, setTargetColor] = useState<string>('');
  const [colorOptions, setColorOptions] = useState<string[]>([]);
  const [continueAfterCorrect, setContinueAfterCorrect] = useState<boolean>(false);

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

    startGameTimer()
    startColorSelectionTimer();
  };

  const startGameTimer = () => {
    if(timerInterval) {
      clearInterval(timerInterval);
    }
    timerInterval = countDownTimer(timer, (s) => {
      setRemainingTime(s);
      if (s === 0) {
        handleTimerEnd();
      }
    });
  }

  const startColorSelectionTimer = () => {
    if(timerToSelectColorInterval) {
      clearInterval(timerToSelectColorInterval);
    }
    timerToSelectColorInterval = countDownTimer(timeToSelectColor, (s) => {
      setRemainingTimeToSelectColor(s);
      if (s === 0) {
        handleTimerEnd();
      }
    });
  }

  const handleTimerEnd = () => {
    setStartGame(true);
    setRemainingTime(timer);

    if (!startGame) { // Check if it's the color selection phase
      const newTargetColor: string = getRandomColor();
      setTargetColor(newTargetColor);
    
      const options: string[] = [
        newTargetColor,
        getRandomColor(),
        getRandomColor(),
      ];
    
      const shuffledOptions: string[] = shuffleArray(options);
    
      setColorOptions(shuffledOptions);
    
      // Reset remainingTimeToSelectColor to 5
      setRemainingTimeToSelectColor(timeToSelectColor);
      startColorSelectionTimer();
    }
  };

  const handleRestartGame = () => {
    console.log('cai aqui porque escolhi uma cor', continueAfterCorrect)
    if(continueAfterCorrect === true) {
      console.log('Continue after correct', continueAfterCorrect);
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
  }, [startGame, remainingTime, handleTimerEnd, reaminingTimeToSelectColor]);

  const handleOptionClick = (color: string) => {
    if (startGame) return;

    if (color === targetColor) {
      console.log('Escolhi uma cor certa', color);
      setContinueAfterCorrect(true);
      console.log('Continue after correct', continueAfterCorrect)
    } else {
      console.log('Escolhi uma cor errada:', color);
      setContinueAfterCorrect(true);
    }

    setRemainingTimeToSelectColor(timeToSelectColor);
    handleRestartGame();  
  }

  return (
    <div className="App">
      <h1>Guess the Color!</h1>
      <ScoreBoard
        startGame={startGame}
        remainingTime={remainingTime}
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
