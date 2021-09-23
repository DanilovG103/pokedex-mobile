import React, { Dispatch, SetStateAction } from 'react';
import Modal from 'react-native-modal';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styled, { useTheme } from 'styled-components';
import { Colors } from '../theme/colors';
import { CloseIcon } from '../../resources/assets/images/icons/CloseIcon';
import { CheckBox } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedValues } from '../store/actions';
import { TypeRenderProps } from '../../api/types';
import { ExpAttFilter } from './ExpAttFilter';
interface Props {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const Block = styled(View)`
  background-color: ${props => props.theme.header};
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
  color: ${props => props.theme.fontColor};
`;

const CheckBoxWrapper = styled(View)`
  width: 35%;
  align-items: flex-start;
  justify-content: center;
`;

export const FilterModal = ({ visible, setVisible }: Props) => {
  const { types, selectedTypes } = useSelector(state => state.PokemonReducer);
  const dispatch = useDispatch();
  const theme = useTheme();

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
          textStyle={{
            fontSize: 12,
            textTransform: 'capitalize',
            color: theme.type === 'dark' ? Colors.white[4] : Colors.dark,
          }}
        />
      </CheckBoxWrapper>
    );
  };

  return (
    <Modal
      isVisible={visible}
      onBackButtonPress={() => setVisible(false)}
      onBackdropPress={() => setVisible(false)}
      animationIn="slideInDown"
      animationOut="slideOutUp"
      useNativeDriver
      style={{
        position: 'absolute',
        top: -20,
        right: -18,
        width: '100%',
      }}>
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
          <CloseIcon darkTheme={theme.type === 'dark'} />
        </Close>
      </Block>
    </Modal>
  );
};
