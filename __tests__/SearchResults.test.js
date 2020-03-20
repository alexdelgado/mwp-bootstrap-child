import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'

import SearchResults from '../src/js/components/SearchResults'
import store from '../src/js/store'

describe('SearchResults', () => {

  let component

  beforeEach(()=>{
    component = mount(
      <Provider store={store}>
        <SearchResults />
      </Provider>
    )
  })


  it('renders properly', () => {
    expect(component.find('h3').text()).toBe("Sorry, we couldn't find any results for that query.")
  })

  it('displays search results', () => {

    component.find('ConnectedSearchResults').setState({
      results: [
        {
          "title": "post",
          "results": [
            {
              "id": 9,
              "title": "Sample Post",
              "excerpt": "",
              "postType": "post",
              "url": "http://localhost:300/sample-post/"
            }
          ]
        },
        {
          "title": "page",
          "results": [
            {
              "id": 2,
              "title": "Sample Page",
              "excerpt": "",
              "postType": "page",
              "url": "http://localhost:300/sample-page/"
            }
          ]
        }
      ]
    })

    expect( component.find('.search-form__result').length ).toEqual(2)
  })
})
