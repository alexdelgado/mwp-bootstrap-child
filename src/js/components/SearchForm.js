import React from 'react'
import Autosuggest from 'react-autosuggest'
import { connect } from 'react-redux'
import { getSuggestions, clearSuggestions } from '../actions'
import store from '../store'

function mapStateToProps(state) {
  return {
    suggestions: state.suggestions
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getSuggestions: (term) => {
      return dispatch(getSuggestions(term))
    },
    clearSuggestions: () => {
      return dispatch(clearSuggestions())
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

class ConnectedSearchForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      label: window.wpBootstrap.search.label || '',
      placeholder: window.wpBootstrap.search.placeholder || '',
      suggestions: [],
      value: window.wpBootstrap.search.value || ''
    }

    store.subscribe(() => this.onSubscribe())
  }

  onSubscribe() {
    const state = store.getState()

    if (state.suggestions.length > 0) {
      this.setState({
        suggestions: state.suggestions
      })
    }
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    if (value.length > 2) {
      this.props.getSuggestions(value)
    }
  }

  onSuggestionsClearRequested = () => {
    this.props.clearSuggestions()
  }

  render() {
    return (
      <div className="search-form">
        <label>
          <span className="screen-reader-text">{ this.state.label }</span>
          <Autosuggest
            multiSection={true}
            suggestions={this.state.suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestionsContainer={renderSuggestionsContainer}
            renderSectionTitle={renderSectionTitle}
            renderSuggestion={renderSuggestion}
            getSectionSuggestions={getSectionSuggestions}
            inputProps={{
              'type': 'search',
              'id': 'js-search',
              'className': 'search-form__input input-text',
              'placeholder': this.state.placeholder,
              'value': this.state.value,
              'role': 'combobox',
              'aria-autocomplete': 'list',
              'aria-expanded': 'false',
              'aria-label': 'Search for...',
              'aria-owns': 'js-search-autocomplete',
              'autoComplete': 'off',
              onChange: this.onChange
            }}
          />
        </label>
      </div>
    )
  }
}

const SearchForm = connect(mapStateToProps,mapDispatchToProps)(ConnectedSearchForm)
export default SearchForm
