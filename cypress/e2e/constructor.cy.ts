describe('construtor e2e test', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.viewport(1280, 800);
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('add bun test', () => {
    cy.contains('Краторная булка N-200i')
      .parent()
      .within(() => {
        cy.get('button').click();
      });
    cy.get('[data-cy=constructor-bun-1]')
      .contains('Краторная булка N-200i')
      .should('exist');
    cy.get('[data-cy=constructor-bun-2]')
      .contains('Краторная булка N-200i')
      .should('exist');
  });
  it('add ingredient test', () => {
    cy.contains('Биокотлета из марсианской Магнолии')
      .parent()
      .within(() => {
        cy.get('button').click();
      });
    cy.get('[data-cy=constructor-ingedient')
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');
  });
});
