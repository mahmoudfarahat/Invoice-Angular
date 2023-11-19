/// <reference types="Cypress" />

before(()=>{
  //  Runs only once, before all tests
});
beforeEach(()=>{
  // Runs before every test (i.e., it's repeated)
});

afterEach(()=>{
  // run after every test
})
after(()=>{
  // Runs after all tests
})
describe('Employee', {},()=>{
  beforeEach(()=>{});
  it('Chechk Validation',{defaultCommandTimeout:10000},()=>{
    cy.task('seedDatabase','filename.csv').then( returnValue =>{

    });
    cy.visit('/employee/create');
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
cy.get('[data-cy="employee-input-birthdate"]').should('have.attr','class').and('match',/invalid/)

cy.get('[data-cy="employee-input-phone"]').focus().blur()
cy.get('[data-cy="employee-input-phone"]').should(el =>{
  expect(el.attr('class')).to.contain('invalid');
      })
cy.get('[data-cy="employee-input-code"]').focus().blur()
cy.get('[data-cy="employee-input-code"]').then(el =>{
  expect(el.attr('class')).to.contain('invalid');

      })

      cy.screenshot();
// cy.get('[data-cy="employee-input-code"]').parent().children()


  })



  describe('share location', ()=>{
    it('should fetch the user location',() =>{
      cy.visit('/').then((win)=>{
        cy.stub(win.navigator.geolocation,'getCurrentPosition').as('getUserPosition')
      })
      // cy.get('[data-cy="get-loc-btn"]').click();
      cy.get('button').contains('Create').click();
      cy.get('@getUserPosition').should('have.been.called');
    })
  })

})
