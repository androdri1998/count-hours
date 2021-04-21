import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import routesConstants from '../utils/routesConstants';

const HomePage = lazy(() => import('../pages/Home'));

const Routes: React.FC = () => {
  return (
    <Suspense fallback={<>Carregando...</>}>
      <Switch>
        <Route path={routesConstants.HOME} exact component={HomePage} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
