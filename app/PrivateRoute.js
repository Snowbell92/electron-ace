import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function isCookie(name) {
  // eslint-disable-next-line no-shadow
  let isCookie = false;
  if (
    document.cookie
      .split(';')
      .filter(item => item.trim().startsWith(`${name}=`)).length
  ) {
    console.log('The cookie "reader" exists (ES6)');
    isCookie = true;
  }
  return isCookie;
}

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
   isCookie('userCookie')
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  )} />
)
