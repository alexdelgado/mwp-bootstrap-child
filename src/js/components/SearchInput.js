import React from 'react'
import Autosuggest from 'react-autosuggest'

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

export default class SearchInput extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      suggestions: [],
      value: this.props.value
    }
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    console.log('onSuggestionsFetchRequested', value)

    this.setState({
      suggestions: [{"title":"post","results":[{"id":9,"title":"Sample Post","excerpt":"","postType":"post","url":"http://one.wordpress.test/sample-post/"}]},{"title":"page","results":[{"id":2,"title":"Sample Page","excerpt":"<p>This is an example page. It&#8217;s different from a blog post because it will stay in one place and will show up in your site navigation (in most themes). Most people start with an About page that introduces them to potential site visitors. It might say something like this: Hi there! I&#8217;m a bike messenger [&hellip;]</p>\n","postType":"page","url":"http://one.wordpress.test/sample-page/"}]}]
    })
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
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
            'aria-autocomplete': 'list',
            'aria-expanded': 'false',
            'aria-label': 'Search for...',
            'aria-owns': 'js-search-autocomplete',
            'autoComplete': 'off',
            onChange: this.onChange
          }}
        />
      </label>
    )
  }
}
