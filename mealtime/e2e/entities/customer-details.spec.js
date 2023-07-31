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
    // name
    await scrollTo('nameInput', 'customerDetailsEditScrollView');
    await element(by.id('nameInput')).replaceText('JBOD programming neural');
    await element(by.id('nameInput')).tapReturnKey();
    // gender
    await scrollTo('genderInput', 'customerDetailsEditScrollView');
    await setPickerValue('genderInput', 'MALE');
    // phone
    await scrollTo('phoneInput', 'customerDetailsEditScrollView');
    await element(by.id('phoneInput')).replaceText('1-381-412-2183 x50858');
    await element(by.id('phoneInput')).tapReturnKey();
    // birthday
    await scrollTo('birthdayInput', 'customerDetailsEditScrollView');
    await setDateTimePickerValue('birthdayInput', '07/30/23', 'MM/dd/yy');
    // addressLine1
    await scrollTo('addressLine1Input', 'customerDetailsEditScrollView');
    await element(by.id('addressLine1Input')).replaceText('Sports');
    await element(by.id('addressLine1Input')).tapReturnKey();
    // addressLine2
    await scrollTo('addressLine2Input', 'customerDetailsEditScrollView');
    await element(by.id('addressLine2Input')).replaceText('HDD');
    await element(by.id('addressLine2Input')).tapReturnKey();
    // city
    await scrollTo('cityInput', 'customerDetailsEditScrollView');
    await element(by.id('cityInput')).replaceText('Hallietown');
    await element(by.id('cityInput')).tapReturnKey();
    // country
    await scrollTo('countryInput', 'customerDetailsEditScrollView');
    await element(by.id('countryInput')).replaceText('Djibouti');
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
    // name
    await scrollTo('name', 'customerDetailsDetailScrollView');
    await expect(element(by.id('name'))).toHaveLabel('JBOD programming neural');
    // gender
    await scrollTo('gender', 'customerDetailsDetailScrollView');
    await expect(element(by.id('gender'))).toHaveLabel('MALE');
    // phone
    await scrollTo('phone', 'customerDetailsDetailScrollView');
    await expect(element(by.id('phone'))).toHaveLabel('1-381-412-2183 x50858');
    // birthday
    await scrollTo('birthday', 'customerDetailsDetailScrollView');
    const birthdayCreateAttributes = await element(by.id('birthday')).getAttributes();
    jestExpect(Date.parse(birthdayCreateAttributes.label)).toEqual(Date.parse('07/30/23'));
    // addressLine1
    await scrollTo('addressLine1', 'customerDetailsDetailScrollView');
    await expect(element(by.id('addressLine1'))).toHaveLabel('Sports');
    // addressLine2
    await scrollTo('addressLine2', 'customerDetailsDetailScrollView');
    await expect(element(by.id('addressLine2'))).toHaveLabel('HDD');
    // city
    await scrollTo('city', 'customerDetailsDetailScrollView');
    await expect(element(by.id('city'))).toHaveLabel('Hallietown');
    // country
    await scrollTo('country', 'customerDetailsDetailScrollView');
    await expect(element(by.id('country'))).toHaveLabel('Djibouti');
    // avatar
    await scrollTo('avatar', 'customerDetailsDetailScrollView');

    /*
     * Update CustomerDetails
     */
    await scrollTo('customerDetailsEditButton', 'customerDetailsDetailScrollView');
    await tapFirstElementByLabel('CustomerDetails Edit Button');
    await waitForElementToBeVisibleById('customerDetailsEditScrollView');
    // name
    await scrollTo('nameInput', 'customerDetailsEditScrollView');
    await element(by.id('nameInput')).replaceText('JBOD programming neural');
    await element(by.id('nameInput')).tapReturnKey();
    // gender
    await scrollTo('genderInput', 'customerDetailsEditScrollView');
    await setPickerValue('genderInput', 'FEMALE');
    // phone
    await scrollTo('phoneInput', 'customerDetailsEditScrollView');
    await element(by.id('phoneInput')).replaceText('1-381-412-2183 x50858');
    await element(by.id('phoneInput')).tapReturnKey();
    // birthday
    await scrollTo('birthdayInput', 'customerDetailsEditScrollView');
    await setDateTimePickerValue('birthdayInput', '07/30/23', 'MM/dd/yy');
    // addressLine1
    await scrollTo('addressLine1Input', 'customerDetailsEditScrollView');
    await element(by.id('addressLine1Input')).replaceText('Sports');
    await element(by.id('addressLine1Input')).tapReturnKey();
    // addressLine2
    await scrollTo('addressLine2Input', 'customerDetailsEditScrollView');
    await element(by.id('addressLine2Input')).replaceText('HDD');
    await element(by.id('addressLine2Input')).tapReturnKey();
    // city
    await scrollTo('cityInput', 'customerDetailsEditScrollView');
    await element(by.id('cityInput')).replaceText('Hallietown');
    await element(by.id('cityInput')).tapReturnKey();
    // country
    await scrollTo('countryInput', 'customerDetailsEditScrollView');
    await element(by.id('countryInput')).replaceText('Djibouti');
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
    // name
    await scrollTo('name', 'customerDetailsDetailScrollView');
    await expect(element(by.id('name'))).toHaveLabel('JBOD programming neural');
    // gender
    await scrollTo('gender', 'customerDetailsDetailScrollView');
    await expect(element(by.id('gender'))).toHaveLabel('FEMALE');
    // phone
    await scrollTo('phone', 'customerDetailsDetailScrollView');
    await expect(element(by.id('phone'))).toHaveLabel('1-381-412-2183 x50858');
    // birthday
    await scrollTo('birthday', 'customerDetailsDetailScrollView');
    const birthdayUpdateAttributes = await element(by.id('birthday')).getAttributes();
    jestExpect(Date.parse(birthdayUpdateAttributes.label)).toEqual(Date.parse('07/30/23'));
    // addressLine1
    await scrollTo('addressLine1', 'customerDetailsDetailScrollView');
    await expect(element(by.id('addressLine1'))).toHaveLabel('Sports');
    // addressLine2
    await scrollTo('addressLine2', 'customerDetailsDetailScrollView');
    await expect(element(by.id('addressLine2'))).toHaveLabel('HDD');
    // city
    await scrollTo('city', 'customerDetailsDetailScrollView');
    await expect(element(by.id('city'))).toHaveLabel('Hallietown');
    // country
    await scrollTo('country', 'customerDetailsDetailScrollView');
    await expect(element(by.id('country'))).toHaveLabel('Djibouti');
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
