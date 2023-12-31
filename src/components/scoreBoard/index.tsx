import React from 'react';

interface ScoreBoardProps {
  startGame: boolean;
  remainingTime: number;
  score: number;
  highScore: number;
  onRestart: () => void;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({
  startGame,
  remainingTime,
  score,
  highScore, 
  onRestart,
}) => {
  return (
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
        <button disabled={startGame} onClick={onRestart}>
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
          <p>{highScore}</p>
        </div>

        <div className="high-score">
          <h3>SCORE</h3>
          <p>{score}</p>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
