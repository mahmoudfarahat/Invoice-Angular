/// <reference types="Cypress" />

describe('template spec', () => {
  it('main Page', () => {
    cy.visit('http://localhost:4200/');
    cy.get('datatable-row-wrapper').should('have.length',10);
    cy.get('li')
  })

  it('page title', () => {
    cy.visit('http://localhost:4200/');
    cy.get('.navbar-brand').should('have.length',1);
    cy.get('.navbar-brand').should('exist');
    cy.get('.navbar-brand').contains('INVOICE');
    // cy.get('.navbar-brand').find('img');
    // or
    // cy.get('.navbar-brand img');
    // but not
    // cy.get('.navbar-brand').get('img');

    cy.contains('INVOICE');
  });





})
