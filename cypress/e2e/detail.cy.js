import { loginValid } from "../support/helper";
import cart from "../support/pageObjects/cart";
import product from "../support/pageObjects/product.js";
import detail from "../support/pageObjects/detail";

describe("Automation sauce labs e-commerce", () => {
    it("View detail product page", () => {
        loginValid('standard_user', 'secret_sauce');

        cy.xpath(product.title_backpack).click();
        cy.url().should("include", "/inventory-item.html"); // Verify URL after clicking backpack
        cy.get(`#${detail.btn_back_to_product}`).should("be.visible"); // Verify the text of the back button
        cy.xpath(product.title_backpack).should("have.text", "Sauce Labs Backpack"); // Verify the presence of the backpack title
        cy.xpath(detail.desc_back_pack).should("be.visible"); // Verify the presence of the backpack description
        cy.xpath(detail.price_back_pack).should("be.visible"); // Verify the presence of the backpack price
        cy.xpath(detail.image_back_pack).should("be.visible"); // Verify the presence of the backpack image
        cy.get(`#${detail.btn_add_to_cart}`).should("have.text", "Add to cart"); // Verify the add to cart button text
    });

    it("Add item to cart from detail page", () => {
        cy.get(`#${detail.btn_add_to_cart}`).click(); // Click the add to cart button
        //cy.get(`#${product.badge_cart}`).should("have.text", 1); // Verify the cart badge count
        cy.get(`#${detail.btn_remove}`).should("have.text", "Remove"); // Verify the remove button text
    });

    it("Remove item from cart from detail page", () => {
        cy.get(`#${detail.btn_remove}`).click(); // Click the remove button
        cy.get(`#${product.badge_cart}`).should("not.exist"); // Verify the cart badge is removed
        cy.get(`#${detail.btn_add_to_cart}`).should("have.text", "Add to cart"); // Verify the add to cart button text
    });

    it("View product page after click back to product", () => {
        cy.get(`#${detail.btn_back_to_product}`).click(); // Click the back to products button
        cy.url().should("include", "/inventory.html"); // Verify URL after clicking back to products
        cy.xpath(product.title_product).should("be.visible"); // Verify the presence of the product title
    });
});