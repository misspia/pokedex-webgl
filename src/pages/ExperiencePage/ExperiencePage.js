import { DefaultLoadingManager } from 'three';
import React, { useEffect, useState, useContext } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import * as S from './ExperiencePage.styles';
import { clone } from '../../utils';
import { AppEvents } from '../../constants/events';
import { AppContext } from '../../contexts';
import { LoadingOverlay } from '../../components/common';
import Stages from '../../constants/stages';
import Entrance from '../../components/Entrance';
import Canvas from '../../components/Canvas';
import Profile from '../../components/Profile';
import Mouse from '../../components/Mouse';

const GET_ALL_POKEMON = gql`
  query getAllPokemon {
    GetAllPokemon {
      id
      name
      spriteUrl
      types
    }
  }
`;

export default function ExperiencePage({
  history,
  location,
  match,
}) {
  const context = useContext(AppContext);
  const [id, setId] = useState(3);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isProfileActive, setIsProfileActive] = useState(false);
  const { loading, data, error } = useQuery(GET_ALL_POKEMON);

  useEffect(() => {
    DefaultLoadingManager.onLoad = () => {
      setIsLoading(false);
      context.setStage(Stages.ENTRANCE);
    }

    DefaultLoadingManager.onProgress = (_url, numLoaded, total) => {
      setLoadingProgress(numLoaded / total);
    }

    context.webgl.addEventListener(
      AppEvents.STAGE_CHANGE,
      (e) => {
        context.setStage(e.stage)
      }
    );
  }, []);

  // console.debug(context.stage, Stages.MAIN)

  return (
    <S.Wrapper>
      <LoadingOverlay isActive={loading || isLoading} progress={loadingProgress} />
      {error && `ERROR: ${JSON.stringify(error)}`}
      {
        context.stage === Stages.ENTRANCE &&
        <Entrance onEnter={() => context.setStage(Stages.INTRO)} />
      }
      <Profile
        id={id}
        active={isProfileActive}
        onClose={() => setIsProfileActive(false)}
      />
      {
        data &&
        <Canvas
          entries={clone(data.GetAllPokemon)}
          selectEntry={id => {
            setId(id);
            setIsProfileActive(true);
          }}
        />
      }
      <Mouse isVisible={!isProfileActive && context.stage === Stages.MAIN}/>
    </S.Wrapper>
  )
}
