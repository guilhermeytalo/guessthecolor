import { useEffect, useState } from 'react';
import './App.css';
import { countDownTimer } from './utils/countdownTime';
import { getRandomColor } from './utils/colorGenerator';

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

  useEffect(() => {
    if (remainingTime === 0) {
      handleTimerEnd();
    }
  }, [startGame, remainingTime]);

  return (
    <div className="App">
      <h1>Guess the Color!</h1>

      <div className="score-board">
        <div className="remaninin-time-container">
          <h3>
            Remaining
            <br />
            Time(s)
          </h3>
          <p>{remainingTime}</p>
        </div>

        <div className="restart-container">
          <button disabled={startGame} onClick={handleRestartGame}>
            Restart
          </button>
        </div>

        <div className="scores-container">
          <div className="score">
            <h3>
              HIGH
              <br />
              SCORE
            </h3>
            <p>0</p>
          </div>

          <div className="high-score">
            <h3>SCORE</h3>
            <p>0</p>
          </div>
        </div>
      </div>

      <div className="color-container">
        {targetColor && !startGame ? (
          <div className="color-name" style={{ backgroundColor: targetColor }}>
            <p>{targetColor}</p>
          </div>
        ) : (
          <button className="start-button" onClick={startNewGame}>
            Start
          </button>
        )}
      </div>

      <div
        className="color-selection-container"
        style={{ display: startGame ? 'none' : '' }}
      >
        {colorOptions.map((color, index) => (
          <div className={`color${index + 1}`} key={index}>
            <p>{color}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
