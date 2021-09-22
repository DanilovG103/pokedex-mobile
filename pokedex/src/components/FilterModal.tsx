import React, { Dispatch, SetStateAction } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../theme/colors';
import { CloseIcon } from '../assets/images/icons/CloseIcon';
import { CheckBox } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedValues } from '../store/actions';
import { TypeRenderProps } from '../../api/types';
import { ExpAttFilter } from './ExpAttFilter';
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
  padding: 25px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;

const Close = styled(TouchableOpacity)`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const Line = styled(View)<{ clr?: string }>`
  width: 100%;
  background-color: ${props => props.clr ?? Colors.white[1]};
  height: 2px;
`;

const Title = styled(Text)`
  font-size: 23px;
`;

const CheckBoxWrapper = styled(View)`
  width: 35%;
  align-items: flex-start;
  justify-content: center;
`;

export const FilterModal = ({ visible, setVisible }: Props) => {
  const { types, selectedTypes } = useSelector(state => state.PokemonReducer);
  const dispatch = useDispatch();

  const action = (name: string) => {
    dispatch(setSelectedValues(name));
  };

  const renderCheckBox = ({ item }: TypeRenderProps) => {
    return (
      <CheckBoxWrapper>
        <CheckBox
          onPress={() => action(item.name)}
          checkedColor={Colors.red}
          checked={selectedTypes.includes(item.name)}
          title={item.name}
          containerStyle={{
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            paddingHorizontal: 0,
            margin: 0,
          }}
          textStyle={{ fontSize: 12, textTransform: 'capitalize' }}
        />
      </CheckBoxWrapper>
    );
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <Overlay>
        <Block>
          <Title>Type</Title>
          <FlatList
            data={types.filter(
              item => item.name !== 'unknown' && item.name !== 'shadow',
            )}
            numColumns={3}
            keyExtractor={item => item.name}
            renderItem={renderCheckBox}
          />
          <Line />
          <Title>Experience</Title>
          <ExpAttFilter />
          <Line />
          <Title>Attack</Title>
          <ExpAttFilter />
          <Close onPress={() => setVisible(false)}>
            <CloseIcon />
          </Close>
        </Block>
      </Overlay>
    </Modal>
  );
};
