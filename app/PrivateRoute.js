import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const { session } = require('electron').remote.session;

const ses = session.fromPartition('persist:name');
const cookies = require('./cookie/cookie');

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    cookies.getCookie('userCookie', ses)
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  )} />
)
