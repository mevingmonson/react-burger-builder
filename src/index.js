import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from './App';
import BurgerBuilderReducer from './store/reducers/BurgerBuilder-reducer'
import OrderReducer from './store/reducers/order-reducer';
import AuthReducer from './store/reducers/auth-reducer';
import * as serviceWorker from './serviceWorker';

import './index.css';

const rootReducer = combineReducers({
  burgerBuilder: BurgerBuilderReducer,
  order: OrderReducer,
  auth: AuthReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
