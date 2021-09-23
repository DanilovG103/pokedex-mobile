import React from 'react';
import Svg, { Rect } from 'react-native-svg';
import { Colors } from '../../../../src/theme/colors';

export const CloseIcon = ({ darkTheme }) => {
  return (
    <Svg width={32} height={32} fill="none">
      <Rect
        width={35.468}
        height={9.213}
        rx={3}
        transform="scale(.99748 1.00251) rotate(45 2.864 8.027)"
        fill={darkTheme ? Colors.white[1] : Colors.black}
      />
      <Rect
        width={35.468}
        height={9.213}
        rx={3}
        transform="scale(-.99748 -1.00251) rotate(-45 -23.66 34.88)"
        fill={darkTheme ? Colors.white[1] : Colors.black}
      />
    </Svg>
  );
};
