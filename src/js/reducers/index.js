// src/js/reducers/index.js

import * as constants from '../constants'
import { transformSuggestions } from '../utilities'

const initialState = {
  results: [],
  status: '',
  suggestions: []
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case constants.REST_SEARCH_SUGGESTIONS_GET:
      return Object.assign({}, state, {
        results: [],
        status: '',
      })
    case constants.REST_SEARCH_SUGGESTIONS_GOT:
      return Object.assign({}, state, {
        suggestions: transformSuggestions(action.payload)
      })
    case constants.REST_SEARCH_SUGGESTIONS_CLEAR:
      return Object.assign({}, state, {
        suggestions: []
      })
    case constants.REST_SEARCH_RESULTS_GOT:
      return Object.assign({}, state, {
        results: transformSuggestions(action.payload),
        status: constants.REST_SEARCH_RESULTS_LOADED
      })
    case constants.REST_SEARCH_RESULTS_CLEAR:
      return Object.assign({}, state, {
        results: [],
        status: ''
      })
    default:
      return state
  }
}
