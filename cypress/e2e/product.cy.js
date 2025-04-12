import { loginValid, selectDropdownByText, validateSorting } from '../support/helper';
import product from '../support/pageObjects/product.js';

describe('Automation sauce labs e-commerce', () => {
  it('View product list', () => {
    loginValid('standard_user', 'secret_sauce');
    cy.url().should('include', '/inventory');
    cy.contains('Swag Labs').should('be.visible');
    cy.get(`#${product.btn_burger}`).should('be.visible');
    cy.get(`#${product.btn_cart}`).should('be.visible');
    cy.xpath(product.title_product).should('be.visible');
    cy.get(`.${product.dropdown_sort}`).should('be.visible');
    cy.get(product.img_backpack).should('be.visible'); // Menggunakan cy.get untuk CSS selector
    cy.xpath(product.title_backpack).should('have.text', 'Sauce Labs Backpack');
    cy.xpath(product.desc_backpack).should('be.visible');
    cy.xpath(product.price_backpack).should('be.visible');
    cy.get(`#${product.btn_add_to_cart_backpack}`).should('have.text', 'Add to cart');
    cy.get(product.img_bike_light).should('be.visible'); // Menggunakan cy.get untuk CSS selector
    cy.xpath(product.title_bike_light).should('have.text', 'Sauce Labs Bike Light');
    cy.xpath(product.desc_bike_light).should('be.visible');
    cy.xpath(product.price_bike_light).should('be.visible');
    cy.get(`#${product.btn_add_to_cart_bike_light}`).should('have.text', 'Add to cart');
    cy.get(product.img_tshirt).should('be.visible'); // Menggunakan cy.get untuk CSS selector
    cy.xpath(product.title_tshirt).should('have.text', 'Sauce Labs Bolt T-Shirt');
    cy.xpath(product.desc_tshirt).should('be.visible');
    cy.xpath(product.price_tshirt).should('be.visible');
    cy.get(`#${product.btn_add_to_cart_tshirt}`).should('have.text', 'Add to cart');
    cy.get(product.img_jacket).should('be.visible'); // Menggunakan cy.get untuk CSS selector
    cy.xpath(product.title_jacket).should('have.text', 'Sauce Labs Fleece Jacket');
    cy.xpath(product.desc_jacket).should('be.visible');
    cy.xpath(product.price_jacket).should('be.visible');
    cy.get(`#${product.btn_add_to_cart_jacket}`).should('have.text', 'Add to cart');
    cy.get(product.img_onesie).should('be.visible'); // Menggunakan cy.get untuk CSS selector
    cy.xpath(product.title_onesie).should('have.text', 'Sauce Labs Onesie');
    cy.xpath(product.desc_onesie).should('be.visible');
    cy.xpath(product.price_onesie).should('be.visible');
    cy.get(`#${product.btn_add_to_cart_onesie}`).should('have.text', 'Add to cart');
    cy.get(product.img_red_tshirt).should('be.visible'); // Menggunakan cy.get untuk CSS selector
    cy.xpath(product.title_red_tshirt).should('have.text', 'Test.allTheThings() T-Shirt (Red)');
    cy.xpath(product.desc_red_tshirt).should('be.visible');
    cy.xpath(product.price_red_tshirt).should('be.visible');
    cy.get(product.btn_add_to_cart_red_tshirt).scrollIntoView().should('have.text', 'Add to cart');
    cy.xpath(product.icon_twitter).should('be.visible');
    cy.xpath(product.icon_facebook).should('be.visible');
    cy.xpath(product.icon_linkedin).should('be.visible');
    cy.xpath(product.footer_text).should('have.text', '© 2025 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy');
  });

  it('Sort product list descending', () => {
    selectDropdownByText('Name (Z to A)'); // Pilih opsi "Name (Z to A)" dari dropdown
    validateSorting('.inventory_item_name', 'desc'); // Validasi sorting berdasarkan nama produk (A-Z)
  });

  it('Sort product list by price (low to high)', () => {
    selectDropdownByText('Price (low to high)'); // Pilih opsi "Price (low to high)" dari dropdown
    validateSorting('.inventory_item_price', 'asc', true); // Validasi sorting berdasarkan harga (rendah ke tinggi)
  });

  it('Sort product list by price (high to low)', () => {
    selectDropdownByText('Price (high to low)'); // Pilih opsi "Price (high to low)" dari dropdown
    validateSorting('.inventory_item_price', 'desc', true); // Validasi sorting berdasarkan harga (tinggi ke rendah)
  });

  it('Sort product list by name (A to Z)', () => {
    selectDropdownByText('Name (A to Z)'); // Pilih opsi "Name (A to Z)" dari dropdown
    validateSorting('.inventory_item_name', 'asc'); // Validasi sorting berdasarkan nama produk (A-Z)
  });

  it('Add one product to cart', () => {
    cy.get(`#${product.btn_add_to_cart_backpack}`).click(); // Klik tombol "Add to cart" untuk produk "Sauce Labs Backpack"
    cy.get(`.${product.badge_cart}`).should('have.text', '1'); // Validasi badge cart menampilkan jumlah produk yang ditambahkan
    cy.get(`#${product.btn_remove_backpack}`).should('have.text', 'Remove'); // Validasi tombol berubah menjadi "Remove"
  });

  it('Add two products to cart', () => {
    cy.get(`#${product.btn_add_to_cart_bike_light}`).click(); // Klik tombol "Add to cart" untuk produk "Sauce Labs Bike Light"
    cy.get(`.${product.badge_cart}`).should('have.text', '2'); // Validasi badge cart menampilkan jumlah produk yang ditambahkan
    cy.get(`#${product.btn_remove_bike_light}`).should('have.text', 'Remove'); // Validasi tombol berubah menjadi "Remove"
  });

  it('Add more than two products to cart', () => {
    cy.get(`#${product.btn_add_to_cart_tshirt}`).click(); // Klik tombol "Add to cart" untuk produk "Sauce Labs Bolt T-Shirt"
    cy.get(`#${product.btn_add_to_cart_jacket}`).click(); // Klik tombol "Add to cart" untuk produk "Sauce Labs Fleece Jacket"
    cy.get(`.${product.badge_cart}`).should('have.text', '4'); // Validasi badge cart menampilkan jumlah produk yang ditambahkan
    cy.get(`#${product.btn_remove_tshirt}`).should('have.text', 'Remove'); // Validasi tombol berubah menjadi "Remove"
    cy.get(`#${product.btn_remove_jacket}`).should('have.text', 'Remove'); // Validasi tombol berubah menjadi "Remove"
  });

  it('Remove one product from cart', () => {
    cy.get(`#${product.btn_remove_backpack}`).click(); // Klik tombol "Remove" untuk produk "Sauce Labs Backpack"
    cy.get(`.${product.badge_cart}`).should('have.text', '3'); // Validasi badge cart menampilkan jumlah produk yang tersisa
    cy.get(`#${product.btn_add_to_cart_backpack}`).should('have.text', 'Add to cart'); // Validasi tombol berubah menjadi "Add to cart"
  });

  it('Remove all products from cart', () => {
    cy.get(`#${product.btn_remove_bike_light}`).click(); // Klik tombol "Remove" untuk produk "Sauce Labs Bike Light"
    cy.get(`#${product.btn_remove_tshirt}`).click(); // Klik tombol "Remove" untuk produk "Sauce Labs Bolt T-Shirt"
    cy.get(`#${product.btn_remove_jacket}`).click(); // Klik tombol "Remove" untuk produk "Sauce Labs Fleece Jacket"
    cy.get(`.${product.badge_cart}`).should('not.exist'); // Validasi badge cart tidak ada
  });
})