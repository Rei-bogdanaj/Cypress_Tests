describe('Strategies in use', () => {
    
    beforeEach(() => {

        cy.Login_UI()
        cy.getTokenByCredentials()

    });
    it('Add new Strategy and Task for personal TAX then Verify', () => {

        cy.get('p').contains('Strategies in use').should('be.visible').click({force:true})
        .get('button').contains(' Add a strategy').should('be.visible').click({force:true})
        .get('input[placeholder="Enter Strategy Name..."]').should('be.visible').click({force:true}).type('Cypress Strategy')
        .get('input[placeholder="Enter Step Name..."]').should('be.visible').click({force:true}).type('Cypress Step 1')
        .get('button[type="button"]').eq(3).click()
        .get('input[placeholder="Enter Task name..."]').should('be.visible').click({force:true}).type('Cypress Task 1')
        .get('button').contains('Save').should('be.visible').click({force:true})
        .get('p').contains('Cypress')

    });

    it.only('Modify Strategy and Verify', () => {
        
        cy.Create_Personal_Tax()
    });
});