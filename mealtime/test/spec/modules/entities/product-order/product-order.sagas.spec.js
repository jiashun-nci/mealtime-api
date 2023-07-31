import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import ProductOrderSagas from '../../../../../app/modules/entities/product-order/product-order.sagas';
import ProductOrderActions from '../../../../../app/modules/entities/product-order/product-order.reducer';

const { getProductOrder, getAllProductOrders, updateProductOrder, deleteProductOrder } = ProductOrderSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getProductOrder(1);
  const step = stepper(getProductOrder(FixtureAPI, { productOrderId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ProductOrderActions.productOrderSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getProductOrder(FixtureAPI, { productOrderId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ProductOrderActions.productOrderFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllProductOrders();
  const step = stepper(getAllProductOrders(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ProductOrderActions.productOrderAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllProductOrders(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ProductOrderActions.productOrderAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateProductOrder({ id: 1 });
  const step = stepper(updateProductOrder(FixtureAPI, { productOrder: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ProductOrderActions.productOrderUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateProductOrder(FixtureAPI, { productOrder: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ProductOrderActions.productOrderUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteProductOrder({ id: 1 });
  const step = stepper(deleteProductOrder(FixtureAPI, { productOrderId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ProductOrderActions.productOrderDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteProductOrder(FixtureAPI, { productOrderId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ProductOrderActions.productOrderDeleteFailure()));
});
