import React, { Component, createContext } from 'react';
import Stages from '../constants/stages';

export const AppContext = createContext({});
export const AppConsumer = AppContext.Consumer;

export class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: props.value.stage,
      webgl: props.value.webgl,
    };
  }
  static defaultProps = {
    value: {
      webgl: null,
      stage: null,
    }
  }

  setStage = (stage) => {
    if(stage === this.state.stage) {
      return;
    }
    this.setState({ stage }, () => {
      this.state.webgl.setStage(stage);
    });
  }

  setWebgl = (webgl) => {
    this.setState({ webgl });
  }

  render() {
    const { stage, webgl } = this.state;
    const { setStage, setWebgl } = this;

    return (
      <AppContext.Provider
        value={{
          stage,
          webgl,
          setStage,
          setWebgl,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    )
  }
}
