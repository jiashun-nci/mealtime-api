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

describe('ProductOrder Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToProductOrderScreen();
  });

  const navigateToProductOrderScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('productOrderEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('productOrderEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('productOrderScreen');
  };

  it('should allow you to create, update, and delete the ProductOrder entity', async () => {
    await expect(element(by.id('productOrderScreen'))).toBeVisible();

    /*
     * Create ProductOrder
     */
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('productOrderEditScrollView');
    // placedDate
    await scrollTo('placedDateInput', 'productOrderEditScrollView');
    await setDateTimePickerValue('placedDateInput', '2023-08-03T14:10:00+01:00', 'ISO8601');
    // quantity
    await scrollTo('quantityInput', 'productOrderEditScrollView');
    await element(by.id('quantityInput')).replaceText('71740');
    await element(by.id('quantityInput')).tapReturnKey();
    // totalPrice
    await scrollTo('totalPriceInput', 'productOrderEditScrollView');
    await element(by.id('totalPriceInput')).replaceText('11235');
    await element(by.id('totalPriceInput')).tapReturnKey();
    // status
    await scrollTo('statusInput', 'productOrderEditScrollView');
    await setPickerValue('statusInput', 'PENDING');
    // paymentMethod
    await scrollTo('paymentMethodInput', 'productOrderEditScrollView');
    await setPickerValue('paymentMethodInput', 'CREDIT_CARD');
    // paymentReference
    await scrollTo('paymentReferenceInput', 'productOrderEditScrollView');
    await element(by.id('paymentReferenceInput')).replaceText('Coordinator Frozen transmitter');
    await element(by.id('paymentReferenceInput')).tapReturnKey();
    // save
    await scrollTo('submitButton', 'productOrderEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View ProductOrder - validate the creation
     */
    await waitForElementToBeVisibleById('productOrderDetailScrollView');
    // placedDate
    await scrollTo('placedDate', 'productOrderDetailScrollView');
    const placedDateCreateAttributes = await element(by.id('placedDate')).getAttributes();
    jestExpect(Date.parse(placedDateCreateAttributes.label)).toEqual(Date.parse('2023-08-03T14:10:00+01:00'));
    // quantity
    await scrollTo('quantity', 'productOrderDetailScrollView');
    await expect(element(by.id('quantity'))).toHaveLabel('71740');
    // totalPrice
    await scrollTo('totalPrice', 'productOrderDetailScrollView');
    await expect(element(by.id('totalPrice'))).toHaveLabel('11235');
    // status
    await scrollTo('status', 'productOrderDetailScrollView');
    await expect(element(by.id('status'))).toHaveLabel('PENDING');
    // paymentMethod
    await scrollTo('paymentMethod', 'productOrderDetailScrollView');
    await expect(element(by.id('paymentMethod'))).toHaveLabel('CREDIT_CARD');
    // paymentReference
    await scrollTo('paymentReference', 'productOrderDetailScrollView');
    await expect(element(by.id('paymentReference'))).toHaveLabel('Coordinator Frozen transmitter');

    /*
     * Update ProductOrder
     */
    await scrollTo('productOrderEditButton', 'productOrderDetailScrollView');
    await tapFirstElementByLabel('ProductOrder Edit Button');
    await waitForElementToBeVisibleById('productOrderEditScrollView');
    // placedDate
    await scrollTo('placedDateInput', 'productOrderEditScrollView');
    await setDateTimePickerValue('placedDateInput', '2023-08-03T17:01:00+01:00', 'ISO8601');
    // quantity
    await scrollTo('quantityInput', 'productOrderEditScrollView');
    await element(by.id('quantityInput')).replaceText('34762');
    await element(by.id('quantityInput')).tapReturnKey();
    // totalPrice
    await scrollTo('totalPriceInput', 'productOrderEditScrollView');
    await element(by.id('totalPriceInput')).replaceText('6522');
    await element(by.id('totalPriceInput')).tapReturnKey();
    // status
    await scrollTo('statusInput', 'productOrderEditScrollView');
    await setPickerValue('statusInput', 'PENDING');
    // paymentMethod
    await scrollTo('paymentMethodInput', 'productOrderEditScrollView');
    await setPickerValue('paymentMethodInput', 'CASH');
    // paymentReference
    await scrollTo('paymentReferenceInput', 'productOrderEditScrollView');
    await element(by.id('paymentReferenceInput')).replaceText('Coordinator Frozen transmitter');
    await element(by.id('paymentReferenceInput')).tapReturnKey();
    // save
    await scrollTo('submitButton', 'productOrderEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View ProductOrder - validate the update
     */
    await waitForElementToBeVisibleById('productOrderDetailScrollView');
    // placedDate
    await scrollTo('placedDate', 'productOrderDetailScrollView');
    const placedDateUpdateAttributes = await element(by.id('placedDate')).getAttributes();
    jestExpect(Date.parse(placedDateUpdateAttributes.label)).toEqual(Date.parse('2023-08-03T17:01:00+01:00'));
    // quantity
    await scrollTo('quantity', 'productOrderDetailScrollView');
    await expect(element(by.id('quantity'))).toHaveLabel('34762');
    // totalPrice
    await scrollTo('totalPrice', 'productOrderDetailScrollView');
    await expect(element(by.id('totalPrice'))).toHaveLabel('6522');
    // status
    await scrollTo('status', 'productOrderDetailScrollView');
    await expect(element(by.id('status'))).toHaveLabel('PENDING');
    // paymentMethod
    await scrollTo('paymentMethod', 'productOrderDetailScrollView');
    await expect(element(by.id('paymentMethod'))).toHaveLabel('CASH');
    // paymentReference
    await scrollTo('paymentReference', 'productOrderDetailScrollView');
    await expect(element(by.id('paymentReference'))).toHaveLabel('Coordinator Frozen transmitter');

    /*
     * Delete
     */
    await scrollTo('productOrderDeleteButton', 'productOrderDetailScrollView');
    await waitThenTapButton('productOrderDeleteButton');
    await waitForElementToBeVisibleById('productOrderDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('productOrderScreen');

    /*
     * Logout
     */
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
