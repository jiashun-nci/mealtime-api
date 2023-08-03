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

describe('OrderItem Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToOrderItemScreen();
  });

  const navigateToOrderItemScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('orderItemEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('orderItemEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('orderItemScreen');
  };

  it('should allow you to create, update, and delete the OrderItem entity', async () => {
    await expect(element(by.id('orderItemScreen'))).toBeVisible();

    /*
     * Create OrderItem
     */
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('orderItemEditScrollView');
    // placedDate
    await scrollTo('placedDateInput', 'orderItemEditScrollView');
    await setDateTimePickerValue('placedDateInput', '2023-08-03T00:18:00+01:00', 'ISO8601');
    // quantity
    await scrollTo('quantityInput', 'orderItemEditScrollView');
    await element(by.id('quantityInput')).replaceText('23628');
    await element(by.id('quantityInput')).tapReturnKey();
    // price
    await scrollTo('priceInput', 'orderItemEditScrollView');
    await element(by.id('priceInput')).replaceText('46573');
    await element(by.id('priceInput')).tapReturnKey();
    // save
    await scrollTo('submitButton', 'orderItemEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View OrderItem - validate the creation
     */
    await waitForElementToBeVisibleById('orderItemDetailScrollView');
    // placedDate
    await scrollTo('placedDate', 'orderItemDetailScrollView');
    const placedDateCreateAttributes = await element(by.id('placedDate')).getAttributes();
    jestExpect(Date.parse(placedDateCreateAttributes.label)).toEqual(Date.parse('2023-08-03T00:18:00+01:00'));
    // quantity
    await scrollTo('quantity', 'orderItemDetailScrollView');
    await expect(element(by.id('quantity'))).toHaveLabel('23628');
    // price
    await scrollTo('price', 'orderItemDetailScrollView');
    await expect(element(by.id('price'))).toHaveLabel('46573');

    /*
     * Update OrderItem
     */
    await scrollTo('orderItemEditButton', 'orderItemDetailScrollView');
    await tapFirstElementByLabel('OrderItem Edit Button');
    await waitForElementToBeVisibleById('orderItemEditScrollView');
    // placedDate
    await scrollTo('placedDateInput', 'orderItemEditScrollView');
    await setDateTimePickerValue('placedDateInput', '2023-08-03T04:28:00+01:00', 'ISO8601');
    // quantity
    await scrollTo('quantityInput', 'orderItemEditScrollView');
    await element(by.id('quantityInput')).replaceText('32184');
    await element(by.id('quantityInput')).tapReturnKey();
    // price
    await scrollTo('priceInput', 'orderItemEditScrollView');
    await element(by.id('priceInput')).replaceText('67330');
    await element(by.id('priceInput')).tapReturnKey();
    // save
    await scrollTo('submitButton', 'orderItemEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View OrderItem - validate the update
     */
    await waitForElementToBeVisibleById('orderItemDetailScrollView');
    // placedDate
    await scrollTo('placedDate', 'orderItemDetailScrollView');
    const placedDateUpdateAttributes = await element(by.id('placedDate')).getAttributes();
    jestExpect(Date.parse(placedDateUpdateAttributes.label)).toEqual(Date.parse('2023-08-03T04:28:00+01:00'));
    // quantity
    await scrollTo('quantity', 'orderItemDetailScrollView');
    await expect(element(by.id('quantity'))).toHaveLabel('32184');
    // price
    await scrollTo('price', 'orderItemDetailScrollView');
    await expect(element(by.id('price'))).toHaveLabel('67330');

    /*
     * Delete
     */
    await scrollTo('orderItemDeleteButton', 'orderItemDetailScrollView');
    await waitThenTapButton('orderItemDeleteButton');
    await waitForElementToBeVisibleById('orderItemDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('orderItemScreen');

    /*
     * Logout
     */
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
