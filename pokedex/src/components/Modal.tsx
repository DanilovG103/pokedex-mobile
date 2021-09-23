import React, { Dispatch, SetStateAction } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Colors } from '../theme/colors';
import { CloseIcon } from '../../resources/assets/images/icons/CloseIcon';
import Icon from 'react-native-vector-icons/Ionicons';
import { setPokemon } from '../store/actions';
import { TypeBlock } from './TypeBlock';
import { Fonts } from '../theme/fonts';

interface Props {
  visible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

const PokemonInfoBlock = styled(View)`
  width: 100%;
  padding: 10px;
  background-color: ${Colors.white[3]};
  border-radius: 10px;
`;

const Title = styled(Text)`
  font-size: 20px;
  text-align: center;
  color: ${Colors.dark};
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

const AbilitiesBlock = styled(View)`
  background-color: ${Colors.white[1]};
  padding: 15px;
  margin-top: 10px;
  border-radius: 8px;
`;

const AbilitiesBlockTitle = styled(Text)`
  font-size: 24px;
  font-family: ${Fonts.regular};
`;

const Ability = styled(Text)`
  text-transform: capitalize;
  font-family: ${Fonts.regular};
  font-size: 17px;
`;

const Statistics = styled(AbilitiesBlock)``;

const StatisticsTitle = styled(Text)`
  font-size: 18px;
  text-transform: capitalize;
  font-family: ${Fonts.regular};
`;

const StatisticsValue = styled(Text)`
  font-size: 16px;
  font-family: ${Fonts.bold};
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
  background: ${Colors.white[1]};
  border-radius: 8px;
`;

const Circle = styled(View)`
  align-items: center;
  justify-content: center;
  border: 3px solid ${Colors.black};
  width: 38px;
  height: 38px;
  border-radius: 19px;
`;

const StatsTitle = styled(StatisticsTitle)`
  font-size: 14px;
  text-align: center;
`;

const UpperRow = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const PokeImage = styled(Image)`
  resize-mode: contain;
  width: 200px;
  height: 200px;
  align-self: center;
`;

export const PokemonModal = ({ visible, setIsVisible }: Props) => {
  const { pokemon } = useSelector(state => state.PokemonReducer);
  const dispatch = useDispatch();

  return (
    <Modal
      isVisible={visible}
      onBackButtonPress={() => setIsVisible(false)}
      onBackdropPress={() => setIsVisible(false)}
      useNativeDriver>
      <PokemonInfoBlock>
        <UpperRow>
          <TouchableOpacity onPress={() => setIsVisible(false)}>
            <CloseIcon />
          </TouchableOpacity>
          <Title>{pokemon?.name}</Title>
          <TouchableOpacity onPress={() => dispatch(setPokemon(pokemon))}>
            <Icon name="bar-chart" size={30} />
          </TouchableOpacity>
        </UpperRow>
        <PokeImage
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`,
          }}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <YellowCircle>
            <Experience>{pokemon?.base_experience}</Experience>
          </YellowCircle>
          <TypesRow>
            {pokemon?.types?.map(el => (
              <TypeBlock type={el.type.name}>
                <Types>{el.type.name}</Types>
              </TypeBlock>
            ))}
          </TypesRow>
        </View>
        <AbilitiesBlock>
          <AbilitiesBlockTitle>Abilities</AbilitiesBlockTitle>
          {pokemon?.abilities?.map(el => (
            <Ability>
              {'-'}
              {el.ability.name}
            </Ability>
          ))}
        </AbilitiesBlock>
        <Statistics>
          <StatisticsTitle>Healthy Points</StatisticsTitle>
          <StatisticsValue>
            {pokemon?.stats
              ?.filter(el => el.stat.name === 'hp')
              ?.map(el => el.base_stat)}
          </StatisticsValue>
          <StatisticsTitle>Experience</StatisticsTitle>
          <StatisticsValue>{pokemon?.base_experience}</StatisticsValue>
        </Statistics>
        <Row>
          {pokemon?.stats
            ?.filter(el => el.stat.name !== 'hp' && el.stat.name !== 'speed')
            ?.map(el => (
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
