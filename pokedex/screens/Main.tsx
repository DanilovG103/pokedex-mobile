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
import { Colors } from '../assets/colors';
import { PokemonModal } from '../components/Modal';
import { PokemonCard } from '../components/PokemonCard';
import { getPokemonsList } from '../redux/actions';

const Background = styled(View)`
  background-color: ${Colors.white[0]};
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 15px 15px 0;
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
  margin: 20px 40px;
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
  const [visible, setVisible] = useState(false);
  const { pokemons } = useSelector(state => state.PokemonReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemonsList(value));
  }, [value, dispatch]);

  const loadMore = () => {
    setValue(prevState => prevState + 1);
  };

  const renderIt = ({ item }) => {
    const id = item.url
      .replace('https://pokeapi.co/api/v2/pokemon/', '')
      .replace('/', '');

    const imageLink = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    return (
      <PokemonCard
        name={item.name}
        activeModal={setVisible}
        image={imageLink}
      />
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
        horizontal={false}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={pokemons}
        renderItem={renderIt}
        onEndReached={loadMore}
        onEndReachedThreshold={1}
        ListFooterComponent={renderFooter}
        keyExtractor={() => Math.random().toString()}
      />
      <PokemonModal visible={visible} setIsVisible={setVisible} />
    </Background>
  );
};
