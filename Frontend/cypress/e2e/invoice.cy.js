/// <reference types="Cypress" />


describe('invoice management',()=>{
  it('Create Invoice',()=>{
    cy.visit('http://localhost:4200/');
    cy.contains('Create').click();
    cy.get('#InvoiceNumber').type('745648');
    cy.get('#Date').type('11/07/2023');
    cy.get('#Customer').type('Tamer');
    cy.get('#Employee').type('Medo');


    // cy.get('.backdrop').click({ force: true})
    // to force it to click even there is above it
    cy.get('.modal').should('not.exist');

    //cy.contains('Cancel').click();
  })


})
