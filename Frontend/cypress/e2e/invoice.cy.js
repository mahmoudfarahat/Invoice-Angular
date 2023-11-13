/// <reference types="Cypress" />


describe('invoice management',()=>{
  it('Create Invoice',()=>{
    cy.visit('http://localhost:4200/');
    cy.contains('Create').click();
    cy.get('#InvoiceNumber').type('745648');
    cy.get('#Date').type('11/07/2023');

    cy.get('#Customer').click()
    .find("[ng-reflect-ng-item-label='Tamer']")
    .click();

    cy.get('#Employee').click()
    .find("[ng-reflect-ng-item-label='Medo']")
    .click();
cy.get('button').contains('Add Product').click()

cy.get('#products').select('Mouse')

cy.get('button').contains('Save').click()

    // cy.get('.backdrop').click({ force: true})
    // to force it to click even there is above it
    cy.get('.modal').should('not.exist');

    //cy.contains('Cancel').click();
  })
//cypress command

})
