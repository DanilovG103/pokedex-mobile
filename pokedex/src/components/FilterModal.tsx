import React, { Dispatch, SetStateAction } from 'react';
import { Modal, View } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../theme/colors';

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

export const FilterModal = ({ visible, setVisible }: Props) => {
  return (
    <Modal visible={visible} transparent={true}>
      <Overlay>
        <Block />
      </Overlay>
    </Modal>
  );
};
