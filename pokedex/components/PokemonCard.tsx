import React from 'react';
import styled from 'styled-components';
import { View, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../assets/colors';
import { useSelector, useDispatch } from 'react-redux';

const Card = styled(TouchableOpacity)`
  width: 100%;
  background: ${Colors.white[2]};
  border-radius: 10px;
  padding: 5px 25px;
  margin: 5px 0;
  elevation: 3;
`;

const PokeName = styled(Text)`
  font-size: 18px;
  line-height: 21px;
  color: ${Colors.dark};
  font-weight: 700;
`;

const Circle = styled(View)`
  width: 38px;
  height: 38px;
  border-radius: 19px;
  border: 3px solid ${Colors.black};
  align-items: center;
  justify-content: center;
  margin: 2px;
`;

const StatsCount = styled(Text)`
  font-weight: 400;
  font-size: 15px;
  line-height: 17px;
  color: ${Colors.dark};
`;

const StatsTitle = styled(Text)`
  color: ${Colors.gray};
  font-size: 12px;
  line-height: 14px;
`;

const TypeTitle = styled(StatsTitle)`
  color: ${Colors.dark};
`;

const Wrapper = styled(View)`
  flex-direction: row;
  margin: 5px 0;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
`;

interface Props {
  name: string;
  activeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PokemonCard = ({ name, activeModal }: Props) => {
  return (
    <Card onPress={() => activeModal(true)}>
      <PokeName>{name}</PokeName>
      <Wrapper>
        <Circle>
          <StatsCount>419</StatsCount>
        </Circle>
        <Circle>
          <StatsCount>419</StatsCount>
        </Circle>
      </Wrapper>
      <Wrapper>
        <StatsTitle>Attack </StatsTitle>
        <StatsTitle>Defence</StatsTitle>
      </Wrapper>
      <Wrapper>
        <TypeTitle>Grass </TypeTitle>
        <TypeTitle>Poison</TypeTitle>
      </Wrapper>
    </Card>
  );
};
