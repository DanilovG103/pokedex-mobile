import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../src/theme/colors';
import { useDispatch, useSelector } from 'react-redux';
import { getLegendariesPokemonsList } from '../src/store/actions';
import { FlatListFooter } from '../src/components/Footer';
import { ItemRenderProps } from '../api/types';
import { Fonts } from '../src/theme/fonts';

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

const Line = styled(View)`
  height: 1px;
  margin: 10px;
  width: 100%;
  align-self: center;
  background-color: ${Colors.black};
`;

const Name = styled(Text)`
  font-size: 30px;
  text-align: center;
  text-transform: capitalize;
  font-family: ${Fonts.regular};
`;

const Description = styled(Text)`
  font-size: 18px;
  margin: 5px 0;
  font-family: ${Fonts.regular};
`;

const StatsBlock = styled(View)`
  align-items: center;
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
    return (
      <>
        <Line />
        <Name>{item.name}</Name>
        <PokeImage
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png`,
          }}
        />
        <Row>
          <StatsBlock>
            {item.stats.map(el => (
              <>
                <Description>{el.stat.name}</Description>
                <Description>{el.base_stat}</Description>
              </>
            ))}
          </StatsBlock>
        </Row>
      </>
    );
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
    </Wrapper>
  );
};
