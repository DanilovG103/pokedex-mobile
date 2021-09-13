import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';

const Layout = styled(View)`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Title = styled(Text)`
  font-weight: 700;
`;

export const About = () => {
  return (
    <Layout>
      <Title>About</Title>
    </Layout>
  );
};
