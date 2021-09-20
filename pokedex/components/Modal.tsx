import React from 'react';
import { Modal, View, Text, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Colors, typeColors } from '../assets/colors';
import { switchProp } from 'styled-tools';
import { CloseIcon } from './CloseIcon';
import Icon from 'react-native-vector-icons/Ionicons';
import { setPokemon } from '../redux/actions';
interface Props {
  visible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Overlay = styled(View)`
  background-color: rgba(0, 0, 0, 0.7);
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

const PokemonInfoBlock = styled(View)`
  width: 100%;
  padding: 10px;
  background-color: ${Colors.black};
  border-radius: 10px;
`;

const Title = styled(Text)`
  font-size: 32px;
  text-align: center;
  color: ${Colors.white[1]};
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

const TypesBlock = styled(View)<{ typeColor: string }>`
  margin-left: 5px;
  padding: 0 10px;
  align-items: center;
  justify-content: center;
  border-radius: 11px;
  background-color: ${switchProp('typeColor', typeColors)};
`;

const Types = styled(Text)`
  text-transform: capitalize;
  font-size: 15px;
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
`;

const Ability = styled(Text)`
  text-transform: capitalize;
  font-size: 17px;
`;

const Statistics = styled(AbilitiesBlock)``;

const StatisticsTitle = styled(Text)`
  font-size: 18px;
  text-transform: capitalize;
`;

const StatisticsValue = styled(Text)`
  font-size: 16px;
  font-weight: 700;
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

export const PokemonModal = ({ visible, setIsVisible }: Props) => {
  const { pokemon } = useSelector(state => state.PokemonReducer);
  const dispatch = useDispatch();

  if (!pokemon) {
    return <></>;
  }

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <Overlay>
        <PokemonInfoBlock>
          <UpperRow>
            <TouchableOpacity onPress={() => setIsVisible(false)}>
              <CloseIcon />
            </TouchableOpacity>
            <Title>{pokemon.name}</Title>
            <TouchableOpacity onPress={() => dispatch(setPokemon(pokemon))}>
              <Icon name="bar-chart" color="white" size={30} />
            </TouchableOpacity>
          </UpperRow>
          <Image
            style={{
              resizeMode: 'contain',
              width: 200,
              height: 200,
              alignSelf: 'center',
            }}
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
            }}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <YellowCircle>
              <Experience>{pokemon.base_experience}</Experience>
            </YellowCircle>
            <TypesRow>
              {pokemon.types?.map(el => (
                <TypesBlock typeColor={el.type.name}>
                  <Types>{el.type.name}</Types>
                </TypesBlock>
              ))}
            </TypesRow>
          </View>
          <AbilitiesBlock>
            <AbilitiesBlockTitle>Abilities</AbilitiesBlockTitle>
            {pokemon.abilities?.map(el => (
              <Ability>
                {'-'}
                {el.ability.name}
              </Ability>
            ))}
          </AbilitiesBlock>
          <Statistics>
            <StatisticsTitle>Healthy Points</StatisticsTitle>
            <StatisticsValue>
              {pokemon.stats
                ?.filter(el => el.stat.name === 'hp')
                ?.map(el => el.base_stat)}
            </StatisticsValue>
            <StatisticsTitle>Experience</StatisticsTitle>
            <StatisticsValue>{pokemon.base_experience}</StatisticsValue>
          </Statistics>
          <Row>
            {pokemon.stats
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
      </Overlay>
    </Modal>
  );
};
