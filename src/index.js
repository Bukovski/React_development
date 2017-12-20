//import 'babel-polyfill';
//import 'normalize.css';
import React from 'react'
import { render } from 'react-dom'
import {Provider} from 'react-redux';

import App from './component/App'
import configureStore from './store';

const store = configureStore();

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);