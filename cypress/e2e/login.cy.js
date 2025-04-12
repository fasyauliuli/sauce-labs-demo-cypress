import { loginValid } from '../support/helper';
import login from '../support/pageObjects/login.js';

describe('Login Page', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit(Cypress.env('baseUrl')); // Navigate to the login page
  });

  it('Login with valid credentials', () => {
    loginValid('standard_user', 'secret_sauce');
    cy.url().should('include', '/inventory.html'); // Verify URL after login
    cy.contains('Swag Labs').should('be.visible'); // Verify the presence of the title
    cy.get(`#${login.burger_menu}`).click();
    cy.get(`#${login.btn_logout}`).should('be.visible'); // Verify logout button is visible
  });

  it('Login with invalid credentials', () => {
    cy.get(`#${login.user_name}`).type('invalid_user'); // Enter invalid username
    cy.get(`#${login.password}`).type('invalid_password'); // Enter invalid password
    cy.get(`#${login.btn_login}`).click(); // Click the login button
    cy.xpath(login.login_invalid).should('be.visible'); // Verify error message
  });

    it('Login with empty username', () => {
        cy.get(`#${login.password}`).type('secret_sauce'); // Enter password without username
        cy.get(`#${login.btn_login}`).click(); // Click the login button
        cy.xpath(login.login_username_empty).should('be.visible'); // Verify error message
    });

    it('Login with empty password', () => {
        cy.get(`#${login.user_name}`).type('standard_user'); // Enter username without password
        cy.get(`#${login.btn_login}`).click(); // Click the login button
        cy.xpath(login.login_password_empty).should('be.visible'); // Verify error message
    });

    it('Logout from the application', () => {
        loginValid('standard_user', 'secret_sauce');
        cy.get(`#${login.burger_menu}`).click();
        cy.get(`#${login.btn_logout}`).click(); // Click the logout button
        cy.get(`#${login.user_name}`).should('be.visible'); // Verify username field is visible again
        cy.get(`#${login.password}`).should('be.visible'); // Verify password field is visible again
        cy.get(`#${login.btn_login}`).should('be.visible'); // Verify login button is visible again
    });
});