import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import ProfileOverview from '../ProfileOverview';
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

const tabs = [
  'overview',
  'evolutions'
];

export default function Profile({
  onClose = () => { },
  active = false,
  id = null,
}) {
  const { loading, error, data } = useQuery(GET_POKEMON_BY_ID, { variables: { id: id } });
  const [activeTab, setActiveTab] = useState(tabs[0]);

  useEffect(() => {
    console.debug(data);
  }, [id]);

  // animate in/out
  useEffect(() => {
    console.debug('is active', active);
  }, [active]);

  useEffect(() => {
    console.debug('active tab', activeTab);
  }, [activeTab]);

  if (loading || error) {
    return (
      <S.Wrapper>
        {loading && 'loading ...'}
        {error && 'ERROR: ' + JSON.stringify(error)}
      </S.Wrapper>
    )
  }

  const  { chainId, ...overview } = data.GetPokemonById;
  return (
    <S.Wrapper>
      <S.InnerWrapper>
        <S.Row>
          <S.CloseButton onClick={onClose}>
            close
          </S.CloseButton>
        </S.Row>
        <ProfileOverview {...overview}/>
        <S.Tabs>
          {tabs.map((tab) => (
            <S.Tab key={tab} onClick={() => setActiveTab(tab)}>
              {tab}
            </S.Tab>
          ))}
        </S.Tabs>
      </S.InnerWrapper>
    </S.Wrapper>
  )
}
