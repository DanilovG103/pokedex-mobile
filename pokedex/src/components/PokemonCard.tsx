import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../theme/colors';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemon } from '../store/actions';
import { PokemonTypes } from '../../api/types';

const Card = styled(TouchableOpacity)`
  flex-direction: row;
  background: ${Colors.white[2]};
  border-radius: 10px;
  padding: 5px 0 5px 25px;
  margin: 5px;
  margin-bottom: 10px;
  elevation: 3;
`;

const PokeName = styled(Text)`
  margin-top: 5px;
  text-transform: capitalize;
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
  margin: 5px 0;
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
  pokemon: PokemonTypes;
  activeModal: Dispatch<SetStateAction<boolean>>;
}

export const PokemonCard = ({ pokemon, activeModal }: Props) => {
  const dispatch = useDispatch();

  const openModal = (bool: boolean) => {
    activeModal(bool);
    dispatch(getPokemon(pokemon.name));
  };

  return (
    <Card onPress={() => openModal(true)}>
      <View>
        <PokeName>{pokemon.name}</PokeName>
        <Wrapper>
          <Circle>
            <StatsCount>419</StatsCount>
          </Circle>
          <Circle style={{ marginLeft: 2 }}>
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
      </View>
      {/* <Image
        source={{ uri: image }}
        style={{
          resizeMode: 'contain',
          width: 150,
          height: 125,
          alignSelf: 'center',
          marginLeft: 30,
        }}
      /> */}
    </Card>
  );
};
