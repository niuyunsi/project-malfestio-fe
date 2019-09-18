import React from 'react';
import { Route } from 'react-router-dom';

import { Home, Resume, Demo } from '../pages';

export const Routes = () => (
  <>
    <Route exact path="/" component={Home} />
    <Route path="/resume" component={Resume} />
    <Route path="/demo" component={Demo} />
  </>
);
