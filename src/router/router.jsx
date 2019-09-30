import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import * as S from './router.styles';
import * as routes from './routes';

import HomePage from '../pages/HomePage/HomePage';
import EntryPage from '../pages/EntryPage/EntryPage';
import ListPage from '../pages/ListPage/ListPage';

export default class AppRouter extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Router>
        <QueryParamProvider ReactRouterRoute={Route}>
          <S.Container>
            <Switch>
              <Route exact path={routes.home} component={HomePage} />
            </Switch>
          </S.Container>
        </QueryParamProvider>
        </Router>
      </React.Fragment>
    )
  }
}
