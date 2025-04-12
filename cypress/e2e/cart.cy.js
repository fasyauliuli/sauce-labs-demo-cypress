import { loginValid } from "../support/helper";
import cart from "../support/pageObjects/cart";
import product from "../support/pageObjects/product.js";

describe("Automation sauce labs e-commerce", () => {
    it("View cart page", () => {
        loginValid('standard_user', 'secret_sauce');

        cy.get(`#${product.btn_add_to_cart_backpack}`).click();
        cy.get(`#${product.btn_add_to_cart_bike_light}`).click();
        cy.get(`#${product.btn_cart}`).click(); // Click the cart button
        cy.url().should("include", "/cart.html"); // Verify URL after clicking cart button
        cy.xpath(cart.title_cart).should("be.visible"); // Verify the presence of the cart title
        cy.get(`.${cart.qty}`).should("have.text", "QTY");
        cy.get(`.${cart.description}`).should("have.text", "Description");
        cy.contains("Sauce Labs Backpack").should("be.visible"); // Verify the presence of the backpack in the cart
        cy.get(`#${product.btn_remove_backpack}`).should("have.text", "Remove"); // Verify the remove button for the backpack
        cy.get(`#${cart.btn_continue_shopping}`).should("have.text", "Continue Shopping");
        cy.get(`#${cart.btn_checkout}`).should("have.text", "Checkout");
    });

    it("Redirect to detail product page", () => {
        cy.xpath(product.title_backpack).click(); // Click the add to cart button for the backpack
        cy.url().should("include", "/inventory-item.html"); // Verify URL after clicking description link
        cy.xpath(product.title_backpack).should("have.text", "Sauce Labs Backpack"); // Verify the presence of the backpack title
    });

    it("Remove item from cart", () => {
        cy.get(`#${product.btn_cart}`).click(); // Click the cart button
        cy.get(`#${product.btn_remove_backpack}`).click(); // Remove the backpack from the cart
        cy.get(`#${product.btn_remove_bike_light}`).should("have.text", "Remove"); // Verify the remove button for the bike light
        cy.get(`.${product.badge_cart}`).should("have.text", 1); // Verify that only one item remains in the cart
    });

    it("View product page after click continue shopping", () => {
        cy.get(`#${cart.btn_continue_shopping}`).click(); // Click the continue shopping button
        cy.url().should("include", "/inventory.html"); // Verify URL after clicking continue shopping
        cy.xpath(product.title_product).should("be.visible"); // Verify the presence of the product title
    });
});