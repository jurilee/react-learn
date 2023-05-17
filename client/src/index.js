import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { applymiddleware, createStore } from 'redux-middleware';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import { Reducer } from './_reducers';

import 'antd/dist/antd.css';

const createStoreMiddleware = applymiddleware(promiseMiddleware, ReduxThunk)(createStore);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={createStoreMiddleware(Reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__())}>
    <App />
  </Provider> 
);

reportWebVitals();