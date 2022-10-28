import { v4 as uuidv4 } from 'uuid'

describe('empty spec', () => {
  before(() => {
    cy.visit('http://localhost:3000')
  })

  beforeEach(() => {
    getEmailInput().clear()
    getRequestInput().clear()
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
      const myId = uuidv4()
      getRequestInput().type(myId)
      getSubmitRequestButton().click()

      cy.get(`[data-cy="${myId}"]`)
        .children()
        .filter('[data-cy="featuretitle"]')
        .should('have.text', myId)
    })

    it('request to automatically have a vote', () => {
      const myId = uuidv4()
      getRequestInput().type(myId)
      getSubmitRequestButton().click()

      cy.get(`[data-cy="${myId}"]`)
        .children()
        .filter('[data-cy="upvote"]')
        .should('have.text', `👍`)
    })

    it('vote count on request shoul be 1', () => {
      const myId = uuidv4()
      getRequestInput().type(myId)
      getSubmitRequestButton().click()

      cy.get(`[data-cy="${myId}"]`)
        .children()
        .filter('[data-cy="vote-count"]')
        .should('have.text', '1')
    })
  })

  function getEmailInput() {
    return cy.get('#emailInput')
  }

  function getDataCyElement(value: string) {
    return cy.get(`[data-cy="${value}"]`)
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

  function getSubmitRequestButton() {
    return cy.get('[data-cy="addFeature"]')
  }
})
