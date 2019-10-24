import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import * as S from './router.styles';
import * as routes from './routes';

import HomePage from '../pages/HomePage/HomePage';

export default class AppRouter extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <S.Container>
            <Switch>
              <Route exact path={routes.home} component={HomePage} />
            </Switch>
          </S.Container>
        </Router>
      </React.Fragment>
    )
  }
}
