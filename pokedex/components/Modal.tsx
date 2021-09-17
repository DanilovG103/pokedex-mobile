import React from 'react';
import { Modal, View, Text, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { PokemonTypes } from '../api/types';
import { Colors } from '../assets/colors';

interface Props {
  visible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Overlay = styled(TouchableOpacity)`
  background-color: rgba(0, 0, 0, 0.7);
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const PokemonInfoBlock = styled(View)`
  padding: 10px;
  background-color: ${Colors.white[1]};
  border-radius: 10px;
`;

const Title = styled(Text)`
  font-size: 32px;
  text-align: center;
  color: ${Colors.dark};
  text-transform: capitalize;
`;

const Circle = styled(View)`
  width: 38px;
  height: 38px;
  border-radius: 19px;
  background-color: ${Colors.yellow};
  align-items: center;
  justify-content: center;
`;

const Experience = styled(Text)`
  color: ${Colors.dark};
  font-size: 16px;
`;

const Types = styled(Text)`
  text-transform: capitalize;
  font-size: 15px;
  margin-left: 15px;
`;

export const PokemonModal = ({ visible, setIsVisible }: Props) => {
  const { pokemon } = useSelector(state => state.PokemonReducer);

  console.log(pokemon);
  return (
    <Modal transparent={true} visible={visible}>
      <Overlay onPress={() => setIsVisible(false)}>
        <PokemonInfoBlock>
          <Title>{pokemon.name}</Title>
          <Image
            style={{
              resizeMode: 'contain',
              width: 150,
              height: 150,
              alignSelf: 'center',
            }}
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
            }}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Circle>
              <Experience>{pokemon.base_experience}</Experience>
            </Circle>
            {pokemon.types.map(el => (
              <Types> {el.type.name}</Types>
            ))}
          </View>
        </PokemonInfoBlock>
      </Overlay>
    </Modal>
  );
};
