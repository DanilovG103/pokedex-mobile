import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../theme/colors';
import { useDispatch, useSelector } from 'react-redux';
import { setExperience, setAttack } from '../store/actions';

const ExpAttBlock = styled(View)`
  background-color: ${Colors.white[4]};
  border-radius: 8px;
  margin: 15px;
  padding: 10px;
  flex-direction: row;
  justify-content: space-around;
`;

const Input = styled(TextInput)`
  background-color: ${Colors.white[2]};
  color: ${Colors.black};
  border-radius: 11px;
  padding: 0px 15px;
  margin-top: 3px;
`;

const Button = styled(TouchableOpacity)`
  background-color: ${Colors.green};
  padding: 2px 15px;
  border-radius: 11px;
  margin-top: 5px;
`;

interface Props {
  filterType: string;
}

export const ExpAttFilter = ({ filterType }: Props) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const dispatch = useDispatch();
  const { experienceFrom, experienceTo, attackFrom, attackTo } = useSelector(
    state => state.FilterReducer,
  );

  const setFilterValues = (firstValue: number, secondValue: number) => {
    filterType === 'exp'
      ? dispatch(setExperience(firstValue, secondValue))
      : dispatch(setAttack(firstValue, secondValue));
  };

  return (
    <ExpAttBlock>
      <View>
        <Text>From</Text>
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
      </View>
      <View>
        <Text>To</Text>
        <Input
          placeholder={
            filterType === 'exp' ? experienceTo.toString() : attackTo.toString()
          }
          placeholderTextColor="#00000086"
          keyboardType="number-pad"
          onChangeText={value => setTo(value)}
        />
        <Button onPress={() => setFilterValues(+from, +to)}>
          <Text>Apply</Text>
        </Button>
      </View>
    </ExpAttBlock>
  );
};
