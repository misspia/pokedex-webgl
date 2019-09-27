import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
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
        <S.Container>
          <Switch>
            <Route exact path={routes.home} component={HomePage}/>
            <Route exact path={routes.list} component={ListPage}/>
            <Route path={routes.entry} component={EntryPage}/>
          </Switch>
        </S.Container>
      </Router>
      </React.Fragment>
    )
  }
}
