describe('modal test', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.viewport(1280, 800);
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('ingedients modal open test', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.get('[data-cy=modal]')
      .contains('Краторная булка N-200i')
      .should('exist');
  });
  it('ingredients modal close test', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=modal]').should('not.exist');
  });
});
