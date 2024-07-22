/////////////// Generate Random Number  ///////////////

function generateRandomNumber(length) {
    const characters = '0123456789';
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

const randomNumber = generateRandomNumber(10);
console.log(randomNumber);

/////////////// Log in from UI Command ///////////////

Cypress.Commands.add("Login_UI", () => {

    let username = 'arjel@motomtech.com'
    let password = 'Test123!'
    cy.visit('https://qa.k2businessgroup.com')
    cy.get('input[type="email"]').click({ force: true }).type(username)
        .get('input[type="password"]').click({ force: true }).type(password)
        .get('button').contains('Log In').click({ force: true })

})

/////////////// Log Out from UI Command ///////////////

Cypress.Commands.add("LogOut_UI", () => {

    cy.get('.css-1ytvzrv').should('be.visible').click({ force: true })
    .get('.css-1h2sv0j').last().should('be.visible').click({force:true})

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

/////////////// Get Rei Team Members ///////////////

Cypress.Commands.add('Get_TeamMembers1', () => {

    cy.request({
        method: 'GET',
        url: "https://api-qa.k2businessgroup.com/admin/member?page=1&search=rei",
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
    cy.Get_TeamMembers1().then((response) => {
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
                cy.Delete_TeamMembers1(TeamMemberId)
            })
        }
    })
})

/////////////// Delete Clients By Name ///////////////

Cypress.Commands.add('Get_Clients', () => {

    cy.request({
        method: 'GET',
        url: "https://api-qa.k2businessgroup.com/admin/user?approved=false&search=cypres&page=1&sort=DESC",
        headers: {
            Authorization: 'Bearer ' + Cypress.env('jwt')
        }
    })
})

Cypress.Commands.add('Delete_Clients_By_ID', (ClientId) => {

    cy.request({
        method: 'DELETE',
        url: "https://api-qa.k2businessgroup.com/admin/user/" + ClientId,
        headers: {
            Authorization: 'Bearer ' + Cypress.env('jwt')
        }
    })
})

Cypress.Commands.add('deleteClientsByNameApi', () => {
    cy.Get_Clients().then((response) => {
        if (response.body.data) {
            const items = response.body.data;
            if (Array.isArray(items)) {
                items.forEach((item) => {
                    cy.Delete_Clients_By_ID(item.id)
                })
            }
        }
    })
})

/////////////// Create New Client ///////////////

Cypress.Commands.add('Create_Client', () => {

    cy.request({
        method: 'POST',
        url: "https://api-qa.k2businessgroup.com/admin/user",
        headers: {
            Authorization: 'Bearer ' + Cypress.env('jwt')
        },
        body:
        {
            "email": 'Cypress'+randomNumber+'@gmail.com',
            "name": "Cypress",
            "lastName": "Client"
          }
    })
})

/////////////// Delete Active Client ///////////////

Cypress.Commands.add('Get_Active_Client', () => {

    cy.request({
        method: 'GET',
        url: "https://api-qa.k2businessgroup.com/admin/user?search=cy&page=1&type=&status=&category=",
        headers: {
            Authorization: 'Bearer ' + Cypress.env('jwt')
        },
    })
})

/////////////// Get Approval List Client Email ///////////////

Cypress.Commands.add('Get_Approval_List_Client_Email', () => {

    cy.request({
        method: 'GET',
        url: "https://api-qa.k2businessgroup.com/admin/user?approved=false&search=Cyp&page=1&sort=DESC",
        headers: {
            Authorization: 'Bearer ' + Cypress.env('jwt')
        },
    })
})

/////////////// Create Active Client ///////////////

Cypress.Commands.add('Create_Active_Client', () => {


    cy.request({
        method: 'GET',
        url: "https://api-qa.k2businessgroup.com/admin/user?approved=false&search=Cyp&page=1&sort=DESC",
        headers: {
            Authorization: 'Bearer ' + Cypress.env('jwt')
        },
    }).then((response)=>{
        console.log("RESPONSEEE",response)
        let Approval_List_Client_Email = response.body.data[0].email

    cy.request({
        method: 'POST',
        url: "https://api-qa.k2businessgroup.com/auth/register",
        headers: {
            Authorization: 'Bearer ' + Cypress.env('jwt')
        },
        body:
        {
            "name": "rei",
            "lastName": "user",
            "email": Approval_List_Client_Email,
            "phone": "+14843608052",
            "password": "Cypress1234!!",
            "confirmPassword": "Cypress1234!!",
            "answers": [
              {
                "questionId": "f6a2effb-cf62-40ea-9e81-70bb07475fd9",
                "answer": [
                  "Other"
                ]
              },
              {
                "questionId": "f757702d-d0d0-467b-9ef3-10b44baa3662",
                "answer": "Cypress Business"
              },
              {
                "questionId": "9c2bb7df-d4b7-4dc1-8e0f-e09bc0ebe3a3",
                "answer": 11
              },
              {
                "questionId": "99c77675-6789-4c26-8079-3f5803ddff9d",
                "answer": 11
              },
              {
                "questionId": "d449f8a3-55bb-4878-8072-aa86c6fc3017",
                "answer": true
              },
              {
                "questionId": "2d0a6b60-16ba-44a4-bd81-a0504ce57559",
                "answer": false
              },
              {
                "questionId": "293ae58c-235b-4905-aad0-4a65db4fd1aa",
                "answer": false
              },
              {
                "questionId": "57a65ac7-295b-4bb1-b611-9a25b8e89ef5",
                "answer": false
              },
              {
                "questionId": "481cef0b-8ae3-4728-9fb0-427f3b2d60a2",
                "answer": "ewe"
              },
              {
                "questionId": "082c054b-6af1-4dac-9fc5-cff0203d3864",
                "answer": "s"
              },
              {
                "questionId": "30a86ebb-935a-451e-853a-7dd96e4196e8",
                "answer": "Cypress Busines"
              },
              {
                "questionId": "2c98f1b7-b567-47d0-9675-ceb28e4a05fa",
                "answer": "C Corp"
              },
              {
                "questionId": "30a86ebb-935a-451e-853a-7dd96e4196e8_1",
                "answer": "Cypress Business"
              },
              {
                "questionId": "2c98f1b7-b567-47d0-9675-ceb28e4a05fa_1",
                "answer": "Schedule C"
              },
              {
                "questionId": "30a86ebb-935a-451e-853a-7dd96e4196e8_2",
                "answer": "Cypress Business"
              },
              {
                "questionId": "2c98f1b7-b567-47d0-9675-ceb28e4a05fa_2",
                "answer": "Schedule C"
              }
            ]
          }
    })
})
})


/////////////// Create Personal TAX ///////////////

Cypress.Commands.add('Create_Personal_Tax', () => {
    // Function to convert object to FormData
    function objectToFormData(obj) {
      const formData = new FormData();
  
      // Flatten the object and append to FormData
      function appendFormData(data, parentKey) {
        if (Array.isArray(data)) {
          data.forEach((value, index) => {
            appendFormData(value, `${parentKey}[${index}]`);
          });
        } else if (typeof data === 'object' && data !== null) {
          Object.keys(data).forEach(key => {
            appendFormData(data[key], parentKey ? `${parentKey}.${key}` : key);
          });
        } else {
          formData.append(parentKey, data);
        }
      }
  
      appendFormData(obj);
  
      return formData;
    }
  
    const body = {
      name: 'Cypress',
      category: 'PERSONAL',
      steps: [
        {
          name: 'Cypress 1',
          order: 1,
          tasks: [
            {
              canUploadDocument: false,
              maxFiles: 4,
              name: 'Cypress 2',
              order: 1,
            },
          ],
        },
      ],
    };
  
    const formData = objectToFormData(body);
  
    cy.request({
      method: 'POST',
      url: "https://api-qa.k2businessgroup.com/strategy/template",
      headers: {
        Authorization: 'Bearer ' + Cypress.env('jwt'),
        'Content-Type': 'multipart/form-data'
      },
      body: formData, // Pass FormData object as the body
    }).then((response) => {
      // Handle the response if needed
      expect(response.status).to.eq(200); // Adjust based on expected status code
    });
  });
  

/////////////// Get Personal TAX ///////////////

Cypress.Commands.add('Get_Personal_Tax', () => {

    cy.request({
        method: 'GET',
        url: "https://api-qa.k2businessgroup.com/strategy/template?category=PERSONAL",
        headers: {
            Authorization: 'Bearer ' + Cypress.env('jwt')
        },
    })
})


/////////////// Delete Personal TAX ///////////////

Cypress.Commands.add('Delete_Personal_Tax', (templateId) => {

    cy.request({
        method: 'DELETE',
        url: "https://api-qa.k2businessgroup.com/strategy/template/"+templateId,
        headers: {
            Authorization: 'Bearer ' + Cypress.env('jwt')
        },
    }
    )
})


Cypress.Commands.add('deletePersonalTaxByNameApi', (name) =>{
    cy.Get_Personal_Tax().then((response) =>{
      console.log("get all Taxes",  response)
      const itemsToDelete = [];
      response.body.data.forEach((item) => {
        if (item.category === name) {
          itemsToDelete.push(item);
        }
      });
      cy.wrap(itemsToDelete).each((item) => {
        const itemId = item.id;
        cy.Delete_Personal_Tax(itemId).then((response) =>{
            console.log("delete all taxes",  response)
      })
    })
  })
})

/////////////// Get Business TAX ///////////////

Cypress.Commands.add('Get_Business_Tax', () => {

    cy.request({
        method: 'GET',
        url: "https://api-qa.k2businessgroup.com/strategy/template?category=BUSINESS",
        headers: {
            Authorization: 'Bearer ' + Cypress.env('jwt')
        },
    })
})

/////////////// Delete Business TAX ///////////////

Cypress.Commands.add('Delete_Business_Tax', (templateId) => {

    cy.request({
        method: 'DELETE',
        url: "https://api-qa.k2businessgroup.com/strategy/template/"+templateId,
        headers: {
            Authorization: 'Bearer ' + Cypress.env('jwt')
        },
    }
    )
})


Cypress.Commands.add('deleteBusinessTaxByNameApi', (name) =>{
    cy.Get_Business_Tax().then((response) =>{
      console.log("get all Taxes",  response)
      const itemsToDelete = [];
      response.body.data.forEach((item) => {
        if (item.name === name) {
          itemsToDelete.push(item);
        }
      });
      cy.wrap(itemsToDelete).each((item) => {
        const itemId = item.id;
        cy.Delete_Business_Tax(itemId).then((response) =>{
            console.log("delete all taxes",  response)
      })
    })
  })
})