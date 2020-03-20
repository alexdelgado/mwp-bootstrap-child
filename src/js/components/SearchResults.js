import React from 'react'
import { connect } from 'react-redux'

import { getSearchResults, clearSearchResults } from '../actions'
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
    }

    store.subscribe(() => {
      this.setState({
        results: store.getState().results
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
    } else {
      return (
        <h3>Sorry, we couldn't find any results for that query.</h3>
      )
    }
  }
}

const SearchResults = connect(null, mapDispatchToProps)(ConnectedSearchResults)
export default SearchResults
