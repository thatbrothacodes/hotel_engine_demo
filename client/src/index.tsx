import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import thunk from 'redux-thunk';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import reducers from "./reducers";

/* tslint:disable interface-name */

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.headers.post['Content-Type'] = 'application/json';

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  {},
  reduxDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <BrowserRouter>
      <Provider store={store}>
          <App />
      </Provider>
  </BrowserRouter>, 
  document.getElementById('root')
);

registerServiceWorker();
