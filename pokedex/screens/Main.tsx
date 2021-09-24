import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Colors } from '../src/theme/colors';
import { PokemonModal } from '../src/components/Modal';
import { PokemonCard } from '../src/components/PokemonCard';
import { getPokemonsList, getTypes, Refresh } from '../src/store/actions';
import { ItemRenderProps } from '../api/types';
import { FilterModal } from '../src/components/FilterModal';
import { FlatListFooter } from '../src/components/Footer';
import { Fonts } from '../src/theme/fonts';

const Background = styled(View)`
  background-color: ${props => props.theme.body};
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 15px 15px 0;
`;

const Title = styled(Text)`
  color: ${props => props.theme.fontColor};
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  font-family: ${Fonts.regular};
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
  margin-bottom: 12px;
  align-self: flex-start;
`;

export const Main = () => {
  const [pagination, setPagination] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [pokemonVisible, setPokemonVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { pokemons, filteredByTypePokemons } = useSelector(
    state => state.PokemonReducer,
  );
  const { type, experienceFrom, experienceTo, attackFrom, attackTo } =
    useSelector(state => state.FilterReducer);
  const dispatch = useDispatch();
  const limit = pagination < 898;

  const filteredPokemons = pokemons
    .filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()))
    .filter(
      item =>
        item.base_experience >= experienceFrom &&
        item.base_experience < experienceTo,
    )
    .filter(
      item =>
        item.stats[1].base_stat >= attackFrom &&
        item.stats[1].base_stat < attackTo,
    );

  useEffect(() => {
    if (limit) {
      dispatch(getPokemonsList(pagination));
    }
  }, [pagination, dispatch, limit]);

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
        refreshing={refreshing}
        onScrollToTop={() => setRefreshing(true)}
        onRefresh={() => dispatch(Refresh())}
        showsVerticalScrollIndicator={false}
        data={type === null ? filteredPokemons : filteredByTypePokemons}
        renderItem={renderIt}
        onEndReached={loadMore}
        onEndReachedThreshold={1}
        ListFooterComponent={limit ? FlatListFooter : null}
        keyExtractor={item => item.id.toString()}
      />
      <PokemonModal visible={pokemonVisible} setIsVisible={setPokemonVisible} />
      <FilterModal visible={filterVisible} setVisible={setFilterVisible} />
    </Background>
  );
};
