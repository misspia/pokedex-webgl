import React, { useEffect, useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import * as S from './HomePage.styles';
import Cavnas from '../../components/Canvas';
import Profile from '../../components/Profile';
import { LoadingOverlay } from '../../components/common';
import { clone } from '../../utils';

const GET_ALL_POKEMON = gql`
  query getAllPokemon {
    GetAllPokemon {
      id
      name
      spriteUrl
    }
  }
`;

export default function HomePage({
  history,
  location,
  match,
}) {
  const [id, setId] = useState(34);
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileActive, setIsProfileActive] = useState(false);
  const { loading, data, error } = useQuery(GET_ALL_POKEMON);

  return (
    <S.Wrapper>
      <LoadingOverlay isActive={loading || isLoading} />
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
          id={id}
          selectEntry={id => {
            setId(id);
            setIsProfileActive(true);
          }}
          setLoadingComplete={() => setIsLoading(false)}
        />
      }
    </S.Wrapper>
  )
}
