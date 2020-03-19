// src/js/reducers/index.js

import { REST_SEARCH_SUGGESTIONS_GET, REST_SEARCH_SUGGESTIONS_GOT, REST_SEARCH_SUGGESTIONS_CLEAR } from '../constants'
import { REST_SEARCH_RESULTS_GOT, REST_SEARCH_RESULTS_CLEAR } from '../constants'
import SearchResult from '../models/SearchResult'

const initialState = {
  results: [],
  status: '',
  suggestions: []
}

function transformSuggestions(results) {
  const searchResults = []
  const suggestions = []

  results.forEach((result) => {
    let post = new SearchResult(result)

    if (!searchResults[post.postType]) {
      searchResults[post.postType] = []
    }

    searchResults[post.postType].push(post)
  })

  Object.keys(searchResults).forEach((i) => {
    suggestions.push({
      title: i,
      results: searchResults[i]
    })
  })

  return suggestions
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case REST_SEARCH_SUGGESTIONS_GET:
      return Object.assign({}, state, {
        results: [],
        status: '',
      })
    case REST_SEARCH_SUGGESTIONS_GOT:
      return Object.assign({}, state, {
        suggestions: transformSuggestions(action.payload)
      })
    case REST_SEARCH_SUGGESTIONS_CLEAR:
      return Object.assign({}, state, {
        suggestions: []
      })
    case REST_SEARCH_RESULTS_GOT:
      return Object.assign({}, state, {
        results: transformSuggestions(action.payload),
        status: 'loaded',
        suggestions: []
      })
    case REST_SEARCH_RESULTS_CLEAR:
      return Object.assign({}, state, {
        results: [],
        status: ''
      })
    default:
      return state
  }
}

export default rootReducer
