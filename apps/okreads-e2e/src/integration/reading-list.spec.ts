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

  it('When: we have one element in reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('[data-testing="remove-reading-list-button"]').click();
    cy.get('.mat-button-base').contains('Undo').click();
  });
  
});
