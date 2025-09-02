describe('create order test', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' });

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('refreshTokenTest')
    );

    cy.setCookie('accessToken', 'accessTokenTest');

    cy.viewport(1280, 800);
    cy.visit('/');
  });
  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('create order', () => {
    cy.contains('Краторная булка N-200i')
      .parent()
      .within(() => {
        cy.get('button').click();
      });
    cy.contains('Биокотлета из марсианской Магнолии')
      .parent()
      .within(() => {
        cy.get('button').click();
      });

    cy.get('[data-cy=constructor-order-button]')
      .contains('Оформить заказ')
      .should('exist')
      .click();
    cy.get('[data-cy=order-number]').contains('98763').should('exist');

    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=modal]').should('not.exist');

    cy.get('[data-cy=constructor-bun-1]')
      .contains('Краторная булка N-200i')
      .should('not.exist');
    cy.get('[data-cy=constructor-ingedient')
      .contains('Биокотлета из марсианской Магнолии')
      .should('not.exist');
    cy.get('[data-cy=constructor-bun-2]')
      .contains('Краторная булка N-200i')
      .should('not.exist');
  });
});
