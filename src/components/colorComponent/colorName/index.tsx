import React from 'react';

interface ColorNameProps {
  color: string | '';
}

const ColorName: React.FC<ColorNameProps> = ({ color }) => {
  return (
    <div className="color-name" style={{ backgroundColor: color }}>
      <p>{color}</p>
    </div>
  );
};

export default ColorName;