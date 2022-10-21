describe('empty spec', () => {
  let emailInput: Cypress.Chainable<JQuery<HTMLElement>>
  let submitEmailButton: Cypress.Chainable<JQuery<HTMLElement>>

  function getComponents() {
    emailInput = cy.get('#emailInput')
    submitEmailButton = cy.get('#submitEmailButton')
  }

  function initializeComponents() {
    emailInput.clear()
  }

  before(() => {
    cy.visit('http://localhost:3000')
  })

  beforeEach(() => {
    getComponents()
    initializeComponents()
  })

  it('can type in the input', () => {
    emailInput
      .type('blah')
      .should('have.value', 'blah')
      .type('aoeu')
      .should('have.value', 'blahaoeu')
  })

  it('can type in the input as well', () => {
    emailInput
      .type('blah')
      .should('have.value', 'blah')
      .clear()
      .type('aoeu')
      .should('have.value', 'aoeu')
  })

  it('can click the email submission button', () => {
    emailInput.should('have.value', '')
    submitEmailButton.click()
    emailInput.should('have.value', '')
  })

  it('clicking email submit button clears the email input field', () => {
    emailInput.type('blah').should('have.value', 'blah')
    submitEmailButton.click()
    emailInput.should('have.value', '')
  })
})
