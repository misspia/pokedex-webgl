import { gql } from 'apollo-boost';

export const GET_POKEMON_BY_ID = gql`
  query getPokemonById($id: PokemonId!) {
    GetPokemonById(id: $id) {
      id
      name
      chainId
      types
      height
      weight
      baseExperience
      abilities
      stats {
        key
        value
      }
      artworkUrl
    }
  }
`;

export const GET_EVOLUTION_BY_CHAIN_ID = gql`
  query getEvolutionByChainId($chainId: PositiveInt!) {
    GetEvolutionByChainId(chainId: $chainId) {
      chain {
        id
        name
        types
        artworkUrl
        evolvesFromId
        evolutionTrigger
        triggerItem
        minimumLevel
        gender
        location
        heldItem
        timeOfDay
        knownMove
        mimimumHappiness
        minimumBeauty
        minimumAffection
        relativePhysicalStats
        needsOverworldRain
        turnUpsideDown
      }
    }
  }
`;
