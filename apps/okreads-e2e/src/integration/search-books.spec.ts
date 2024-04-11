describe('When: Use the search feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should be able to search books by title', () => {
    // Type the search term
    cy.get('input[type="search"]').type('javascript');

    // Submit the form
    cy.get('form').submit();

    // Wait for the search results to appear
    cy.wait(3000);

    // Check if there are more than one book items displayed
    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);

  }); 

  it('Then: I should see search results as I am typing', () => {
    const searchTerm = 'javascript';

    cy.get('input[type="search"]').type(searchTerm);
    cy.get('form').submit();

    // Wait for search results to be fetched and rendered
    cy.wait(3000); // Adjust the wait time as needed

    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 0);
  });

});