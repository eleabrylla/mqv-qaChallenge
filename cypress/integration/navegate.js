const { it } = require("mocha");

describe("Navegate", ()=>{ 
    beforeEach(function(){
        cy.visit('/');
    });

    //Sort products by Price (low to high)
    it('Sort products by Price (low to high)', ()=>{
        cy.login("standard_user","secret_sauce");
        cy.fixture('inventory').then((inventory)=>{
            cy.get(inventory.sortContainer).select('Price (low to high)');
            cy.get(inventory.firstItemName).contains('Sauce Labs Onesie');
            cy.get(inventory.secondItemName).contains('Sauce Labs Bike Light');
            cy.get(inventory.thirdItemName).contains('Sauce Labs Bolt T-Shirt');
            cy.get(inventory.fourthItemName).contains('Test.allTheThings() T-Shirt (Red)');
            cy.get(inventory.fifthItemName).contains('Sauce Labs Backpack');
            cy.get(inventory.sixthItemName).contains('Sauce Labs Fleece Jacket');
        })   
    })
    
    //Add multiple items to the shopping cart
    it('Add multiple items to the shopping cart', ()=>{
        cy.login("standard_user","secret_sauce");
        cy.fixture('inventory').then((inventory)=>{
            cy.get(inventory.onesieAdd).click();
            cy.get(inventory.lightAdd).click();
            cy.get(inventory.shirtAdd).click();
            cy.get(inventory.redShirtAdd).click();
            cy.get(inventory.backpackAdd).click();
            cy.get(inventory.jacketAdd).click();
            cy.get(inventory.cartBtn).click();
        })   
        cy.fixture('shopingCart').then((shopingCart)=>{
            cy.get(shopingCart.shopingCart).contains("Sauce Labs Onesie");
            cy.get(shopingCart.shopingCart).contains("Sauce Labs Bike Light");
            cy.get(shopingCart.shopingCart).contains("Sauce Labs Bolt T-Shirt");
            cy.get(shopingCart.shopingCart).contains("Test.allTheThings() T-Shirt (Red)");
            cy.get(shopingCart.shopingCart).contains("Sauce Labs Backpack");
            cy.get(shopingCart.shopingCart).contains("Sauce Labs Fleece Jacket");
        }) 
    })   
    
    //Add the specific product ‘Sauce Labs Onesie’ to the shopping cart
    it('Add the specific product ‘Sauce Labs Onesie’ to the shopping cart', ()=>{
        cy.login("standard_user","secret_sauce");
        cy.fixture('inventory').then((inventory)=>{
            cy.get(inventory.onesieAdd).click();
            cy.get(inventory.cartBtn).click();
        })   
        cy.fixture('shopingCart').then((shopingCart)=>{
            cy.get(shopingCart.shopingCart).contains("Sauce Labs Onesie");
        }) 
    }) 

    //Complete a purchase
    it('Add the specific product ‘Sauce Labs Onesie’ to the shopping cart', ()=>{
        cy.login("standard_user","secret_sauce");
        cy.fixture('inventory').then((inventory)=>{
            cy.get(inventory.shirtAdd).click();
            cy.get(inventory.cartBtn).click();
        })   
        cy.fixture('shopingCart').then((shopingCart)=>{
            cy.get(shopingCart.shopingCart).contains("Sauce Labs Bolt T-Shirt");
            cy.get(shopingCart.checkoutBtn).click();
            cy.get(shopingCart.nameTxtField).type("Maria");
            cy.get(shopingCart.lastNameTxtField).type("Lopez");
            cy.get(shopingCart.zipTxtField).type("20226");
            cy.get(shopingCart.continueBtn).click();
            cy.get(shopingCart.checkoutSummary).contains("Sauce Labs Bolt T-Shirt");
            cy.get(shopingCart.finishBtn).click();
        })
        cy.url().should('eq', 'https://www.saucedemo.com/checkout-complete.html');
    }) 


})
