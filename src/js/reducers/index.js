// src/js/reducers/index.js

import { REST_SEARCH_CLEAR, REST_SEARCH_GOT } from '../constants'
import SearchResult from '../models/SearchResult'

const initialState = {
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
    case REST_SEARCH_CLEAR:
      return Object.assign({}, state, {
        suggestions: []
      })
    case REST_SEARCH_GOT:
      return Object.assign({}, state, {
        suggestions: state.suggestions.concat(transformSuggestions(action.payload))
      })
    default:
      return state
  }
}

export default rootReducer
