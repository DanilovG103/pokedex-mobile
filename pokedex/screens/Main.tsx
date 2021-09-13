import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

const Background = styled(View)`
  background-color: #fff;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Title = styled(Text)`
  color: #212121;
`;

export const Main = () => {
  return (
    <Background>
      <Title>Hello</Title>
    </Background>
  );
};
