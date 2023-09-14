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

  const startNewGame = () => {
    setStartGame(false);
    setRemainingTime(timer);
    setTargetColor(getRandomColor());

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
    setTargetColor(getRandomColor());

    timerInterval = countDownTimer(timer, (s) => {
      setRemainingTime(s);
      if (s === 0) {
        handleTimerEnd();
      }
    });
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
          <button onClick={handleRestartGame}>Restart</button>
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

      <div className="color-selection-container">
        <div className="color1">
          <p>#FF0000</p>
        </div>
        <div className="color2">
          <p>#c98ca7</p>
        </div>

        <div className="color3">
          <p>#e76d83</p>
        </div>
      </div>
    </div>
  );
}

export default App;
