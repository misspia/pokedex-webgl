import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import AppRouter from './router/router'
import styled, { createGlobalStyle } from 'styled-components';
import { Colors, Fonts } from './themes';

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
      <React.Fragment>
        <GlobalStyle />
        <AppRouter />
      </React.Fragment>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('app'));
