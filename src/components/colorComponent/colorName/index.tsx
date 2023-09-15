import React from 'react';

interface ColorNameProps {
  color: string | '';
}

const ColorName: React.FC<ColorNameProps> = ({ color }) => {
  return (
    <div className="color-name" style={{ backgroundColor: color }}>
    </div>
  );
};

export default ColorName;