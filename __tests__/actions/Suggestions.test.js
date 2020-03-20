import { getSuggestions, clearSuggestions, getSearchResults, clearSearchResults } from '../../src/js/actions'
import { REST_SEARCH_SUGGESTIONS_GET, REST_SEARCH_SUGGESTIONS_CLEAR } from '../../src/js/constants'
import { REST_SEARCH_RESULTS_GET, REST_SEARCH_RESULTS_CLEAR } from '../../src/js/constants'

describe('Suggestion actions', () => {

  it('getSuggestions', () => {

      const params = {
        url: '/wp/v2/posts',
        term: 'sample'
      }

      const action = getSuggestions(params)

      expect(action).toEqual({
        payload: params,
        type: REST_SEARCH_SUGGESTIONS_GET
      })
  })

  it('clearSuggestions', () => {

    const action = clearSuggestions()

    expect(action).toEqual({
      type: REST_SEARCH_SUGGESTIONS_CLEAR
    })
  })

  it('getSearchResults', () => {

      const params = {
        url: '/wp/v2/posts',
        term: 'sample'
      }

      const action = getSearchResults(params)

      expect(action).toEqual({
        payload: params,
        type: REST_SEARCH_RESULTS_GET
      })
  })

  it('clearSearchResults', () => {

    const action = clearSearchResults()

    expect(action).toEqual({
      type: REST_SEARCH_RESULTS_CLEAR
    })
  })
})
