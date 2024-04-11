describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('Then: Remove the reading list and check finished label reverted', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('[data-testing="remove-from-readingList"]').click();
    cy.startAt('/');
    cy.get('input[type="search"]').type('javascript');
    cy.get('form').submit();
  });

  it('Should set book as finished when user click on finish', () => {
    cy.get('input[type="search"]').type('okreads');
    cy.get('form').submit();
    cy.get('button[aria-label^="Want to Read"]').eq(0).click();
    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('.reading-list-content').should('exist');
    cy.get('.reading-list-content')
      .find('.reading-list-item')
      .then(($elements) => {
        cy.wrap($elements[$elements.length - 1])
          .find("[aria-label^='Finish']")
          .click();
      });
    cy.get('.reading-list-content')
      .find('.reading-list-item')
      .then(($elements) => {
        cy.wrap($elements[$elements.length - 1]).should('contain', 'Finished');
      });
    cy.get('.reading-list-content')
      .find('.reading-list-item')
      .then(($elements) => {
        cy.wrap($elements[$elements.length - 1]).should(
          'contain',
          'Finished Date'
        );
      });
      cy.get('.reading-list-content').find('.reading-list-item').then($elements => {
        cy.wrap($elements[$elements.length-1]).find("[aria-label^='Remove']")
        .click()
      })
  });
  
});
