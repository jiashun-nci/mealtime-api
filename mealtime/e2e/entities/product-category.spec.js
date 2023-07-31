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

describe('ProductCategory Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToProductCategoryScreen();
  });

  const navigateToProductCategoryScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('productCategoryEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('productCategoryEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('productCategoryScreen');
  };

  it('should allow you to create, update, and delete the ProductCategory entity', async () => {
    await expect(element(by.id('productCategoryScreen'))).toBeVisible();

    /*
     * Create ProductCategory
     */
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('productCategoryEditScrollView');
    // name
    await scrollTo('nameInput', 'productCategoryEditScrollView');
    await element(by.id('nameInput')).replaceText('bypassing enable');
    await element(by.id('nameInput')).tapReturnKey();
    // description
    await scrollTo('descriptionInput', 'productCategoryEditScrollView');
    await element(by.id('descriptionInput')).replaceText('Strategist Walk Walk');
    await element(by.id('descriptionInput')).tapReturnKey();
    // categoryImage
    await scrollTo('categoryImageInput', 'productCategoryEditScrollView');
    // save
    await scrollTo('submitButton', 'productCategoryEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View ProductCategory - validate the creation
     */
    await waitForElementToBeVisibleById('productCategoryDetailScrollView');
    // name
    await scrollTo('name', 'productCategoryDetailScrollView');
    await expect(element(by.id('name'))).toHaveLabel('bypassing enable');
    // description
    await scrollTo('description', 'productCategoryDetailScrollView');
    await expect(element(by.id('description'))).toHaveLabel('Strategist Walk Walk');
    // categoryImage
    await scrollTo('categoryImage', 'productCategoryDetailScrollView');

    /*
     * Update ProductCategory
     */
    await scrollTo('productCategoryEditButton', 'productCategoryDetailScrollView');
    await tapFirstElementByLabel('ProductCategory Edit Button');
    await waitForElementToBeVisibleById('productCategoryEditScrollView');
    // name
    await scrollTo('nameInput', 'productCategoryEditScrollView');
    await element(by.id('nameInput')).replaceText('bypassing enable');
    await element(by.id('nameInput')).tapReturnKey();
    // description
    await scrollTo('descriptionInput', 'productCategoryEditScrollView');
    await element(by.id('descriptionInput')).replaceText('Strategist Walk Walk');
    await element(by.id('descriptionInput')).tapReturnKey();
    // categoryImage
    await scrollTo('categoryImageInput', 'productCategoryEditScrollView');
    // save
    await scrollTo('submitButton', 'productCategoryEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View ProductCategory - validate the update
     */
    await waitForElementToBeVisibleById('productCategoryDetailScrollView');
    // name
    await scrollTo('name', 'productCategoryDetailScrollView');
    await expect(element(by.id('name'))).toHaveLabel('bypassing enable');
    // description
    await scrollTo('description', 'productCategoryDetailScrollView');
    await expect(element(by.id('description'))).toHaveLabel('Strategist Walk Walk');
    // categoryImage
    await scrollTo('categoryImage', 'productCategoryDetailScrollView');

    /*
     * Delete
     */
    await scrollTo('productCategoryDeleteButton', 'productCategoryDetailScrollView');
    await waitThenTapButton('productCategoryDeleteButton');
    await waitForElementToBeVisibleById('productCategoryDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('productCategoryScreen');

    /*
     * Logout
     */
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
