import React, { Dispatch, SetStateAction } from 'react';
import Modal from 'react-native-modal';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import styled, { useTheme } from 'styled-components';
import { Colors } from '../theme/colors';
import { CloseIcon } from '../../resources/assets/images/icons/CloseIcon';
import { useSelector, useDispatch } from 'react-redux';
import { getPokemonByType } from '../store/actions';
import { TypeRenderProps } from '../../api/types';
import { ExpAttFilter } from './ExpAttFilter';
import { Fonts } from '../theme/fonts';

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

const Wrapper = styled(View)`
  width: 35%;
  align-items: flex-start;
  justify-content: center;
`;

const TypeBlock = styled(TouchableOpacity)`
  padding: 0 20px;
  margin: 7px 0;
`;

const TypeName = styled(Text)<{ selected: boolean }>`
  color: ${props => (props.selected ? Colors.red : props.theme.fontColor)};
  font-family: ${Fonts.regular};
  text-transform: capitalize;
`;

const Loader = styled(View)`
  position: absolute;
  top: 20px;
  left: 50%;
`;

export const FilterModal = ({ visible, setVisible }: Props) => {
  const { type, types, typeLoading } = useSelector(
    state => state.FilterReducer,
  );
  const dispatch = useDispatch();
  const theme = useTheme();

  const action = (name: string) => {
    dispatch(getPokemonByType(name));
  };

  const renderTypes = ({ item }: TypeRenderProps) => {
    return (
      <Wrapper>
        <TypeBlock onPress={() => action(item.name)}>
          <TypeName selected={type === item.name}>{item.name}</TypeName>
        </TypeBlock>
      </Wrapper>
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
        {typeLoading ? (
          <Loader>
            <ActivityIndicator size="large" />
          </Loader>
        ) : null}
        <FlatList
          data={types.filter(
            item => item.name !== 'unknown' && item.name !== 'shadow',
          )}
          numColumns={3}
          keyExtractor={item => item.name}
          renderItem={renderTypes}
        />
        <Line />
        <Title>Experience</Title>
        <ExpAttFilter filterType="exp" />
        <Line />
        <Title>Attack</Title>
        <ExpAttFilter filterType="attack" />
        <Close onPress={() => setVisible(false)}>
          <CloseIcon darkTheme={theme.type === 'dark'} />
        </Close>
      </Block>
    </Modal>
  );
};
