import React, { Fragment } from 'react';
import { render } from 'react-dom';
//import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
//import Root from './containers/Root';
import { store } from './helpers/store';
import { Provider } from 'react-redux';
import { App } from 'containers/App';
import './app.global.css';



//const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

render(
  /*<AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')*/

  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
