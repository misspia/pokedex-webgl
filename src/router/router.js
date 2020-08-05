import React, { useState, useCallback } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import * as S from './router.styles';
import * as routes from './routes';
import { AppProvider } from '../contexts';

import ExperiencePage from '../pages/ExperiencePage';
import MobilePage from '../pages/MobilePage';
import WebglApplication from '../webgl/WebglApplication';
import useMobileCheck from '../hooks/useMobileCheck';

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
                {isMobile && <Redirect to={routes.mobile}/>}
              </Route>
              <Route exact path={routes.mobile} component={MobilePage}>
                {!isMobile && <Redirect to={routes.home}/>}
              </Route>
            </Switch>
          </S.Container>
        </AppProvider>
      </Router>
    </React.Fragment>
  );
}
