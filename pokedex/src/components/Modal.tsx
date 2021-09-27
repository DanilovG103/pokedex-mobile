import React, { Dispatch, SetStateAction } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import styled, { useTheme } from 'styled-components';
import { Colors } from '../theme/colors';
import { CloseIcon } from '../../resources/assets/images/icons/CloseIcon';
import { setPokemon } from '../store/actions';
import { TypeBlock } from './TypeBlock';
import { Fonts } from '../theme/fonts';
import { PokemonTypes } from '../../api/types';

interface Props {
  visible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  data: PokemonTypes;
}

const PokemonInfoBlock = styled(View)`
  width: 100%;
  padding: 10px;
  background-color: ${props => props.theme.modalBody};
  border-radius: 10px;
`;

const Title = styled(Text)`
  font-size: 20px;
  text-align: center;
  color: ${props => props.theme.fontColor};
  font-family: ${Fonts.bold};
  text-transform: capitalize;
`;

const YellowCircle = styled(View)`
  width: 38px;
  height: 38px;
  border-radius: 19px;
  background-color: ${Colors.yellow};
  align-items: center;
  justify-content: center;
`;

const Experience = styled(Text)`
  color: ${Colors.white[1]};
  font-size: 16px;
`;

const Types = styled(Text)`
  text-transform: capitalize;
  font-size: 15px;
  font-family: ${Fonts.regular};
  color: ${Colors.dark};
`;

const TypesRow = styled(View)`
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  padding-right: 50px;
`;

const InfoBlock = styled(View)`
  background-color: ${props => props.theme.card};
  padding: 15px;
  margin-top: 10px;
  border-radius: 8px;
`;

const AbilitiesBlockTitle = styled(Types)`
  font-size: 24px;
  color: ${props => props.theme.fontColor};
`;

const Ability = styled(AbilitiesBlockTitle)`
  font-size: 17px;
`;

const StatisticsTitle = styled(Ability)`
  font-size: 18px;
`;

const StatisticsValue = styled(Text)`
  font-size: 16px;
  font-family: ${Fonts.bold};
  color: ${props => props.theme.fontColor};
`;

const Row = styled(View)`
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Block = styled(View)`
  width: 55px;
  height: 80px;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.card};
  border-radius: 8px;
`;

const Circle = styled(YellowCircle)`
  border: 3px solid ${props => props.theme.circle};
  background-color: transparent;
`;

const StatsTitle = styled(StatisticsTitle)`
  font-size: 14px;
  text-align: center;
`;

const UpperRow = styled(Row)`
  margin-top: 0;
`;

const PokeImage = styled(Image)`
  resize-mode: contain;
  width: 165px;
  height: 165px;
  align-self: center;
`;

export const PokemonModal = ({ visible, setIsVisible, data }: Props) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <Modal
      isVisible={visible}
      onBackButtonPress={() => setIsVisible(false)}
      onBackdropPress={() => setIsVisible(false)}
      useNativeDriver>
      <PokemonInfoBlock>
        <UpperRow>
          <TouchableOpacity onPress={() => setIsVisible(false)}>
            <CloseIcon darkTheme={theme.type === 'dark'} />
          </TouchableOpacity>
          <Title>{data.name}</Title>
          <TouchableOpacity onPress={() => dispatch(setPokemon(data))}>
            <Icon
              name="bar-chart"
              size={30}
              color={theme.type === 'dark' ? Colors.white[1] : Colors.black}
            />
          </TouchableOpacity>
        </UpperRow>
        <PokeImage
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
          }}
        />
        <UpperRow>
          <YellowCircle>
            <Experience>{data.base_experience}</Experience>
          </YellowCircle>
          <TypesRow>
            {data.types.map(el => (
              <TypeBlock type={el.type.name}>
                <Types>{el.type.name}</Types>
              </TypeBlock>
            ))}
          </TypesRow>
        </UpperRow>
        <InfoBlock>
          <AbilitiesBlockTitle>Abilities</AbilitiesBlockTitle>
          {data.abilities.map(el => (
            <Ability>
              {'-'}
              {el.ability.name}
            </Ability>
          ))}
        </InfoBlock>
        <InfoBlock>
          <StatisticsTitle>Healthy Points</StatisticsTitle>
          <StatisticsValue>{data.stats[0].base_stat}</StatisticsValue>
          <StatisticsTitle>Experience</StatisticsTitle>
          <StatisticsValue>{data.base_experience}</StatisticsValue>
        </InfoBlock>
        <Row>
          {data.stats
            .filter(el => el.stat.name !== 'hp' && el.stat.name !== 'speed')
            .map(el => (
              <Block>
                <Circle>
                  <StatisticsValue>{el.base_stat}</StatisticsValue>
                </Circle>
                <StatsTitle>{el.stat.name}</StatsTitle>
              </Block>
            ))}
        </Row>
      </PokemonInfoBlock>
    </Modal>
  );
};
