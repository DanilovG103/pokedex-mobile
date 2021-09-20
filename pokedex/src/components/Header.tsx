import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { Logo } from '../assets/images/icons/Logo';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../theme/colors';

const Container = styled(View)`
  padding: 10px 25px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${Colors.yellow1};
`;

export const Header = ({ open }) => {
  return (
    <Container>
      <Logo />
      <TouchableOpacity onPress={open}>
        <Icon name="menu" size={35} />
      </TouchableOpacity>
    </Container>
  );
};
