import React from 'react';
import ColorOption from '../colorOption';

interface ColorSelectionContainerProps {
  colorOptions: string[];
  startGame: boolean;
  onOptionClick?: (color: string) => void;
}

const ColorSelectionContainer: React.FC<ColorSelectionContainerProps> = ({
  colorOptions,
  startGame,
  onOptionClick,
}) => {
  const handleOptionClick = (color: string) => {
    onOptionClick && onOptionClick(color);
  };
  return (
    <div
      className="color-selection-container"
      style={{ display: startGame ? 'none' : '' }}
    >
      {colorOptions.map((color, index) => (
        <ColorOption key={index} color={color} onClick={handleOptionClick} />
      ))}
    </div>
  );
};

export default ColorSelectionContainer;
