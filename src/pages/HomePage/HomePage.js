import React, { useRef, useEffect, useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import * as S from './HomePage.styles';
import SelectionCavnas from '../../components/SelectionCanvas/SelectionCanvas';
import Profile from '../../components/Profile/Profile';

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
  const [id, setId] = useState(1);
  const { loading, data, error } = useQuery(GET_ALL_POKEMON);

  useEffect(() => {
    console.debug('ID', id)
  }, [id]);

  return (
    <S.Wrapper>
      { loading && 'loading...'}
      { error && `ERROR: ${JSON.stringify(error)}`}
      <Profile
        id={id}
        active={true}
      />
      {
        data &&
        <SelectionCavnas
          entries={data.GetAllPokemon}
          id={id}
          setId={id => setId(id)}
        />
      }
    </S.Wrapper>
  )
}
