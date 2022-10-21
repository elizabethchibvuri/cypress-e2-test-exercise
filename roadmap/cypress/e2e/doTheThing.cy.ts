describe('empty spec', () => {
  before(() => {
    cy.visit('http://localhost:3000')
  })

  beforeEach(() => {
    cy.get('#emailInput').clear()
  })

  describe('subscribe for emails', () => {
    it('can type in the input', () => {
      cy.get('#emailInput')
        .type('blah')
        .should('have.value', 'blah')
        .type('aoeu')
        .should('have.value', 'blahaoeu')
    })

    it('can type in the input as well', () => {
      cy.get('#emailInput')
        .type('blah')
        .should('have.value', 'blah')
        .clear()
        .type('aoeu')
        .should('have.value', 'aoeu')
    })

    it('can click the email submission button', () => {
      cy.get('#emailInput').should('have.value', '')
      cy.get('#submitEmailButton').click()
      cy.get('#emailInput').should('have.value', '')
    })

    it('clicking email submit button clears the email input field', () => {
      cy.get('#emailInput')
        .type('blah@email.com')
        .should('have.value', 'blah@email.com')
      cy.get('#submitEmailButton').click()
      cy.get('#emailInput').should('have.value', '')
    })
  })

  describe('adding request', () => {
    it('replaces placeholder text with typed text', () => {
      cy.get('#requestInput')
        .type('my new request')
        .should('have.value', 'my new request')
    })
    it('has expected placeholder text', () => {
      cy.get('#requestInput').should('have.attr', 'placeholder')
    })
  })
})
