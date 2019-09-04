import React from 'react';
import * as S from './home.styles';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

const PK_TEST_QUERY = gql`
  {
    hello
  }
`;


export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <S.Container>
        <Query query={PK_TEST_QUERY}>
          {({ loading, error, data }) => {
            if(loading) return <p>loading..</p>
            if(error) {
              return <p>Error: {JSON.stringify(error)}</p>
            }
            return <p>Success: {JSON.stringify(data)}</p>
          }}
        </Query>
      </S.Container>
    );
  }
}