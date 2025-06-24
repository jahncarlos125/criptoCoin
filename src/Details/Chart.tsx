import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  data: number[];
  width: number;
  height: number;
  color?: string;
}

export function Chart({ data, width, height, color = '#6200ee' }: Props) {
  if (data.length === 0) {
    return null;
  }

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1);

  const path = data
    .map((value, index) => {
      const x = index * stepX;
      const y = height - ((value - min) / range) * height;
      const prefix = index === 0 ? 'M' : 'L';
      return `${prefix}${x},${y}`;
    })
    .join(' ');

  return (
    <Svg width={width} height={height}>
      <Path d={path} fill="none" stroke={color} strokeWidth={2} />
    </Svg>
  );
}
