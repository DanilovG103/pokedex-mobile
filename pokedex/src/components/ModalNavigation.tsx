import React, { Dispatch, SetStateAction } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components';
import { Colors } from '../theme/colors';
import { Logo } from '../../resources/assets/images/icons/Logo';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/routers';

const Background = styled(View)`
  background-color: ${Colors.yellow1};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  width: 100%;
  height: 350px;
  align-items: center;
  justify-content: space-around;
`;

const Title = styled(Text)`
  font-size: 24px;
  color: ${Colors.dark};
  text-align: center;
`;

const Navigate = styled(TouchableOpacity)`
  width: 100%;
`;

const PokeLogo = styled(Logo)`
  margin-top: 20px;
  transform: scale(2);
`;

interface Props {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  navigation: StackNavigationProp<ParamListBase, string>;
}

export const ModalNavigation = ({ visible, setVisible, navigation }: Props) => {
  return (
    <Modal
      isVisible={visible}
      onBackButtonPress={() => setVisible(false)}
      onBackdropPress={() => setVisible(false)}
      animationIn="slideInDown"
      animationOut="slideOutUp"
      useNativeDriver
      style={{ position: 'absolute', top: -20, right: -18, width: '100%' }}>
      <Background>
        <PokeLogo />
        <Navigate onPress={() => navigation.navigate('Home')}>
          <Title>Home</Title>
        </Navigate>
        <Navigate onPress={() => navigation.navigate('Legendaries')}>
          <Title>Legendaries</Title>
        </Navigate>
        <Navigate onPress={() => navigation.navigate('Compare')}>
          <Title>Compare</Title>
        </Navigate>
      </Background>
    </Modal>
  );
};
