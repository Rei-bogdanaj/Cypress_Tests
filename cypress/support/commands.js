// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("Login_UI",()=>{

    let username = 'arjel@motomtech.com'
    let password = 'Test123!'
    cy.visit('https://qa.k2businessgroup.com')
    cy.get('input[type="email"]').click({force:true}).type(username)
    .get('input[type="password"]').click({force:true}).type(password)
    .get('button').contains('Log In').click({force:true})
    
})