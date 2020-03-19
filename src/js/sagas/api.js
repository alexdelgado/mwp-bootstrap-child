// src/js/sagas/api-saga.js

import { takeEvery, call, put } from 'redux-saga/effects'

import { REST_API_ERROR, REST_SEARCH_SUGGESTIONS_GET, REST_SEARCH_SUGGESTIONS_GOT, REST_SEARCH_RESULTS_GET, REST_SEARCH_RESULTS_GOT } from '../constants'

export default function* watcherSaga() {
  yield takeEvery(REST_SEARCH_SUGGESTIONS_GET, searchSuggestionsWorkerSaga)
  yield takeEvery(REST_SEARCH_RESULTS_GET, searchResultsWorkerSaga)
}

function* searchSuggestionsWorkerSaga(action) {
  try {
    const payload = yield call(querySearchApi, action.payload)
    yield put({
      type: REST_SEARCH_SUGGESTIONS_GOT,
      payload
    })
  } catch (e) {
    yield put({
      type: REST_API_ERROR,
      payload: e
    })
  }
}

function* searchResultsWorkerSaga(action) {
  try {
    const payload = yield call(querySearchApi, action.payload)
    yield put({
      type: REST_SEARCH_RESULTS_GOT,
      payload
    })
  } catch (e) {
    yield put({
      type: REST_API_ERROR,
      payload: e
    })
  }
}

function querySearchApi(request) {
  return fetch(encodeURI(request.url + '?search=' + request.term))
    .then((response) => {
      return response.json()
    })
}
