import { Component, createContext } from 'react';
import Stages from '../constants/stages';

export const AppContext = createContext({});
export const AppConsumer = AppContext.Consumer;

export class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: Stages.ENTRANCE,
      webgl: null,
    };
  }
  setStage(stage) {
    this.setState({ stage });
  }

  setWebgl(webgl) {
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
