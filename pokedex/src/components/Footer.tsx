import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styled from 'styled-components';

const Footer = styled(View)`
  margin-top: 5px;
  align-items: center;
`;

export const FlatListFooter = () => {
  return (
    <Footer>
      <ActivityIndicator size="large" />
    </Footer>
  );
};
