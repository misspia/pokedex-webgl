import { DefaultLoadingManager } from 'three';
import React, { useEffect, useState, useContext, useRef } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import * as S from './ExperiencePage.styles';
import Cavnas from '../../components/Canvas';
import Profile from '../../components/Profile';
import { LoadingOverlay } from '../../components/common';
import { clone } from '../../utils';
import WebglContext from '../../webgl/WebglContext';

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
      <Profile
        id={id}
        active={isProfileActive}
        onClose={() => setIsProfileActive(false)}
      />
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
