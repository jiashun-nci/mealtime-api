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

describe('Rider Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToRiderScreen();
  });

  const navigateToRiderScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('riderEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('riderEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('riderScreen');
  };

  it('should allow you to create, update, and delete the Rider entity', async () => {
    await expect(element(by.id('riderScreen'))).toBeVisible();

    /*
     * Create Rider
     */
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('riderEditScrollView');
    // name
    await scrollTo('nameInput', 'riderEditScrollView');
    await element(by.id('nameInput')).replaceText('Account');
    await element(by.id('nameInput')).tapReturnKey();
    // phone
    await scrollTo('phoneInput', 'riderEditScrollView');
    await element(by.id('phoneInput')).replaceText('1-979-344-0633');
    await element(by.id('phoneInput')).tapReturnKey();
    // avatar
    await scrollTo('avatarInput', 'riderEditScrollView');
    // save
    await scrollTo('submitButton', 'riderEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View Rider - validate the creation
     */
    await waitForElementToBeVisibleById('riderDetailScrollView');
    // name
    await scrollTo('name', 'riderDetailScrollView');
    await expect(element(by.id('name'))).toHaveLabel('Account');
    // phone
    await scrollTo('phone', 'riderDetailScrollView');
    await expect(element(by.id('phone'))).toHaveLabel('1-979-344-0633');
    // avatar
    await scrollTo('avatar', 'riderDetailScrollView');

    /*
     * Update Rider
     */
    await scrollTo('riderEditButton', 'riderDetailScrollView');
    await tapFirstElementByLabel('Rider Edit Button');
    await waitForElementToBeVisibleById('riderEditScrollView');
    // name
    await scrollTo('nameInput', 'riderEditScrollView');
    await element(by.id('nameInput')).replaceText('Account');
    await element(by.id('nameInput')).tapReturnKey();
    // phone
    await scrollTo('phoneInput', 'riderEditScrollView');
    await element(by.id('phoneInput')).replaceText('1-979-344-0633');
    await element(by.id('phoneInput')).tapReturnKey();
    // avatar
    await scrollTo('avatarInput', 'riderEditScrollView');
    // save
    await scrollTo('submitButton', 'riderEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View Rider - validate the update
     */
    await waitForElementToBeVisibleById('riderDetailScrollView');
    // name
    await scrollTo('name', 'riderDetailScrollView');
    await expect(element(by.id('name'))).toHaveLabel('Account');
    // phone
    await scrollTo('phone', 'riderDetailScrollView');
    await expect(element(by.id('phone'))).toHaveLabel('1-979-344-0633');
    // avatar
    await scrollTo('avatar', 'riderDetailScrollView');

    /*
     * Delete
     */
    await scrollTo('riderDeleteButton', 'riderDetailScrollView');
    await waitThenTapButton('riderDeleteButton');
    await waitForElementToBeVisibleById('riderDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('riderScreen');

    /*
     * Logout
     */
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
