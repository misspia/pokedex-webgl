import { DefaultLoadingManager } from 'three';
import React, { useEffect, useState, useContext } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import * as S from './ExperiencePage.styles';
import { clone } from '../../utils';
import { WebglContext } from '../../contexts';
import { LoadingOverlay } from '../../components/common';
import AppStages from '../../constants/appStages';
import Entrance from '../../components/Entrance';
import Cavnas from '../../components/Canvas';
import Profile from '../../components/Profile';

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
  const context = useContext(WebglContext);
  const [appStage, setAppStage] = useState(AppStages.INTRO);
  const [id, setId] = useState(3);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isProfileActive, setIsProfileActive] = useState(false);
  const { loading, data, error } = useQuery(GET_ALL_POKEMON);

  useEffect(() => {
    DefaultLoadingManager.onLoad = () => {
      setIsLoading(false);
      context.webgl.startIntro();
    }

    DefaultLoadingManager.onProgress = (url, numLoaded, total) => {
      setLoadingProgress(numLoaded / total);
    }
  }, []);

  return (
    <S.Wrapper>
      <LoadingOverlay isActive={loading || isLoading} progress={loadingProgress} />
      {error && `ERROR: ${JSON.stringify(error)}`}
      <Entrance
        isActive={appStage === AppStages.INTRO}
        onEnter={() => setAppStage(AppStages.MAIN)}
      />
      <Profile
        id={id}
        active={isProfileActive}
        onClose={() => setIsProfileActive(false)}
      />
      >
      {
        data &&
        <Cavnas
          entries={clone(data.GetAllPokemon)}
          selectEntry={id => {
            setId(id);
            setIsProfileActive(true);
          }}
        />
      }
    </S.Wrapper>
  )
}
