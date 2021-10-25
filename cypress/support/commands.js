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

//Login
Cypress.Commands.add('login',(user,psw)=>{
    cy.fixture('login').then((login)=>{
        cy.get(login.usernameBox).type(user);
        cy.get(login.pswBox).type(psw);
        cy.get(login.loginButton).click();
    })
})

//Logout
Cypress.Commands.add('logout',()=>{
    cy.fixture('contentMenu').then((contentMenu)=>{
        cy.get(contentMenu.burgerMenu).click();
        cy.get(contentMenu.logoutBtn).click();
    })
})