describe('Strategies in use', () => {

    beforeEach(() => {

        cy.Login_UI()
        cy.getTokenByCredentials()
        cy.deletePersonalTaxByNameApi("Cypress ")
        cy.deletePersonalTaxByNameApi("Cypress Strategy")
        cy.deletePersonalTaxByNameApi("PERSONAL")
        cy.deletePersonalTaxByNameApi("Cypress Strategy ")
        cy.deleteBusinessTaxByNameApi("Cypress")
        cy.deleteBusinessTaxByNameApi("Cypress Strategy")



    });
    it('Add new Strategy and Tax for personal TAX then Verify', () => {

        cy.get('p').contains('Strategies in use').should('be.visible').click({ force: true })
            .get('button').contains(' Add a strategy').should('be.visible').click({ force: true })
            .get('input[placeholder="Enter Strategy Name..."]').should('be.visible').click({ force: true }).type('Cypress Strategy')
            .get('input[placeholder="Enter Step Name..."]').should('be.visible').click({ force: true }).clear().type('Cypress Step 1')
            .get('button[type="button"]').eq(3).click()
            .get('input[placeholder="Enter Task name..."]').should('be.visible').click({ force: true }).type('Cypress Task 1')
            .get('button').contains('Save').should('be.visible').click({ force: true })
            .get('p').contains('Cypress')

    });

    it('Modify Strategy and Verify', () => {

        cy.get('p').contains('Strategies in use').should('be.visible').click({ force: true })
            .get('button').contains(' Add a strategy').should('be.visible').click({ force: true })
            .get('input[placeholder="Enter Strategy Name..."]').should('be.visible').click({ force: true }).type('Cypress Strategy')
            .get('input[placeholder="Enter Step Name..."]').should('be.visible').click({ force: true }).type('Cypress Step 1')
            .get('button[type="button"]').eq(3).click()
            .get('input[placeholder="Enter Task name..."]').should('be.visible').click({ force: true }).type('Cypress Task 1')
            .get('button').contains('Save').should('be.visible').click({ force: true })
            .get('p').contains('Cypress')
            .get('.MuiBox-root').contains('Cypress')
            .get('.css-huskxe').eq(1).should('be.visible').contains('0 users')
            .get('button[type="button"]').eq(5).should('be.visible').click({ force: true }).wait(2000)
            .get('.MuiIconButton-sizeMedium').eq(1).click()
            .get('.css-cy4syh > .MuiBox-root > .MuiButtonBase-root > svg').click({force:true})
            .get('input[type="text"]').last().click({force:true}).type('Cypress Task Name 2')
            .get('button').contains('Save').should('be.visible').click({force:true})
    });

    it('Delete Strategy and Verify', () => {

        cy.get('p').contains('Strategies in use').should('be.visible').click({ force: true })
            .get('button').contains(' Add a strategy').should('be.visible').click({ force: true })
            .get('input[placeholder="Enter Strategy Name..."]').should('be.visible').click({ force: true }).type('Cypress Strategy')
            .get('input[placeholder="Enter Step Name..."]').should('be.visible').click({ force: true }).type('Cypress Step 1')
            .get('button[type="button"]').eq(3).click()
            .get('input[placeholder="Enter Task name..."]').should('be.visible').click({ force: true }).type('Cypress Task 1')
            .get('button').contains('Save').should('be.visible').click({ force: true })
            .get('p').contains('Cypress')
            .get('.MuiIconButton-sizeMedium').eq(3).should('be.visible').click({ force: true })
            .get(':nth-child(2) > .notistack-CollapseWrapper > .notistack-Snackbar > .go1888806478 > #notistack-snackbar').should('be.visible').contains('Strategy has been removed.')
    });

    it('Add new Strategy and Tax for Business TAX then Verify', () => {

        cy.get('p').contains('Strategies in use').should('be.visible').click({ force: true })
            .get('.MuiTypography-root').contains('Business Tax').should('be.visible').click({force:true})
            .get('button').contains(' Add a strategy').should('be.visible').click({ force: true })
            .get('input[placeholder="Enter Strategy Name..."]').should('be.visible').click({ force: true }).type('Cypress Strategy')
            .get('input[placeholder="Enter Step Name..."]').should('be.visible').click({ force: true }).type('Cypress Step 1')
            .get('button[type="button"]').eq(3).click()
            .get('input[placeholder="Enter Task name..."]').should('be.visible').click({ force: true }).type('Cypress Task 1')
            .get('button').contains('Save').should('be.visible').click({ force: true })
            .get('.notistack-CollapseWrapper').contains('Strategy has been created!')
            .get('p').contains('Cypress')

    });

    it('Modify Business Tax and Verify', () => {

        cy.get('p').contains('Strategies in use').should('be.visible').click({ force: true })
        .get('.MuiTypography-root').contains('Business Tax').should('be.visible').click({force:true})
            .get('button').contains(' Add a strategy').should('be.visible').click({ force: true })
            .get('input[placeholder="Enter Strategy Name..."]').should('be.visible').click({ force: true }).type('Cypress Strategy')
            .get('input[placeholder="Enter Step Name..."]').should('be.visible').click({ force: true }).type('Cypress Step 1')
            .get('button[type="button"]').eq(3).click()
            .get('input[placeholder="Enter Task name..."]').should('be.visible').click({ force: true }).type('Cypress Task 1')
            .get('button').contains('Save').should('be.visible').click({ force: true })
            .get('p').contains('Cypress')
            .get('.MuiIconButton-sizeMedium').eq(1).click()
            .get('input[placeholder="Enter Task name..."]').last().should('be.visible').click({ force: true }).clear().type('Cypress Task Name 2')
            .get('button').contains('Save').should('be.visible').click({ force: true })
            .get('p').contains('Cypress')
    });

    it('Delete Business Tax and Verify', () => {

        cy.get('p').contains('Strategies in use').should('be.visible').click({ force: true })
        .get('.MuiTypography-root').contains('Business Tax').should('be.visible').click({force:true})
            .get('button').contains(' Add a strategy').should('be.visible').click({ force: true })
            .get('input[placeholder="Enter Strategy Name..."]').should('be.visible').click({ force: true }).type('Cypress Strategy')
            .get('input[placeholder="Enter Step Name..."]').should('be.visible').click({ force: true }).type('Cypress Step 1')
            .get('button[type="button"]').eq(3).click()
            .get('input[placeholder="Enter Task name..."]').should('be.visible').click({ force: true }).type('Cypress Task 1')
            .get('button').contains('Save').should('be.visible').click({ force: true })
            .get('p').contains('Cypress')
            .get('.MuiIconButton-sizeMedium').last().should('be.visible').click({ force: true })
            .get(':nth-child(2) > .notistack-CollapseWrapper > .notistack-Snackbar > .go1888806478 > #notistack-snackbar').should('be.visible').contains('Strategy has been removed.')
    });

});