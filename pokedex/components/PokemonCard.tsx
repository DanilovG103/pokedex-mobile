import React from 'react';
import styled from 'styled-components';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../assets/colors';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemon } from '../redux/actions';

const Card = styled(TouchableOpacity)`
  background: ${Colors.white[2]};
  border-radius: 10px;
  padding: 5px 25px;
  margin: 5px;
  elevation: 3;
`;

const PokeName = styled(Text)`
  font-size: 16px;
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
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  margin: 5px 0;
`;

interface Props {
  name: string;
  activeModal: React.Dispatch<React.SetStateAction<boolean>>;
  image: any;
  types: any;
  abilities: any;
}

export const PokemonCard = ({
  name,
  activeModal,
  image,
  types,
  abilities,
}: Props) => {
  const dispatch = useDispatch();

  const openModal = (bool: boolean) => {
    activeModal(bool);
    dispatch(getPokemon(name));
  };

  return (
    <Card onPress={() => openModal(true)}>
      <PokeName>{name}</PokeName>
      <Image
        source={{ uri: image }}
        style={{ resizeMode: 'contain', width: 100, height: 100 }}
      />
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
