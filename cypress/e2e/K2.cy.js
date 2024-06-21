describe('Our Team', () => {

    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTWYZabcdefghijklmnopqrstwyz';
        const charactersLength = characters.length;
        const randomValues = new Uint32Array(length);
      
        window.crypto.getRandomValues(randomValues);
      
        let result = '';
        for (let i = 0; i < length; i++) {
          const randomIndex = randomValues[i] % charactersLength;
          result += characters.charAt(randomIndex);
        }
        return result;
      }
      
      const randomString = generateRandomString(20);
      console.log(randomString);

    beforeEach(() => {

        cy.Login_UI()
        cy.getTokenByCredentials()
        cy.deleteTeamMembersByNameApi1()


    });
    it('Create Team Members and Verify', () => {

        cy.get('p').contains('Our Team').should('be.visible').click({force:true})
        .get('button').contains('Create').should('be.visible').click({force:true})
        .get('.MuiTypography-h6').contains('Add a new Member')
        .get('input[placeholder="Add member by email"]').should('be.visible').click({force:true}).type('Cypress'+generateRandomString(4)+'@gmail.com')
        .get('button').contains('Done').should('be.visible').click({force:true})
        .get('.css-aov8do').get('.css-1auh7sb').first().find('.MuiBox-root').first().contains('-')
        .get('.css-aov8do').get('.css-1auh7sb').first().find('.MuiBox-root').eq(2).contains('-')
        .get('.css-aov8do').get('.css-1auh7sb').first().find('.MuiBox-root').eq(5).contains('Cypress')
        .get('.css-aov8do').get('.css-1auh7sb').first().find('.MuiBox-root').eq(6).contains('Team Member')

    });

    it('Delete Team Member from UI and Verify', () => {
        
      cy.Create_TeamMembers()
      .get('p').contains('Our Team').should('be.visible').click({force:true}).wait(1000)
      .get('button[type="button"]').eq(2).click({force:true})
      .get('button').contains('Done').should('be.visible').click({force:true})
      .get('input[placeholder="Search members"]').should('be.visible').click({force:true}).type('Cypress{enter}')
      .get('.MuiBox-root').should('not.contain','Cypress  ')
    });
});