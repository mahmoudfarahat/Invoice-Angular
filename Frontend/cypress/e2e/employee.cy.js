/// <reference types="Cypress" />


describe('Employee',()=>{
  it('Chechk Validation',()=>{
    cy.visit('http://localhost:4200/employee/create');
    cy.get('[data-cy="employee-form"]').click();
    cy.get('[data-cy="employee-form"]').then(el =>{
      expect(el).to.not.have.attr('disabled');
      expect(el.text()).to.not.equal('Sending...');
    })

    cy.get('[data-cy="employee-input-name"]').focus().blur()
    cy.get('[data-cy="employee-input-name"]').then(el =>{
expect(el.attr('class')).to.contain('invalid');
    })
cy.get('[data-cy="employee-input-birthdate"]').focus().blur()
cy.get('[data-cy="employee-input-birthdate"]').then(el =>{
  expect(el.attr('class')).to.contain('invalid');
      })
cy.get('[data-cy="employee-input-phone"]').focus().blur()
cy.get('[data-cy="employee-input-phone"]').then(el =>{
  expect(el.attr('class')).to.contain('invalid');
      })
cy.get('[data-cy="employee-input-code"]').focus().blur()
cy.get('[data-cy="employee-input-code"]').then(el =>{
  expect(el.attr('class')).to.contain('invalid');
      })

// cy.get('[data-cy="employee-input-code"]').parent().children()


  })

})
