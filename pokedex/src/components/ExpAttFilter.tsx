import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../theme/colors';
import { useDispatch, useSelector } from 'react-redux';
// import { setExperience, setAttack } from '../store/actions';
import { selectFilter } from '../store/selectors/filter';
import { setExp, setAttack } from '../store/saga/utils/utils';

const ExpAttBlock = styled(View)`
  background-color: ${Colors.white[4]};
  border-radius: 8px;
  margin: 15px;
  padding: 10px;
  justify-content: space-around;
`;

const Input = styled(TextInput)`
  width: 30%;
  background-color: ${Colors.white[2]};
  color: ${Colors.black};
  border-radius: 11px;
  padding: 0px 15px;
  margin-top: 3px;
`;

const Button = styled(TouchableOpacity)`
  background-color: ${Colors.green};
  align-self: flex-end;
  padding: 2px 15px;
  border-radius: 11px;
  margin-top: 10px;
  margin-right: 30px;
`;

const Line = styled(View)`
  background-color: ${Colors.black};
  width: 10%;
  margin: 0 15px;
  height: 2px;
`;

const TextRow = styled(View)`
  flex-direction: row;
  justify-content: space-around;
`;

const InputRow = styled(TextRow)`
  align-items: center;
  justify-content: center;
`;

const Title = styled(Text)`
  margin-right: 45px;
`;

interface Props {
  filterType: string;
}

export const ExpAttFilter = ({ filterType }: Props) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const dispatch = useDispatch();
  const { experienceFrom, experienceTo, attackFrom, attackTo } =
    useSelector(selectFilter);

  const setFilterValues = (firstValue: number, secondValue: number) => {
    filterType === 'exp'
      ? dispatch(setExp(firstValue, secondValue))
      : dispatch(setAttack(firstValue, secondValue));
  };

  return (
    <ExpAttBlock>
      <TextRow>
        <Title>From</Title>
        <Title>To</Title>
      </TextRow>
      <InputRow>
        <Input
          placeholder={
            filterType === 'exp'
              ? experienceFrom.toString()
              : attackFrom.toString()
          }
          placeholderTextColor="#00000086"
          keyboardType="number-pad"
          onChangeText={value => setFrom(value)}
        />
        <Line />
        <Input
          placeholder={
            filterType === 'exp' ? experienceTo.toString() : attackTo.toString()
          }
          placeholderTextColor="#00000086"
          keyboardType="number-pad"
          onChangeText={value => setTo(value)}
        />
      </InputRow>
      <Button onPress={() => setFilterValues(+from, +to)}>
        <Text>Apply</Text>
      </Button>
    </ExpAttBlock>
  );
};
