describe('Strategies in use', () => {
    
    beforeEach(() => {

        cy.Login_UI()
        cy.getTokenByCredentials()

    });
    it('Add new Strategy for personal TAX', () => {

        cy.get('p').contains('Strategies in use').should('be.visible').click({force:true})
        .get('button').contains(' Add a strategy').should('be.visible').click({force:true})
        .get('input[placeholder="Enter Strategy Name..."]').should('be.visible').click({force:true}).type('Cypress Strategy')
    });
});