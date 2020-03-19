// -------------------------------------
//   Bootstrap
// -------------------------------------

import 'bootstrap/js/dist/collapse'


// -------------------------------------
//   Components
// -------------------------------------

import './components/search-overlay'


// -------------------------------------
//   React
// -------------------------------------

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import SearchForm from './components/SearchForm'

ReactDOM.render(
  <Provider store={store}>
    <SearchForm />
  </Provider>,
  document.getElementById('react-search')
)
