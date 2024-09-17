describe('Client List', () => {


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

    const date = new Date();           
    const dateFormatted = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(date);

    
    beforeEach(() => {

        cy.Login_UI()
        cy.getTokenByCredentials()
        cy.deleteClientsByNameApi()

    });

    it('Create Client and Verify', () => {

        cy.get('p').contains('Client List').should('be.visible').click({force:true})
        .get('p').contains('Approval list').should('be.visible').click({force:true})
        .get('button').contains('Create').should('be.visible').click({force:true})
        .get('input[placeholder="Enter First Name"]').click({force:true}).type('Cypress')
        .get('input[placeholder="Enter Last Name"]').click({force:true}).type('Client')
        .get('input[placeholder="Add member by email"]').click({force:true}).type('Cypress'+randomNumber+'@gmail.com')
        .get('button').contains('Add new').should('be.visible').click({force:true})
        .get('input[placeholder="Search Contacts"]').click({force:true}).type('Cypress')
        .get('.css-1auh7sb').should('have.length',1).get('.css-m4ejwt').first().contains('Cypress Client')
        .get('.css-1auh7sb').should('have.length',1).get('.css-m4ejwt').eq(1).contains('Cypress'+randomNumber+'@gmail.com')
        .get('.css-1auh7sb').should('have.length',1).get('.css-m4ejwt').eq(2).contains(dateFormatted)
    
    });

    it('Decline Client and Verify', () => {
        
        cy.Create_Client()
        cy.get('p').contains('Client List').should('be.visible').click({force:true})
        .get('p').contains('Approval list').should('be.visible').click({force:true})
        .get('input[placeholder="Search Contacts"]').click({force:true}).type('Cypress')
        .get('.css-1auh7sb').should('have.length',1).get('.css-m4ejwt').first().contains('Cypress Client')
        .get('.css-1auh7sb').should('have.length',1).get('.css-m4ejwt').eq(2).contains(dateFormatted)
        .get('button[type="button"]').eq(4).click({force:true})
        .get('.notistack-Snackbar').should('be.visible').should('contain','Client deleted successfully')
    });

    it('Create Active Client from Verifying on Approval List', () => {
        
        cy.Create_Client()
        cy.Get_Approval_List_Client_Email().then((response)=>{
            console.log("RESPONSEEE",response)
            let Approval_List_Client_Email = response.body.data[0].email
        cy.LogOut_UI()
        cy.visit('https://k2businessgroup.qa.mytaxsaas.com/onboarding/introduction')
        .get('button').contains('Next').click()
        .get('input[placeholder="First name"]').click().type('Cypress')
        .get('input[placeholder="Last name"]').click().type('User')
        .get('input[placeholder="Email"]').click().type(Approval_List_Client_Email)
        .get('input[placeholder="Phone Number"]').click().type('4844608052')
        .get('button').contains('Next').should('be.visible').click({force:true})
        .get('button[type="button"]').eq(3).should('be.visible').click({force:true})
        .get('button').contains('Next').should('be.visible').click({force:true})
        .get('input[placeholder="Type of business"]').should('be.visible').click({force:true}).type('Cypress Business Type 1')
        .get('button').contains('Next').should('be.visible').click({force:true})
        .get('input[placeholder="Business name"]').should('be.visible').click({force:true}).type('Cypress Business 1')
        .get('button[type="button"]').eq(3).should('be.visible').click({force:true})
        .get('button').contains('Next').should('be.visible').click({force:true})
        .get('input[placeholder="Enter number of W-2 employees"]').should('be.visible').click({force:true}).type('22')
        .get('button').contains('Next').should('be.visible').click({force:true})
        .get('input[placeholder="Enter value"]').should('be.visible').click({force:true}).type('22000')
        .get('button').contains('Next').should('be.visible').click({force:true})
        .get('button[type="button"]').eq(1).should('be.visible').click({force:true})
        .get('button').contains('Next').should('be.visible').click({force:true})
        .get('button[type="button"]').eq(1).should('be.visible').click({force:true})
        .get('button').contains('Next').should('be.visible').click({force:true})
        .get('button[type="button"]').eq(1).should('be.visible').click({force:true})
        .get('button').contains('Next').should('be.visible').click({force:true})
        .get('button[type="button"]').eq(1).should('be.visible').click({force:true})
        .get('button').contains('Next').should('be.visible').click({force:true})
        .get('textarea[placeholder="Answer here"]').should('be.visible').click({force:true}).type('Cypress Answer')
        .get('button').contains('Next').should('be.visible').click({force:true})
        .get('textarea[placeholder="Answer here"]').should('be.visible').click({force:true}).type('Cypress Answer')
        .get('button').contains('Next').should('be.visible').click({force:true})
        .get('input[placeholder="Password"]').should('be.visible').click({force:true}).type("Cypress1234!")
        .get('input[placeholder="Confirm password"]').should('be.visible').click({force:true}).type("Cypress1234!")
        .get('button').contains('Continue').should('be.visible').click({force:true})

}       ) 
    });

    it('Edit Active Client', () => {

        cy.Create_Client()
        cy.Create_Active_Client()
    });

    it('Delete Active Client', () => {

        cy.Create_Client()
        cy.Create_Active_Client()
        
    });

    it('Client View', () => {

        cy.Create_Client()
        cy.Create_Active_Client()
    });
});