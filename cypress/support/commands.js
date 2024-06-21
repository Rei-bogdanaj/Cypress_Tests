/////////////// Log in from UI Command ///////////////

Cypress.Commands.add("Login_UI", () => {

    let username = 'arjel@motomtech.com'
    let password = 'Test123!'
    cy.visit('https://qa.k2businessgroup.com')
    cy.get('input[type="email"]').click({ force: true }).type(username)
        .get('input[type="password"]').click({ force: true }).type(password)
        .get('button').contains('Log In').click({ force: true })

})

/////////////// Get AccessToken ///////////////

Cypress.Commands.add('getTokenByCredentials', () => {
    let email = "arjel@motomtech.com"
    let password = "Test123!"
    cy.request({
        method: 'POST',
        url: 'https://api-qa.k2businessgroup.com/auth/login',
        body:
        {
            "email": email,
            "password": password
        }
    }).then((response) => {
        window.localStorage.setItem('jwt', response.body.data.accessToken)
        Cypress.env('jwt', response.body.data.accessToken);
    })
})

/////////////// Create Team Members ///////////////

Cypress.Commands.add('Create_TeamMembers', () => {

    cy.request({
        method: 'POST',
        url: "https://api-qa.k2businessgroup.com/admin/member",
        headers: {
            Authorization: 'Bearer ' + Cypress.env('jwt')
        },
        body : {
            "email": "Cypress@gmail.com"
          }
    })
})
/////////////// Get all Team Members ///////////////

Cypress.Commands.add('Get_TeamMembers', () => {

    cy.request({
        method: 'GET',
        url: "https://api-qa.k2businessgroup.com/admin/member?page=1&search=Cypress",
        headers: {
            Authorization: 'Bearer ' + Cypress.env('jwt')
        }
    })
})

/////////////// Delete Team Members ///////////////

Cypress.Commands.add('Delete_TeamMembers', (memberId) => {

    cy.request({
        method: 'DELETE',
        url: "https://api-qa.k2businessgroup.com/admin/member/" + memberId,
        headers: {
            Authorization: 'Bearer ' + Cypress.env('jwt')
        }
    })
})

Cypress.Commands.add('deleteTeamMembersByNameApi', () => {
    cy.Get_TeamMembers().then((response) => {
        if (response.body.data) {
            const items = response.body.data;
            if (Array.isArray(items)) {
                items.forEach((item) => {
                    cy.Delete_TeamMembers(item.id)
                })
            }
        }
    })
})


Cypress.Commands.add('deleteTeamMembersByNameApi1', () => {

    cy.Get_TeamMembers().then((response) => {
        const TeamMembers = response.body.data
        console.log('Team Members List', TeamMembers)
        if (Array.isArray(TeamMembers)) {
            TeamMembers.forEach((TeamMember) => {
                console.log('Team Memebr ID ', TeamMember.id)
                let TeamMemberId = TeamMember.id
                cy.Delete_TeamMembers(TeamMemberId)
            })
        }
    })
})