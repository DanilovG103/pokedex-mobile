import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../theme/colors';

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

export const ExpAttFilter = () => {
  return (
    <ExpAttBlock>
      <View>
        <Text>From</Text>
        <Input
          placeholder="0"
          placeholderTextColor="#00000086"
          keyboardType="number-pad"
        />
      </View>
      <View>
        <Text>To</Text>
        <Input
          placeholder="0"
          placeholderTextColor="#00000086"
          keyboardType="number-pad"
        />
        <Button>
          <Text>Apply</Text>
        </Button>
      </View>
    </ExpAttBlock>
  );
};
