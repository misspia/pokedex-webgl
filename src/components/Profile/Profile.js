import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import * as THREE from 'three';
import { gql } from 'apollo-boost';
import { client } from '../../apollo';

import ProfileImage from '../ProfileImage/ProfileImage';
import * as S from './Profile.styles';

export const PROFILE_NAME = 'profile';
const GET_POKEMON_BY_ID = gql`
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

export default function Profile({
  active = false,
  id = null,
}) {
  const { loading, error, data } = useQuery(GET_POKEMON_BY_ID, { variables: { id: id } });

  // animate in/out
  useEffect(() => {

  }, [active]);
  if (loading || error) {
    return (
      <S.Wrapper>
        {loading && 'loading ...'}
        {error && 'ERROR: ' + JSON.stringify(error)}
      </S.Wrapper>
    )
  }

  const pokemon = data.GetPokemonById;
  return (
    <S.Wrapper>
      {pokemon.id}
      {pokemon.name}
    </S.Wrapper>
  )
}
