import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Result } from '../api/types';
import { Colors } from '../assets/colors';
import { PokemonCard } from '../components/PokemonCard';
import { getPokemons } from '../redux/actions';

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

const Footer = styled(View)`
  margin-top: 5px;
  align-items: center;
`;

export const Main = () => {
  const [value, setValue] = useState(0);
  const pokemons = useSelector(state => state.PokemonReducer.pokemons);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemons(value));
  }, [value]);

  const loadMore = () => {
    setValue(prevState => prevState + 1);
  };

  const renderIt = ({ item }) => {
    return <PokemonCard name={item.name} />;
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
        onEndThreshold={0}
        ListFooterComponent={renderFooter}
      />
    </Background>
  );
};
