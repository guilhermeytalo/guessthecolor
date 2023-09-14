import React from 'react';

interface ColorOptionProps {
  color: string;
  onClick: (color: string) => void;
}

const ColorOption: React.FC<ColorOptionProps> = ({ color, onClick }) => {
  const handleOptionClick = () => {
    onClick(color);
  }

  return (
    <div className="color-option" onClick={handleOptionClick}>
      <p>{color}</p>
    </div>
  );
};

export default ColorOption;