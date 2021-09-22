import React, { Dispatch, SetStateAction } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../theme/colors';
import { CloseIcon } from '../assets/images/icons/CloseIcon';

interface Props {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const Overlay = styled(View)`
  background-color: rgba(0, 0, 0, 0.7);
  flex: 1;
`;

const Block = styled(View)`
  background-color: ${Colors.yellow1};
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;

const Close = styled(TouchableOpacity)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const Title = styled(Text)`
  font-size: 23px;
`;

export const FilterModal = ({ visible, setVisible }: Props) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <Overlay>
        <Block>
          <Title>Type</Title>
          <Title>Experience</Title>
          <Title>Attack</Title>
          <Close onPress={() => setVisible(false)}>
            <CloseIcon />
          </Close>
        </Block>
      </Overlay>
    </Modal>
  );
};