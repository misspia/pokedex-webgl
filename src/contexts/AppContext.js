import { Component, createContext } from 'react';
import AppStages from '../constants/appStages';

export const AppContext = createContext({});
export const AppConsumer = AppContext.Consumer;

export class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: AppStages.INTRO,
    };
  }
  setStage(stage) {
    this.setState({ stage });
  }

  render() {
    const { stage } = this.state;
    const { setStage } = this;

    return (
      <AppContext.Provider
        value={{
          stage,
          setStage,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    )
  }
}
