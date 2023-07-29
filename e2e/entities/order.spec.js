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
  setPickerValue,
  setDateTimePickerValue,
  scrollTo,
} = require('../utils');

describe('Order Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToOrderScreen();
  });

  const navigateToOrderScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('orderEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('orderEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('orderScreen');
  };

  it('should allow you to create, update, and delete the Order entity', async () => {
    await expect(element(by.id('orderScreen'))).toBeVisible();

    /*
     * Create Order
     */
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('orderEditScrollView');
    // placedDate
    await scrollTo('placedDateInput', 'orderEditScrollView');
    await setDateTimePickerValue('placedDateInput', '2023-07-29T05:57:00+01:00', 'ISO8601');
    // quantity
    await scrollTo('quantityInput', 'orderEditScrollView');
    await element(by.id('quantityInput')).replaceText('97074');
    await element(by.id('quantityInput')).tapReturnKey();
    // totalPrice
    await scrollTo('totalPriceInput', 'orderEditScrollView');
    await element(by.id('totalPriceInput')).replaceText('62864');
    await element(by.id('totalPriceInput')).tapReturnKey();
    // status
    await scrollTo('statusInput', 'orderEditScrollView');
    await setPickerValue('statusInput', 'PENDING');
    // paymentMethod
    await scrollTo('paymentMethodInput', 'orderEditScrollView');
    await setPickerValue('paymentMethodInput', 'CREDIT_CARD');
    // paymentReference
    await scrollTo('paymentReferenceInput', 'orderEditScrollView');
    await element(by.id('paymentReferenceInput')).replaceText('connect');
    await element(by.id('paymentReferenceInput')).tapReturnKey();
    // save
    await scrollTo('submitButton', 'orderEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View Order - validate the creation
     */
    await waitForElementToBeVisibleById('orderDetailScrollView');
    // placedDate
    await scrollTo('placedDate', 'orderDetailScrollView');
    const placedDateCreateAttributes = await element(by.id('placedDate')).getAttributes();
    jestExpect(Date.parse(placedDateCreateAttributes.label)).toEqual(Date.parse('2023-07-29T05:57:00+01:00'));
    // quantity
    await scrollTo('quantity', 'orderDetailScrollView');
    await expect(element(by.id('quantity'))).toHaveLabel('97074');
    // totalPrice
    await scrollTo('totalPrice', 'orderDetailScrollView');
    await expect(element(by.id('totalPrice'))).toHaveLabel('62864');
    // status
    await scrollTo('status', 'orderDetailScrollView');
    await expect(element(by.id('status'))).toHaveLabel('PENDING');
    // paymentMethod
    await scrollTo('paymentMethod', 'orderDetailScrollView');
    await expect(element(by.id('paymentMethod'))).toHaveLabel('CREDIT_CARD');
    // paymentReference
    await scrollTo('paymentReference', 'orderDetailScrollView');
    await expect(element(by.id('paymentReference'))).toHaveLabel('connect');

    /*
     * Update Order
     */
    await scrollTo('orderEditButton', 'orderDetailScrollView');
    await tapFirstElementByLabel('Order Edit Button');
    await waitForElementToBeVisibleById('orderEditScrollView');
    // placedDate
    await scrollTo('placedDateInput', 'orderEditScrollView');
    await setDateTimePickerValue('placedDateInput', '2023-07-28T17:53:00+01:00', 'ISO8601');
    // quantity
    await scrollTo('quantityInput', 'orderEditScrollView');
    await element(by.id('quantityInput')).replaceText('287');
    await element(by.id('quantityInput')).tapReturnKey();
    // totalPrice
    await scrollTo('totalPriceInput', 'orderEditScrollView');
    await element(by.id('totalPriceInput')).replaceText('26258');
    await element(by.id('totalPriceInput')).tapReturnKey();
    // status
    await scrollTo('statusInput', 'orderEditScrollView');
    await setPickerValue('statusInput', 'PENDING');
    // paymentMethod
    await scrollTo('paymentMethodInput', 'orderEditScrollView');
    await setPickerValue('paymentMethodInput', 'CASH');
    // paymentReference
    await scrollTo('paymentReferenceInput', 'orderEditScrollView');
    await element(by.id('paymentReferenceInput')).replaceText('connect');
    await element(by.id('paymentReferenceInput')).tapReturnKey();
    // save
    await scrollTo('submitButton', 'orderEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View Order - validate the update
     */
    await waitForElementToBeVisibleById('orderDetailScrollView');
    // placedDate
    await scrollTo('placedDate', 'orderDetailScrollView');
    const placedDateUpdateAttributes = await element(by.id('placedDate')).getAttributes();
    jestExpect(Date.parse(placedDateUpdateAttributes.label)).toEqual(Date.parse('2023-07-28T17:53:00+01:00'));
    // quantity
    await scrollTo('quantity', 'orderDetailScrollView');
    await expect(element(by.id('quantity'))).toHaveLabel('287');
    // totalPrice
    await scrollTo('totalPrice', 'orderDetailScrollView');
    await expect(element(by.id('totalPrice'))).toHaveLabel('26258');
    // status
    await scrollTo('status', 'orderDetailScrollView');
    await expect(element(by.id('status'))).toHaveLabel('PENDING');
    // paymentMethod
    await scrollTo('paymentMethod', 'orderDetailScrollView');
    await expect(element(by.id('paymentMethod'))).toHaveLabel('CASH');
    // paymentReference
    await scrollTo('paymentReference', 'orderDetailScrollView');
    await expect(element(by.id('paymentReference'))).toHaveLabel('connect');

    /*
     * Delete
     */
    await scrollTo('orderDeleteButton', 'orderDetailScrollView');
    await waitThenTapButton('orderDeleteButton');
    await waitForElementToBeVisibleById('orderDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('orderScreen');

    /*
     * Logout
     */
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
