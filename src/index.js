import ReactDOM from 'react-dom';
import React from 'react';
import AppRouter from './router/router'
import { createGlobalStyle } from 'styled-components';
import { Colors, Fonts } from './themes';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './apollo';

const GlobalStyle = createGlobalStyle`
  @import url('${Fonts.src}');
  body {
    margin: 0;
    font-family: ${Fonts.family};
    font-weight: ${Fonts.weightRegular};
    color: ${Colors.black};
    height: 100%;
    width: 100%;
  }
  #app {
    height: 100%;
    width: 100%;
  }

  html {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
`;

function App() {
  console.edebug(process.env.API_HOST);
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <AppRouter />
    </ApolloProvider>
  )
};

ReactDOM.render(<App />, document.getElementById('app'));
