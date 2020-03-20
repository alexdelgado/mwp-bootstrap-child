import React from 'react'
import { mount } from 'enzyme'

import SearchInput from '../src/js/components/SearchInput'

test('SearchInput component renders properly', () => {

  const props = {
    label: 'Search for:',
    placeholder: 'Search',
    value: '',
  }

  const wrapper = mount(
    <SearchInput
      label={props.label}
      placeholder={props.placeholder}
      value={props.value}
    />
  )

  const label = wrapper.find('.screen-reader-text')
  expect(label.text()).toBe(props.label)

  const input = wrapper.find('input[type="search"]')
  expect(input.props().placeholder).toBe(props.placeholder)
  expect(input.props().value).toBe(props.value)
})
