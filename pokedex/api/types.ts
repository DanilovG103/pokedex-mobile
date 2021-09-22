export type Result = {
  name: string;
  url: string;
};

type Stats = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

type Types = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

type Ability = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

export type PokemonTypes = {
  id: number;
  name: string;
  abilities: Ability[];
  stats: Stats[];
  types: Types[];
  base_experience: number;
};

export interface ItemRenderProps {
  item: PokemonTypes;
}

export interface TypeRenderProps {
  item: Result;
}
