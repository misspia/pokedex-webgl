import React, { useEffect, useState, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Icons } from '../../themes';
import ProfileOverview from '../ProfileOverview';
import EvolutionDiagram from '../EvolutionDiagram';
import * as S from './Profile.styles';
import * as Animations from './Profile.animations';

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

const GET_EVOLUTION_BY_CHAIN_ID = gql`
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

export default function Profile({
  onClose = () => { },
  active = false,
  id = null,
}) {
  const {
    loading: pokemonLoading,
    error: pokemonError,
    data: pokemonData
  } = useQuery(GET_POKEMON_BY_ID, { variables: { id } });
  const {
    loading: evolutionLoading,
    error: evolutionError,
    data: evolutionData
  } = useQuery(GET_EVOLUTION_BY_CHAIN_ID,
    {
      skip: !pokemonData,
      variables: { chainId: pokemonData && pokemonData.GetPokemonById.chainId },
    });

  const wrapperRef = useRef(null);

  useEffect(() => {

  }, [id]);

  useEffect(() => {
    if (active) {
      Animations.reveal(wrapperRef.current);
    } else {
      Animations.hide(wrapperRef.current);
    }
  }, [active, wrapperRef.current]);

  const overview = pokemonData && pokemonData.GetPokemonById;
  const chain = evolutionData && evolutionData.GetEvolutionByChainId.chain;

  return (
    <S.Wrapper ref={wrapperRef}>
      {
        pokemonLoading || evolutionLoading || pokemonError || evolutionError ?
          <S.Wrapper>
            {(pokemonLoading || evolutionLoading) && 'loading ...'}
            {pokemonError && 'ERROR: ' + JSON.stringify(pokemonError)}
            {evolutionError && 'ERROR: ' + JSON.stringify(evolutionError)}
          </S.Wrapper> :
          <S.InnerWrapper>
            <S.CloseButton onClick={onClose}>
              <FontAwesomeIcon icon={Icons.close} />
            </S.CloseButton>
            <ProfileOverview {...overview} chain={chain} />
          </S.InnerWrapper>
      }
    </S.Wrapper>
  )
}
