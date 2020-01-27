import React, { useEffect, useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import * as S from './HomePage.styles';
import SelectionCavnas from '../../components/SelectionCanvas/SelectionCanvas';
import Profile from '../../components/Profile';
import { LoadingOverlay } from '../../components/common';

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
  const [isProfileActive, setIsProfileActive] = useState(true);
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
        <SelectionCavnas
          entries={data.GetAllPokemon}
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
