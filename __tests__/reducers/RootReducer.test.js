import rootReducer from '../../src/js/reducers'

describe('Root reducer', () => {

  const initialState = {
    results: [],
    status: '',
    suggestions: []
  }

  it('REST_SEARCH_SUGGESTIONS_GET', () => {
    expect( rootReducer(initialState, { type: 'REST_SEARCH_SUGGESTIONS_GET' }) ).toEqual(initialState)
  })

  it('REST_SEARCH_SUGGESTIONS_GOT', () => {

    const action = {
      type: 'REST_SEARCH_SUGGESTIONS_GOT',
      payload: [{
        "id": 1,
        "date": "2020-03-19T07:35:25",
        "slug": "sample-post",
        "status": "publish",
        "type": "post",
        "link": "http://localhost:3000/sample-post/",
        "title": {
          "rendered": "Sample Post"
        },
        "content": {
          "rendered": "",
          "protected": false
        },
        "excerpt": {
          "rendered": "",
          "protected": false
        },
        "author": 1
      }]
    }

    const state = {
      results: [],
      status: '',
      suggestions: [{
        "title": "post",
        "results": [{
          "id": 1,
          "title": "Sample Post",
          "excerpt": "",
          "postType": "post",
          "url": "http://localhost:3000/sample-post/"
        }]
      }]
    }

    expect( rootReducer(initialState, action) ).toEqual(state)
  })

  it('REST_SEARCH_SUGGESTIONS_CLEAR', () => {
    expect( rootReducer(initialState, { type: 'REST_SEARCH_SUGGESTIONS_CLEAR' }) ).toEqual(initialState)
  })

  it('REST_SEARCH_RESULTS_GOT', () => {

    const action = {
      type: 'REST_SEARCH_RESULTS_GOT',
      payload: [{
        "id": 1,
        "date": "2020-03-19T07:35:25",
        "slug": "sample-post",
        "status": "publish",
        "type": "post",
        "link": "http://localhost:3000/sample-post/",
        "title": {
          "rendered": "Sample Post"
        },
        "content": {
          "rendered": "",
          "protected": false
        },
        "excerpt": {
          "rendered": "",
          "protected": false
        },
        "author": 1
      }]
    }

    const state = {
      results: [],
      status: 'REST_SEARCH_RESULTS_LOADED',
      suggestions: [],
      results: [{
        "title": "post",
        "results": [{
          "id": 1,
          "title": "Sample Post",
          "excerpt": "",
          "postType": "post",
          "url": "http://localhost:3000/sample-post/"
        }]
      }]
    }

    expect( rootReducer(initialState, action) ).toEqual(state)
  })

  it('REST_SEARCH_RESULTS_CLEAR', () => {
    expect( rootReducer(initialState, { type: 'REST_SEARCH_RESULTS_CLEAR' }) ).toEqual(initialState)
  })
})
