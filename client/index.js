"use strict"

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from "./components/App";
import routes from './routes';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/rootReducer'; 
import { AUTH_SUCCESS } from './actions/types';
//import '../public/stylesheets/main.css';

const store = createStore(
	rootReducer,
  {}, 
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);


const user = JSON.parse(localStorage.getItem('user'));

// i dispatch this action from the store in order to keep the signedup/signedin user authenticated when I browse the website
if (user) {
	store.dispatch({ type: AUTH_SUCCESS });
}


render(
	<Provider store = {store} >
		<Router history = {browserHistory} routes = {routes} />
	</Provider>
, document.getElementById('app')
);