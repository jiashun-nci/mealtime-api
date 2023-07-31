const {
  reloadApp,
  loginAsUser,
  logout,
  goBack,
  tapFirstElementByLabel,
  openAndTapDrawerMenuItemByLabel,
  waitThenTapButton,
  waitForElementToBeVisibleById,
  scrollTo,
} = require('../utils');

describe('Product Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToProductScreen();
  });

  const navigateToProductScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('productEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('productEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('productScreen');
  };

  it('should allow you to create, update, and delete the Product entity', async () => {
    await expect(element(by.id('productScreen'))).toBeVisible();

    /*
     * Create Product
     */
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('productEditScrollView');
    // name
    await scrollTo('nameInput', 'productEditScrollView');
    await element(by.id('nameInput')).replaceText('mint');
    await element(by.id('nameInput')).tapReturnKey();
    // description
    await scrollTo('descriptionInput', 'productEditScrollView');
    await element(by.id('descriptionInput')).replaceText('magnetic innovate Ball');
    await element(by.id('descriptionInput')).tapReturnKey();
    // price
    await scrollTo('priceInput', 'productEditScrollView');
    await element(by.id('priceInput')).replaceText('76724');
    await element(by.id('priceInput')).tapReturnKey();
    // productImage
    await scrollTo('productImageInput', 'productEditScrollView');
    // featured
    await scrollTo('featuredInput', 'productEditScrollView');
    await toggleSwitchToValue('featuredInput', true);
    // save
    await scrollTo('submitButton', 'productEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View Product - validate the creation
     */
    await waitForElementToBeVisibleById('productDetailScrollView');
    // name
    await scrollTo('name', 'productDetailScrollView');
    await expect(element(by.id('name'))).toHaveLabel('mint');
    // description
    await scrollTo('description', 'productDetailScrollView');
    await expect(element(by.id('description'))).toHaveLabel('magnetic innovate Ball');
    // price
    await scrollTo('price', 'productDetailScrollView');
    await expect(element(by.id('price'))).toHaveLabel('76724');
    // productImage
    await scrollTo('productImage', 'productDetailScrollView');
    // featured
    await scrollTo('featured', 'productDetailScrollView');
    await expect(element(by.id('featured'))).toHaveLabel('true');

    /*
     * Update Product
     */
    await scrollTo('productEditButton', 'productDetailScrollView');
    await tapFirstElementByLabel('Product Edit Button');
    await waitForElementToBeVisibleById('productEditScrollView');
    // name
    await scrollTo('nameInput', 'productEditScrollView');
    await element(by.id('nameInput')).replaceText('mint');
    await element(by.id('nameInput')).tapReturnKey();
    // description
    await scrollTo('descriptionInput', 'productEditScrollView');
    await element(by.id('descriptionInput')).replaceText('magnetic innovate Ball');
    await element(by.id('descriptionInput')).tapReturnKey();
    // price
    await scrollTo('priceInput', 'productEditScrollView');
    await element(by.id('priceInput')).replaceText('14315');
    await element(by.id('priceInput')).tapReturnKey();
    // productImage
    await scrollTo('productImageInput', 'productEditScrollView');
    // featured
    await scrollTo('featuredInput', 'productEditScrollView');
    await toggleSwitchToValue('featuredInput', true);
    // save
    await scrollTo('submitButton', 'productEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View Product - validate the update
     */
    await waitForElementToBeVisibleById('productDetailScrollView');
    // name
    await scrollTo('name', 'productDetailScrollView');
    await expect(element(by.id('name'))).toHaveLabel('mint');
    // description
    await scrollTo('description', 'productDetailScrollView');
    await expect(element(by.id('description'))).toHaveLabel('magnetic innovate Ball');
    // price
    await scrollTo('price', 'productDetailScrollView');
    await expect(element(by.id('price'))).toHaveLabel('14315');
    // productImage
    await scrollTo('productImage', 'productDetailScrollView');
    // featured
    await scrollTo('featured', 'productDetailScrollView');
    await expect(element(by.id('featured'))).toHaveLabel('true');

    /*
     * Delete
     */
    await scrollTo('productDeleteButton', 'productDetailScrollView');
    await waitThenTapButton('productDeleteButton');
    await waitForElementToBeVisibleById('productDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('productScreen');

    /*
     * Logout
     */
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
