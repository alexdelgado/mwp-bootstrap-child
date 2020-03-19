// src/js/actions/index.js

import { REST_SEARCH_SUGGESTIONS_GET, REST_SEARCH_SUGGESTIONS_CLEAR } from '../constants'
import { REST_SEARCH_RESULTS_GET, REST_SEARCH_RESULTS_CLEAR } from '../constants'

export function getSuggestions(payload) {
  return {
    type: REST_SEARCH_SUGGESTIONS_GET,
    payload
  }
}

export function clearSuggestions() {
  return {
    type: REST_SEARCH_SUGGESTIONS_CLEAR
  }
}

export function getSearchResults(payload) {
  return {
    type: REST_SEARCH_RESULTS_GET,
    payload
  }
}

export function clearSearchResults() {
  return {
    type: REST_SEARCH_RESULTS_CLEAR
  }
}
