/// <reference types="Cypress" />


describe('invoice management',()=>{
  it('Create Invoice',()=>{

    //cy.location('pathname').should('eq','about');

    cy.visit('http://localhost:4200/');
    cy.contains('Create').click();
    cy.location('pathname').should('eq','/create');

    cy.get('#InvoiceNumber').type('7425648');
    cy.get('#Date').type('11/07/2023');

    cy.get('#Customer').click()
    .find("[ng-reflect-ng-item-label='Tamer']")
    .click();

    cy.get('#Employee').click()
    .find("[ng-reflect-ng-item-label='Medo']")
    .click();
const btn = cy.get('button')

cy.get('button').as('submitBtn') //alisa

cy.get('button').then((el) => {
  // el.attr('disabled')
  //el.text('')
expect(el.attr('disabled')).to.be.undefined;
expect(el.text()).to.be('Submit')

})

 cy.get('@submitBtn')

btn.contains('Add Product').click()

cy.get('#products').select('Mouse')

cy.go('back')

cy.get('button').contains('Save').click()
cy.get('button').first()
cy.get('button').last()
 //cy.get('button').eg(0) //index

cy.get('[data-cy="button"]')  //index

    // cy.get('.backdrop').click({ force: true})
    // to force it to click even there is above it
    cy.get('.modal').should('not.exist');
    cy.get().type('Hello{enter}')
    //cy.contains('Cancel').click();
  })
//cypress command

// .should = .and
})
