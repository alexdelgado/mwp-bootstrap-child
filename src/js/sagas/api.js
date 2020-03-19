// src/js/sagas/api-saga.js

import { takeEvery, call, put } from 'redux-saga/effects'

import { REST_API_ERROR, REST_SEARCH_GET, REST_SEARCH_GOT } from '../constants'

export default function* watcherSaga() {
  yield takeEvery(REST_SEARCH_GET, searchWorkerSaga)
}

function* searchWorkerSaga() {
  try {
    const payload = yield call(getSearchSuggestions)
    yield put({
      type: REST_SEARCH_GOT,
      payload
    })
  } catch (e) {
    yield put({
      type: REST_API_ERROR,
      payload: e
    })
  }
}

function getSearchSuggestions() {
  return fetch('http://one.wordpress.test/?rest_route=/wp/v2/search')
    .then((response) => {
      return response.json()
    })
}
