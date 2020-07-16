import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import { BrowserRouter, Router, Switch } from "react-router-dom";
import History from "./history.js";
import Routes from "./routes";
import { AUTH_USER, FETCH_ACCOUNT } from "./actions/types";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import rootReducer from "./reducers";
import "./style/style.css";
import { unregister } from "./registerServiceWorker";

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
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);
//



// const token = localStorage.getItem("token");
const profileData = JSON.parse(localStorage.getItem("profileData"));
// if we have a token, consiger the user to be signed in
// And set profile details in navbar.
if (profileData) {
  // we need to update application state

  store.dispatch({ type: AUTH_USER });
  store.dispatch({ type: FETCH_ACCOUNT, payload: profileData });
} else if (!localStorage["alreadyVisited"]) {
  localStorage["alreadyVisited"] = true;
  // History.push('hey/index.html');
  window.location.assign('hey/index.html');

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
  </Provider>,
  document.getElementById("root")
);
unregister();