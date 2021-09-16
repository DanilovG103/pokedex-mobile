import React from 'react';
import { Modal, View, Text } from 'react-native';
import styled from 'styled-components';
import { PokemonTypes } from '../api/types';

interface Props {
  visible: boolean;
  data: PokemonTypes;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Overlay = styled(View)`
  background-color: rgba(0, 0, 0, 0.2);
  flex: 1;
  justify-content: center;
`;

export const PokemonModal = ({ visible, setIsVisible, data }: Props) => {
  return (
    <Modal transparent={true} visible={visible}>
      <Overlay>
        <Text> Hello</Text>
      </Overlay>
    </Modal>
  );
};
