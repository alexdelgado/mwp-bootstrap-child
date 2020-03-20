import React from 'react'
import { connect } from 'react-redux'
import Autosuggest from 'react-autosuggest'

import { getSuggestions, clearSuggestions, clearSearchResults } from '../actions'
import store from '../store'

function mapDispatchToProps(dispatch) {
  return {
    getSuggestions: (request) => {
      return dispatch(getSuggestions(request))
    },
    clearSuggestions: () => {
      return dispatch(clearSuggestions())
    },
    clearSearchResults: () => {
      return dispatch(clearSearchResults())
    }
  }
}

function getSuggestionValue(suggestion) {
  return suggestion.title
}

function renderSuggestionsContainer({ containerProps, children, query }) {
  return (
    <div {...containerProps}>
      {children}
      <div className="react-autosuggest__footer">
        Press Enter to search <strong>{query}</strong>
      </div>
    </div>
  )
}

function renderSectionTitle(section) {
  return (
    <h4>{section.title}</h4>
  )
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.title}</span>
  )
}

function getSectionSuggestions(section) {
  return section.results
}

class ConnectedSearchInput extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      suggestions: [],
      value: this.props.value
    }

    store.subscribe(() => {
      this.setState({
        suggestions: store.getState().suggestions
      })
    })
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    if (value.length > 2) {
      this.props.getSuggestions({
        url: this.props.url,
        term: value
      })
    }
  }

  onSuggestionsClearRequested = () => {
    if (!document.getElementById('js-search').value) {
      this.props.clearSuggestions()
      this.props.clearSearchResults()
    }
  }

  render() {
    return (
      <label>
        <span className="screen-reader-text">{this.props.label}</span>
        <Autosuggest
          multiSection={true}
          suggestions={this.state.suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSectionSuggestions={getSectionSuggestions}
          getSuggestionValue={getSuggestionValue}
          renderSuggestionsContainer={renderSuggestionsContainer}
          renderSectionTitle={renderSectionTitle}
          renderSuggestion={renderSuggestion}
          inputProps={{
            'type': 'search',
            'id': 'js-search',
            'className': 'search-form__input input-text',
            'placeholder': this.props.placeholder,
            'value': this.state.value,
            'role': 'combobox',
            'aria-label': 'Search for...',
            'autoComplete': 'off',
            onChange: this.onChange
          }}
        />
      </label>
    )
  }
}

const SearchInput = connect(null, mapDispatchToProps)(ConnectedSearchInput)
export default SearchInput
