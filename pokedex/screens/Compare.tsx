import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Container = styled(View)``;

const NoPokemons = styled(Text)`
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  margin: auto;
`;

const PokemonImage = styled(Image)`
  width: 100px;
  height: 100px;
  resize-mode: contain;
`;

const PokemonName = styled(Text)`
  text-transform: capitalize;
  font-size: 22px;
`;

export const Compare = () => {
  const { comparedPokemons } = useSelector(state => state.PokemonReducer);

  if (comparedPokemons.length === 0) {
    return <NoPokemons>Nothing to compare</NoPokemons>;
  }

  const renderPokemons = ({ item }) => {
    return (
      <View>
        <PokemonName>{item.name}</PokemonName>
        <PokemonImage
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png`,
          }}
        />
      </View>
    );
  };

  return (
    <Container>
      <FlatList
        horizontal={false}
        numColumns={4}
        data={comparedPokemons}
        renderItem={renderPokemons}
        showsVerticalScrollIndicator={false}
        keyExtractor={() => Math.random().toString()}
      />
    </Container>
  );
};
