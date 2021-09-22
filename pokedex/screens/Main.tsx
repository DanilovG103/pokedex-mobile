import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Colors } from '../src/theme/colors';
import { PokemonModal } from '../src/components/Modal';
import { PokemonCard } from '../src/components/PokemonCard';
import { getPokemonsList, getTypes } from '../src/store/actions';
import { ItemRenderProps } from '../api/types';
import { FilterModal } from '../src/components/FilterModal';
import { FlatListFooter } from '../src/components/Footer';

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
  margin: 20px 40px 10px;
  background: ${Colors.white[1]};
  border-radius: 40px;
  color: ${Colors.dark};
  font-size: 12px;
  line-height: 15px;
`;

const Filter = styled(TouchableOpacity)`
  background-color: ${Colors.white[1]};
  padding: 4px 25px;
  border-radius: 11px;
  margin-bottom: 5px;
  align-self: flex-start;
`;

export const Main = () => {
  const [pagination, setPagination] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [pokemonVisible, setPokemonVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const { pokemons, selectedTypes } = useSelector(
    state => state.PokemonReducer,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemonsList(pagination));
  }, [pagination, dispatch]);

  const loadMore = () => {
    setPagination(prevState => prevState + 1);
  };

  const renderIt = ({ item }: ItemRenderProps) => {
    return <PokemonCard pokemon={item} activeModal={setPokemonVisible} />;
  };

  const search = (value: string) => {
    setSearchValue(value);
    setPagination(prevState => prevState + 1);
  };

  const openFilterModal = () => {
    setFilterVisible(true);
    dispatch(getTypes());
  };

  return (
    <Background>
      <Title>800 Pokemons for you to choose your favorite</Title>
      <Search
        placeholder="Search pokemons"
        placeholderTextColor={Colors.lightGray}
        value={searchValue}
        onChangeText={value => search(value)}
      />
      <Filter onPress={openFilterModal}>
        <Text>Filter</Text>
      </Filter>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={pokemons.filter(item =>
          item.name.toLowerCase().includes(searchValue.toLowerCase()),
        )}
        renderItem={renderIt}
        onEndReached={loadMore}
        onEndReachedThreshold={1}
        ListFooterComponent={FlatListFooter}
        keyExtractor={item => item.id.toString()}
      />
      <PokemonModal visible={pokemonVisible} setIsVisible={setPokemonVisible} />
      <FilterModal visible={filterVisible} setVisible={setFilterVisible} />
    </Background>
  );
};
