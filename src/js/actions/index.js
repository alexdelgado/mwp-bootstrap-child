// src/js/actions/index.js

import { REST_SEARCH_GET, REST_SEARCH_CLEAR } from '../constants'

export function getSuggestions(payload) {
  return {
    type: REST_SEARCH_GET,
    payload
  }
}

export function clearSuggestions() {
  return {
    type: REST_SEARCH_CLEAR
  }
}
