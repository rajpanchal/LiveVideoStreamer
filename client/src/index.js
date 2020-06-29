import React from 'react';
import ReactDOM from 'react-dom';
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './components/App';
import combinedReducers from './reducers';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combinedReducers, composeEnhancer( applyMiddleware(thunk)));

ReactDOM.render( 
  <Provider store = { store } >
    <App />
  </Provider>, 
document.querySelector('#root'));