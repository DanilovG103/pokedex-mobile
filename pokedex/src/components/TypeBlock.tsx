import React, { ReactNode } from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import { switchProp } from 'styled-tools';
import { typeColors } from '../theme/colors';

const Block = styled(View)<{ typeColor: string }>`
  padding: 0 10px;
  align-items: center;
  justify-content: center;
  border-radius: 11px;
  background-color: ${switchProp('typeColor', typeColors)};
`;

interface Props {
  children: ReactNode;
  type: string;
}

export const TypeBlock = ({ children, type }: Props) => {
  return <Block typeColor={type}>{children}</Block>;
};
