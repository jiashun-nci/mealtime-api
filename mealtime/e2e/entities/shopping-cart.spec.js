const jestExpect = require('expect');
const {
  reloadApp,
  loginAsUser,
  logout,
  goBack,
  tapFirstElementByLabel,
  openAndTapDrawerMenuItemByLabel,
  waitThenTapButton,
  waitForElementToBeVisibleById,
  setDateTimePickerValue,
  scrollTo,
} = require('../utils');

describe('ShoppingCart Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToShoppingCartScreen();
  });

  const navigateToShoppingCartScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('shoppingCartEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('shoppingCartEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('shoppingCartScreen');
  };

  it('should allow you to create, update, and delete the ShoppingCart entity', async () => {
    await expect(element(by.id('shoppingCartScreen'))).toBeVisible();

    /*
     * Create ShoppingCart
     */
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('shoppingCartEditScrollView');
    // placedDate
    await scrollTo('placedDateInput', 'shoppingCartEditScrollView');
    await setDateTimePickerValue('placedDateInput', '2023-07-30T05:31:00+01:00', 'ISO8601');
    // quantity
    await scrollTo('quantityInput', 'shoppingCartEditScrollView');
    await element(by.id('quantityInput')).replaceText('98851');
    await element(by.id('quantityInput')).tapReturnKey();
    // price
    await scrollTo('priceInput', 'shoppingCartEditScrollView');
    await element(by.id('priceInput')).replaceText('12033');
    await element(by.id('priceInput')).tapReturnKey();
    // save
    await scrollTo('submitButton', 'shoppingCartEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View ShoppingCart - validate the creation
     */
    await waitForElementToBeVisibleById('shoppingCartDetailScrollView');
    // placedDate
    await scrollTo('placedDate', 'shoppingCartDetailScrollView');
    const placedDateCreateAttributes = await element(by.id('placedDate')).getAttributes();
    jestExpect(Date.parse(placedDateCreateAttributes.label)).toEqual(Date.parse('2023-07-30T05:31:00+01:00'));
    // quantity
    await scrollTo('quantity', 'shoppingCartDetailScrollView');
    await expect(element(by.id('quantity'))).toHaveLabel('98851');
    // price
    await scrollTo('price', 'shoppingCartDetailScrollView');
    await expect(element(by.id('price'))).toHaveLabel('12033');

    /*
     * Update ShoppingCart
     */
    await scrollTo('shoppingCartEditButton', 'shoppingCartDetailScrollView');
    await tapFirstElementByLabel('ShoppingCart Edit Button');
    await waitForElementToBeVisibleById('shoppingCartEditScrollView');
    // placedDate
    await scrollTo('placedDateInput', 'shoppingCartEditScrollView');
    await setDateTimePickerValue('placedDateInput', '2023-07-30T16:36:00+01:00', 'ISO8601');
    // quantity
    await scrollTo('quantityInput', 'shoppingCartEditScrollView');
    await element(by.id('quantityInput')).replaceText('92745');
    await element(by.id('quantityInput')).tapReturnKey();
    // price
    await scrollTo('priceInput', 'shoppingCartEditScrollView');
    await element(by.id('priceInput')).replaceText('35579');
    await element(by.id('priceInput')).tapReturnKey();
    // save
    await scrollTo('submitButton', 'shoppingCartEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View ShoppingCart - validate the update
     */
    await waitForElementToBeVisibleById('shoppingCartDetailScrollView');
    // placedDate
    await scrollTo('placedDate', 'shoppingCartDetailScrollView');
    const placedDateUpdateAttributes = await element(by.id('placedDate')).getAttributes();
    jestExpect(Date.parse(placedDateUpdateAttributes.label)).toEqual(Date.parse('2023-07-30T16:36:00+01:00'));
    // quantity
    await scrollTo('quantity', 'shoppingCartDetailScrollView');
    await expect(element(by.id('quantity'))).toHaveLabel('92745');
    // price
    await scrollTo('price', 'shoppingCartDetailScrollView');
    await expect(element(by.id('price'))).toHaveLabel('35579');

    /*
     * Delete
     */
    await scrollTo('shoppingCartDeleteButton', 'shoppingCartDetailScrollView');
    await waitThenTapButton('shoppingCartDeleteButton');
    await waitForElementToBeVisibleById('shoppingCartDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('shoppingCartScreen');

    /*
     * Logout
     */
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
