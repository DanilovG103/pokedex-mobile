import React from 'react';
import Svg, { SvgProps, Rect } from 'react-native-svg';

export const CloseIcon = (props: SvgProps) => {
  return (
    <Svg width={32} height={32} fill="none" {...props}>
      <Rect
        width={35.468}
        height={9.213}
        rx={3}
        transform="scale(.99748 1.00251) rotate(45 2.864 8.027)"
        fill="#f2f2f2"
      />
      <Rect
        width={35.468}
        height={9.213}
        rx={3}
        transform="scale(-.99748 -1.00251) rotate(-45 -23.66 34.88)"
        fill="#f2f2f2"
      />
    </Svg>
  );
};
