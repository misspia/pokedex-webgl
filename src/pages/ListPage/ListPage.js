import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import * as S from './ListPage.styles';

const ALL_PK_QUERY = gql`
  {
    GetAllPokemon {
      id
      name
      spriteUrl
    }
  }
`;

export default class ListPage extends React.Component {
  render() {
    return (
      <S.Container>
        <Query query={ALL_PK_QUERY}>
          {({ loading, error, data }) => {
            if(loading) return <p>loading...</p>;
            if(error) return <p>Error: {JSON.stringify(error)}</p>;
            
            const pokemonList = data.GetAllPokemon;
            return pokemonList.map(({ id, name, spriteUrl}) => (
              <S.Col key={id}>
                <S.Row>National No. {id}</S.Row>
                <S.Row> 
                  <img src={spriteUrl}/>
                  {name}
                </S.Row>
              </S.Col>
            ))
          }}
        </Query>
      </S.Container>
    )
  }
}