import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { BrowserRouter, Router, Switch } from 'react-router-dom';
import History from './history.js';
import Routes from './routes';
import { AUTH_USER, FETCH_ACCOUNT } from './actions/types';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import Popper from 'popper.js';

import rootReducer from './reducers';

import './style/style.css';

import registerServiceWorker from './registerServiceWorker';

/*
// UNCOMMENT IT FOR PRODUCTION
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);
*/

/* COMMENT IT OUT FOR PRODUCTION */
const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(reduxThunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);
//

const token = localStorage.getItem('token');
const profileData = JSON.parse(localStorage.getItem('profileData'));
console.log("profile : ", profileData)
// if we have a token, consiger the user to be signed in
// And set profile details in navbar.
if (token) {
    // we need to update application state

    store.dispatch({ type: AUTH_USER });
    store.dispatch({ type: FETCH_ACCOUNT, payload: profileData });
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Router history={History}>
                <Switch>
                    <Routes />
                </Switch>
            </Router>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
