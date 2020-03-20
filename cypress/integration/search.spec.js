
context('Search', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('shows/hides the search modal', () => {
    cy.get('#js-search-toggle').click()
    cy.get('#js-search-overlay').should('be.visible')

    cy.get('#js-search-hide').click()
    cy.get('#js-search-overlay').should('be.hidden')

    cy.get('#js-search-toggle').click()
    cy.get('#js-search-overlay').should('be.visible')

    cy.get('#js-search-form').type("{esc}")
    cy.get('#js-search-overlay').should('be.hidden')
  })

  it('shows/hides the autosuggest modal', () => {
    cy.get('#js-search-toggle').click()
    cy.get('#js-search-overlay').should('be.visible')

    cy.get('#js-search').type("sa")
    cy.get('.react-autosuggest__section-container').should('not.exist')

    cy.get('#js-search').clear().type("sample")
    cy.get('.react-autosuggest__section-container').should('exist')
  })

  it('shows/hides search results', () => {
    cy.get('#js-search-toggle').click()
    cy.get('#js-search-overlay').should('be.visible')

    cy.get('#js-search').type("sample").type("{enter}")
    cy.get('.search-form__result').should('exist')

    cy.get('#js-search').clear()
    cy.get('.search-form__result').should('not.exist')
  })
})
