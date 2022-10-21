describe('empty spec', () => {
  before(() => {
    cy.visit('http://localhost:3000')
  })

  beforeEach(() => {
    cy.get('#emailInput').clear()
  })

  describe('subscribe for emails', () => {
    it('can type in the input', () => {
      getEmailInput()
        .type('blah')
        .should('have.value', 'blah')
        .type('aoeu')
        .should('have.value', 'blahaoeu')
    })

    it('can type in the input as well', () => {
      getEmailInput()
        .type('blah')
        .should('have.value', 'blah')
        .clear()
        .type('aoeu')
        .should('have.value', 'aoeu')
    })

    it('can click the email submission button', () => {
      getEmailInput().should('have.value', '')
      getSubmitEmailButton().click()
      getEmailInput().should('have.value', '')
    })

    it('clicking email submit button clears the email input field if the email is valid', () => {
      getEmailInput()
        .type('blah@email.com')
        .should('have.value', 'blah@email.com')
      getSubmitEmailButton().click()
      getEmailInput().should('have.value', '')
    })

    for (const email of ['aoeu@', '@', '@aoeu', 'aoeu']) {
      it(`does not clear if the email is nonsense (${email})`, () => {
        getEmailInput().type(email).should('have.value', email)
        getSubmitEmailButton().click()
        getEmailInput().should('have.value', email)
      })
    }
  })

  describe('adding request', () => {
    it('replaces placeholder text with typed text', () => {
      getRequestInput()
        .type('my new request')
        .should('have.value', 'my new request')
    })
    it('has expected placeholder text', () => {
      getRequestInput().should('have.attr', 'placeholder')
    })

    it('request should be added to request list', () => {
      const existingItem = getItemsContainer().last()
      // getItemsContainer().last().should('have.keys', [0])
      // TODO: find last item if it exists, click the btn and find last item
    })
  })

  function getEmailInput() {
    return cy.get('#emailInput')
  }

  function getRequestInput() {
    return cy.get('#requestInput')
  }

  function getItemsContainer() {
    return cy.get('#itemsContainer')
  }

  function getSubmitEmailButton() {
    return cy.get('#submitEmailButton')
  }
})
