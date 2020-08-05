import React, { useState, useCallback } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import * as S from './router.styles';
import * as routes from './routes';
import { AppProvider } from '../contexts';
import useMobileCheck from '../hooks/useMobileCheck';
import WebglApplication from '../webgl/WebglApplication';

import ExperiencePage from '../pages/ExperiencePage';
import ErrorPage from '../pages/ErrorPage';

export default function AppRouter() {
  const [isMobile, setIsMobile] = useState(true);
  const mobileCheckCallback = useCallback((isMobileView) => {
    setIsMobile(isMobileView);
  }, []);

  useMobileCheck(mobileCheckCallback);

  return (
    <React.Fragment>
      <Router>
        <AppProvider value={{
          webgl: new WebglApplication(),
          stage: null,
        }}>
          <S.Container>
            <Switch>
              <Route exact path={routes.home} component={ExperiencePage} >
                {isMobile && <Redirect to={routes.error}/>}
              </Route>
              <Route exact path={routes.error} component={ErrorPage}>
                {!isMobile && <Redirect to={routes.home}/>}
              </Route>
            </Switch>
          </S.Container>
        </AppProvider>
      </Router>
    </React.Fragment>
  );
}
