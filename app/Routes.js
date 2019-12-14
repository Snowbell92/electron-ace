import React from 'react';
import { Switch, Route } from 'react-router';
import { PrivateRoute } from './PrivateRoute';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import RegisterPage from './containers/Register';

export default () => (
  <App>
    <div>
      <h2>Just a test message</h2>
    </div>
    <Route path="/" component={RegisterPage} />
    <Switch>
      <PrivateRoute exact path={routes.COUNTER} component={CounterPage} />
      <PrivateRoute exact path="/home" component={HomePage} />
    </Switch>
  </App>
);
