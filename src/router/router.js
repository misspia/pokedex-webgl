import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import * as S from './router.styles';
import * as routes from './routes';
import { WebglProvider } from '../webgl/WebglContext';

import HomePage from '../pages/HomePage/HomePage';
import WebglApplication from '../webgl/WebglApplication';

export default function AppRouter() {
  const webgl = new WebglApplication();

  return (
    <React.Fragment>
      <Router>
        <WebglProvider value={{ webgl }}>
          <S.Container>
            <Switch>
              <Route exact path={routes.home} component={HomePage} />
            </Switch>
          </S.Container>
        </WebglProvider>
      </Router>
    </React.Fragment>
  );
}
