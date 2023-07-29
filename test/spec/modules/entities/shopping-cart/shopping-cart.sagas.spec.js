import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import ShoppingCartSagas from '../../../../../app/modules/entities/shopping-cart/shopping-cart.sagas';
import ShoppingCartActions from '../../../../../app/modules/entities/shopping-cart/shopping-cart.reducer';

const { getShoppingCart, getAllShoppingCarts, updateShoppingCart, deleteShoppingCart } = ShoppingCartSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getShoppingCart(1);
  const step = stepper(getShoppingCart(FixtureAPI, { shoppingCartId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ShoppingCartActions.shoppingCartSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getShoppingCart(FixtureAPI, { shoppingCartId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ShoppingCartActions.shoppingCartFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllShoppingCarts();
  const step = stepper(getAllShoppingCarts(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ShoppingCartActions.shoppingCartAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllShoppingCarts(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ShoppingCartActions.shoppingCartAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateShoppingCart({ id: 1 });
  const step = stepper(updateShoppingCart(FixtureAPI, { shoppingCart: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ShoppingCartActions.shoppingCartUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateShoppingCart(FixtureAPI, { shoppingCart: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ShoppingCartActions.shoppingCartUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteShoppingCart({ id: 1 });
  const step = stepper(deleteShoppingCart(FixtureAPI, { shoppingCartId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ShoppingCartActions.shoppingCartDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteShoppingCart(FixtureAPI, { shoppingCartId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ShoppingCartActions.shoppingCartDeleteFailure()));
});
