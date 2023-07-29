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

describe('ProductAttribute Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToProductAttributeScreen();
  });

  const navigateToProductAttributeScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('productAttributeEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('productAttributeEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('productAttributeScreen');
  };

  it('should allow you to create, update, and delete the ProductAttribute entity', async () => {
    await expect(element(by.id('productAttributeScreen'))).toBeVisible();

    /*
     * Create ProductAttribute
     */
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('productAttributeEditScrollView');
    // name
    await scrollTo('nameInput', 'productAttributeEditScrollView');
    await element(by.id('nameInput')).replaceText('Facilitator withdrawal microchip');
    await element(by.id('nameInput')).tapReturnKey();
    // value
    await scrollTo('valueInput', 'productAttributeEditScrollView');
    await element(by.id('valueInput')).replaceText('evolve');
    await element(by.id('valueInput')).tapReturnKey();
    // priceExtra
    await scrollTo('priceExtraInput', 'productAttributeEditScrollView');
    await element(by.id('priceExtraInput')).replaceText('42913');
    await element(by.id('priceExtraInput')).tapReturnKey();
    // save
    await scrollTo('submitButton', 'productAttributeEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View ProductAttribute - validate the creation
     */
    await waitForElementToBeVisibleById('productAttributeDetailScrollView');
    // name
    await scrollTo('name', 'productAttributeDetailScrollView');
    await expect(element(by.id('name'))).toHaveLabel('Facilitator withdrawal microchip');
    // value
    await scrollTo('value', 'productAttributeDetailScrollView');
    await expect(element(by.id('value'))).toHaveLabel('evolve');
    // priceExtra
    await scrollTo('priceExtra', 'productAttributeDetailScrollView');
    await expect(element(by.id('priceExtra'))).toHaveLabel('42913');

    /*
     * Update ProductAttribute
     */
    await scrollTo('productAttributeEditButton', 'productAttributeDetailScrollView');
    await tapFirstElementByLabel('ProductAttribute Edit Button');
    await waitForElementToBeVisibleById('productAttributeEditScrollView');
    // name
    await scrollTo('nameInput', 'productAttributeEditScrollView');
    await element(by.id('nameInput')).replaceText('Facilitator withdrawal microchip');
    await element(by.id('nameInput')).tapReturnKey();
    // value
    await scrollTo('valueInput', 'productAttributeEditScrollView');
    await element(by.id('valueInput')).replaceText('evolve');
    await element(by.id('valueInput')).tapReturnKey();
    // priceExtra
    await scrollTo('priceExtraInput', 'productAttributeEditScrollView');
    await element(by.id('priceExtraInput')).replaceText('9437');
    await element(by.id('priceExtraInput')).tapReturnKey();
    // save
    await scrollTo('submitButton', 'productAttributeEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View ProductAttribute - validate the update
     */
    await waitForElementToBeVisibleById('productAttributeDetailScrollView');
    // name
    await scrollTo('name', 'productAttributeDetailScrollView');
    await expect(element(by.id('name'))).toHaveLabel('Facilitator withdrawal microchip');
    // value
    await scrollTo('value', 'productAttributeDetailScrollView');
    await expect(element(by.id('value'))).toHaveLabel('evolve');
    // priceExtra
    await scrollTo('priceExtra', 'productAttributeDetailScrollView');
    await expect(element(by.id('priceExtra'))).toHaveLabel('9437');

    /*
     * Delete
     */
    await scrollTo('productAttributeDeleteButton', 'productAttributeDetailScrollView');
    await waitThenTapButton('productAttributeDeleteButton');
    await waitForElementToBeVisibleById('productAttributeDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('productAttributeScreen');

    /*
     * Logout
     */
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
