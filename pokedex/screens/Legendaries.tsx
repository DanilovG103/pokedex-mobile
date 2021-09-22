import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../src/theme/colors';
import { useDispatch, useSelector } from 'react-redux';
import { getLegendariesPokemonsList } from '../src/store/actions';
import { FlatListFooter } from '../src/components/Footer';
import { ItemRenderProps } from '../api/types';

const Wrapper = styled(View)`
  flex: 1;
  background-color: ${Colors.white[0]};
  padding: 15px;
`;

const Title = styled(Text)`
  text-align: center;
  font-size: 36px;
  color: ${Colors.dark};
`;

const Line = styled(View)`
  margin-top: 10px;
  height: 1px;
  width: 100%;
  background-color: ${Colors.black};
`;

const Name = styled(Text)`
  font-size: 40px;
`;

const Description = styled(Text)`
  font-size: 18px;
  margin: 5px 0;
`;

const StatsBlock = styled(View)`
  align-items: flex-start;
  flex: 1;
`;

const Row = styled(View)`
  margin: 15px 0;
  flex-direction: row;
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

  console.log(legendariesPokemons);
  const renderPokemons = ({ item }: ItemRenderProps) => {
    return (
      <>
        <Name>{item.name}</Name>
        <Description>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla sunt
          dolorem, rerum soluta ipsam neque, saepe ea doloremque nesciunt, cum
          error ratione adipisci labore tempora corrupti? Nobis, dolorem.
        </Description>
        <Row>
          <StatsBlock>
            <Description>Health points</Description>
            <Description>100000</Description>
            <Description>Experience</Description>
            <Description>100000</Description>
            <Description>Attack</Description>
            <Description>100000</Description>
          </StatsBlock>
          <StatsBlock>
            <Description>Defence</Description>
            <Description>100000</Description>
            <Description>Special Attack</Description>
            <Description>100000</Description>
            <Description>Special Defence</Description>
            <Description>100000</Description>
          </StatsBlock>
        </Row>
      </>
    );
  };

  return (
    <Wrapper>
      <Title>Legendaries</Title>
      <Line />
      <FlatList
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
