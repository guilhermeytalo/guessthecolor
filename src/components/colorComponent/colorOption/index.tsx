import React from 'react';

interface ColorOptionProps {
  color: string;
  onClick: () => void;
}

const ColorOption: React.FC<ColorOptionProps> = ({ color, onClick }) => {
  return (
    <div className="color-option" onClick={onClick}>
      <p>{color}</p>
    </div>
  );
};

export default ColorOption;