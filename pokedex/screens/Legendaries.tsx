import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../src/theme/colors';
import { useDispatch, useSelector } from 'react-redux';
import { getLegendariesPokemonsList } from '../src/store/actions';
import { FlatListFooter } from '../src/components/Footer';
import { ItemRenderProps } from '../api/types';
import { Fonts } from '../src/theme/fonts';
import { LegendariesCard } from '../src/components/LegendariesCard';
import { PokemonModal } from '../src/components/Modal';

const Wrapper = styled(View)`
  flex: 1;
  background-color: ${Colors.white[0]};
  padding: 15px 15px 0;
`;

const Title = styled(Text)`
  font-family: ${Fonts.regular};
  text-align: center;
  font-size: 36px;
  color: ${Colors.dark};
`;

export const Legendaries = () => {
  const [pagination, setPagination] = useState(898);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const { legendariesPokemons } = useSelector(state => state.PokemonReducer);

  useEffect(() => {
    dispatch(getLegendariesPokemonsList(pagination));
  }, [pagination, dispatch]);

  const loadMore = () => {
    setPagination(prevState => prevState + 9);
  };

  const renderPokemons = ({ item }: ItemRenderProps) => {
    return <LegendariesCard item={item} activeModal={setVisible} />;
  };

  return (
    <Wrapper>
      <Title>Legendaries</Title>
      <FlatList
        data={legendariesPokemons}
        renderItem={renderPokemons}
        onEndReached={loadMore}
        ListFooterComponent={FlatListFooter}
        onEndReachedThreshold={1}
        keyExtractor={() => Math.random().toString()}
      />
      <PokemonModal visible={visible} setIsVisible={setVisible} />
    </Wrapper>
  );
};
