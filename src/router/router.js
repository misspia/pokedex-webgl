import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import * as S from './router.styles';
import * as routes from './routes';
import { WebglProvider, AppContext, AppProvider } from '../contexts';

import HomePage from '../pages/ExperiencePage';
import LandingPage from '../pages/LandingPage';
import WebglApplication from '../webgl/WebglApplication';

export default function AppRouter() {
  const webgl = new WebglApplication();

  return (
    <React.Fragment>
      <Router>
        <AppProvider>
          <WebglProvider value={{ webgl }}>
            <S.Container>
              <Switch>
                <Route exact path={routes.home} component={HomePage} />
              </Switch>
            </S.Container>
          </WebglProvider>
        </AppProvider>
      </Router>
    </React.Fragment>
  );
}
