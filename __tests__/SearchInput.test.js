import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'

import SearchInput from '../src/js/components/SearchInput'
import store from '../src/js/store'

test('SearchInput component renders properly', () => {

  const props = {
    label: 'Search for:',
    placeholder: 'Search',
    value: '',
  }

  const wrapper = mount(
    <Provider store={store}>
      <SearchInput
        label={props.label}
        placeholder={props.placeholder}
        value={props.value}
      />
    </Provider>
  )

  const label = wrapper.find('.screen-reader-text')
  expect(label.text()).toBe(props.label)

  const input = wrapper.find('input[type="search"]')
  expect(input.props().placeholder).toBe(props.placeholder)
  expect(input.props().value).toBe(props.value)
})
