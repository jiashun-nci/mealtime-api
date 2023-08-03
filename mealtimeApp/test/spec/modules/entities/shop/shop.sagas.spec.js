import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import ShopSagas from '../../../../../app/modules/entities/shop/shop.sagas';
import ShopActions from '../../../../../app/modules/entities/shop/shop.reducer';

const { getShop, getAllShops, updateShop, deleteShop } = ShopSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getShop(1);
  const step = stepper(getShop(FixtureAPI, { shopId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ShopActions.shopSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getShop(FixtureAPI, { shopId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ShopActions.shopFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllShops();
  const step = stepper(getAllShops(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ShopActions.shopAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllShops(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ShopActions.shopAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateShop({ id: 1 });
  const step = stepper(updateShop(FixtureAPI, { shop: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ShopActions.shopUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateShop(FixtureAPI, { shop: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ShopActions.shopUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteShop({ id: 1 });
  const step = stepper(deleteShop(FixtureAPI, { shopId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ShopActions.shopDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteShop(FixtureAPI, { shopId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ShopActions.shopDeleteFailure()));
});
