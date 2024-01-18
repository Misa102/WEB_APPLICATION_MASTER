import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import reducers from "./redux/reducers";
import mySaga from "./redux/sagas";

// Créer le middleware Saga
const sagaMiddleware = createSagaMiddleware();

// Créer le store avec le middleware Saga
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

//sagaMiddleware.arguments(mySaga);
// Exécuter saga avec le middleware
sagaMiddleware.run(mySaga);

// Render le composant racine APP avec le Redux Provider
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
