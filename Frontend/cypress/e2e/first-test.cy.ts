describe('template spec', () => {
  it('main Page', () => {
    cy.visit('http://localhost:4200/');
    cy.get('datatable-row-wrapper').should('have.length',10);
  })
})
