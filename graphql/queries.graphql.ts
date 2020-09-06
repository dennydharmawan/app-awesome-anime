import gql from "graphql-tag";

export const pokemonsQuery = gql`
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

export const pokemonDetailQuery = gql`
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
