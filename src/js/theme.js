// -------------------------------------
//   Bootstrap
// -------------------------------------

import 'bootstrap/js/dist/collapse';


// -------------------------------------
//   Components
// -------------------------------------

import './components/search-overlay';


// -------------------------------------
//   React
// -------------------------------------

import React from 'react';
import ReactDOM from 'react-dom';
import SearchForm from './components/SearchForm';

ReactDOM.render(<SearchForm />, document.getElementById('react-search'));
