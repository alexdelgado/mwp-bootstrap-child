// src/js/store/index.js

import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers/index'
import apiSaga from '../sagas/api'

const initialiseSagaMiddleware = createSagaMiddleware()

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  storeEnhancers(
    applyMiddleware(initialiseSagaMiddleware)
  )
)

initialiseSagaMiddleware.run(apiSaga)

export default store
