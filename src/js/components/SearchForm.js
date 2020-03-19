import React from 'react'
import ReactDOM from "react-dom";
import Autosuggest from 'react-autosuggest'
import { connect } from 'react-redux'
import { getSuggestions, clearSuggestions, getSearchResults, clearSearchResults } from '../actions'
import store from '../store'

function mapStateToProps(state) {
  return {
    suggestions: state.suggestions
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getSuggestions: (request) => {
      return dispatch(getSuggestions(request))
    },
    clearSuggestions: () => {
      return dispatch(clearSuggestions())
    },
    getSearchResults: (request) => {
      return dispatch(getSearchResults(request))
    },
    clearSearchResults: () => {
      return dispatch(clearSearchResults())
    },
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
      results: [],
      state: '',
      suggestions: [],
      value: this.props.value
    }

    this.onSearch = this.onSearch.bind(this)

    store.subscribe(() => this.onSubscribe())
  }

  componentDidMount() {
    const $search = ReactDOM.findDOMNode(this).querySelector('input')

    $search.addEventListener('hidden', (e) => {
      this.setState({ value: '' })
      this.props.clearSearchResults();
    })

    $search.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        this.onSearch()
      }
    })
  }

  onSubscribe() {
    const state = store.getState()

    this.setState({
      results: state.results,
      status: state.status,
      suggestions: state.suggestions
    })
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    })
  }

  onSuggestionsFetchRequested = ({ value }) => {

    this.setState({ status: '' })

    if (value.length > 2) {
      this.props.getSuggestions({
        url: this.props.url,
        term: value
      })
    }
  }

  onSuggestionsClearRequested = () => {
    this.props.clearSuggestions()
  }

  onSearch() {
    this.props.getSearchResults({
      url: this.props.url,
      term: this.state.value
    })
  }

  renderSearchResults() {
    if (this.state.status == 'loaded') {
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
          <h3>Sorry, we couldn't find any results for "{this.state.value}".</h3>
        )
      }
    }
  }

  render() {
    return (
      <div className="search-form js-search-form">
        <div className="search-form__header">
          <label>
            <span className="screen-reader-text">{this.props.label}</span>
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
                'placeholder': this.props.placeholder,
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
        <div className="search-form__results">
          {this.renderSearchResults()}
        </div>
      </div>
    )
  }
}

const SearchForm = connect(mapStateToProps,mapDispatchToProps)(ConnectedSearchForm)
export default SearchForm
