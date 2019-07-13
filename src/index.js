import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import AppRouter from './router/router'
import { createGlobalStyle } from 'styled-components';
import { Colors, Fonts } from './themes';

import ApolloClient,  { gql } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  // uri: 'http://localhost:3000'
  uri: 'https://48p1r2roz4.sse.codesandbox.io'
});

client.query({
  query: gql`
    {
      rates(currency: "USD") {
        currency
      }
    }
  `
}).then(result => console.log(result))


const GlobalStyle = createGlobalStyle`
  @import url('${Fonts.src}');
  body {
    margin: 0;
    font-family: ${Fonts.family};
    font-weight: ${Fonts.weightRegular};
    color: ${Colors.black};
  }
`;

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <GlobalStyle />
        <AppRouter />
      </ApolloProvider>
    )
  }
};

ReactDOM.render(<App />, document.getElementById('app'));
