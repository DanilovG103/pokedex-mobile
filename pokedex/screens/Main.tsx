import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styled from 'styled-components';

const Background = styled(View)`
  background-color: #fff;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 0 25px;
`;

const Title = styled(Text)`
  color: #000000;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
`;

const Search = styled(TextInput)`
  width: 100%;
  padding: 8px 15px;
  margin: 20px;
  background: #f2f2f2;
  border-radius: 40px;
  color: #212121;
  font-size: 12px;
  line-height: 15px;
`;

const Card = styled(View)`
  width: 100%;
  background: #f6f7f9;
  border-radius: 10px;
  padding: 5px 25px;
`;

const PokeName = styled(Text)`
  font-size: 18px;
  line-height: 21px;
  color: #212121;
  font-weight: 700;
`;

const Circle = styled(View)`
  width: 38px;
  height: 38px;
  border-radius: 19px;
  border: 3px solid #000;
  align-items: center;
  justify-content: center;
  margin: 2px;
`;

const StatsCount = styled(Text)`
  font-weight: 400;
  font-size: 15px;
  line-height: 17px;
  color: #212121;
`;

const StatsTitle = styled(Text)`
  color: #4b4b4b;
  font-size: 12px;
  line-height: 14px;
`;

const TypeTitle = styled(StatsTitle)`
  color: #212121;
`;

const Wrapper = styled(View)`
  flex-direction: row;
  margin: 5px 0;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
`;

export const Main = () => {
  return (
    <Background>
      <Title>800 Pokemons for you to choose your favorite</Title>
      <Search />
      <Card>
        <PokeName>Charizard</PokeName>
        <Wrapper>
          <Circle>
            <StatsCount>419</StatsCount>
          </Circle>
          <Circle>
            <StatsCount>419</StatsCount>
          </Circle>
        </Wrapper>
        <Wrapper>
          <StatsTitle>Attack </StatsTitle>
          <StatsTitle>Defence</StatsTitle>
        </Wrapper>
        <Wrapper>
          <TypeTitle>Grass </TypeTitle>
          <TypeTitle>Poison</TypeTitle>
        </Wrapper>
      </Card>
    </Background>
  );
};
