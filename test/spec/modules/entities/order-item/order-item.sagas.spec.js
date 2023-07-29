import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import OrderItemSagas from '../../../../../app/modules/entities/order-item/order-item.sagas';
import OrderItemActions from '../../../../../app/modules/entities/order-item/order-item.reducer';

const { getOrderItem, getAllOrderItems, updateOrderItem, deleteOrderItem } = OrderItemSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getOrderItem(1);
  const step = stepper(getOrderItem(FixtureAPI, { orderItemId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(OrderItemActions.orderItemSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getOrderItem(FixtureAPI, { orderItemId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(OrderItemActions.orderItemFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllOrderItems();
  const step = stepper(getAllOrderItems(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(OrderItemActions.orderItemAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllOrderItems(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(OrderItemActions.orderItemAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateOrderItem({ id: 1 });
  const step = stepper(updateOrderItem(FixtureAPI, { orderItem: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(OrderItemActions.orderItemUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateOrderItem(FixtureAPI, { orderItem: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(OrderItemActions.orderItemUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteOrderItem({ id: 1 });
  const step = stepper(deleteOrderItem(FixtureAPI, { orderItemId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(OrderItemActions.orderItemDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteOrderItem(FixtureAPI, { orderItemId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(OrderItemActions.orderItemDeleteFailure()));
});
