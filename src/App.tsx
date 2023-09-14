import { useEffect, useState } from 'react';
import './App.css';
import { getRandomColor, shuffleArray } from './utils/colorGenerator';
import {
  ColorContainer,
  ColorSelectionContainer,
  ScoreBoard,
} from './components';
import { countDownTimer } from './utils/countDownTime';


const timer = 5;
let timerInterval: NodeJS.Timeout | null = null;
function App() {
  const [startGame, setStartGame] = useState<boolean>(true);
  const [remainingTime, setRemainingTime] = useState<number>(timer);
  const [targetColor, setTargetColor] = useState<string>('');
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

    setColorOptions(shuffledOptions);

    if (timerInterval) {
      clearInterval(timerInterval);
    }
    timerInterval = countDownTimer(timer, (s) => setRemainingTime(s));
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

    timerInterval = countDownTimer(timer, (s) => {
      setRemainingTime(s);
      if (s === 0) {
        handleTimerEnd();
      }
    });

    setColorOptions(shuffledOptions);
  };

  useEffect(() => {
    if (remainingTime === 0) {
      handleTimerEnd();
    }
  }, [startGame, remainingTime]);

  const handleOptionClick = (color: string) => {
    console.log('ColorOption clicked3:', color);
    if (startGame) return;

    if (color === targetColor) {
      console.log('Correct color:', color);
    
    } else {
      console.log('Incorrect color:', color);
      
    }
  }

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
