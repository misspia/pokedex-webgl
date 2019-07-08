import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import styled, { createGlobalStyle } from 'styled-components';
import { Colors } from './themes';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%:
`;

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <GlobalStyle />
        <Container>
          Pokedex
        </Container>
      </React.Fragment>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('app'));
