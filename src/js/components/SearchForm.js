import React from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'

import { getSearchResults, clearSearchResults } from '../actions'
import SearchInput from './SearchInput'
import SearchResults from './SearchResults';

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

class ConnectedSearchForm extends React.Component {

  componentDidMount() {
    const $search = ReactDOM.findDOMNode(this).querySelector('input')

    $search.addEventListener('hidden', (e) => {
      this.props.clearSearchResults()
    })

    $search.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        this.props.getSearchResults({
          url: this.props.url,
          term: e.target.value
        })
      }
    })
  }

  render() {
    return (
      <div className="search-form js-search-form">
        <div className="search-form__header">
          <SearchInput
            label={wpBootstrap.search.label}
            placeholder={wpBootstrap.search.placeholder}
            url={wpBootstrap.search.url}
            value={wpBootstrap.search.value}
          />
        </div>
        <div className="search-form__results">
          <SearchResults />
        </div>
      </div>
    )
  }
}

const SearchForm = connect(null, mapDispatchToProps)(ConnectedSearchForm)
export default SearchForm
