import React, { Dispatch, SetStateAction } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { PokemonTypes } from '../../api/types';
import { getPokemon } from '../store/actions';
import { Colors } from '../theme/colors';
import { Fonts } from '../theme/fonts';

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
  align-self: flex-start;
`;

const Description = styled(Text)`
  font-size: 18px;
  margin: 5px 0;
  font-family: ${Fonts.regular};
  text-transform: capitalize;
`;

const StatsBlock = styled(View)`
  align-items: flex-start;
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

const Card = styled(View)`
  padding: 0 15px;
`;
interface Props {
  item: PokemonTypes;
  activeModal: Dispatch<SetStateAction<boolean>>;
}

export const LegendariesCard = ({ item, activeModal }: Props) => {
  const dispatch = useDispatch();

  const openModal = (bool: boolean) => {
    activeModal(bool);
    dispatch(getPokemon(item.name));
  };

  return (
    <Card>
      <Line />
      <TouchableOpacity onPress={() => openModal(true)}>
        <PokeImage
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png`,
          }}
        />
      </TouchableOpacity>
      <Name>{item.name}</Name>
      <Row>
        <StatsBlock>
          <Description>{item.stats[0].stat.name}</Description>
          <Description>{item.stats[0].base_stat}</Description>
        </StatsBlock>
        <StatsBlock>
          <Description>Experience</Description>
          <Description>{item.base_experience}</Description>
        </StatsBlock>
      </Row>
      <Row>
        <StatsBlock>
          <Description>{item.stats[2].stat.name}</Description>
          <Description>{item.stats[2].base_stat}</Description>
        </StatsBlock>
        <StatsBlock>
          <Description>{item.stats[1].stat.name}</Description>
          <Description>{item.stats[1].base_stat}</Description>
        </StatsBlock>
      </Row>
      <Row>
        <StatsBlock>
          <Description>{item.stats[4].stat.name}</Description>
          <Description>{item.stats[4].base_stat}</Description>
        </StatsBlock>
        <StatsBlock>
          <Description>{item.stats[3].stat.name}</Description>
          <Description>{item.stats[3].base_stat}</Description>
        </StatsBlock>
      </Row>
    </Card>
  );
};
