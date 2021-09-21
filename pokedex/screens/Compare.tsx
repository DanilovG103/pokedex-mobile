import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ItemRenderProps } from '../api/types';
import { ComparingCard } from '../src/components/ComparingCard';

const Container = styled(View)`
  flex: 1;
  align-items: center;
  padding: 15px;
`;

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

  const renderPokemons = ({ item }: ItemRenderProps) => {
    return <ComparingCard pokemon={item} />;
  };

  return (
    <Container>
      <FlatList
        data={comparedPokemons}
        renderItem={renderPokemons}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
      />
    </Container>
  );
};
