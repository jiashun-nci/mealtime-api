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

describe('Shop Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToShopScreen();
  });

  const navigateToShopScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('shopEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('shopEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('shopScreen');
  };

  it('should allow you to create, update, and delete the Shop entity', async () => {
    await expect(element(by.id('shopScreen'))).toBeVisible();

    /*
     * Create Shop
     */
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('shopEditScrollView');
    // name
    await scrollTo('nameInput', 'shopEditScrollView');
    await element(by.id('nameInput')).replaceText('systems synergy');
    await element(by.id('nameInput')).tapReturnKey();
    // phone
    await scrollTo('phoneInput', 'shopEditScrollView');
    await element(by.id('phoneInput')).replaceText('573.357.9679');
    await element(by.id('phoneInput')).tapReturnKey();
    // addressLine1
    await scrollTo('addressLine1Input', 'shopEditScrollView');
    await element(by.id('addressLine1Input')).replaceText('driver Myanmar');
    await element(by.id('addressLine1Input')).tapReturnKey();
    // addressLine2
    await scrollTo('addressLine2Input', 'shopEditScrollView');
    await element(by.id('addressLine2Input')).replaceText('parsing system Specialist');
    await element(by.id('addressLine2Input')).tapReturnKey();
    // city
    await scrollTo('cityInput', 'shopEditScrollView');
    await element(by.id('cityInput')).replaceText('Armstrongview');
    await element(by.id('cityInput')).tapReturnKey();
    // country
    await scrollTo('countryInput', 'shopEditScrollView');
    await element(by.id('countryInput')).replaceText('Paraguay');
    await element(by.id('countryInput')).tapReturnKey();
    // shopImage
    await scrollTo('shopImageInput', 'shopEditScrollView');
    // deliveryFee
    await scrollTo('deliveryFeeInput', 'shopEditScrollView');
    await element(by.id('deliveryFeeInput')).replaceText('96197');
    await element(by.id('deliveryFeeInput')).tapReturnKey();
    // save
    await scrollTo('submitButton', 'shopEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View Shop - validate the creation
     */
    await waitForElementToBeVisibleById('shopDetailScrollView');
    // name
    await scrollTo('name', 'shopDetailScrollView');
    await expect(element(by.id('name'))).toHaveLabel('systems synergy');
    // phone
    await scrollTo('phone', 'shopDetailScrollView');
    await expect(element(by.id('phone'))).toHaveLabel('573.357.9679');
    // addressLine1
    await scrollTo('addressLine1', 'shopDetailScrollView');
    await expect(element(by.id('addressLine1'))).toHaveLabel('driver Myanmar');
    // addressLine2
    await scrollTo('addressLine2', 'shopDetailScrollView');
    await expect(element(by.id('addressLine2'))).toHaveLabel('parsing system Specialist');
    // city
    await scrollTo('city', 'shopDetailScrollView');
    await expect(element(by.id('city'))).toHaveLabel('Armstrongview');
    // country
    await scrollTo('country', 'shopDetailScrollView');
    await expect(element(by.id('country'))).toHaveLabel('Paraguay');
    // shopImage
    await scrollTo('shopImage', 'shopDetailScrollView');
    // deliveryFee
    await scrollTo('deliveryFee', 'shopDetailScrollView');
    await expect(element(by.id('deliveryFee'))).toHaveLabel('96197');

    /*
     * Update Shop
     */
    await scrollTo('shopEditButton', 'shopDetailScrollView');
    await tapFirstElementByLabel('Shop Edit Button');
    await waitForElementToBeVisibleById('shopEditScrollView');
    // name
    await scrollTo('nameInput', 'shopEditScrollView');
    await element(by.id('nameInput')).replaceText('systems synergy');
    await element(by.id('nameInput')).tapReturnKey();
    // phone
    await scrollTo('phoneInput', 'shopEditScrollView');
    await element(by.id('phoneInput')).replaceText('573.357.9679');
    await element(by.id('phoneInput')).tapReturnKey();
    // addressLine1
    await scrollTo('addressLine1Input', 'shopEditScrollView');
    await element(by.id('addressLine1Input')).replaceText('driver Myanmar');
    await element(by.id('addressLine1Input')).tapReturnKey();
    // addressLine2
    await scrollTo('addressLine2Input', 'shopEditScrollView');
    await element(by.id('addressLine2Input')).replaceText('parsing system Specialist');
    await element(by.id('addressLine2Input')).tapReturnKey();
    // city
    await scrollTo('cityInput', 'shopEditScrollView');
    await element(by.id('cityInput')).replaceText('Armstrongview');
    await element(by.id('cityInput')).tapReturnKey();
    // country
    await scrollTo('countryInput', 'shopEditScrollView');
    await element(by.id('countryInput')).replaceText('Paraguay');
    await element(by.id('countryInput')).tapReturnKey();
    // shopImage
    await scrollTo('shopImageInput', 'shopEditScrollView');
    // deliveryFee
    await scrollTo('deliveryFeeInput', 'shopEditScrollView');
    await element(by.id('deliveryFeeInput')).replaceText('38291');
    await element(by.id('deliveryFeeInput')).tapReturnKey();
    // save
    await scrollTo('submitButton', 'shopEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View Shop - validate the update
     */
    await waitForElementToBeVisibleById('shopDetailScrollView');
    // name
    await scrollTo('name', 'shopDetailScrollView');
    await expect(element(by.id('name'))).toHaveLabel('systems synergy');
    // phone
    await scrollTo('phone', 'shopDetailScrollView');
    await expect(element(by.id('phone'))).toHaveLabel('573.357.9679');
    // addressLine1
    await scrollTo('addressLine1', 'shopDetailScrollView');
    await expect(element(by.id('addressLine1'))).toHaveLabel('driver Myanmar');
    // addressLine2
    await scrollTo('addressLine2', 'shopDetailScrollView');
    await expect(element(by.id('addressLine2'))).toHaveLabel('parsing system Specialist');
    // city
    await scrollTo('city', 'shopDetailScrollView');
    await expect(element(by.id('city'))).toHaveLabel('Armstrongview');
    // country
    await scrollTo('country', 'shopDetailScrollView');
    await expect(element(by.id('country'))).toHaveLabel('Paraguay');
    // shopImage
    await scrollTo('shopImage', 'shopDetailScrollView');
    // deliveryFee
    await scrollTo('deliveryFee', 'shopDetailScrollView');
    await expect(element(by.id('deliveryFee'))).toHaveLabel('38291');

    /*
     * Delete
     */
    await scrollTo('shopDeleteButton', 'shopDetailScrollView');
    await waitThenTapButton('shopDeleteButton');
    await waitForElementToBeVisibleById('shopDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('shopScreen');

    /*
     * Logout
     */
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
