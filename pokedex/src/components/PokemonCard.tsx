import React, { Dispatch, SetStateAction } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components';
import { switchProp } from 'styled-tools';
import { Colors, typeColors } from '../theme/colors';
import { useDispatch } from 'react-redux';
import { getPokemon } from '../store/actions';
import { PokemonTypes } from '../../api/types';

const Card = styled(TouchableOpacity)`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  background: ${Colors.white[2]};
  border-radius: 10px;
  padding: 5px 0 5px 20px;
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
  text-transform: capitalize;
  color: ${Colors.gray};
  font-size: 12px;
  line-height: 14px;
`;

const TypeBlock = styled(View)<{ typeColor: string }>`
  padding: 0 10px;
  align-items: center;
  justify-content: center;
  border-radius: 11px;
  background-color: ${switchProp('typeColor', typeColors)};
`;

const TypeTitle = styled(StatsTitle)`
  color: ${Colors.dark};
`;

const Wrapper = styled(View)<{ width?: number }>`
  width: ${prop => prop.width ?? 90}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0;
`;

const PokemonImage = styled(Image)`
  resize-mode: contain;
  width: 150px;
  height: 120px;
  align-self: center;
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
          {pokemon.stats
            .filter(
              el => el.stat.name === 'attack' || el.stat.name === 'defense',
            )
            .map(el => (
              <View>
                <Circle>
                  <StatsCount>{el.base_stat}</StatsCount>
                </Circle>
                <StatsTitle>{el.stat.name}</StatsTitle>
              </View>
            ))}
        </Wrapper>
        <Wrapper width={120}>
          {pokemon.types.map(el => (
            <TypeBlock typeColor={el.type.name}>
              <TypeTitle>{el.type.name} </TypeTitle>
            </TypeBlock>
          ))}
        </Wrapper>
      </View>
      <PokemonImage
        source={{
          uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
        }}
      />
    </Card>
  );
};
