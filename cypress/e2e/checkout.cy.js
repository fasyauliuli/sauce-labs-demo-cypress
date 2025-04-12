import { loginValid } from "../support/helper";
import cart from "../support/pageObjects/cart";
import product from "../support/pageObjects/product.js";
import checkout from "../support/pageObjects/checkout.js";

describe("Automation sauce labs e-commerce", () => {
    it("View checkout form page", () => {
        loginValid('standard_user', 'secret_sauce');

        cy.get(`#${product.btn_add_to_cart_backpack}`).click();
        cy.get(`#${product.btn_cart}`).click(); // Click the cart button
        cy.get(`#${cart.btn_checkout}`).click(); // Click the checkout button
        cy.url().should("include", "/checkout-step-one.html"); // Verify URL after clicking checkout button
        cy.xpath(checkout.title_checkout).should("have.text", "Checkout: Your Information"); // Verify the presence of the checkout title
        cy.get(`#${checkout.first_name}`).should("be.visible"); // Verify the presence of the first name field
        cy.get(`#${checkout.last_name}`).should("be.visible"); // Verify the presence of the last name field
        cy.get(`#${checkout.postal_code}`).should("be.visible"); // Verify the presence of the postal code field
        cy.get(`#${checkout.btn_continue}`).should("have.value", "Continue");
        cy.get(`#${checkout.btn_cancel}`).should("have.text", "Cancel");
    });

    it("Checkout without first name", () => {
        cy.get(`#${checkout.last_name}`).type("Doe"); // Fill in the last name field
        cy.get(`#${checkout.postal_code}`).type("12345"); // Fill in the postal code field
        cy.get(`#${checkout.btn_continue}`).click(); // Click the continue button
        cy.xpath(checkout.empty_first_name).should("be.visible"); // Verify error message for empty first name
    });

    it("Checkout without last name", () => {
        cy.get(`#${checkout.last_name}`).clear(); // Clear the last name field
        cy.get(`#${checkout.first_name}`).type("John"); // Fill in the first name field
        cy.get(`#${checkout.postal_code}`).type("12345"); // Fill in the postal code field
        cy.get(`#${checkout.btn_continue}`).click(); // Click the continue button
        cy.xpath(checkout.empty_last_name).should("be.visible"); // Verify error message for empty last name
    });

    it("Checkout without postal code", () => {
        cy.get(`#${checkout.first_name}`).type("John"); // Fill in the first name field
        cy.get(`#${checkout.last_name}`).type("Doe"); // Fill in the last name field
        cy.get(`#${checkout.postal_code}`).clear(); // Clear the postal code field
        cy.get(`#${checkout.btn_continue}`).click(); // Click the continue button
        cy.xpath(checkout.empty_postal_code).should("be.visible"); // Verify error message for empty postal code
    });

    it("Checkout with valid information", () => {
        cy.get(`#${checkout.first_name}`).type("John"); // Fill in the first name field
        cy.get(`#${checkout.last_name}`).type("Doe"); // Fill in the last name field
        cy.get(`#${checkout.postal_code}`).type("12345"); // Fill in the postal code field
        cy.get(`#${checkout.btn_continue}`).click(); // Click the continue button
        cy.url().should("include", "/checkout-step-two.html"); // Verify URL after clicking continue button
        cy.xpath(checkout.title_overview).should("have.text", "Checkout: Overview"); // Verify the presence of the overview title
        cy.get(`.${cart.qty}`).should("have.text", "QTY");
        cy.get(`.${cart.description}`).should("have.text", "Description");
        cy.contains("Sauce Labs Backpack").should("be.visible"); // Verify the presence of the backpack in the cart
        cy.xpath(checkout.field_payment).should("be.visible"); // Verify the presence of the payment information field
        cy.xpath(checkout.field_shipping).should("be.visible"); // Verify the presence of the shipping information field
        cy.xpath(checkout.field_item_total).should("be.visible"); // Verify the presence of the item total field
        cy.xpath(checkout.field_price_total).should("be.visible"); // Verify the presence of the price total field
        cy.xpath(checkout.field_tax).should("be.visible"); // Verify the presence of the tax field
        cy.xpath(checkout.field_total).should("be.visible"); // Verify the presence of the total field
    });

    it("Checkout with cancel button", () => {
        cy.get(`#${checkout.btn_cancel_overview}`).click(); // Click the cancel button
        cy.url().should("include", "/inventory.html"); // Verify URL after clicking cancel button
        cy.xpath(product.title_product).should("be.visible"); // Verify the presence of the product title
    });

    it("Checkout with finish button", () => {
        cy.get(`#${product.btn_cart}`).click(); // Click the cart button
        cy.get(`#${cart.btn_checkout}`).click(); // Click the checkout button
        cy.get(`#${checkout.first_name}`).type("John"); // Fill in the first name field
        cy.get(`#${checkout.last_name}`).type("Doe"); // Fill in the last name field
        cy.get(`#${checkout.postal_code}`).type("12345"); // Fill in the postal code field
        cy.get(`#${checkout.btn_continue}`).click(); // Click the continue button
        cy.get(`#${checkout.btn_finish}`).click(); // Click the finish button
        cy.url().should("include", "/checkout-complete.html"); // Verify URL after clicking finish button
        cy.xpath(checkout.title_complete).should("have.text", "Checkout: Complete!"); // Verify the presence of the complete title
        cy.xpath(checkout.field_complete_img).should("be.visible"); // Verify the presence of the complete image
        cy.xpath(checkout.field_complete).should("have.text", "Thank you for your order!"); // Verify the presence of the complete message
        cy.xpath(checkout.field_complete_text).should("be.visible"); // Verify the presence of the complete text field
        cy.get(`#${checkout.btn_back_home}`).should("have.text", "Back Home");
        cy.get(`.${product.badge_cart}`).should("not.exist"); // Verify that the cart badge does not exist
    });

    it("Back to product page", () => {
        cy.get(`#${checkout.btn_back_home}`).click(); // Click the back home button
        cy.url().should("include", "/inventory.html"); // Verify URL after clicking back home button
        cy.xpath(product.title_product).should("be.visible"); // Verify the presence of the product title
    });
});