import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import * as S from './router.styles';
import * as routes from './routes';
import { AppProvider } from '../contexts';

import EntrancePage from '../pages/ExperiencePage';
import WebglApplication from '../webgl/WebglApplication';

export default function AppRouter() {
  return (
    <React.Fragment>
      <Router>
        <AppProvider value={{
          webgl: new WebglApplication(),
          stage: null,
        }}>
          <S.Container>
            <Switch>
              <Route exact path={routes.home} component={EntrancePage} />
            </Switch>
          </S.Container>
        </AppProvider>
      </Router>
    </React.Fragment>
  );
}
