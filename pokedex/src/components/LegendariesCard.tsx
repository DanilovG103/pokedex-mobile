import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { PokemonTypes } from '../../api/types';
import { Fonts } from '../theme/fonts';
import { PokemonModal } from './Modal';

const Line = styled(View)`
  height: 1px;
  margin: 10px;
  width: 100%;
  align-self: center;
  background-color: ${props => props.theme.line};
`;

const Name = styled(Text)`
  font-size: 26px;
  text-align: left;
  text-transform: capitalize;
  color: ${props => props.theme.fontColor};
  font-family: ${Fonts.regular};
`;

const Description = styled(Text)`
  font-size: 18px;
  margin: 5px 0;
  font-family: ${Fonts.regular};
  color: ${props => props.theme.fontColor};
  text-transform: capitalize;
`;

const StatsBlock = styled(View)`
  align-items: flex-start;
  flex: 1;
`;

const Row = styled(View)`
  margin: 15px 0;
  flex-direction: row;
`;

const PokeImage = styled(Image)`
  align-self: center;
  width: 250px;
  height: 250px;
`;

const Card = styled(View)`
  padding: 0 15px;
`;
interface Props {
  pokemon: PokemonTypes;
}

export const LegendariesCard = ({ pokemon }: Props) => {
  const [pokemonVisible, setPokemonVisible] = useState(false);

  return (
    <Card>
      <Line />
      <TouchableOpacity onPress={() => setPokemonVisible(true)}>
        <PokeImage
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
          }}
        />
      </TouchableOpacity>
      <Name>{pokemon.name}</Name>
      <Row>
        <StatsBlock>
          <Description>Healthy Points</Description>
          <Description>{pokemon.stats[0].base_stat}</Description>
        </StatsBlock>
        <StatsBlock>
          <Description>Experience</Description>
          <Description>{pokemon.base_experience}</Description>
        </StatsBlock>
      </Row>
      <Row>
        <StatsBlock>
          <Description>{pokemon.stats[2].stat.name}</Description>
          <Description>{pokemon.stats[2].base_stat}</Description>
        </StatsBlock>
        <StatsBlock>
          <Description>{pokemon.stats[1].stat.name}</Description>
          <Description>{pokemon.stats[1].base_stat}</Description>
        </StatsBlock>
      </Row>
      <Row>
        <StatsBlock>
          <Description>{pokemon.stats[4].stat.name}</Description>
          <Description>{pokemon.stats[4].base_stat}</Description>
        </StatsBlock>
        <StatsBlock>
          <Description>{pokemon.stats[3].stat.name}</Description>
          <Description>{pokemon.stats[3].base_stat}</Description>
        </StatsBlock>
      </Row>
      <PokemonModal
        visible={pokemonVisible}
        setIsVisible={setPokemonVisible}
        data={pokemon}
      />
    </Card>
  );
};
