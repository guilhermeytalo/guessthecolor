import React from 'react';
import ColorName from '../colorName';


interface ColorContainerProps {
  targetColor: string | null;
  startGame: boolean;
  onStartNewGame: () => void;
}

const ColorContainer: React.FC<ColorContainerProps> = ({
  targetColor,
  startGame,
  onStartNewGame,
}) => {
  return (
    <div className="color-container">
      {targetColor && !startGame ? (
        <ColorName color={targetColor} />
      ) : (
        <button className="start-button" onClick={onStartNewGame}>
          Start
        </button>
      )}
    </div>
  );
};

export default ColorContainer;
