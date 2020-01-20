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

const Tabs = {
  OVERVIEW: 'overview',
  EVOLUTIONS: 'evolutions',
}
// const tabs = [
//   'overview',
//   'evolutions'
// ];

export default function Profile({
  onClose = () => { },
  active = false,
  id = null,
}) {
  const {
    loading: pokemonLoading,
    error: pokemonError,
    data: pokemonData
  } = useQuery(GET_POKEMON_BY_ID,{ variables: { id }});
  const {
    loading: evolutionLoading,
    error: evolutionError,
    data: evolutionData
  } = useQuery(GET_EVOLUTION_BY_CHAIN_ID,
    {
      skip: !pokemonData,
      variables: { chainId: pokemonData && pokemonData.GetPokemonById.chainId },
  });

  const [activeTab, setActiveTab] = useState(Tabs.OVERVIEW);
  const profileRef = useRef(null);
  const evolutionRef = useRef(null);

  useEffect(() => {

  }, [id]);

  // animate in/out
  useEffect(() => {

  }, [active]);

  useEffect(() => {
    if(activeTab === Tabs.OVERVIEW) {
      Animations.swapTabViews(
        profileRef.current,
        evolutionRef.current
      );
    } else {
      Animations.swapTabViews(
        evolutionRef.current,
        profileRef.current
      );
    }
  }, [activeTab]);

  if (pokemonLoading || evolutionLoading || pokemonError || evolutionError) {
    return (
      <S.Wrapper>
        {(pokemonLoading || evolutionLoading) && 'loading ...'}
        {pokemonError && 'ERROR: ' + JSON.stringify(pokemonError)}
        {evolutionError && 'ERROR: ' + JSON.stringify(evolutionError)}
      </S.Wrapper>
    )
  }

  const  { chainId, ...overview } = pokemonData.GetPokemonById;
  const { chain } = evolutionData.GetEvolutionByChainId;
  return (
    <S.Wrapper>
      <S.InnerWrapper>
          <S.CloseButton onClick={onClose}>
          <FontAwesomeIcon icon={Icons.close}/>
          </S.CloseButton>

        <S.ProfileView ref={profileRef}>
          <ProfileOverview {...overview}/>
        </S.ProfileView>
        <S.EvolutionView ref={evolutionRef}>
          <EvolutionDiagram chain={chain} />
        </S.EvolutionView>
        <S.Tabs>
          {Object.keys(Tabs).map((name) => (
            <S.Tab key={Tabs[name]} onClick={() => setActiveTab(Tabs[name])}>
              {Tabs[name]}
            </S.Tab>
          ))}
        </S.Tabs>
      </S.InnerWrapper>
    </S.Wrapper>
  )
}
