import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import * as S from './router.styles';
import routes from './routes';

import HomePage from '../pages/home/home';
import EntryPage from '../pages/entry/entry';

export default class AppRouter extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Router>
        <S.Container>
          <Switch>
            <Route exact path={routes.home} component={HomePage}/>
            <Route path={routes.entry} component={EntryPage}/>
          </Switch>
        </S.Container>
      </Router>
      </React.Fragment>
    )
  }
}