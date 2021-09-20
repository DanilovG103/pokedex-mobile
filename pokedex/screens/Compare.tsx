import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Container = styled(View)``;

const NoPokemons = styled(Text)`
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  margin: auto;
`;

export const Compare = () => {
  const { comparedPokemons } = useSelector(state => state.PokemonReducer);

  if (comparedPokemons.length === 0) {
    return <NoPokemons>Nothing to compare</NoPokemons>;
  }

  const renderPokemons = ({ item }) => {
    return (
      <View>
        <Text>{item.name}</Text>
      </View>
    );
  };

  return (
    <Container>
      <FlatList
        data={comparedPokemons}
        renderItem={renderPokemons}
        showsVerticalScrollIndicator={false}
        keyExtractor={() => Math.random().toString()}
      />
    </Container>
  );
};
