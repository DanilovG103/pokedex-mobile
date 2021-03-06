import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getLegendariesPokemonsList } from '../src/store/actions';
import { FlatListFooter } from '../src/components/Footer';
import { ItemRenderProps } from '../api/types';
import { Fonts } from '../src/theme/fonts';
import { LegendariesCard } from '../src/components/LegendariesCard';

const Wrapper = styled(View)`
  flex: 1;
  background-color: ${props => props.theme.body};
  padding: 15px 15px 0;
`;

const Title = styled(Text)`
  font-family: ${Fonts.regular};
  text-align: center;
  font-size: 36px;
  color: ${props => props.theme.fontColor};
`;

export const Legendaries = () => {
  const [pagination, setPagination] = useState(898);
  const dispatch = useDispatch();
  const { legendariesPokemons } = useSelector(state => state.PokemonReducer);

  useEffect(() => {
    dispatch(getLegendariesPokemonsList(pagination));
  }, [pagination, dispatch]);

  const loadMore = () => {
    setPagination(prevState => prevState + 9);
  };

  const renderPokemons = ({ item }: ItemRenderProps) => {
    return <LegendariesCard pokemon={item} />;
  };

  return (
    <Wrapper>
      <Title>Legendaries</Title>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={legendariesPokemons}
        renderItem={renderPokemons}
        onEndReached={loadMore}
        ListFooterComponent={FlatListFooter}
        onEndReachedThreshold={1}
        keyExtractor={item => item.id.toString()}
      />
    </Wrapper>
  );
};
