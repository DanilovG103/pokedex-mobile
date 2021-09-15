import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components';
import { Result } from '../api/types';
import { Colors } from '../assets/colors';

const Background = styled(View)`
  background-color: ${Colors.white[0]};
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 25px;
`;

const Title = styled(Text)`
  color: ${Colors.black};
  font-size: 24px;
  line-height: 28px;
  text-align: center;
`;

const Search = styled(TextInput)`
  width: 100%;
  padding: 8px 15px;
  margin: 20px;
  background: ${Colors.white[1]};
  border-radius: 40px;
  color: ${Colors.dark};
  font-size: 12px;
  line-height: 15px;
`;

const Card = styled(View)`
  width: 100%;
  background: ${Colors.white[2]};
  border-radius: 10px;
  padding: 5px 25px;
  margin: 5px 0;
`;

const PokeName = styled(Text)`
  font-size: 18px;
  line-height: 21px;
  color: ${Colors.dark};
  font-weight: 700;
`;

const Circle = styled(View)`
  width: 38px;
  height: 38px;
  border-radius: 19px;
  border: 3px solid ${Colors.black};
  align-items: center;
  justify-content: center;
  margin: 2px;
`;

const StatsCount = styled(Text)`
  font-weight: 400;
  font-size: 15px;
  line-height: 17px;
  color: ${Colors.dark};
`;

const StatsTitle = styled(Text)`
  color: ${Colors.gray};
  font-size: 12px;
  line-height: 14px;
`;

const TypeTitle = styled(StatsTitle)`
  color: ${Colors.dark};
`;

const Wrapper = styled(View)`
  flex-direction: row;
  margin: 5px 0;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
`;

const Footer = styled(View)`
  margin-top: 5px;
  align-items: center;
`;

export const Main = () => {
  const [pokemons, setPokemons] = useState<Result[]>([]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    pokemonsFetcher(value);
  }, [value]);

  const pokemonsFetcher = async (page: number) => {
    const offset = page * 9;
    try {
      const data = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=9`,
      );
      const { results } = await data.json();
      setPokemons(pokemons.concat(results));
    } catch (error) {
      console.error(error);
    }
  };

  const loadMore = () => {
    setValue(prevState => prevState + 1);
  };

  const renderIt = ({ item }) => {
    return (
      <Card>
        <PokeName>{item.name}</PokeName>
        <Wrapper>
          <Circle>
            <StatsCount>419</StatsCount>
          </Circle>
          <Circle>
            <StatsCount>419</StatsCount>
          </Circle>
        </Wrapper>
        <Wrapper>
          <StatsTitle>Attack </StatsTitle>
          <StatsTitle>Defence</StatsTitle>
        </Wrapper>
        <Wrapper>
          <TypeTitle>Grass </TypeTitle>
          <TypeTitle>Poison</TypeTitle>
        </Wrapper>
      </Card>
    );
  };

  const renderFooter = () => {
    return (
      <Footer>
        <ActivityIndicator size="large" />
      </Footer>
    );
  };

  return (
    <Background>
      <Title>800 Pokemons for you to choose your favorite</Title>
      <Search
        placeholder="Search pokemons"
        placeholderTextColor={Colors.lightGray}
      />
      <FlatList
        data={pokemons}
        renderItem={renderIt}
        onEndReached={loadMore}
        onEndReachedThreshold={0}
        ListFooterComponent={renderFooter}
      />
    </Background>
  );
};
