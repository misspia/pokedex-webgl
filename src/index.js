import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import AppRouter from './router/router'
import { createGlobalStyle } from 'styled-components';
import { Colors, Fonts } from './themes';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: process.env.API_HOST,
});

const GlobalStyle = createGlobalStyle`
  @import url('${Fonts.src}');
  body {
    margin: 0;
    font-family: ${Fonts.family};
    font-weight: ${Fonts.weightRegular};
    color: ${Colors.black};

  }
  
  html {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
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
