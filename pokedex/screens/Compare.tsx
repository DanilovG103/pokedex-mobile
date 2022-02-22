import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import styled, { useTheme } from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons';
import { ItemRenderProps } from '../api/types';
import { ComparingCard } from '../src/components/ComparingCard';
import { clearComparedPokemons } from '../src/store/actions';
import { Fonts } from '../src/theme/fonts';
import { Colors } from '../src/theme/colors';
import { SAGATYPE } from '../src/store/types';

const Container = styled(View)`
  flex: 1;
  align-items: center;
  padding: 0 15px;
  background-color: ${props => props.theme.body};
`;

const NoPokemons = styled(Text)`
  text-align: center;
  font-size: 18px;
  font-family: ${Fonts.bold};
  margin: auto;
  color: ${props => props.theme.fontColor};
`;

const ClearIcon = styled(TouchableOpacity)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const Compare = () => {
  const { comparedPokemons } = useSelector(state => state.PokemonReducer);
  const dispatch = useDispatch();
  const theme = useTheme();

  if (comparedPokemons.length === 0) {
    return (
      <Container>
        <NoPokemons>Nothing to compare</NoPokemons>
      </Container>
    );
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
      <ClearIcon onPress={() => dispatch({ type: SAGATYPE.REMOVE_POKEMONS })}>
        <Icon
          name="trash"
          size={30}
          color={theme.type === 'dark' ? Colors.white[1] : Colors.black}
        />
      </ClearIcon>
    </Container>
  );
};
