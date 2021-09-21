import React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import styled from 'styled-components';
import { PokemonTypes } from '../../api/types';
import { Colors } from '../theme/colors';
import { TypeBlock } from './TypeBlock';

interface Props {
  pokemon: PokemonTypes;
}

const PokemonCard = styled(View)`
  width: ${Dimensions.get('window').width - 100}px;
  margin: 8px;
  border: 1px solid ${Colors.black};
  border-radius: 11px;
  padding: 0 5px;
`;

const PokemonImage = styled(Image)`
  width: 100px;
  height: 100px;
  resize-mode: contain;
  align-self: center;
`;

const PokemonName = styled(Text)`
  text-align: center;
  text-transform: capitalize;
  font-size: 22px;
`;

const Stats = styled(View)`
  border-bottom-width: 1px;
  margin-bottom: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Types = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 8px 0;
`;

const CategoryTitle = styled(Text)`
  font-size: 18px;
  text-align: center;
  font-weight: 700;
  color: ${Colors.dark};
`;

const StatName = styled(Text)`
  text-transform: capitalize;
  font-size: 17px;
  color: ${Colors.dark};
`;

export const ComparingCard = ({ pokemon }: Props) => {
  return (
    <PokemonCard>
      <PokemonName>{pokemon.name}</PokemonName>
      <PokemonImage
        source={{
          uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
        }}
      />
      <CategoryTitle>Stats</CategoryTitle>
      {pokemon.stats?.map(el => (
        <Stats>
          <StatName>{el.stat.name}</StatName>
          <StatName>{el.base_stat}</StatName>
        </Stats>
      ))}
      <CategoryTitle>Types</CategoryTitle>
      <Types>
        {pokemon.types?.map(el => (
          <TypeBlock type={el.type.name}>
            <StatName>{el.type.name} </StatName>
          </TypeBlock>
        ))}
      </Types>
    </PokemonCard>
  );
};
