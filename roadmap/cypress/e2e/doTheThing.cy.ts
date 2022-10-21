describe('empty spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('passes', () => {
    cy.get('#emailInput').type('blah').should('have.value', 'blah')
  })
})
