import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import OrderSagas from '../../../../../app/modules/entities/order/order.sagas';
import OrderActions from '../../../../../app/modules/entities/order/order.reducer';

const { getOrder, getAllOrders, updateOrder, deleteOrder } = OrderSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getOrder(1);
  const step = stepper(getOrder(FixtureAPI, { orderId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(OrderActions.orderSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getOrder(FixtureAPI, { orderId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(OrderActions.orderFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllOrders();
  const step = stepper(getAllOrders(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(OrderActions.orderAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllOrders(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(OrderActions.orderAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateOrder({ id: 1 });
  const step = stepper(updateOrder(FixtureAPI, { order: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(OrderActions.orderUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateOrder(FixtureAPI, { order: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(OrderActions.orderUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteOrder({ id: 1 });
  const step = stepper(deleteOrder(FixtureAPI, { orderId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(OrderActions.orderDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteOrder(FixtureAPI, { orderId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(OrderActions.orderDeleteFailure()));
});
