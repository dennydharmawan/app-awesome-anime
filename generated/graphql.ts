import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  pokemonsByAbility?: Maybe<BaseResponse>;
  pokemonsByEggGroup?: Maybe<BaseResponse>;
  pokemonsByGender?: Maybe<BaseResponse>;
  pokemonsByGrowthRate?: Maybe<BaseResponse>;
  pokemonsByMove?: Maybe<BaseResponse>;
  pokemonsByNature?: Maybe<BaseResponse>;
  pokemons?: Maybe<PokemonList>;
  pokemon?: Maybe<Pokemon>;
  encounter?: Maybe<BaseResponse>;
  move?: Maybe<BaseResponse>;
};


export type QueryPokemonsByAbilityArgs = {
  ability: Scalars['String'];
};


export type QueryPokemonsByEggGroupArgs = {
  eggGroup: Scalars['String'];
};


export type QueryPokemonsByGenderArgs = {
  gender: Scalars['String'];
};


export type QueryPokemonsByGrowthRateArgs = {
  growthRate: Scalars['String'];
};


export type QueryPokemonsByMoveArgs = {
  move: Scalars['String'];
};


export type QueryPokemonsByNatureArgs = {
  nature: Scalars['String'];
};


export type QueryPokemonsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryPokemonArgs = {
  name: Scalars['String'];
};


export type QueryEncounterArgs = {
  encounter: Scalars['String'];
};


export type QueryMoveArgs = {
  move: Scalars['String'];
};

export type BaseResponse = {
  __typename?: 'BaseResponse';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
  response?: Maybe<Scalars['JSON']>;
};


export type PokemonList = {
  __typename?: 'PokemonList';
  count?: Maybe<Scalars['Int']>;
  next?: Maybe<Scalars['String']>;
  previous?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Maybe<PokemonItem>>>;
  status?: Maybe<Scalars['Boolean']>;
  message?: Maybe<Scalars['String']>;
};

export type PokemonItem = {
  __typename?: 'PokemonItem';
  url?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
};

export type Pokemon = {
  __typename?: 'Pokemon';
  abilities?: Maybe<Array<Maybe<Ability>>>;
  base_experience?: Maybe<Scalars['Int']>;
  forms?: Maybe<Array<Maybe<BaseName>>>;
  game_indices?: Maybe<Array<Maybe<GameIndex>>>;
  height?: Maybe<Scalars['Int']>;
  held_items?: Maybe<Array<Maybe<HeldItem>>>;
  id?: Maybe<Scalars['Int']>;
  is_default?: Maybe<Scalars['Boolean']>;
  location_area_encounters?: Maybe<Scalars['String']>;
  moves?: Maybe<Array<Maybe<Move>>>;
  name?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['Int']>;
  species?: Maybe<BaseName>;
  sprites?: Maybe<Sprite>;
  stats?: Maybe<Array<Maybe<Stat>>>;
  types?: Maybe<Array<Maybe<Type>>>;
  weight?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Boolean']>;
  message?: Maybe<Scalars['String']>;
};

export type Ability = {
  __typename?: 'Ability';
  ability?: Maybe<BaseName>;
  is_hidden?: Maybe<Scalars['Boolean']>;
  slot?: Maybe<Scalars['Int']>;
};

export type BaseName = {
  __typename?: 'BaseName';
  url?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type GameIndex = {
  __typename?: 'GameIndex';
  game_index?: Maybe<Scalars['Int']>;
  version?: Maybe<BaseName>;
};

export type HeldItem = {
  __typename?: 'HeldItem';
  item?: Maybe<BaseName>;
  version_details?: Maybe<Array<Maybe<VersionDetail>>>;
};

export type VersionDetail = {
  __typename?: 'VersionDetail';
  rarity?: Maybe<Scalars['Int']>;
  version?: Maybe<BaseName>;
};

export type Move = {
  __typename?: 'Move';
  move?: Maybe<BaseName>;
  version_group_details?: Maybe<Array<Maybe<VersionGroupDetail>>>;
};

export type VersionGroupDetail = {
  __typename?: 'VersionGroupDetail';
  level_learned_at?: Maybe<Scalars['Int']>;
  move_learn_method?: Maybe<BaseName>;
  version_group?: Maybe<BaseName>;
};

export type Sprite = {
  __typename?: 'Sprite';
  back_default?: Maybe<Scalars['String']>;
  back_female?: Maybe<Scalars['String']>;
  back_shiny?: Maybe<Scalars['String']>;
  back_shiny_female?: Maybe<Scalars['String']>;
  front_default?: Maybe<Scalars['String']>;
  front_female?: Maybe<Scalars['String']>;
  front_shiny?: Maybe<Scalars['String']>;
  front_shiny_female?: Maybe<Scalars['String']>;
};

export type Stat = {
  __typename?: 'Stat';
  base_stat?: Maybe<Scalars['Int']>;
  effort?: Maybe<Scalars['Int']>;
  stat?: Maybe<BaseName>;
};

export type Type = {
  __typename?: 'Type';
  slot?: Maybe<Scalars['Int']>;
  type?: Maybe<BaseName>;
};

export type Mutation = {
  __typename?: 'Mutation';
  hello?: Maybe<BaseResponse>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type PokemonsQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
}>;


export type PokemonsQuery = (
  { __typename?: 'Query' }
  & { pokemons?: Maybe<(
    { __typename?: 'PokemonList' }
    & Pick<PokemonList, 'count' | 'next' | 'previous' | 'status' | 'message'>
    & { results?: Maybe<Array<Maybe<(
      { __typename?: 'PokemonItem' }
      & Pick<PokemonItem, 'url' | 'name' | 'image'>
    )>>> }
  )> }
);

export type PokemonQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type PokemonQuery = (
  { __typename?: 'Query' }
  & { pokemon?: Maybe<(
    { __typename?: 'Pokemon' }
    & Pick<Pokemon, 'id' | 'name' | 'height' | 'weight' | 'base_experience'>
    & { abilities?: Maybe<Array<Maybe<(
      { __typename?: 'Ability' }
      & { ability?: Maybe<(
        { __typename?: 'BaseName' }
        & Pick<BaseName, 'name'>
      )> }
    )>>>, types?: Maybe<Array<Maybe<(
      { __typename?: 'Type' }
      & { type?: Maybe<(
        { __typename?: 'BaseName' }
        & Pick<BaseName, 'name'>
      )> }
    )>>>, stats?: Maybe<Array<Maybe<(
      { __typename?: 'Stat' }
      & Pick<Stat, 'base_stat'>
      & { stat?: Maybe<(
        { __typename?: 'BaseName' }
        & Pick<BaseName, 'name'>
      )> }
    )>>> }
  )> }
);


export const PokemonsDocument = gql`
    query pokemons($limit: Int, $offset: Int) {
  pokemons(limit: $limit, offset: $offset) {
    count
    next
    previous
    status
    message
    results {
      url
      name
      image
    }
  }
}
    `;
export const PokemonDocument = gql`
    query pokemon($name: String!) {
  pokemon(name: $name) {
    id
    name
    abilities {
      ability {
        name
      }
    }
    types {
      type {
        name
      }
    }
    height
    weight
    base_experience
    stats {
      base_stat
      stat {
        name
      }
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    pokemons(variables?: PokemonsQueryVariables): Promise<PokemonsQuery> {
      return withWrapper(() => client.request<PokemonsQuery>(print(PokemonsDocument), variables));
    },
    pokemon(variables: PokemonQueryVariables): Promise<PokemonQuery> {
      return withWrapper(() => client.request<PokemonQuery>(print(PokemonDocument), variables));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;