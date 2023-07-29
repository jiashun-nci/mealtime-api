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

describe('CustomerDetails Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToCustomerDetailsScreen();
  });

  const navigateToCustomerDetailsScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('customerDetailsEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('customerDetailsEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('customerDetailsScreen');
  };

  it('should allow you to create, update, and delete the CustomerDetails entity', async () => {
    await expect(element(by.id('customerDetailsScreen'))).toBeVisible();

    /*
     * Create CustomerDetails
     */
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('customerDetailsEditScrollView');
    // gender
    await scrollTo('genderInput', 'customerDetailsEditScrollView');
    await setPickerValue('genderInput', 'FEMALE');
    // phone
    await scrollTo('phoneInput', 'customerDetailsEditScrollView');
    await element(by.id('phoneInput')).replaceText('(968) 948-8609 x18131');
    await element(by.id('phoneInput')).tapReturnKey();
    // birthday
    await scrollTo('birthdayInput', 'customerDetailsEditScrollView');
    await setDateTimePickerValue('birthdayInput', '07/29/23', 'MM/dd/yy');
    // addressLine1
    await scrollTo('addressLine1Input', 'customerDetailsEditScrollView');
    await element(by.id('addressLine1Input')).replaceText('Unbranded');
    await element(by.id('addressLine1Input')).tapReturnKey();
    // addressLine2
    await scrollTo('addressLine2Input', 'customerDetailsEditScrollView');
    await element(by.id('addressLine2Input')).replaceText('Refined red');
    await element(by.id('addressLine2Input')).tapReturnKey();
    // city
    await scrollTo('cityInput', 'customerDetailsEditScrollView');
    await element(by.id('cityInput')).replaceText('Darlenehaven');
    await element(by.id('cityInput')).tapReturnKey();
    // country
    await scrollTo('countryInput', 'customerDetailsEditScrollView');
    await element(by.id('countryInput')).replaceText('Mozambique');
    await element(by.id('countryInput')).tapReturnKey();
    // avatar
    await scrollTo('avatarInput', 'customerDetailsEditScrollView');
    // save
    await scrollTo('submitButton', 'customerDetailsEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View CustomerDetails - validate the creation
     */
    await waitForElementToBeVisibleById('customerDetailsDetailScrollView');
    // gender
    await scrollTo('gender', 'customerDetailsDetailScrollView');
    await expect(element(by.id('gender'))).toHaveLabel('FEMALE');
    // phone
    await scrollTo('phone', 'customerDetailsDetailScrollView');
    await expect(element(by.id('phone'))).toHaveLabel('(968) 948-8609 x18131');
    // birthday
    await scrollTo('birthday', 'customerDetailsDetailScrollView');
    const birthdayCreateAttributes = await element(by.id('birthday')).getAttributes();
    jestExpect(Date.parse(birthdayCreateAttributes.label)).toEqual(Date.parse('07/29/23'));
    // addressLine1
    await scrollTo('addressLine1', 'customerDetailsDetailScrollView');
    await expect(element(by.id('addressLine1'))).toHaveLabel('Unbranded');
    // addressLine2
    await scrollTo('addressLine2', 'customerDetailsDetailScrollView');
    await expect(element(by.id('addressLine2'))).toHaveLabel('Refined red');
    // city
    await scrollTo('city', 'customerDetailsDetailScrollView');
    await expect(element(by.id('city'))).toHaveLabel('Darlenehaven');
    // country
    await scrollTo('country', 'customerDetailsDetailScrollView');
    await expect(element(by.id('country'))).toHaveLabel('Mozambique');
    // avatar
    await scrollTo('avatar', 'customerDetailsDetailScrollView');

    /*
     * Update CustomerDetails
     */
    await scrollTo('customerDetailsEditButton', 'customerDetailsDetailScrollView');
    await tapFirstElementByLabel('CustomerDetails Edit Button');
    await waitForElementToBeVisibleById('customerDetailsEditScrollView');
    // gender
    await scrollTo('genderInput', 'customerDetailsEditScrollView');
    await setPickerValue('genderInput', 'FEMALE');
    // phone
    await scrollTo('phoneInput', 'customerDetailsEditScrollView');
    await element(by.id('phoneInput')).replaceText('(968) 948-8609 x18131');
    await element(by.id('phoneInput')).tapReturnKey();
    // birthday
    await scrollTo('birthdayInput', 'customerDetailsEditScrollView');
    await setDateTimePickerValue('birthdayInput', '07/28/23', 'MM/dd/yy');
    // addressLine1
    await scrollTo('addressLine1Input', 'customerDetailsEditScrollView');
    await element(by.id('addressLine1Input')).replaceText('Unbranded');
    await element(by.id('addressLine1Input')).tapReturnKey();
    // addressLine2
    await scrollTo('addressLine2Input', 'customerDetailsEditScrollView');
    await element(by.id('addressLine2Input')).replaceText('Refined red');
    await element(by.id('addressLine2Input')).tapReturnKey();
    // city
    await scrollTo('cityInput', 'customerDetailsEditScrollView');
    await element(by.id('cityInput')).replaceText('Darlenehaven');
    await element(by.id('cityInput')).tapReturnKey();
    // country
    await scrollTo('countryInput', 'customerDetailsEditScrollView');
    await element(by.id('countryInput')).replaceText('Mozambique');
    await element(by.id('countryInput')).tapReturnKey();
    // avatar
    await scrollTo('avatarInput', 'customerDetailsEditScrollView');
    // save
    await scrollTo('submitButton', 'customerDetailsEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View CustomerDetails - validate the update
     */
    await waitForElementToBeVisibleById('customerDetailsDetailScrollView');
    // gender
    await scrollTo('gender', 'customerDetailsDetailScrollView');
    await expect(element(by.id('gender'))).toHaveLabel('FEMALE');
    // phone
    await scrollTo('phone', 'customerDetailsDetailScrollView');
    await expect(element(by.id('phone'))).toHaveLabel('(968) 948-8609 x18131');
    // birthday
    await scrollTo('birthday', 'customerDetailsDetailScrollView');
    const birthdayUpdateAttributes = await element(by.id('birthday')).getAttributes();
    jestExpect(Date.parse(birthdayUpdateAttributes.label)).toEqual(Date.parse('07/28/23'));
    // addressLine1
    await scrollTo('addressLine1', 'customerDetailsDetailScrollView');
    await expect(element(by.id('addressLine1'))).toHaveLabel('Unbranded');
    // addressLine2
    await scrollTo('addressLine2', 'customerDetailsDetailScrollView');
    await expect(element(by.id('addressLine2'))).toHaveLabel('Refined red');
    // city
    await scrollTo('city', 'customerDetailsDetailScrollView');
    await expect(element(by.id('city'))).toHaveLabel('Darlenehaven');
    // country
    await scrollTo('country', 'customerDetailsDetailScrollView');
    await expect(element(by.id('country'))).toHaveLabel('Mozambique');
    // avatar
    await scrollTo('avatar', 'customerDetailsDetailScrollView');

    /*
     * Delete
     */
    await scrollTo('customerDetailsDeleteButton', 'customerDetailsDetailScrollView');
    await waitThenTapButton('customerDetailsDeleteButton');
    await waitForElementToBeVisibleById('customerDetailsDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('customerDetailsScreen');

    /*
     * Logout
     */
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
