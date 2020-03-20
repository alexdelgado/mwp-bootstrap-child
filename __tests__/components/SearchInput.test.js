import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'

import SearchInput from '../../src/js/components/SearchInput'
import store from '../../src/js/store'

test('SearchInput component renders properly', () => {

  const props = {
    label: 'Search for:',
    placeholder: 'Search',
    value: '',
  }

  const component = mount(
    <Provider store={store}>
      <SearchInput
        label={props.label}
        placeholder={props.placeholder}
        value={props.value}
      />
    </Provider>
  )

  expect(component.find('.screen-reader-text').text()).toBe(props.label)

  const input = component.find('input[type="search"]')

  expect( input.props().placeholder ).toBe(props.placeholder)
  expect( input.props().value ).toBe(props.value)
})
