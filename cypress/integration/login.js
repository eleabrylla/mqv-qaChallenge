const { it } = require("mocha");

describe("Login", ()=>{ 
    beforeEach(function(){
        cy.visit('/');
    });

    //Login with a valid user
    it('Login with a valid user', ()=>{
        cy.login("standard_user","secret_sauce");
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
    })

    //Logout from the home page
    it('Logout from the home page', ()=>{
        cy.login("standard_user","secret_sauce");
        cy.logout();
        cy.url().should('eq', 'https://www.saucedemo.com/')
    })

    //Login with an invalid user
    it('Login with an invalid user', ()=>{
        cy.login("nonstandard_user","secret_sauce");
        cy.fixture('login').then((login)=>{
            cy.get(login.invalidUsrMsg).should('exist');
            cy.get(login.invalidUsrMsg).contains("Epic sadface: Username and password do not match any user in this service");
        })    
    })
    
})