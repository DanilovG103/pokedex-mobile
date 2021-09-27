import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../theme/colors';
import { PokemonTypes } from '../../api/types';
import { TypeBlock } from './TypeBlock';
import { Fonts } from '../theme/fonts';
import { PokemonModal } from './Modal';

const Card = styled(TouchableOpacity)`
  width: ${Dimensions.get('window').width - 60}px;
  align-items: center;
  flex-direction: row;
  background: ${props => props.theme.card};
  border-radius: 10px;
  padding: 5px 0 5px 20px;
  margin: 5px;
  margin-bottom: 10px;
  elevation: 3;
`;

const PokeName = styled(Text)`
  margin-top: 5px;
  text-transform: capitalize;
  font-size: 15px;
  line-height: 21px;
  color: ${props => props.theme.fontColor};
  font-family: ${Fonts.bold};
`;

const Circle = styled(View)`
  width: 38px;
  height: 38px;
  border-radius: 19px;
  border: 3px solid ${props => props.theme.circle};
  align-items: center;
  justify-content: center;
  margin: 5px 0;
`;

const StatsCount = styled(Text)`
  font-family: ${Fonts.regular};
  font-size: 15px;
  line-height: 17px;
  color: ${props => props.theme.fontColor};
`;

const StatsTitle = styled(Text)`
  text-transform: capitalize;
  color: ${props => props.theme.statColor};
  font-family: ${Fonts.regular};
  font-size: 12px;
  line-height: 14px;
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
  position: absolute;
  right: 0px;
  resize-mode: contain;
  width: 150px;
  height: 120px;
  align-self: center;
`;

interface Props {
  pokemon: PokemonTypes;
}

export const PokemonCard = ({ pokemon }: Props) => {
  const [pokemonVisible, setPokemonVisible] = useState(false);

  return (
    <Card onPress={() => setPokemonVisible(true)}>
      <View>
        <PokeName>{pokemon.name}</PokeName>
        <Wrapper>
          {pokemon.stats
            .filter(
              el => el.stat.name === 'attack' || el.stat.name === 'defense',
            )
            .map(el => (
              <View key={el.stat.name}>
                <Circle>
                  <StatsCount>{el.base_stat}</StatsCount>
                </Circle>
                <StatsTitle>{el.stat.name}</StatsTitle>
              </View>
            ))}
        </Wrapper>
        <Wrapper width={110}>
          {pokemon.types.map(el => (
            <TypeBlock key={el.type.name} type={el.type.name}>
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
      <PokemonModal
        visible={pokemonVisible}
        setIsVisible={setPokemonVisible}
        data={pokemon}
      />
    </Card>
  );
};
