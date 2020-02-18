import React, { useEffect, useRef, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import WebglContext from '../../webgl/WebglContext';
import { Icons } from '../../themes';
import ProfileOverview from '../ProfileOverview';
import { GET_POKEMON_BY_ID, GET_EVOLUTION_BY_CHAIN_ID } from './Profile.gql';
import * as S from './Profile.styles';
import * as Animations from './Profile.animations';


export default function Profile({
  onClose = () => { },
  active = false,
  id = null,
}) {
  const context = useContext(WebglContext);

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
          <>
            {(pokemonLoading || evolutionLoading) && 'loading ...'}
            {pokemonError && 'ERROR: ' + JSON.stringify(pokemonError)}
            {evolutionError && 'ERROR: ' + JSON.stringify(evolutionError)}
          </> :
          <>
            <S.CloseButton onClick={() => {
              onClose();
              context.webgl.deactivateEntry();
            }}>
              <FontAwesomeIcon icon={Icons.close} />
            </S.CloseButton>
            <ProfileOverview
              {...overview}
              chain={chain}
            />
          </>
      }
    </S.Wrapper>
  )
}
