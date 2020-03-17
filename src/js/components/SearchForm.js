import React from 'react';
import Autosuggest from 'react-autosuggest';

// Imagine you have a list of languages that you'd like to autosuggest.
const languages = [
  {
    title: '1970s',
    languages: [
      {
        name: 'C',
        year: 1972
      }
    ]
  },
  {
    title: '1980s',
    languages: [
      {
        name: 'C++',
        year: 1983
      },
      {
        name: 'Perl',
        year: 1987
      }
    ]
  },
  {
    title: '1990s',
    languages: [
      {
        name: 'Haskell',
        year: 1990
      },
      {
        name: 'Python',
        year: 1991
      },
      {
        name: 'Java',
        year: 1995
      },
      {
        name: 'Javascript',
        year: 1995
      },
      {
        name: 'PHP',
        year: 1995
      },
      {
        name: 'Ruby',
        year: 1995
      }
    ]
  },
  {
    title: '2000s',
    languages: [
      {
        name: 'C#',
        year: 2000
      },
      {
        name: 'Scala',
        year: 2003
      },
      {
        name: 'Clojure',
        year: 2007
      },
      {
        name: 'Go',
        year: 2009
      }
    ]
  },
  {
    title: '2010s',
    languages: [
      {
        name: 'Elm',
        year: 2012
      }
    ]
  }
];

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return languages
    .map(section => {
      return {
        title: section.title,
        languages: section.languages.filter(language => regex.test(language.name))
      };
    })
    .filter(section => section.languages.length > 0);
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestionsContainer({ containerProps, children, query }) {
  return (
    <div {...containerProps}>
      {children}
      <div className="react-autosuggest__footer">
        Press Enter to search <strong>{query}</strong>
      </div>
    </div>
  );
}

function renderSectionTitle(section) {
  return (
    <h4>{section.title}</h4>
  );
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}

function getSectionSuggestions(section) {
  return section.languages;
}

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      label: window.wpBootstrap.search.label || '',
      placeholder: window.wpBootstrap.search.placeholder || '',
      suggestions: [],
      value: window.wpBootstrap.search.value || ''
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
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
    };

    return (
      <div className='search-form'>
        <label>
          <span className='screen-reader-text'>{ this.state.label }</span>
          <Autosuggest
            multiSection={true}
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestionsContainer={renderSuggestionsContainer}
            renderSectionTitle={renderSectionTitle}
            renderSuggestion={renderSuggestion}
            getSectionSuggestions={getSectionSuggestions}
            inputProps={inputProps}
          />
        </label>
      </div>
    );
  }
}
