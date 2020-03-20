import React from 'react'
import { connect } from 'react-redux'

import { getSearchResults, clearSearchResults } from '../actions'
import { REST_SEARCH_RESULTS_LOADED } from '../constants'
import store from '../store'

function mapDispatchToProps(dispatch) {
  return {
    getSearchResults: (request) => {
      return dispatch(getSearchResults(request))
    },
    clearSearchResults: () => {
      return dispatch(clearSearchResults())
    },
  }
}

class ConnectedSearchResults extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      results: [],
      status: ''
    }

    store.subscribe(() => {
      const state = store.getState()

      this.setState({
        results: state.results,
        status: state.status
      })
    })
  }

  render() {
    if (this.state.results.length) {
      return (
        this.state.results.map((section) => (
          section.results.map((el) => (
            <div className="search-form__result" key={el.id}>
              <div><a href={el.url} target="_self">{el.title}</a></div>
              <div dangerouslySetInnerHTML={{__html: el.excerpt}}></div>
            </div>
          ))
        ))
      )
    } else if (this.state.status === REST_SEARCH_RESULTS_LOADED) {
      return (
        <h3>Sorry, we couldn't find any results for that query.</h3>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

const SearchResults = connect(null, mapDispatchToProps)(ConnectedSearchResults)
export default SearchResults
