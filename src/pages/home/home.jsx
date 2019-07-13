import React from 'react';
import * as S from './home.styles';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";


const RATES_QUERY = gql`
  {
    rates(currency: "USD") {
      currency
      rate
    }
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
        <Query query={RATES_QUERY}>
          {({ loading, error, data }) => {
            if(loading) return <p>loading...</p>
            if(error) return <p>error: {JSON.stringify(error)}</p>
            return data.rates.map(({ currency, rate}) => (
              <div key={currency}>
                {currency}: {rate}
              </div>
            ));
          }}
        </Query>
      </S.Container>
    );
  }
}