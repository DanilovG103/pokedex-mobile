import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { Logo } from '../../resources/assets/images/icons/Logo';
import Icon from 'react-native-vector-icons/Ionicons';
import { ModalNavigation } from './ModalNavigation';

const Container = styled(View)`
  padding: 10px 25px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.theme.header};
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
