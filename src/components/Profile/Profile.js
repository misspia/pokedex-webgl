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
  const { loading, error, data} = useQuery(GET_POKEMON_BY_ID, { variables: { id: 1 }});

  // animate in/out
  useEffect(() => {

  }, [active]);

  // fetch new data
  useEffect(() => {
    // const pokemon = fetchPokemonById(id);
    // console.debug(pokemon);
  }, [id]);

 return (
  <S.Wrapper>
    { id }
  </S.Wrapper>
 )
}

async function fetchPokemonById(id) {
  return await client.query({
    query: gql`
      {
        GetPokemonById(id: ${id}) {
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
    `
  })
  // .then(result => (
  //   result.data.GetPokemonById
  // ))
  // .catch(err => {
  //   console.log(err);
  //   return {};
  // })
}
