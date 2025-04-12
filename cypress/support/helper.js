import login from '../support/pageObjects/login.js';
import product from '../support/pageObjects/product.js';

// A helper to perform login
export function loginValid(user_name, password) {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit(Cypress.env('baseUrl')); // Navigate to the login page
    cy.get(`#${login.user_name}`).type(user_name); // Enter username
    cy.get(`#${login.password}`).type(password); // Enter password
    cy.get(`#${login.btn_login}`).click(); // Click the login button
}

/**
 * Helper to select an option from a dropdown by visible text
 * @param {string} optionText - The visible text of the option to select
 */
export function selectDropdownByText(optionText) {
    cy.get(`.${product.dropdown_sort}`).select(optionText);
}

// helper to validate sorting
export const validateSorting = (elements, sortType, isNumeric = false) => {
    cy.get(elements).then(($items) => {
        const uiValues = [...$items].map((el) =>
            isNumeric
                ? parseFloat(el.innerText.replace('$', '')) // Parsing harga jika data numerik
                : el.innerText // Mengambil teks jika data string
        );

        // Salin data untuk sorting manual
        const sortedValues = [...uiValues];
        if (sortType === 'asc') {
            sortedValues.sort(isNumeric ? (a, b) => a - b : (a, b) => a.localeCompare(b));
        } else if (sortType === 'desc') {
            sortedValues.sort(isNumeric ? (a, b) => b - a : (a, b) => b.localeCompare(a));
        }

        // Validasi hasil sorting
        expect(uiValues).to.deep.equal(sortedValues);
    });
};
