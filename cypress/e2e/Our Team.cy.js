 import { MailSlurp } from 'mailslurp-client';
 import { parse } from 'node-html-parser';


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
        cy.deleteTeamMembersByNameApi()
        cy.deleteTeamMembersByNameApi1()


    });
    

    it('Create Team Member and Verify', () => {

        cy.get('p').contains('Our Team').should('be.visible').click({force:true})
        .get('button').contains('Create').should('be.visible').click({force:true})
        .get('.MuiTypography-h6').contains('Add a new Member')
        .get('input[placeholder="Add member by email"]').should('be.visible').click({force:true}).type('rei.bogdanaj@motomtech.com')
        .get('button').contains('Done').should('be.visible').click({force:true})
        .get('.css-aov8do').get('.css-1auh7sb').first().find('.MuiBox-root').first().contains('-')
        .get('.css-aov8do').get('.css-1auh7sb').first().find('.MuiBox-root').eq(2).contains('-')
        .get('.css-aov8do').get('.css-1auh7sb').first().find('.MuiBox-root').eq(5).contains('rei')
        .get('.css-aov8do').get('.css-1auh7sb').first().find('.MuiBox-root').eq(7).contains('Team Member')

    });

    it('Delete Team Member from UI and Verify', () => {
        
      cy.Create_TeamMembers()
      .get('p').contains('Our Team').should('be.visible').click({force:true}).wait(1000)
      .get('button[type="button"]').eq(2).click({force:true})
      .get('button').contains('Done').should('be.visible').click({force:true})
      .get('input[placeholder="Search members"]').should('be.visible').click({force:true}).type('Cypress{enter}')
      .get('.MuiBox-root').should('not.contain','Cypress  ')
    });

    it('Verify User from Email Recieved', () => {
      

      cy.get('p').contains('Our Team').should('be.visible').click({force:true})
      .get('button').contains('Create').should('be.visible').click({force:true})
      .get('.MuiTypography-h6').contains('Add a new Member')
      .get('input[placeholder="Add member by email"]').should('be.visible').click({force:true}).type('rei@mailslurp.net')
      .get('button').contains('Done').should('be.visible').click({force:true}).wait(2000)
      cy.get('.css-1ytvzrv').should('be.visible').click({ force: true })
      .get('.css-1h2sv0j').last().should('be.visible').click({force:true})

      const { MailSlurp } = require('mailslurp-client');
      const apiKey = '3a979377b9b772c1e914dff0caff90e262ccbef5d02e3dfdab77e156b2a608e3'
      const mailslurp = new MailSlurp({ apiKey });
      const inboxId = '5213605e-d89f-4d44-991f-bc82c523021b'
 
      Cypress.Commands.add("createInbox", () => {
        return mailslurp.createInbox();
      });
      
      Cypress.Commands.add("waitForLatestEmail",  (inboxId) => {
        const timeoutMillis = 30_0000;
        return mailslurp.waitForLatestEmail(inboxId, timeoutMillis)
      });
      cy.visit('https://qa.k2businessgroup.com/register/member?email=rei@mailslurp.net')
      .get('input[placeholder="First name"]').click({force:true}).type('Cypress')
      .get('input[placeholder="Last name"]').click({force:true}).type('User')
      .get('input[type="password"]').first().click({force:true}).type('Cypress1234!')
      .get('input[type="password"]').last().click({force:true}).type('Cypress1234!')
      .get('button').contains('Register').should('be.visible').click({force:true})
      cy.LogOut_UI()
      cy.Login_UI()
      cy.get('p').contains('Our Team').should('be.visible').click({force:true})
      .get('input[placeholder="Search members"]').should('be.visible').click({force:true}).type('Cypress{enter}')
      .get('.css-1auh7sb').should('have.length',1)
      .get('.css-aov8do').get('.css-1auh7sb').first().find('.MuiBox-root').first().contains('Cypress')
      .get('.css-aov8do').get('.css-1auh7sb').first().find('.MuiBox-root').eq(3).contains('User')
      .get('.css-aov8do').get('.css-1auh7sb').first().find('.MuiBox-root').eq(5).contains('rei@mailslurp.net')
      .get('.css-aov8do').get('.css-1auh7sb').first().find('.MuiBox-root').eq(7).contains('Team Member')
    })
    
});