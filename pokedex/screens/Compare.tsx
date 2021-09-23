import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons';
import { ItemRenderProps } from '../api/types';
import { ComparingCard } from '../src/components/ComparingCard';
import { clearComparedPokemons } from '../src/store/actions';
import { Fonts } from '../src/theme/fonts';

const Container = styled(View)`
  flex: 1;
  align-items: center;
  padding: 0 15px;
`;

const NoPokemons = styled(Text)`
  text-align: center;
  font-size: 18px;
  font-family: ${Fonts.bold};
  margin: auto;
`;

const ClearIcon = styled(TouchableOpacity)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const Compare = () => {
  const { comparedPokemons } = useSelector(state => state.PokemonReducer);
  const dispatch = useDispatch();

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
      <ClearIcon onPress={() => dispatch(clearComparedPokemons())}>
        <Icon name="trash" size={30} />
      </ClearIcon>
    </Container>
  );
};
