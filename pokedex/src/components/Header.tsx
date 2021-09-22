import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { Logo } from '../assets/images/icons/Logo';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../theme/colors';
import { ModalNavigation } from './ModalNavigation';

const Container = styled(View)`
  padding: 10px 25px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${Colors.yellow1};
`;

export const Header = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  return (
    <Container>
      <Logo />
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Icon name="menu" size={35} />
      </TouchableOpacity>
      <ModalNavigation
        visible={visible}
        setVisible={setVisible}
        navigation={navigation}
      />
    </Container>
  );
};
